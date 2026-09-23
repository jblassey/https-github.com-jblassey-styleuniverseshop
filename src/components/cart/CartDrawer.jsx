import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import PlaceholderImage from '../ui/PlaceholderImage.jsx';
import QuantityStepper from '../product/QuantityStepper.jsx';
import { formatPrice } from '../../utils/format.js';
import useFocusReturn from '../../hooks/useFocusReturn.js';

/**
 * Slide-in cart drawer opened from the header cart icon. Reads/writes
 * through the same CartContext as everywhere else — no separate state.
 * Escape, backdrop click, or the close button all dismiss it; focus
 * moves to the close button on open.
 */
export default function CartDrawer() {
  const { items, count, subtotal, updateQuantity, remove, isDrawerOpen, closeDrawer } = useCart();
  const closeRef = useRef(null);
  useFocusReturn(isDrawerOpen);

  useEffect(() => {
    if (!isDrawerOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen, closeDrawer]);

  return (
    <div className={`fixed inset-0 z-50 ${isDrawerOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isDrawerOpen}>
      <button
        type="button"
        onClick={closeDrawer}
        aria-label="Close cart"
        className={`absolute inset-0 w-full h-full bg-black/40 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`absolute top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-lg flex flex-col transition-transform duration-300 ease-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-grey-100 flex-shrink-0">
          <span className="text-label">Your Cart{count > 0 ? ` (${count})` : ''}</span>
          <button
            ref={closeRef}
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="w-9 h-9 flex items-center justify-center hover:opacity-60 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 px-6">
            <p className="text-h3">Your cart is empty</p>
            <p className="text-body max-w-xs">Looks like your Universe needs a little something.</p>
            <Link
              to="/shop?collection=new-arrivals"
              onClick={closeDrawer}
              className="text-button inline-flex items-center justify-center px-7 py-3.5 bg-black text-white hover:bg-charcoal transition-colors"
            >
              Explore New Arrivals
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 divide-y divide-grey-100">
              {items.map((item) => (
                <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 py-5">
                  <Link to={`/product/${item.slug}`} onClick={closeDrawer} className="w-20 flex-shrink-0">
                    <PlaceholderImage label={item.imageLabel} ratio="4 / 5" tone="light" />
                  </Link>

                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeDrawer}
                          className="text-sm font-semibold hover:opacity-60 transition-opacity line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-body-sm mt-1">
                          {item.size}
                          {item.color ? ` \u00b7 ${item.color}` : ''}
                        </p>
                      </div>
                      <p className="text-price flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3">
                      <QuantityStepper
                        value={item.quantity}
                        max={item.stock}
                        onChange={(q) => updateQuantity(item.productId, item.size, item.color, q)}
                        itemName={item.name}
                        label=""
                        compact
                      />
                      <button
                        type="button"
                        onClick={() => remove(item.productId, item.size, item.color)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="text-body-sm underline hover:no-underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-5 py-5 border-t border-grey-100 flex-shrink-0">
              <div className="flex items-center justify-between text-sm mb-4">
                <span>Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex flex-col gap-2.5">
                <Link
                  to="/cart"
                  onClick={closeDrawer}
                  className="text-button w-full text-center px-6 py-3.5 border border-black hover:bg-black hover:text-white transition-colors"
                >
                  View Cart
                </Link>
                <Link
                  to="/checkout"
                  onClick={closeDrawer}
                  className="text-button w-full text-center px-6 py-3.5 bg-black text-white hover:bg-charcoal transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
