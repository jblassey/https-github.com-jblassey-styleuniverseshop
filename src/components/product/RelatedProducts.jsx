import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import ProductCard from './ProductCard.jsx';

export default function RelatedProducts({ products }) {
  if (!products.length) return null;

  return (
    <section className="py-16 sm:py-20 border-t border-grey-100">
      <Container>
        <SectionHeading title="You May Also Like" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
