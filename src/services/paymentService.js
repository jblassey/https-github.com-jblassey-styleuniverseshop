/**
 * Frontend payment service — talks only to our own Netlify Functions,
 * never to Paystack directly. Payment logic (amount calculation, secret
 * key usage, verification) lives entirely server-side; this file just
 * shuttles requests/responses.
 */

const FUNCTIONS_BASE = '/.netlify/functions';

async function parseJsonSafely(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

/**
 * Starts a Paystack transaction. Sends customer/delivery details and
 * cart line references (productId/size/color/quantity only — never
 * prices) so the server can independently recalculate the trusted
 * total. Resolves with { authorizationUrl, reference, subtotal,
 * deliveryFee, total } on success.
 */
export async function initializePayment(payload) {
  const response = await fetch(`${FUNCTIONS_BASE}/initialize-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await parseJsonSafely(response);

  if (!response.ok) {
    throw new Error(data.message || 'Could not start payment. Please try again.');
  }

  return data;
}

/**
 * Verifies a completed (or abandoned) transaction server-side.
 * Resolves with { verified: true, order } on a confirmed payment, or
 * { verified: false, message } if payment wasn't completed. Throws
 * only on a hard failure (network/server error) — the caller should
 * show a generic "couldn't confirm yet, contact support" message.
 */
export async function verifyPayment(reference) {
  const response = await fetch(`${FUNCTIONS_BASE}/verify-payment?reference=${encodeURIComponent(reference)}`);
  const data = await parseJsonSafely(response);

  if (!response.ok) {
    throw new Error(
      data.message || "We couldn't confirm your payment yet. Please contact Style Universe with your payment reference."
    );
  }

  return data;
}
