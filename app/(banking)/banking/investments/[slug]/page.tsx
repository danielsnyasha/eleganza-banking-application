import Image from 'next/image';
import { notFound } from 'next/navigation';
import { InvestmentProductDTO } from '@/types/investment';
import GalleryModal from '@/components/Investments/GalleryModal';

export const revalidate = 60; // static-plus-ISR

async function getProduct(slug: string): Promise<InvestmentProductDTO | null> {
  const res = await fetch(
    `/api/investment-products/${slug}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20">
      {/* hero */}
      <div className="relative h-[260px] sm:h-[340px] rounded-xl overflow-hidden mb-6 shadow">
        <Image
          src={product.images[0] ?? '/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.images.length > 1 && <GalleryModal images={product.images} />}
      </div>

      {/* title */}
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <p className="text-neutral-500">{product.shortDescription}</p>

      {/* investment facts */}
      <div className="mt-6 border rounded-xl">
        <FactRow label="Minimum deposit" value={`${product.currency} ${product.minimumAmount.toLocaleString()}`} />
        <FactRow label="ROI" value={`${product.annualRatePct}%`} />
        {product.termDays && (
          <FactRow label="Term" value={`${product.termDays} days`} />
        )}
      </div>

      <button className="mt-8 w-full py-3 rounded-full font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500">
        Apply now
      </button>
    </div>
  );
}

/* ----------------- */

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between px-4 py-3 odd:bg-neutral-50 text-sm">
      <span className="text-neutral-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
