// app/api/crypto/history/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const coin = searchParams.get('coin') || 'bitcoin';
  const vs   = searchParams.get('vs')   || 'usd';
  const res  = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${vs}&days=7&interval=daily`
  );
  if (!res.ok) return NextResponse.json({ error: 'Fetch failed' }, { status: 502 });
  const data = await res.json();
  return NextResponse.json(data);
}
