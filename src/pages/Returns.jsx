import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';

export default function Returns() {
  return (
    <>
      <SEO title="Returns" description="Returns and exchanges at Style Universe Ghana." />
      <Container className="py-16 sm:py-22 max-w-2xl">
        <SectionHeading
          label="Help"
          title="Returns"
          description="Full returns and exchange policy is added in a later stage."
          level="h1"
        />
      </Container>
    </>
  );
}
