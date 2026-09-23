import { Link } from 'react-router-dom';
import Container from '../ui/Container.jsx';
import PlaceholderImage from '../ui/PlaceholderImage.jsx';
import Reveal from '../ui/Reveal.jsx';
import { brandStory } from '../../data/homepage.js';

export default function BrandStory() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal className="order-2 lg:order-1 max-w-lg">
            <span className="text-label">Our Philosophy</span>
            <h2 className="text-h1 mt-4">{brandStory.headline}</h2>
            <div className="flex flex-col gap-4 mt-6">
              {brandStory.paragraphs.map((p) => (
                <p key={p} className="text-body">
                  {p}
                </p>
              ))}
            </div>
            <Link
              to={brandStory.to}
              className="text-button inline-flex items-center justify-center px-9 py-4 border border-black hover:bg-black hover:text-white transition-colors mt-10"
            >
              {brandStory.ctaLabel}
            </Link>
          </Reveal>
          <Reveal delay={80} className="order-1 lg:order-2">
            <PlaceholderImage label={brandStory.imageLabel} ratio="4 / 5" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
