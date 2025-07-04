import { NextResponse } from 'next/server';
import { prisma }       from '@/lib/prisma';

export async function GET() {
  const team = await prisma.teamMember.findMany({
    where  : { isActive: true },
    orderBy: { joinedAt: 'asc' },
    select : {
      id:true, title:true, role:true, avatar:true, joinedAt:true,
      user: { select: { firstName:true, lastName:true } },
    },
  });
  return NextResponse.json(team);
}
