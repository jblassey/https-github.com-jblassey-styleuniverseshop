import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import site from '../config/site.js';

export default function SizeGuide() {
  return (
    <>
      <SEO
        title="Size Guide"
        description="Shoe and clothing sizing at Style Universe Ghana, including hard-to-find sizes."
      />
      <Container className="py-16 sm:py-22">
        <SectionHeading
          label="Fit First"
          title="Size Guide"
          description="Full measurement charts and a fit finder are added in a later stage. Here's what we currently stock at the edges of the size range."
          level="h1"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 max-w-2xl">
          <div className="border border-grey-100 p-6">
            <p className="text-label mb-3">Shoes</p>
            <p className="text-h3">{site.sizing.shoeSizes.join(' \u00b7 ')}</p>
          </div>
          <div className="border border-grey-100 p-6">
            <p className="text-label mb-3">Clothing</p>
            <p className="text-h3">{site.sizing.clothingSizes.join(' \u00b7 ')}</p>
          </div>
        </div>
      </Container>
    </>
  );
}
