/* app/(banking)/banking/investments/[slug]/page.tsx */
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import HeroCarousel from '@/components/Investments/HeroCarousel';
import { InvestmentProductDTO } from '@/types/investment';
import Link from 'next/link';

export const revalidate = 60;

/* --- helper -------------------------------------------------- */
async function buildUrl(path: string) {
  const hdrs = await headers();                      // await → TS OK
  const host = hdrs.get('host');
  const proto = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  return `${proto}://${host}${path}`;
}

async function getProduct(slug: string): Promise<InvestmentProductDTO | null> {
  const res = await fetch(await buildUrl(`/api/investment-products/${slug}`), {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

/* --- page component ------------------------------------------ */
export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24 space-y-12">
      <HeroCarousel
        images={product.images.length ? product.images : ['/placeholder.jpg']}
      />

      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-neutral-600 leading-relaxed">
          {product.shortDescription}
        </p>
      </header>

      <section className="border rounded-xl overflow-hidden">
        <FactRow
          label="Category"
          value={product.category.replaceAll('_', ' ')}
        />
        <FactRow label="Currency" value={product.currency} />
        <FactRow
          label="Minimum deposit"
          value={`${product.currency} ${product.minimumAmount.toLocaleString()}`}
        />
        {product.maxValue !== undefined && (
          <FactRow
            label="Maximum value"
            value={`${product.currency} ${product.maxValue.toLocaleString()}`}
          />
        )}
        <FactRow label="ROI" value={`${product.annualRatePct}%`} />
        {product.termDays && (
          <FactRow label="Term" value={`${product.termDays} days`} />
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Why invest?</h2>
        <p className="text-neutral-700 leading-relaxed">
          {product.shortDescription}{' '}
          This opportunity offers attractive yields while preserving capital.
          Funds are allocated to carefully vetted projects managed by our
          in-house investment team, providing transparent reporting, strict
          risk controls, and quarterly performance updates.
        </p>
        <ul className="list-disc list-inside text-neutral-700 space-y-1">
          <li>Low minimum entry point lets you diversify</li>
          <li>Fixed ROI locked for the full term</li>
          <li>24-hour liquidity window after maturity</li>
        </ul>
      </section>

      <Link href={`/banking/investments/${product.slug}/apply`} className="block">
  <button className="mx-auto block w-full rounded-full py-3 font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition">
    Apply now
  </button>
</Link>
    </div>
  );
}

/* --- small helper -------------------------------------------- */
function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between px-4 py-4 odd:bg-neutral-50 text-sm">
      <span className="text-neutral-600">{label}</span>
      <span className="font-medium truncate max-w-[60%] text-right">
        {value}
      </span>
    </div>
  );
}
