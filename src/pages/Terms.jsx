import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';

export default function Terms() {
  return (
    <>
      <SEO title="Terms & Conditions" description="Style Universe Ghana terms and conditions." />
      <Container className="py-16 sm:py-22 max-w-2xl">
        <SectionHeading
          label="Legal"
          title="Terms & Conditions"
          description="Full terms text is added in a later stage."
          level="h1"
        />
      </Container>
    </>
  );
}
