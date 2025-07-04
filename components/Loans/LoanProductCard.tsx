/* a very small read-only card for the marketplace list */
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { LoanProductDTO } from '@/types/loan';

export default function LoanProductCard({ product }: { product: LoanProductDTO }) {
  const imgSrc =
    product.images?.[0] ??
    'https://placehold.co/600x400?text=No+Image';

  return (
    <div className="rounded-xl border overflow-hidden flex flex-col bg-[#fafdff]">
      {/* hero */}
      <div className="relative h-40 w-full">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized={imgSrc.startsWith('http')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40" />
      </div>

      {/* body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3 className="font-medium text-[#02152b]">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.shortDescription ?? '—'}
        </p>

        <div className="mt-auto text-sm">
          <span className="font-medium text-[#0056B6]">
            {product.currency} {product.minAmount.toLocaleString()}
          </span>{' '}
          <span className="text-xs text-gray-500">(min)</span>
        </div>

        <Button
          asChild
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:opacity-90"
        >
          <a href={`/banking/my-banks/${product.slug}`}>View / Apply</a>
        </Button>
      </div>
    </div>
  );
}
