import { Link } from 'react-router-dom';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import PlaceholderImage from '../ui/PlaceholderImage.jsx';
import Reveal from '../ui/Reveal.jsx';
import { look } from '../../data/homepage.js';

export default function LookSection() {
  return (
    <section className="py-20 sm:py-28 bg-grey-50">
      <Container>
        <SectionHeading
          label={look.eyebrow}
          title="Build The Look"
          description={look.copy}
          align="center"
          className="mx-auto"
        />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 mt-14">
          {look.pieces.map((piece, i) => (
            <div key={piece.label} className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <Reveal delay={i * 80} className="w-full sm:w-48">
                <PlaceholderImage label={piece.imageLabel} ratio="4 / 5" />
                <p className="text-label mt-3 text-center">{piece.label}</p>
              </Reveal>
              {i < look.pieces.length - 1 && (
                <span className="text-2xl text-grey-300 font-display hidden sm:block" aria-hidden="true">
                  +
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <Link
            to={look.to}
            className="text-button inline-flex items-center justify-center px-9 py-4 bg-black text-white hover:bg-charcoal transition-colors"
          >
            {look.ctaLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
