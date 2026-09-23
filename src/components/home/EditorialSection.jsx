import { Link } from 'react-router-dom';
import Container from '../ui/Container.jsx';
import PlaceholderImage from '../ui/PlaceholderImage.jsx';
import Reveal from '../ui/Reveal.jsx';
import { editorial } from '../../data/homepage.js';

export default function EditorialSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <PlaceholderImage label={editorial.imageLabel} ratio="4 / 5" />
          </Reveal>
          <Reveal delay={80} className="max-w-lg">
            <span className="text-label">{editorial.eyebrow}</span>
            <h2 className="text-h1 mt-4">{editorial.headline}</h2>
            <p className="text-body mt-6">{editorial.copy}</p>
            <Link
              to={editorial.to}
              className="text-button inline-flex items-center justify-center px-9 py-4 bg-black text-white hover:bg-charcoal transition-colors mt-10"
            >
              {editorial.ctaLabel}
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
