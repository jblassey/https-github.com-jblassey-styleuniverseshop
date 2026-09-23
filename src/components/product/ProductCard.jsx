import { Link } from 'react-router-dom';
import PlaceholderImage from '../ui/PlaceholderImage.jsx';
import { formatPrice } from '../../utils/format.js';
import { resolveBadge } from '../../utils/product.js';
import { useQuickAdd } from '../../context/QuickAddContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

const BADGE_STYLES = {
  NEW: 'bg-black text-white',
  LIMITED: 'bg-tan text-white',
  SALE: 'bg-error text-white',
};

/**
 * Shared product card used on the homepage, shop grid, related products,
 * recently viewed and the wishlist page. One component + product data =
 * every product — nothing here is specific to an individual product.
 * Quick Add is visible by default on touch/mobile and reveals on hover
 * on desktop, so it works without a mouse.
 */
export default function ProductCard({ product }) {
  const { open } = useQuickAdd();
  const { isWishlisted, toggle } = useWishlist();
  const { showToast } = useToast();
  const badge = resolveBadge(product);
  const wishlisted = isWishlisted(product.id);
  const outOfStock = product.stock <= 0;

  const handleWishlistToggle = () => {
    const nowSaved = toggle(product.id);
    showToast(nowSaved ? 'Saved to Wishlist' : 'Removed from Wishlist', product.name);
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden bg-grey-50">
        <Link to={`/product/${product.slug}`} aria-label={product.name}>
          <PlaceholderImage
            label={product.thumbnail}
            ratio="4 / 5"
            tone="light"
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 ${
              BADGE_STYLES[badge] || 'bg-black text-white'
            }`}
          >
            {badge}
          </span>
        )}

        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wishlisted}
          className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill={wishlisted ? '#0A0A0A' : 'none'} aria-hidden="true">
            <path
              d="M10 17S3 12.6 3 7.8C3 5.4 4.9 3.5 7.2 3.5c1.4 0 2.6.7 3.3 1.8.7-1.1 1.9-1.8 3.3-1.8C16.1 3.5 18 5.4 18 7.8 18 12.6 10 17 10 17Z"
              stroke="#0A0A0A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {!outOfStock && (
          <button
            type="button"
            onClick={() => open(product)}
            aria-label={`Quick add ${product.name}`}
            className="absolute bottom-3 right-3 text-[11px] font-semibold tracking-wide uppercase px-3 py-2 bg-white text-black opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100 transition-opacity"
          >
            Quick Add
          </button>
        )}

        {outOfStock && (
          <span className="absolute bottom-3 left-3 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 bg-white text-grey-500">
            Out of Stock
          </span>
        )}
      </div>

      <Link to={`/product/${product.slug}`} className="block mt-4">
        <h3 className="text-sm font-semibold text-black">{product.name}</h3>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-price">{formatPrice(product.price)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-body-sm line-through text-grey-500">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </p>
        <p className="text-body-sm mt-1">{product.sizes.join(' \u00b7 ')}</p>
      </Link>
    </div>
  );
}
