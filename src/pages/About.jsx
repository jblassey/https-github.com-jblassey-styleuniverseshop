import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import site from '../config/site.js';

export default function About() {
  return (
    <>
      <SEO title="About" description="The story and mission behind Style Universe Ghana." />
      <Container className="py-16 sm:py-22">
        <SectionHeading label="About" title="Our Mission" level="h1" />
        <p className="text-body mt-6 max-w-prose">{site.brand.mission}</p>
        <p className="text-body mt-4 max-w-prose">{site.brand.description}</p>
      </Container>
    </>
  );
}
