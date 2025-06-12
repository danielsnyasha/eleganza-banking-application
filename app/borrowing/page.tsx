import Navbar from "@/components/landing-page/Navbar";


export default function BorrowingPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Borrowing</h1>
        <p className="mb-4">
          From personal loans to flexible overdrafts, discover credit that adapts
          to you—with transparent rates and no hidden fees.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personal &amp; student loans</li>
          <li>Overdraft protection</li>
          <li>Quick online approval process</li>
        </ul>
      </main>
    </>
  );
}
