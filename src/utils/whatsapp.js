import site from '../config/site.js';

/**
 * Central WhatsApp helpers — every WhatsApp link on the site goes
 * through here, so the phone number and message formats only live in
 * one place. site.contact.whatsappNumber is a placeholder (233XXXXXXXXX)
 * until a real number is set.
 */

export function buildWhatsAppLink(message) {
  const digits = site.contact.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export function orderSupportMessage(orderNumber) {
  return `Hello Style Universe, I just placed order ${orderNumber} and I need assistance.`;
}

/** Fallback WhatsApp ordering — builds a prefilled message listing everything currently in the cart. */
export function cartOrderMessage(items) {
  const lines = items
    .map(
      (item) =>
        `Product: ${item.name}\nSize: ${item.size || '-'}\nColor: ${item.color || '-'}\nQuantity: ${item.quantity}`
    )
    .join('\n\n');

  return `Hello Style Universe,\n\nI would like to order:\n\n${lines}\n\nPlease confirm availability and delivery details.`;
}
