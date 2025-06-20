/* -----------------------------------------------------------------
   Live FX helper  – caches for 60 s per pair
------------------------------------------------------------------*/
// lib/fx.ts
import NodeCache from 'node-cache';
import { FX_CACHE } from './constants';

const store = new NodeCache({ stdTTL: FX_CACHE / 1000 });

interface FrankfurterResp {
  amount: number;
  base:   string;
  date:   string;
  rates: Record<string, number>;
}

export async function convert(from: string, to: string, amt: number) {
  const key = `${from}_${to}_${amt}`;
  if (store.has(key)) {
    return store.get(key) as number;
  }

  const url = `https://api.frankfurter.app/latest?amount=${amt}&from=${from}&to=${to}`;
  console.log('[FX] convert URL:', url);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`FX fetch failed: ${res.status}`);
  }

  const json = (await res.json()) as FrankfurterResp;
  console.log('[FX] convert JSON:', json);

  const rate = json.rates[to];
  if (typeof rate !== 'number') {
    throw new Error(`FX response missing rate for ${to}`);
  }

  const converted = +rate.toFixed(2);
  store.set(key, converted);
  return converted;
}
