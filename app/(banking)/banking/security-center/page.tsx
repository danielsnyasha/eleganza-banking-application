import Hero         from '@/components/SecurityCenter/Hero';
import IssueForm    from '@/components/SecurityCenter/IssueForm';
import ContactCard  from '@/components/SecurityCenter/ContactCard';

export const metadata = {
  title: 'Security Center • Eleganza Bank',
};

export default function SecurityCenterPage() {
  return (
    <main className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto">
      <Hero />

      {/* layout shifts to two-column on md+ */}
      <section className="grid md:grid-cols-2 gap-6">
        <IssueForm />
        <ContactCard />
      </section>
    </main>
  );
}
