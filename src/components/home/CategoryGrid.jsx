import { Link } from 'react-router-dom';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import PlaceholderImage from '../ui/PlaceholderImage.jsx';
import Reveal from '../ui/Reveal.jsx';
import { categories } from '../../data/homepage.js';

export default function CategoryGrid() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading label="Shop By Category" title="Explore Your Style" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 60}>
              <Link
                to={cat.to}
                className="group relative block overflow-hidden"
              >
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <PlaceholderImage
                    label={cat.imageLabel}
                    ratio="4 / 5"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-h3 text-white">{cat.title}</h3>

                  <p className="text-body-sm text-grey-100 mt-1">
                    {cat.copy}
                  </p>

                  <span className="text-button inline-flex items-center gap-2 mt-4 border-b border-white pb-0.5">
                    {cat.ctaLabel}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
