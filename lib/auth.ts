// lib/auth.ts
import { auth } from '@clerk/nextjs/server'

export async function currentUserId(): Promise<string> {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthenticated')
  }
  return userId
}
