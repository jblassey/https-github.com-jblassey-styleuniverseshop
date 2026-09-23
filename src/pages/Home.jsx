import SEO from '../components/SEO.jsx';
import Hero from '../components/home/Hero.jsx';
import CategoryGrid from '../components/home/CategoryGrid.jsx';
import NewArrivals from '../components/home/NewArrivals.jsx';
import SizeFeature from '../components/home/SizeFeature.jsx';
import EditorialSection from '../components/home/EditorialSection.jsx';
import LookSection from '../components/home/LookSection.jsx';
import BrandStory from '../components/home/BrandStory.jsx';
import SUPassportSection from '../components/home/SUPassportSection.jsx';
import SocialSection from '../components/home/SocialSection.jsx';
import Newsletter from '../components/home/Newsletter.jsx';

export default function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <CategoryGrid />
      <NewArrivals />
      <SizeFeature />
      <EditorialSection />
      <LookSection />
      <BrandStory />
      <SUPassportSection />
      <SocialSection />
      <Newsletter />
    </>
  );
}
