import HelpSupportHero   from '@/components/HelpSupport/Hero';
import HelpAccordion     from '@/components/HelpSupport/HelpAccordion';
import ContactCard       from '@/components/HelpSupport/ContactCard';

export const metadata = {
  title: 'Help & Support • Eleganza Bank',
};

export default function HelpSupportPage() {
  return (
    <main className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto">
      <HelpSupportHero />

      {/* Mobile = stacked, md+ = two-col */}
      <section className="grid md:grid-cols-2 gap-6">
        <HelpAccordion />
        <ContactCard />
      </section>
    </main>
  );
}
