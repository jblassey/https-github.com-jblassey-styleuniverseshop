import site from '../config/site.js';

/**
 * Formats a number as Ghana Cedi currency, e.g. formatPrice(450) -> "GH₵450.00".
 * Centralized here so a future currency/locale change only happens once.
 */
export function formatPrice(amount) {
  const value = Number(amount) || 0;
  return `${site.currency.symbol}${value.toFixed(2)}`;
}

/**
 * Converts a GHS amount to the smallest currency subunit (pesewas) that
 * Paystack's API expects, e.g. toSubunit(450) -> 45000. Used both by
 * the frontend (display/estimates) and by the Netlify functions when
 * calling Paystack — one place, so the conversion never drifts.
 */
export function toSubunit(amountGHS) {
  return Math.round(Number(amountGHS) * 100);
}
