import { Link } from 'react-router-dom';
import Container from '../ui/Container.jsx';
import PlaceholderImage from '../ui/PlaceholderImage.jsx';
import { hero } from '../../data/homepage.js';

/**
 * Full-bleed homepage hero. Built to support either an image or video
 * background later — swap the PlaceholderImage for an <img>/<video> and
 * keep the same absolute-fill wrapper + gradient overlay so text
 * contrast is preserved regardless of what media replaces it.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <PlaceholderImage label={hero.imageLabel} ratio="auto" tone="dark" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

      <Container className="relative min-h-[85vh] sm:min-h-[80vh] flex flex-col justify-end sm:justify-center py-16 sm:py-0">
        <div className="max-w-2xl text-white">
          <span className="text-label text-grey-300">{hero.eyebrow}</span>
          <h1 className="text-display mt-4 text-white">
            {hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="text-body mt-6 max-w-md text-grey-100">{hero.subtext}</p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              to={hero.primaryCta.to}
              className="text-button inline-flex items-center justify-center px-9 py-4 bg-white text-black hover:bg-grey-100 transition-colors"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              to={hero.secondaryCta.to}
              className="text-button inline-flex items-center justify-center px-9 py-4 border border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
