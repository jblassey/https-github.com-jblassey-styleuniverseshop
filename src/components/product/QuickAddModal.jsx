import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuickAdd } from '../../context/QuickAddContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import PlaceholderImage from '../ui/PlaceholderImage.jsx';
import SizeSelector from './SizeSelector.jsx';
import ColorSelector from './ColorSelector.jsx';
import QuantityStepper from './QuantityStepper.jsx';
import { formatPrice } from '../../utils/format.js';
import useFocusReturn from '../../hooks/useFocusReturn.js';

/**
 * Single shared Quick Add modal, rendered once in Layout and opened via
 * QuickAddContext from any ProductCard. Adds through CartContext, which
 * does its own validation (size/color required, stock limits) — this
 * component just surfaces whatever message that returns.
 */
export default function QuickAddModal() {
  const { product, close } = useQuickAdd();
  const { add } = useCart();
  const { showToast } = useToast();
  const closeRef = useRef(null);
  useFocusReturn(Boolean(product));

  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!product) return undefined;

    setSize(null);
    setColor(product.colors.length === 1 ? product.colors[0].name : null);
    setQuantity(1);
    setError('');
    setAdded(false);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, close]);

  if (!product) return null;

  const needsColor = product.colors.length > 1;

  const handleAdd = () => {
    const result = add(product.id, size, color, quantity);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setError('');
    setAdded(true);
    showToast('Added to Cart', result.message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute inset-0 w-full h-full bg-black/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Quick add — ${product.name}`}
        className="relative bg-white w-full sm:max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-grey-100 sticky top-0 bg-white">
          <span className="text-label">Quick Add</span>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close quick add"
            className="w-9 h-9 flex items-center justify-center hover:opacity-60 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          <div className="flex gap-4">
            <div className="w-24 flex-shrink-0">
              <PlaceholderImage label={product.thumbnail} ratio="4 / 5" tone="light" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{product.name}</h3>
              <p className="text-price mt-1">{formatPrice(product.price)}</p>
            </div>
          </div>

          {added ? (
            <div className="mt-6">
              <p className="text-body" role="status">
                Added to cart.
              </p>
              <div className="flex gap-3 mt-4">
                <Link
                  to="/cart"
                  onClick={close}
                  className="text-button flex-1 text-center px-6 py-3 bg-black text-white hover:bg-charcoal transition-colors"
                >
                  View Cart
                </Link>
                <button
                  type="button"
                  onClick={close}
                  className="text-button flex-1 px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 mt-6">
              {needsColor && (
                <ColorSelector colors={product.colors} value={color} onChange={setColor} />
              )}

              <SizeSelector
                sizes={product.sizes}
                availableSizes={product.availableSizes}
                value={size}
                onChange={setSize}
              />

              <QuantityStepper value={quantity} onChange={setQuantity} max={product.stock} />

              {error && (
                <p className="text-sm" role="alert" style={{ color: '#8C3B2E' }}>
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleAdd}
                disabled={product.stock <= 0}
                className="text-button w-full px-6 py-4 bg-black text-white hover:bg-charcoal transition-colors disabled:bg-grey-100 disabled:text-grey-400 disabled:cursor-not-allowed"
              >
                {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
