import Navbar from "@/components/landing-page/Navbar";


export default function CreditCardsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Credit Cards</h1>
        <p className="mb-4">
          Earn rewards, build credit, and shop securely worldwide. Compare our
          range of cards and find your perfect match.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cash‑back &amp; travel rewards</li>
          <li>Zero‑interest intro offers</li>
          <li>Contactless &amp; digital‑wallet ready</li>
        </ul>
      </main>
    </>
  );
}
