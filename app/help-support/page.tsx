import Navbar from "@/components/landing-page/Navbar";


export default function HelpSupportPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Help &amp; Support</h1>
        <p className="mb-4">
          Need assistance? Our team is here 24/7. Browse FAQs, start a live chat,
          or give us a call straight from the app.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Comprehensive knowledge base</li>
          <li>Secure in‑app messaging</li>
          <li>Dedicated phone lines worldwide</li>
        </ul>
      </main>
    </>
  );
}
