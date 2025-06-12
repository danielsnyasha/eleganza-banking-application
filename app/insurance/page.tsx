import Navbar from "@/components/landing-page/Navbar";


export default function InsurancePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Insurance</h1>
        <p className="mb-4">
          Protect what matters most—home, car, travel, and life cover tailored to
          your needs, all managed in one place.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Instant digital policy docs</li>
          <li>In‑app claims tracking</li>
          <li>Bundle &amp; save up to 20 %</li>
        </ul>
      </main>
    </>
  );
}
