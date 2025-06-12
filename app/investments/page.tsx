import Navbar from "@/components/landing-page/Navbar";


export default function InvestmentsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Investments</h1>
        <p className="mb-4">
          Trade shares, ETFs, and bonds with low fees—or let our robo‑advisor
          build a diversified portfolio for you.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Self‑directed trading platform</li>
          <li>Managed portfolios from €1 k</li>
          <li>Tax‑efficient ISA &amp; pension wrappers</li>
        </ul>
      </main>
    </>
  );
}
