'use client';

import { InvestmentCategory } from '@prisma/client';
import clsx from 'clsx';

const tabs: InvestmentCategory[] = [
  'FIXED_DEPOSIT',
  'MUTUAL_FUND',
  'ETF',
  'STOCK',
  'BOND',
  'REAL_ESTATE',
  'CRYPTO',
];

export default function CategoryTabs({
  value,
  onChange,
}: {
  value: InvestmentCategory | 'ALL';
  onChange: (cat: InvestmentCategory | 'ALL') => void;
}) {
  return (
    <div className="flex gap-3 flex-wrap mb-6">
      {['ALL', ...tabs].map((c) => (
        <button
          key={c}
          className={clsx(
            'rounded-full px-4 py-1 text-sm border',
            value === c
              ? 'bg-purple-600 text-white border-purple-600'
              : 'border-neutral-300 text-neutral-700'
          )}
          onClick={() => onChange(c as any)}
        >
          {c === 'ALL' ? 'All' : c.replace('_', ' ').toLowerCase()}
        </button>
      ))}
    </div>
  );
}
