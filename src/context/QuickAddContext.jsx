import { createContext, useContext, useMemo, useState } from 'react';

const QuickAddContext = createContext(null);

/**
 * Holds "which product's Quick Add modal is open" so any ProductCard,
 * anywhere on the site, can open the single shared QuickAddModal
 * rendered once in Layout — instead of every card owning its own
 * modal instance.
 */
export function QuickAddProvider({ children }) {
  const [product, setProduct] = useState(null);

  const value = useMemo(
    () => ({
      product,
      open: (p) => setProduct(p),
      close: () => setProduct(null),
    }),
    [product]
  );

  return <QuickAddContext.Provider value={value}>{children}</QuickAddContext.Provider>;
}

export function useQuickAdd() {
  const ctx = useContext(QuickAddContext);
  if (!ctx) throw new Error('useQuickAdd must be used within QuickAddProvider');
  return ctx;
}
