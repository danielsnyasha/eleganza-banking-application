import Navbar from '@/components/landing-page/Navbar';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#002366] via-[#004ba0] to-[#0072d9] px-4 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Banking re‑imagined for <span className="text-yellow-300">everyone</span>
          </h1>
          <p className="mt-6 text-lg max-sm:text-base">
            Eleganza brings you secure digital banking, smart investments, and
            personalised financial insights – all in one place.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg">Open an account</Button>
            <Button size="lg" variant="outline" className="bg-blue-800/20 border-white text-yellow-400 font-semibold">
              Learn more
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Why bank with Eleganza?
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Everything in one app', 'Manage accounts, cards, savings, loans & investments.'],
            ['Real‑time support', 'Chat to a human 24/7 – no robots, no hold music.'],
            ['Security by design', 'Biometric login and industry‑leading encryption.'],
            ['Grow your money', 'High‑interest savings & AI‑driven investment tools.'],
            ['Instant transfers', 'Pay anyone in seconds, even across banks.'],
            ['Green banking', 'Offset your carbon footprint with every transaction.'],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-lg border p-6 shadow-sm transition hover:shadow-md">
              <h3 className="mb-2 text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL‑TO‑ACTION */}
      <section className="bg-[#002366] px-4 py-16 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
        <p className="mb-8 text-lg">
          Join millions who already trust Eleganza with their money.
        </p>
        <Button size="lg" className="text-lg">
          Create your account
        </Button>
      </section>

      {/* FOOTER (ultra‑light) */}
      <footer className="bg-[#0e1325] px-4 py-10 text-center text-xs text-white/70">
        © {new Date().getFullYear()} Eleganza Bank • All rights reserved
      </footer>
    </>
  );
}
