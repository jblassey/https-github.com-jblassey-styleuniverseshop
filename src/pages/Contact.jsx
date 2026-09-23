import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import site from '../config/site.js';

export default function Contact() {
  return (
    <>
      <SEO title="Contact" description="Get in touch with Style Universe Ghana." />
      <Container className="py-16 sm:py-22">
        <SectionHeading label="Contact" title="Get in Touch" level="h1" />
        <div className="flex flex-col gap-3 mt-6 text-body">
          <p>Email: <a href={`mailto:${site.contact.email}`} className="underline hover:no-underline">{site.contact.email}</a></p>
          <p className="text-body-sm">
            WhatsApp ordering and a full contact form are added in a later stage.
          </p>
        </div>
      </Container>
    </>
  );
}
