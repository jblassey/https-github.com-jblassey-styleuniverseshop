import { Link } from 'react-router-dom';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';
import { suPassport } from '../../data/homepage.js';

export default function SUPassportSection() {
  return (
    <section className="py-20 sm:py-28 bg-charcoal text-white">
      <Container className="text-center flex flex-col items-center">
        <Reveal className="max-w-xl">
          <span className="text-label text-grey-300">{suPassport.eyebrow}</span>
          <h2 className="text-h1 text-white mt-4">{suPassport.name}</h2>
          <p className="text-body text-grey-200 mt-4">{suPassport.copy}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-14 max-w-2xl w-full">
          {suPassport.benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <p className="text-h3 text-white">{b.title}</p>
              <p className="text-body-sm text-grey-300 mt-2">{b.copy}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <Link
            to={suPassport.to}
            className="text-button inline-flex items-center justify-center px-9 py-4 bg-white text-black hover:bg-grey-100 transition-colors mt-14"
          >
            {suPassport.ctaLabel}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
