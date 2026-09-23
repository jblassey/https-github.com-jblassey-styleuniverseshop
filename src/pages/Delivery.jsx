import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import site from '../config/site.js';

export default function Delivery() {
  return (
    <>
      <SEO title="Delivery" description="Delivery information for Style Universe Ghana orders." />
      <Container className="py-16 sm:py-22 max-w-2xl">
        <SectionHeading label="Help" title="Delivery" level="h1" />
        <div className="flex flex-col gap-3 mt-6 text-body">
          <p>{site.delivery.regionsServed}</p>
          <p>{site.delivery.estimatedTime}</p>
          <p className="text-body-sm">{site.delivery.note}</p>
        </div>
      </Container>
    </>
  );
}
