/* app/api/admin-portal/investments/applications/[id]/route.ts
   PATCH → update status (pending → approved / cancelled)                  */
   import { NextRequest, NextResponse } from 'next/server';
   import { prisma } from '@/lib/prisma';
   
   export async function PATCH(
     req: NextRequest,
     { params }: { params: { id: string } },
   ) {
     const { status } = await req.json();   // expected 'approved' | 'cancelled'
     if (!['approved', 'cancelled', 'pending'].includes(status))
       return NextResponse.json({ error: 'Bad status' }, { status: 400 });
   
     const app = await prisma.investmentApplication.update({
       where: { id: params.id },
       data:  { status },
     });
     return NextResponse.json(app);
   }
   