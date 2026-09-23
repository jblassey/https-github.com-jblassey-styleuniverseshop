/**
 * Small recent-searches list in localStorage (most recent first,
 * deduped case-insensitively, capped at MAX_ITEMS). Read only when the
 * search overlay opens — not watched reactively elsewhere.
 */

const STORAGE_KEY = 'su_recent_searches';
const MAX_ITEMS = 6;

function read() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getRecentSearches() {
  return read();
}

export function addRecentSearch(term) {
  const clean = term.trim();
  if (!clean) return;
  const existing = read().filter((t) => t.toLowerCase() !== clean.toLowerCase());
  existing.unshift(clean);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, MAX_ITEMS)));
}

export function clearRecentSearches() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}
