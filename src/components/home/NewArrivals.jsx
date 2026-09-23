import { Link } from 'react-router-dom';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import ProductCard from '../product/ProductCard.jsx';
import { getAllProducts } from '../../utils/product.js';

const featuredNewArrivals = getAllProducts()
  .filter((p) => p.newArrival)
  .slice(0, 4);

export default function NewArrivals() {
  return (
    <section className="py-20 sm:py-28 bg-grey-50">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label="Fresh Pieces. Fresh Energy." title="New Arrivals" />
          <Link
            to="/shop?collection=new-arrivals"
            className="text-button border-b border-black pb-0.5 hover:opacity-60 transition-opacity"
          >
            View All
          </Link>
        </div>

        <div className="mt-10 -mx-5 px-5 sm:mx-0 sm:px-0 flex gap-5 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
          {featuredNewArrivals.map((product) => (
            <div key={product.id} className="min-w-[75%] sm:min-w-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
