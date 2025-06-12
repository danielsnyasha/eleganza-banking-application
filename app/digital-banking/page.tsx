import Navbar from "@/components/landing-page/Navbar";


export default function DigitalBankingPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Digital Banking</h1>
        <p className="mb-4">
          Everything you need to manage your money—whenever, wherever. Open accounts,
          pay bills, and move funds in just a few taps.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>24/7 mobile &amp; web access</li>
          <li>Real‑time payments &amp; transfers</li>
          <li>Biometric security &amp; card controls</li>
        </ul>
      </main>
    </>
  );
}
