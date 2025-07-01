// @/types/loan.ts

import { CurrencyCode } from "@prisma/client";

export interface LoanProductDTO {
    id: string;
    slug: string;
    name: string;
    shortDescription: string | null; // <- Allow null here
    purpose: string | null;          // <- Allow null here
    currency: CurrencyCode;
    minAmount: number;
    maxAmount: number;
    annualRatePct: number;
    termMonths: number;
    feePct: number | null;          // also nullable
    images: string[];
    createdAt: Date;
  }
  