import { useQuery } from '@tanstack/react-query';
import { InvestmentProductDTO } from '@/types/investment';

// API fetcher (relative path only)
async function fetchInvestmentProducts(): Promise<InvestmentProductDTO[]> {
  const res = await fetch('/api/investment-products', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch investments');
  return res.json();
}

async function fetchInvestmentProduct(slug: string): Promise<InvestmentProductDTO> {
  const res = await fetch(`/api/investment-products/${slug}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

// List all investments
export function useInvestments() {
  return useQuery<InvestmentProductDTO[]>({
    queryKey: ['investments'],
    queryFn: fetchInvestmentProducts,
    staleTime: 60 * 1000, // 1 minute, tune as needed
  });
}

// Get single investment
export function useInvestment(slug: string) {
  return useQuery<InvestmentProductDTO>({
    queryKey: ['investment', slug],
    queryFn: () => fetchInvestmentProduct(slug),
    enabled: !!slug,
    staleTime: 60 * 1000,
  });
}
