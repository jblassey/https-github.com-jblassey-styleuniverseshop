import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { suPassport } from '../data/homepage.js';

export default function SUPassportPage() {
  return (
    <>
      <SEO title="SU Passport" description="Earn rewards and unlock exclusive offers with SU Passport." />
      <Container className="py-16 sm:py-22 max-w-2xl">
        <SectionHeading label={suPassport.eyebrow} title={suPassport.name} description={suPassport.copy} level="h1" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
          {suPassport.benefits.map((b) => (
            <div key={b.title}>
              <p className="text-h3">{b.title}</p>
              <p className="text-body-sm mt-2">{b.copy}</p>
            </div>
          ))}
        </div>
        <p className="text-body-sm mt-10">The full loyalty program is built in a later stage.</p>
      </Container>
    </>
  );
}
