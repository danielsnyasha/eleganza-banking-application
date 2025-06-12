import Navbar from "@/components/landing-page/Navbar";


export default function SustainabilityPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Sustainability</h1>
        <p className="mb-4">
          Banking with purpose—learn how we’re reducing our footprint, financing
          green projects, and helping you track yours.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Net‑zero roadmap &amp; reporting</li>
          <li>Green mortgage discounts</li>
          <li>Carbon insights for every purchase</li>
        </ul>
      </main>
    </>
  );
}
