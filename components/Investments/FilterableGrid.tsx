'use client';

import { useState, useMemo } from 'react';
import { InvestmentCategory } from '@prisma/client';
import { InvestmentProductDTO } from '@/types/investment';

import CategoryTabs from './CategoryTabs';
import ProductCard from './ProductCard';

type Props = { initialData: InvestmentProductDTO[] };

export default function FilterableGrid({ initialData }: Props) {
  const [cat, setCat] = useState<InvestmentCategory | 'ALL'>('ALL');

  const filtered = useMemo(
    () =>
      cat === 'ALL'
        ? initialData
        : initialData.filter((p) => p.category === cat),
    [cat, initialData],
  );

  return (
    <>
      <CategoryTabs value={cat} onChange={setCat} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
