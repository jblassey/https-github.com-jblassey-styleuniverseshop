import { useEffect, useState } from 'react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import ProductCard from './ProductCard.jsx';
import { getRecentlyViewed } from '../../utils/recentlyViewed.js';
import { getProductsByIds } from '../../utils/product.js';

/**
 * Reads recently-viewed ids from localStorage on mount and renders the
 * matching products, excluding the product currently being viewed.
 * Renders nothing if there's no history yet.
 */
export default function RecentlyViewed({ excludeId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const ids = getRecentlyViewed().filter((id) => id !== excludeId);
    setProducts(getProductsByIds(ids));
  }, [excludeId]);

  if (!products.length) return null;

  return (
    <section className="py-16 sm:py-20 border-t border-grey-100">
      <Container>
        <SectionHeading title="Recently Viewed" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
