import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO title="Privacy Policy" description="Style Universe Ghana privacy policy." />
      <Container className="py-16 sm:py-22 max-w-2xl">
        <SectionHeading label="Legal" title="Privacy Policy" description="Full policy text is added in a later stage." level="h1" />
      </Container>
    </>
  );
}
