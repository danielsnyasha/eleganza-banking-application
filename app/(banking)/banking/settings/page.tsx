import SettingsHero       from '@/components/Settings/Hero';
import SettingsAccordion  from '@/components/Settings/SettingsAccordion';
import ContactCard        from '@/components/Settings/ContactCard';

export const metadata = {
  title: 'Settings • Eleganza Bank',
};

export default function SettingsPage() {
  return (
    <main className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto">
      <SettingsHero />

      {/* Stack for mobile; two-col on md+ */}
      <section className="grid md:grid-cols-2 gap-6">
        <SettingsAccordion />
        <ContactCard />
      </section>
    </main>
  );
}
