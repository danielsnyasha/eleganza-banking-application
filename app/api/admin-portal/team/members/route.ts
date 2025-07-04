/* app/api/admin-portal/team/members/route.ts
   – GET / POST for team roster                                      */
   import { NextRequest, NextResponse } from 'next/server';
   import { prisma } from '@/lib/prisma';
   import { TeamRole } from '@prisma/client';
   
   /* helper – 24-char hex string? ------------------------------------ */
   const isHex24 = (v?: string) => /^[0-9a-f]{24}$/i.test(v ?? '');
   
   /* ───────── GET ───────── */
   export async function GET() {
     const team = await prisma.teamMember.findMany({
       where  : { isActive: true },
       orderBy: { joinedAt: 'asc' },
       select : {
         id: true, role: true, title: true, joinedAt: true, avatar: true,
         firstName: true, lastName: true, email: true,
       },
     });
   
     return NextResponse.json(team, { status: 200 });
   }
   
   /* ───────── POST ───────── */
   export async function POST(req: NextRequest) {
     const {
       firstName, lastName, email,
       role, title, hubId, businessId, avatar,
     } = await req.json();
   
     if (!firstName || !lastName || !role || !title || !avatar) {
       return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
     }
   
     const roleEnum = role.toUpperCase() as keyof typeof TeamRole;
     if (!(roleEnum in TeamRole)) {
       return NextResponse.json({ error: 'Invalid role.' }, { status: 400 });
     }
   
     try {
       const member = await prisma.teamMember.create({
         data: {
           firstName,
           lastName,
           email,
           role      : TeamRole[roleEnum],
           title,
           avatar,
           hubId     : isHex24(hubId) ? hubId : undefined,
           businessId: isHex24(businessId) ? businessId : undefined,
           isActive  : true,
         },
         select: {
           id: true, role: true, title: true, joinedAt: true, avatar: true,
           firstName: true, lastName: true, email: true,
         },
       });
   
       return NextResponse.json(member, { status: 201 });
     } catch (err: any) {
       return NextResponse.json({ error: err.message }, { status: 500 });
     }
   }
   