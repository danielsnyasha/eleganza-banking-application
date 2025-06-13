// lib/auth.ts
import { auth } from '@clerk/nextjs/server';

/** Returns the signed-in Clerk userId or throws 401 */
export async function currentUserId(): Promise<string> {
  const { userId } = await auth();      //  <-- await fixes TS2339
  if (!userId) throw new Error('Unauthenticated');
  return userId;
}
