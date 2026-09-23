/**
 * Placeholder order persistence.
 *
 * No database is connected yet — a "completed order" currently exists
 * only as a verified Paystack transaction (see
 * netlify/functions/verify-payment.js, which rebuilds the order object
 * fresh from Paystack's own transaction record on every request rather
 * than reading it from storage). That is an honest, correct way to run
 * without a database, but it is not permanent order storage: if
 * Style Universe needs order history, staff tooling, or delivery
 * tracking, a real database needs to be connected.
 *
 * This module is the intended seam for that: persistOrder() is called
 * (server-side, from verify-payment.js) right after a payment is
 * verified. Replace the body below with a real database/API call —
 * nothing else in the checkout flow needs to change.
 */
export async function persistOrder(order) {
  // eslint-disable-next-line no-console
  console.info('[orderService] Order verified (not yet persisted to a database):', order.orderId);
  return order;
}
