import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProductById } from '../utils/product.js';

const CartContext = createContext(null);
const STORAGE_KEY = 'su_cart';

/**
 * The ONLY cart state in the app. Every cart-aware component (product
 * cards, Quick Add, the product page, the header, the cart drawer, the
 * cart page, and eventually checkout) reads/writes through this single
 * context — nothing keeps its own copy of cart state.
 *
 * What's stored in localStorage is intentionally minimal: just
 * { productId, size, color, quantity }. Display data (name, price,
 * image, current stock) is always re-derived from the live product
 * catalog on read. That's what makes "cart data validation" automatic:
 * if a product no longer exists, its line silently disappears; if
 * stock has dropped, quantity is clamped down — there's no separate
 * "validate the persisted cart" step to forget to run.
 */

function readStorage() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    // Keep only well-formed entries — guards against corrupted/edited storage.
    return parsed.filter(
      (item) =>
        item &&
        typeof item.productId === 'string' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
    );
  } catch {
    return [];
  }
}

function writeStorage(items) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full/unavailable — cart still works for this session via state.
  }
}

function lineKey(productId, size, color) {
  return [productId, size || '', color || ''].join('::');
}

/** Joins raw stored lines against the live catalog: drops missing products, clamps quantity to current stock. */
function deriveItems(rawItems) {
  return rawItems
    .map((raw) => {
      const product = getProductById(raw.productId);
      if (!product) return null;
      const quantity = Math.min(raw.quantity, product.stock);
      if (quantity <= 0) return null;
      return {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        imageLabel: product.thumbnail,
        size: raw.size || null,
        color: raw.color || null,
        quantity,
        stock: product.stock,
      };
    })
    .filter(Boolean);
}

export function CartProvider({ children }) {
  const [rawItems, setRawItems] = useState(() => readStorage());
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => writeStorage(rawItems), [rawItems]);

  // Keep in sync across tabs.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setRawItems(readStorage());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const items = useMemo(() => deriveItems(rawItems), [rawItems]);

  /**
   * Validates against the live product before touching state. Returns
   * { ok: true, message } on success (message is toast-ready copy like
   * "SU Apex Runner, Size 47") or { ok: false, message } with a reason
   * to show the customer.
   */
  const add = useCallback((productId, size, color, quantity = 1) => {
    const product = getProductById(productId);
    if (!product) return { ok: false, message: 'This product could not be found.' };
    if (product.stock <= 0) return { ok: false, message: 'This product is out of stock.' };
    if (product.sizes.length > 0) {
      if (!size) return { ok: false, message: 'Select a size to continue.' };
      if (!product.sizes.includes(size)) return { ok: false, message: 'Invalid size selected.' };
      if (!product.availableSizes.includes(size)) {
        return { ok: false, message: `Size ${size} is currently unavailable.` };
      }
    }
    if (product.colors.length > 1) {
      if (!color) return { ok: false, message: 'Select a color to continue.' };
      if (!product.colors.some((c) => c.name === color)) {
        return { ok: false, message: 'Invalid color selected.' };
      }
    }

    let addedQuantity = quantity;
    setRawItems((prev) => {
      const key = lineKey(productId, size, color);
      const existing = prev.find((i) => lineKey(i.productId, i.size, i.color) === key);
      const currentQty = existing ? existing.quantity : 0;
      const nextQty = Math.max(1, Math.min(currentQty + quantity, product.stock));
      addedQuantity = nextQty - currentQty;

      if (existing) {
        return prev.map((i) => (lineKey(i.productId, i.size, i.color) === key ? { ...i, quantity: nextQty } : i));
      }
      return [...prev, { productId, size: size || null, color: color || null, quantity: nextQty }];
    });

    if (addedQuantity <= 0) {
      return { ok: false, message: `Only ${product.stock} in stock — you already have the max in your cart.` };
    }

    return { ok: true, message: `${product.name}${size ? `, Size ${size}` : ''}` };
  }, []);

  const updateQuantity = useCallback((productId, size, color, quantity) => {
    const product = getProductById(productId);
    const key = lineKey(productId, size, color);

    setRawItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => lineKey(i.productId, i.size, i.color) !== key);
      const clamped = product ? Math.max(1, Math.min(quantity, product.stock)) : Math.max(1, quantity);
      return prev.map((i) => (lineKey(i.productId, i.size, i.color) === key ? { ...i, quantity: clamped } : i));
    });
  }, []);

  const remove = useCallback((productId, size, color) => {
    const key = lineKey(productId, size, color);
    setRawItems((prev) => prev.filter((i) => lineKey(i.productId, i.size, i.color) !== key));
  }, []);

  const clear = useCallback(() => setRawItems([]), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      add,
      updateQuantity,
      remove,
      clear,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
    }),
    [items, count, subtotal, add, updateQuantity, remove, clear, isDrawerOpen, openDrawer, closeDrawer]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
