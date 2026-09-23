import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';

export default function FAQs() {
  return (
    <>
      <SEO title="FAQs" description="Frequently asked questions about Style Universe Ghana." />
      <Container className="py-16 sm:py-22 max-w-2xl">
        <SectionHeading label="Help" title="FAQs" description="A full FAQ list is added in a later stage." level="h1" />
      </Container>
    </>
  );
}
