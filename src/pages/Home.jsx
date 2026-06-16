import Hero           from '../components/Hero';
import Stats          from '../components/Stats';
import AboutPreview   from '../components/AboutPreview';
import ValueCards     from '../components/ValueCards';
import AcademicLevels from '../components/AcademicLevels';
import Testimonials   from '../components/Testimonials';
import NewsPreview    from '../components/NewsPreview';
import CTABanner      from '../components/CTABanner';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <AboutPreview />
      <ValueCards />
      <AcademicLevels />
      <Testimonials />
      <NewsPreview />
      <CTABanner />
    </main>
  );
}
