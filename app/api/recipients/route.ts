/* ------------------------------------------------------------------
   Eleganza • Beneficiaries API                    /api/recipients
   ------------------------------------------------------------------ */

   export const runtime = 'nodejs';

   import { NextRequest, NextResponse } from 'next/server';
   import { prisma }                     from '@/lib/prisma';
   import { auth }                       from '@clerk/nextjs/server';
   import * as z                         from 'zod';
   
   /* --------------------------------------------------- Auth helper */
   async function currentMongoUserId(): Promise<string | null> {
     const { userId: clerkId } = await auth();          // Clerk session
     if (!clerkId) return null;
   
     const user = await prisma.user.findUnique({
       where: { clerkId },
       select: { id: true },
     });
     return user?.id ?? null;
   }
   
   /* ------------------------------------------------- Input schemas */
   const BankFields = z.object({
     bankName : z.string().min(3),
     swiftCode: z.string().min(4).optional(),
     country  : z.string().min(2),
   });
   
   const BeneFields = z.object({
     alias        : z.string().min(2),
     accountName  : z.string().min(2),
     accountNumber: z.string().min(3),
     currency     : z.enum([
       'USD','EUR','GBP','ZAR','ZWL','CAD','AUD','CHF','CNY','JPY',
       'NGN','GHS','INR','KES','BTC','ETH',
     ]),
   });
   
   const BeneficiaryInput       = BeneFields.merge(BankFields);
   const BeneficiaryUpdateInput = BeneFields.partial().merge(BankFields.partial());
   
   /* --------------------------------------------------------- ROUTES */
   /* ----------------------- LIST ----------------------------------- */
   export async function GET() {
     const userId = await currentMongoUserId();
     if (!userId) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
   
     const list = await prisma.beneficiary.findMany({
       where   : { userId },
       include : { externalBank: true },
       orderBy : { createdAt: 'desc' },
     });
     return NextResponse.json(list);
   }
   
   /* -------------------- CREATE -------------------- */
   export async function POST(req: NextRequest) {
     const userId = await currentMongoUserId();
     if (!userId) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
   
     const body = await req.json();
     const data = BeneficiaryInput.parse(body);
   
     /* 1️⃣  ensure / create bank (Mongo: no composite unique lookup) */
     const bank =
       (await prisma.externalBank.findFirst({
         where: {
           bankName : data.bankName,
           country  : data.country,
           swiftCode: data.swiftCode ?? '',
         },
       })) ??
       (await prisma.externalBank.create({
         data: {
           bankName : data.bankName,
           country  : data.country,
           swiftCode: data.swiftCode ?? '',
         },
       }));
   
     /* 2️⃣  create beneficiary */
     const bene = await prisma.beneficiary.create({
       data: {
         alias         : data.alias,
         accountName   : data.accountName,
         accountNumber : data.accountNumber,
         currency      : data.currency,
         userId,
         externalBankId: bank.id,
       },
       include: { externalBank: true },
     });
   
     return NextResponse.json(bene, { status: 201 });
   }
   
   /* -------------------- UPDATE -------------------- */
   export async function PATCH(req: NextRequest) {
     const userId = await currentMongoUserId();
     if (!userId) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
   
     const id = req.nextUrl.searchParams.get('id');
     if (!id) return NextResponse.json({ error: 'Missing id param' }, { status: 400 });
   
     const body = await req.json();
     const data = BeneficiaryUpdateInput.parse(body);
   
     let bankId: string | undefined;
     if (data.bankName || data.country || data.swiftCode) {
       const bank =
         (await prisma.externalBank.findFirst({
           where: {
             bankName : data.bankName ?? '',
             country  : data.country ?? '',
             swiftCode: data.swiftCode ?? '',
           },
         })) ??
         (await prisma.externalBank.create({
           data: {
             bankName : data.bankName ?? '',
             country  : data.country ?? '',
             swiftCode: data.swiftCode ?? '',
           },
         }));
       bankId = bank.id;
     }
   
     const bene = await prisma.beneficiary.update({
       where: { id, userId },
       data : {
         ...(data.alias         && { alias: data.alias }),
         ...(data.accountName   && { accountName: data.accountName }),
         ...(data.accountNumber && { accountNumber: data.accountNumber }),
         ...(data.currency      && { currency: data.currency }),
         ...(bankId             && { externalBankId: bankId }),
       },
       include: { externalBank: true },
     });
   
     return NextResponse.json(bene);
   }
   
   /* -------------------- DELETE -------------------- */
   export async function DELETE(req: NextRequest) {
    const userId = await currentMongoUserId();
    if (!userId)
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  
    const id = req.nextUrl.searchParams.get('id');
    if (!id)
      return NextResponse.json({ error: 'Missing id param' }, { status: 400 });
  
    // ensure it belongs to caller
    const owner = await prisma.beneficiary.findUnique({
      where : { id },
      select: { userId: true },
    });
    if (!owner || owner.userId !== userId)
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
  
    await prisma.beneficiary.delete({ where: { id } });
    return NextResponse.json({ ok: true }, { status: 200 }); // <--- fixed!
  }
  
   