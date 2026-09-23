import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'su_wishlist';

/**
 * Central wishlist state — product ids only (not full product objects),
 * so a wishlisted product always reflects live catalog data (price,
 * stock, images) wherever it's displayed. Accessible from product
 * cards, the product page, and the wishlist page via useWishlist().
 */

function readStorage() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function writeStorage(ids) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage full/unavailable — wishlist still works for this session via state.
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => readStorage());

  useEffect(() => writeStorage(ids), [ids]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setIds(readStorage());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback((productId) => {
    let nowSaved = false;
    setIds((prev) => {
      if (prev.includes(productId)) {
        nowSaved = false;
        return prev.filter((id) => id !== productId);
      }
      nowSaved = true;
      return [...prev, productId];
    });
    return nowSaved;
  }, []);

  const isWishlisted = useCallback((productId) => ids.includes(productId), [ids]);

  const value = useMemo(
    () => ({ ids, count: ids.length, toggle, isWishlisted }),
    [ids, toggle, isWishlisted]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
