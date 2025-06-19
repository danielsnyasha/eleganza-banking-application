/* -----------------------------------------------------------------
   Live FX helper  – caches for 60 s per pair
------------------------------------------------------------------*/
import NodeCache from 'node-cache';
import { FX_CACHE } from './constants';

const store = new NodeCache({ stdTTL: FX_CACHE / 1000 });

type FxResp = { result: number };

export async function convert(
  from: string,
  to:   string,
  amt:  number
): Promise<number> {
  if (from === to) return amt;

  const key = `${from}-${to}`;
  let rate  = store.get<number>(key);

  if (!rate) {
    const url  = `https://api.exchangerate.host/convert?from=${from}&to=${to}`;
    const json = (await fetch(url).then(r => r.json())) as FxResp & { info:{rate:number}};
    rate = json.info.rate;
    store.set(key, rate);
  }
  return +(amt * rate).toFixed(2);
}
