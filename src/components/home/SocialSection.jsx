import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import PlaceholderImage from '../ui/PlaceholderImage.jsx';
import site from '../../config/site.js';
import { socialSection } from '../../data/homepage.js';

export default function SocialSection() {
  const tiles = Array.from({ length: socialSection.gridCount }, (_, i) => i + 1);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          label={socialSection.eyebrow}
          title="Follow The Universe"
          description={socialSection.copy}
          align="center"
          className="mx-auto"
        />

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mt-10">
          {tiles.map((n) => (
            <PlaceholderImage key={n} label={`Post ${n}`} ratio="1 / 1" tone="light" />
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-button inline-flex items-center justify-center px-7 py-3 border border-black hover:bg-black hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href={site.social.tiktok}
            target="_blank"
            rel="noreferrer"
            className="text-button inline-flex items-center justify-center px-7 py-3 border border-black hover:bg-black hover:text-white transition-colors"
          >
            TikTok
          </a>
        </div>
      </Container>
    </section>
  );
}
