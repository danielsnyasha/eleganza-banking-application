import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import HeroCarousel from '@/components/Investments/HeroCarousel';
import GalleryModal from '@/components/Loans/GalleryModal';
import type { LoanProductDTO } from '@/types/loan';

export const revalidate = 60;

/* helper to keep local / prod paths working */
async function buildUrl(path: string) {
  const host  = headers().get('host')!;
  const proto = host.startsWith('localhost') ? 'http' : 'https';
  return `${proto}://${host}${path}`;
}

async function getLoan(slug: string): Promise<LoanProductDTO | null> {
  const res = await fetch(await buildUrl(`/api/loan-products/${slug}`), {
    next: { revalidate: 60 },
  });
  return res.ok ? res.json() : null;
}

export default async function LoanDetail({
  params: { slug },
}: { params: { slug: string } }) {
  const loan = await getLoan(slug);
  if (!loan) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24 space-y-12">
      {/* ---------- hero images & gallery ---------- */}
      <GalleryModal images={loan.images} />

      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{loan.name}</h1>
        {loan.shortDescription && (
          <p className="text-neutral-600 leading-relaxed">
            {loan.shortDescription}
          </p>
        )}
      </header>

      {/* ---------- facts ---------- */}
      <section className="border rounded-xl overflow-hidden text-sm">
        <Fact label="Currency"      value={loan.currency} />
        <Fact label="Min amount"    value={`${loan.currency} ${loan.minAmount.toLocaleString()}`} />
        <Fact label="Max amount"    value={`${loan.currency} ${loan.maxAmount.toLocaleString()}`} />
        <Fact label="Interest rate" value={`${loan.annualRatePct}% p.a.`} />
        <Fact label="Term"          value={`${loan.termMonths} months`} />
        {loan.feePct !== null && (
          <Fact label="Origination fee" value={`${loan.feePct}%`} />
        )}
      </section>

      {/* ---------- CTA ---------- */}
      <Link href={`/banking/my-banks/${loan.slug}/apply`} className="block">
        <button className="mx-auto block w-full rounded-full py-3 font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition">
          Apply now
        </button>
      </Link>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between px-4 py-4 odd:bg-neutral-50">
      <span className="text-neutral-600">{label}</span>
      <span className="font-medium truncate max-w-[60%] text-right">
        {value}
      </span>
    </div>
  );
}
