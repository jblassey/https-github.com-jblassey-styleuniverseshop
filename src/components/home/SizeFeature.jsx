import { Link } from 'react-router-dom';
import Container from '../ui/Container.jsx';
import Reveal from '../ui/Reveal.jsx';
import { sizeFeature } from '../../data/homepage.js';
import site from '../../config/site.js';

/**
 * "Hard-to-find sizes" brand statement. Deliberately different from the
 * ordinary product sections above/below it — full-black, centered,
 * text-led — so it reads as a core identity statement rather than
 * another product shelf.
 */
export default function SizeFeature() {
  return (
    <section className="bg-black text-white py-24 sm:py-32">
      <Container className="text-center flex flex-col items-center">
        <Reveal className="max-w-3xl">
          <span className="text-label text-grey-400">Fit First</span>
          <h2 className="text-display text-white mt-4">{sizeFeature.headline}</h2>
          <p className="text-body text-grey-300 mt-6 max-w-xl mx-auto">{sizeFeature.copy}</p>
        </Reveal>

        <Reveal delay={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-14 w-full max-w-2xl">
          <div className="border border-charcoal-light py-8 px-6">
            <p className="text-label text-grey-400 mb-3">Shoes</p>
            <p className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
              {site.sizing.shoeSizesShort.join(' \u2022 ')}
            </p>
          </div>
          <div className="border border-charcoal-light py-8 px-6">
            <p className="text-label text-grey-400 mb-3">Clothing</p>
            <p className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
              {site.sizing.clothingSizes.join(' \u2022 ')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <Link
            to={sizeFeature.to}
            className="text-button inline-flex items-center justify-center px-9 py-4 bg-white text-black hover:bg-grey-100 transition-colors mt-14"
          >
            {sizeFeature.ctaLabel}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
