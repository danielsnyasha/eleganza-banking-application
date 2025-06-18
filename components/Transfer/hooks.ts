'use client';

import useSWR from 'swr';

const fetcher = (u:string)=>fetch(u).then(r=>r.json());

/* Live top-12 rates (base USD) – refresh every 60 s */
export function useLiveRates() {
  return useSWR('/api/fx/top12', fetcher, { refreshInterval: 60_000 });
}

/* Fee + rate demo calc --------------------------------------------------- */
export function useFxFee(from:string, to:string, amt:number) {
  // Replace with real API later
  const rate = from===to ? 1 : (Math.random()*0.3 + 0.7);
  const fee  = amt*0.007 + 2;
  return { rate, feeUSD: fee };
}
