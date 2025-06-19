/* ---------------------------------------------------------------
   POST /api/tx/request – records a request, no funds move
------------------------------------------------------------------*/
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import * as z   from 'zod';

const Body = z.object({
  email : z.string().email(),
  amount: z.number().positive(),
  note  : z.string().optional(),
});

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauth' }, { status: 401 });

  const data = Body.parse(await req.json());
  // store in “paymentRequests” collection – DIY
  // await prisma.paymentRequest.create({ data: {..., requesterId:userId} })

  return NextResponse.json({ ok: true });
}
