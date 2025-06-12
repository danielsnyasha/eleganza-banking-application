import Navbar from "@/components/landing-page/Navbar";


export default function SavingsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Savings</h1>
        <p className="mb-4">
          Watch your money grow with high‑yield accounts, fixed‑term deposits, and
          automated goal trackers built into the app.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>High‑interest flexible savers</li>
          <li>Fixed‑term deposits up to 5 years</li>
          <li>Round‑up &amp; auto‑save features</li>
        </ul>
      </main>
    </>
  );
}
