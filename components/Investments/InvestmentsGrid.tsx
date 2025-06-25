// /components/investments/InvestmentsGrid.tsx
'use client';

import { useInvestments } from '@/hooks/useInvestments';
import { useInvestmentsStore } from '@/store/investmentsStore';
import CategoryTabs from './CategoryTabs';
import ProductCard from './ProductCard';


export default function InvestmentsGrid() {
  const { data: products = [], isLoading, error } = useInvestments();
  const { selectedCategory, setSelectedCategory } = useInvestmentsStore();

  const filtered =
    selectedCategory === 'ALL'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load investments</div>;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <CategoryTabs value={selectedCategory} onChange={setSelectedCategory} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
