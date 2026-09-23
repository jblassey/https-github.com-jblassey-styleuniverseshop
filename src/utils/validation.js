/**
 * Shared form validation for checkout (and anywhere else that needs
 * it). Kept framework-free so it's easy to unit test and reuse.
 */

export function isRequired(value) {
  return Boolean(value && value.trim());
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Accepts 0XXXXXXXXX, +233XXXXXXXXX, or 233XXXXXXXXX (spaces/dashes ignored). */
export function isValidGhanaPhone(value) {
  const digits = value.replace(/[\s-]/g, '');
  return /^0\d{9}$/.test(digits) || /^\+233\d{9}$/.test(digits) || /^233\d{9}$/.test(digits);
}

/** Normalizes any accepted Ghana phone format to +233XXXXXXXXX. */
export function normalizeGhanaPhone(value) {
  const digits = value.replace(/[\s-]/g, '');
  if (/^0\d{9}$/.test(digits)) return `+233${digits.slice(1)}`;
  if (/^233\d{9}$/.test(digits)) return `+${digits}`;
  if (/^\+233\d{9}$/.test(digits)) return digits;
  return value.trim();
}

/**
 * Validates the checkout form. Returns an { field: message } object —
 * empty object means valid. Never mutates or clears the form itself,
 * so entered values are always preserved on a failed validation.
 */
export function validateCheckoutForm(form) {
  const errors = {};

  if (!isRequired(form.fullName)) errors.fullName = 'Enter your full name.';
  if (!isRequired(form.email)) errors.email = 'Enter your email address.';
  else if (!isValidEmail(form.email)) errors.email = 'Enter a valid email address.';
  if (!isRequired(form.phone)) errors.phone = 'Enter your phone number.';
  else if (!isValidGhanaPhone(form.phone)) errors.phone = 'Enter a valid Ghanaian phone number (e.g. 024 XXX XXXX).';
  if (!isRequired(form.region)) errors.region = 'Select your region.';
  if (!isRequired(form.city)) errors.city = 'Enter your city or town.';
  if (!isRequired(form.address)) errors.address = 'Enter your delivery address.';

  return errors;
}
