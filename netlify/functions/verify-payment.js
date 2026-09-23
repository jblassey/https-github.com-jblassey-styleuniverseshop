/**
 * GET /.netlify/functions/verify-payment?reference=...
 * ----------------------------------------------------------------------
 * The ONLY place a payment is ever marked as successful. The frontend
 * never trusts a "payment succeeded" message from the browser/Paystack
 * redirect alone — it always calls this function, which asks Paystack
 * directly (server-to-server, with the secret key) whether the
 * transaction actually succeeded, and cross-checks the paid amount
 * against what we originally charged before returning an order.
 *
 * Idempotent: calling this again for the same reference (e.g. the
 * customer refreshes the confirmation page) just re-verifies and
 * returns the same result — Paystack itself won't charge a reference
 * twice, so this is safe to call as often as needed.
 */
import { persistOrder } from '../../src/services/orderService.js';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const GENERIC_UNVERIFIED_MESSAGE =
  "We couldn't confirm your payment yet. Please contact Style Universe with your payment reference.";

function respond(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

/** Small deterministic hash so the same reference always produces the same order number, even across refreshes. */
function shortHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36).toUpperCase().padStart(4, '0').slice(-4);
}

function dateStamp(value) {
  const d = value ? new Date(value) : new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

export async function handler(event) {
  const reference = event.queryStringParameters?.reference;

  if (!reference) {
    return respond(400, { message: 'Missing payment reference.' });
  }

  if (!PAYSTACK_SECRET_KEY) {
    return respond(500, { message: GENERIC_UNVERIFIED_MESSAGE });
  }

  let tx;
  try {
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
    );
    const data = await paystackResponse.json();

    if (!paystackResponse.ok || !data.status || !data.data) {
      return respond(502, { message: GENERIC_UNVERIFIED_MESSAGE });
    }
    tx = data.data;
  } catch {
    return respond(500, { message: GENERIC_UNVERIFIED_MESSAGE });
  }

  if (tx.status !== 'success') {
    // Covers failed AND cancelled/abandoned attempts — Paystack reports both here.
    return respond(200, {
      verified: false,
      status: tx.status,
      message: 'Payment was not completed.',
    });
  }

  const metadata = tx.metadata || {};
  const expectedSubunit = metadata.total ? Math.round(metadata.total * 100) : null;

  if (expectedSubunit !== null && tx.amount !== expectedSubunit) {
    // Amount doesn't match what we charged for — never trust this as a valid order.
    return respond(409, { message: GENERIC_UNVERIFIED_MESSAGE });
  }

  const orderId = `SU-${dateStamp(tx.paid_at || tx.created_at)}-${shortHash(reference)}`;

  const order = {
    orderId,
    paymentReference: reference,
    customer: metadata.customer || null,
    delivery: metadata.delivery || null,
    items: metadata.items || [],
    subtotal: metadata.subtotal ?? null,
    deliveryFee: metadata.deliveryFee ?? null,
    total: metadata.total ?? tx.amount / 100,
    currency: 'GHS',
    paymentStatus: 'paid',
    orderStatus: 'pending',
    createdAt: tx.paid_at || tx.created_at,
  };

  try {
    await persistOrder(order);
  } catch {
    // Persistence is a placeholder for now (see orderService.js) — never
    // fail a verified, paid order over a logging/storage hiccup.
  }

  return respond(200, { verified: true, order });
}
