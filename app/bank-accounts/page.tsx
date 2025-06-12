import Navbar from "@/components/landing-page/Navbar";


export default function BankAccountsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Bank Accounts</h1>
        <p className="mb-4">
          Choose from everyday current accounts, youth accounts, and premium
          bundles—each designed to fit your lifestyle.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>No‑fee everyday banking options</li>
          <li>Earn interest on selected tiers</li>
          <li>Instant virtual cards for online purchases</li>
        </ul>
      </main>
    </>
  );
}
