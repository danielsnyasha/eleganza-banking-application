// pages/api/auth/send-verification.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { randomBytes } from 'crypto';
import { prisma } from '@/lib/prisma';
import { currentUserId } from '@/lib/auth';
import { VerificationTokenType } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { identifier } = req.body;
    if (typeof identifier !== 'string' || !identifier.trim()) {
      return res.status(400).json({ error: 'Missing or invalid identifier' });
    }

    // Ensure we have the authenticated user's ID
    const userId = await currentUserId();

    // Generate a one-time token (hex-encoded, 40 chars)
    const token = randomBytes(20).toString('hex');
    // Expires in 1 hour
    const expires = new Date(Date.now() + 1000 * 60 * 60);

    await prisma.verificationToken.create({
      data: {
        identifier,
        token,
        type: VerificationTokenType.EMAIL,
        expires,
        // Connect this token to the current user
        user: { connect: { id: userId } },
      },
    });

    // TODO: dispatch email or SMS with the token here

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('send-verification error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
