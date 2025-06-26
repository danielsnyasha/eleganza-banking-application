import Link from 'next/link';
import Image from 'next/image';
import { InvestmentProductDTO } from '@/types/investment';
import { gradient, isNew } from './utils';

export default function ProductCard({ product }: { product: InvestmentProductDTO }) {
  const { images, slug } = product;
  return (
    <div className="rounded-xl border shadow-sm overflow-hidden flex flex-col">
      {/* cover */}
      <div className={`${gradient} h-40 flex items-center justify-center relative`}>
        {images[0] && (
          <Image
            src={images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        )}
        {isNew(product.createdAt) && (
          <span className="absolute top-2 right-2 bg-white/90 text-xs px-2 py-0.5 rounded-full">
            NEW
          </span>
        )}
      </div>

      {/* body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-neutral-900">{product.name}</h3>
          <p className="text-sm text-neutral-500 capitalize">
            {product.category.replace('_', ' ').toLowerCase()}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-y-1 text-xs text-neutral-600">
            <span>Opening deposit</span>
            <span className="text-right">
              {product.currency} {product.minimumAmount.toLocaleString()}
            </span>
            <span>ROI</span>
            <span className="text-right">{product.annualRatePct}%</span>
          </div>
        </div>

        {/* action */}
        <Link
          href={`/banking/investments/${slug}`}
          className="mt-4 inline-block rounded-full w-full py-2 text-center text-white font-medium bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
