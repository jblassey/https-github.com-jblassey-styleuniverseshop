/**
 * Tracks recently viewed product ids in localStorage (most recent
 * first, deduped, capped at MAX_ITEMS). No event needed — this is only
 * read on page load / product view, not watched reactively elsewhere.
 */

const STORAGE_KEY = 'su_recently_viewed';
const MAX_ITEMS = 8;

function read() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getRecentlyViewed() {
  return read();
}

export function recordProductView(productId) {
  const ids = read().filter((id) => id !== productId);
  ids.unshift(productId);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_ITEMS)));
}
