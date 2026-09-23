import { createContext, useCallback, useContext, useRef, useState } from 'react';

const ToastContext = createContext(null);
let idCounter = 0;

/**
 * Lightweight toast queue — showToast(title, description?) queues a
 * notification, auto-dismissed after ~3.2s. Rendered once here (fixed,
 * bottom of viewport) rather than per-component, so it stacks cleanly
 * no matter which component triggered it (Quick Add, the product page,
 * wishlist toggles, cart removals...).
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((toast) => toast.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const showToast = useCallback(
    (title, description) => {
      const id = ++idCounter;
      setToasts((t) => [...t, { id, title, description }]);
      timers.current[id] = setTimeout(() => dismiss(id), 3200);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 sm:left-auto z-[60] flex flex-col gap-2 items-stretch sm:items-end pointer-events-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto bg-black text-white px-5 py-4 shadow-lg w-full sm:w-auto sm:min-w-[280px] sm:max-w-sm flex items-start justify-between gap-4"
          >
            <div>
              <p className="text-[11px] font-semibold tracking-widest uppercase">{t.title}</p>
              {t.description && <p className="text-body-sm text-grey-300 mt-1">{t.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="text-grey-400 hover:text-white transition-colors flex-shrink-0"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
