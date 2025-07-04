import ComingSoonHero   from '@/components/ComingSoon/Hero';
import FeaturesGrid     from '@/components/ComingSoon/FeaturesGrid';

export const metadata = {
  title: 'Coming Soon • Eleganza Bank',
};

export default function ComingSoonPage() {
  return (
    <main className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <ComingSoonHero />
      <FeaturesGrid />
    </main>
  );
}
