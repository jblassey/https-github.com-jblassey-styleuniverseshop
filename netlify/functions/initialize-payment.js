/**
 * POST /.netlify/functions/initialize-payment
 * ----------------------------------------------------------------------
 * Starts a Paystack transaction. This is the ONLY place an order amount
 * is decided — the browser sends line references (productId, size,
 * color, quantity) and customer/delivery details, never prices or a
 * total. Everything is recalculated here from the same trusted product
 * catalog and delivery config the rest of the site uses, so a tampered
 * client-side total can never reach Paystack.
 *
 * Requires PAYSTACK_SECRET_KEY in the server environment (Netlify site
 * settings — never a VITE_-prefixed variable, which would ship to the
 * browser). See .env.example.
 */
import { products } from '../../src/data/products.js';
import { getDeliveryZoneForRegion } from '../../src/config/delivery.js';
import { toSubunit } from '../../src/utils/format.js';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

function generateReference() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SU${Date.now()}${random}`;
}

function badRequest(message, statusCode = 400) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  };
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return badRequest('Method not allowed.', 405);
  }

  if (!PAYSTACK_SECRET_KEY) {
    return badRequest('Payments are not configured yet. Please contact Style Universe.', 500);
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return badRequest('Invalid request.');
  }

  const { customer, delivery, items, callbackUrl } = payload;

  if (!customer || !customer.fullName || !customer.email || !customer.phone) {
    return badRequest('Missing customer information.');
  }
  if (!delivery || !delivery.region || !delivery.city || !delivery.address) {
    return badRequest('Missing delivery information.');
  }
  if (!Array.isArray(items) || items.length === 0) {
    return badRequest('Your cart is empty.');
  }

  // Recalculate every line from the live product catalog — validates
  // existence, stock, size and color at the same time.
  const resolvedItems = [];
  for (const line of items) {
    const product = products.find((p) => p.id === line.productId);

    if (!product) {
      return badRequest(
        'One or more items in your cart are no longer available. Please update your cart before continuing.',
        409
      );
    }
    if (product.stock <= 0) {
      return badRequest(`${product.name} is out of stock. Please update your cart before continuing.`, 409);
    }

    const quantity = Number(line.quantity);
    if (!Number.isInteger(quantity) || quantity <= 0 || quantity > product.stock) {
      return badRequest(`The requested quantity for ${product.name} is no longer available.`, 409);
    }

    if (product.sizes.length > 0) {
      if (!line.size || !product.availableSizes.includes(line.size)) {
        return badRequest(`The selected size for ${product.name} is no longer available.`, 409);
      }
    }
    if (product.colors.length > 1) {
      if (!line.color || !product.colors.some((c) => c.name === line.color)) {
        return badRequest(`The selected color for ${product.name} is no longer available.`, 409);
      }
    }

    resolvedItems.push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageLabel: product.thumbnail,
      price: product.price,
      size: line.size || null,
      color: line.color || null,
      quantity,
      lineTotal: Math.round(product.price * quantity * 100) / 100,
    });
  }

  const subtotal = resolvedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const zone = getDeliveryZoneForRegion(delivery.region);
  const deliveryFee = zone.fee;
  const total = Math.round((subtotal + deliveryFee) * 100) / 100;

  const reference = generateReference();

  const metadata = {
    customer: {
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
    },
    delivery: {
      region: delivery.region,
      city: delivery.city,
      address: delivery.address,
      landmark: delivery.landmark || '',
      instructions: delivery.instructions || '',
      zoneLabel: zone.label,
      estimatedDelivery: zone.estimatedDelivery,
    },
    items: resolvedItems,
    subtotal,
    deliveryFee,
    total,
  };

  try {
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: customer.email,
        amount: toSubunit(total),
        currency: 'GHS',
        reference,
        callback_url: callbackUrl,
        metadata,
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      return badRequest('Could not start payment. Please try again.', 502);
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authorizationUrl: paystackData.data.authorization_url,
        reference,
        subtotal,
        deliveryFee,
        total,
      }),
    };
  } catch {
    return badRequest('Could not start payment. Please try again.', 500);
  }
}
