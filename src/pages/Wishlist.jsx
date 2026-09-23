import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Button from '../components/ui/Button.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { getProductsByIds } from '../utils/product.js';

/**
 * Reuses the same ProductCard as the shop grid, so "Add to Cart" here
 * is the Quick Add flow — it opens the size (and color) selector rather
 * than guessing a variant, exactly like everywhere else on the site.
 */
export default function Wishlist() {
  const { ids } = useWishlist();
  const products = getProductsByIds(ids);

  return (
    <>
      <SEO title="Wishlist" description="Your saved Style Universe favorites." noIndex />
      <Container className="py-12 sm:py-16">
        <SectionHeading label="Wishlist" title="Your Wishlist" level="h1" />

        {products.length === 0 ? (
          <EmptyState
            className="mt-8 border border-grey-100"
            title="Your Wishlist Is Empty"
            description="Save pieces you love and come back to them later."
            action={<Button to="/shop">Explore the Collection</Button>}
          />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-6 mt-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
