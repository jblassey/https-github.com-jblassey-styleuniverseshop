import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx';
import ProductGallery from '../components/product/ProductGallery.jsx';
import SizeSelector from '../components/product/SizeSelector.jsx';
import ColorSelector from '../components/product/ColorSelector.jsx';
import StockStatus from '../components/product/StockStatus.jsx';
import ProductAccordion from '../components/product/ProductAccordion.jsx';
import QuantityStepper from '../components/product/QuantityStepper.jsx';
import RelatedProducts from '../components/product/RelatedProducts.jsx';
import RecentlyViewed from '../components/product/RecentlyViewed.jsx';
import NotFound from './NotFound.jsx';
import { getProductBySlug, getRelatedProducts, resolveBadge, CATEGORY_LABELS } from '../utils/product.js';
import { formatPrice } from '../utils/format.js';
import { recordProductView } from '../utils/recentlyViewed.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import site from '../config/site.js';

export default function Product() {
  const { id: slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product) return <NotFound />;

  return <ProductDetail product={product} />;
}

function ProductDetail({ product }) {
  const { add } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const { showToast } = useToast();

  const [color, setColor] = useState(product.colors[0]?.name || null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    recordProductView(product.id);
    setColor(product.colors[0]?.name || null);
    setSize(null);
    setQuantity(1);
    setError('');
    setJustAdded(false);
    window.scrollTo(0, 0);
  }, [product.id]);

  const badge = resolveBadge(product);
  const wishlisted = isWishlisted(product.id);
  const outOfStock = product.stock <= 0;
  const related = getRelatedProducts(product, 4);

  const handleAddToCart = () => {
    const result = add(product.id, size, color, quantity);
    if (!result.ok) {
      setError(result.message);
      setJustAdded(false);
      return;
    }
    setError('');
    setJustAdded(true);
    showToast('Added to Cart', result.message);
  };

  const handleWishlistToggle = () => {
    const nowSaved = toggle(product.id);
    showToast(nowSaved ? 'Saved to Wishlist' : 'Removed from Wishlist', product.name);
  };

  const accordionSections = [
    { id: 'description', title: 'Description', content: <p>{product.description}</p> },
    {
      id: 'fit',
      title: 'Fit & Sizing',
      content: (
        <div className="flex flex-col gap-2">
          {product.features.length > 0 && (
            <ul className="flex flex-col gap-1">
              {product.features.map((f) => (
                <li key={f}>&bull; {f}</li>
              ))}
            </ul>
          )}
          <p>
            Not sure which size to pick?{' '}
            <Link to="/size-guide" className="underline hover:no-underline">
              View our size guide
            </Link>
            .
          </p>
        </div>
      ),
    },
    {
      id: 'delivery',
      title: 'Delivery',
      content: <p>Delivery available across Ghana. Delivery times and fees depend on location.</p>,
    },
    {
      id: 'returns',
      title: 'Returns',
      content: <p>See our returns policy for eligibility and how to start a return.</p>,
    },
  ];

  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: CATEGORY_LABELS[product.category], to: `/shop?category=${product.category}` },
    { label: product.name },
  ];

  const productUrl = `${site.seo.siteUrl}/product/${product.slug}`;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        ...(item.to ? { item: `${site.seo.siteUrl}${item.to}` } : {}),
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      url: productUrl,
      category: CATEGORY_LABELS[product.category],
      offers: {
        '@type': 'Offer',
        url: productUrl,
        priceCurrency: 'GHS',
        price: product.price,
        availability:
          product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      },
    },
  ];

  return (
    <>
      <SEO title={product.name} description={product.description} type="product" structuredData={structuredData} />

      <Container className="py-8 sm:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-6">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="lg:sticky lg:top-24 lg:self-start">
            {badge && (
              <span className="inline-block text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 bg-black text-white mb-3">
                {badge}
              </span>
            )}
            <h1 className="text-h1">{product.name}</h1>

            <p className="mt-3 flex items-baseline gap-3">
              <span className="text-price text-xl">{formatPrice(product.price)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-body-sm line-through text-grey-500">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </p>

            <p className="text-body mt-4 max-w-md">{product.description}</p>

            <div className="mt-6">
              <StockStatus stock={product.stock} />
            </div>

            <div className="flex flex-col gap-6 mt-6 max-w-sm">
              {product.colors.length > 0 && (
                <ColorSelector colors={product.colors} value={color} onChange={setColor} />
              )}

              <div>
                <SizeSelector
                  sizes={product.sizes}
                  availableSizes={product.availableSizes}
                  value={size}
                  onChange={setSize}
                />
                <Link to="/size-guide" className="text-body-sm underline hover:no-underline mt-3 inline-block">
                  Need help finding your size? View Size Guide
                </Link>
              </div>

              <QuantityStepper value={quantity} onChange={setQuantity} max={product.stock} itemName={product.name} />

              {error && (
                <p className="text-sm" role="alert" style={{ color: '#8C3B2E' }}>
                  {error}
                </p>
              )}

              {justAdded && (
                <p className="text-sm text-black" role="status">
                  Added to cart.{' '}
                  <Link to="/cart" className="underline hover:no-underline">
                    View Cart
                  </Link>
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={outOfStock}
                  size="lg"
                  className="flex-1"
                >
                  {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <Button to="/checkout" variant="secondary" size="lg" disabled={outOfStock} className="flex-1">
                  Buy Now
                </Button>
              </div>

              {outOfStock && (
                <Button variant="ghost" size="md" className="w-fit">
                  Notify Me
                </Button>
              )}

              <button
                type="button"
                onClick={handleWishlistToggle}
                aria-pressed={wishlisted}
                aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                className="inline-flex items-center gap-2 text-sm w-fit hover:opacity-60 transition-opacity"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill={wishlisted ? '#0A0A0A' : 'none'} aria-hidden="true">
                  <path
                    d="M10 17S3 12.6 3 7.8C3 5.4 4.9 3.5 7.2 3.5c1.4 0 2.6.7 3.3 1.8.7-1.1 1.9-1.8 3.3-1.8C16.1 3.5 18 5.4 18 7.8 18 12.6 10 17 10 17Z"
                    stroke="#0A0A0A"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                {wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            <div className="mt-10">
              <ProductAccordion sections={accordionSections} />
            </div>
          </div>
        </div>
      </Container>

      <RelatedProducts products={related} />
      <RecentlyViewed excludeId={product.id} />
    </>
  );
}
