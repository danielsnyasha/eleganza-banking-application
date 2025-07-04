import NotFoundHero from '@/components/404/Hero';
import ErrorGrid    from '@/components/404/ErrorGrid';

export const metadata = {
  title: '404 & Errors 🥸 • Eleganza Bank',
};

export default function ErrorCenterPage() {
  return (
    <main className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <NotFoundHero />
      <ErrorGrid />
    </main>
  );
}
