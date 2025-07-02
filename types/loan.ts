// @/types/loan.ts

import { CurrencyCode } from '@prisma/client';

/* Single product (marketplace) */
export interface LoanProductDTO {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  purpose: string | null;
  currency: CurrencyCode;
  minAmount: number;
  maxAmount: number;
  annualRatePct: number;
  termMonths: number;        //  <-- NEW
  feePct: number | null;
  images: string[];
  createdAt: Date;
}

/* One application returned by /api/loans/my-applications */
export interface ProjectionPoint {
  label: string;   // ISO date
  value: number;   // principal repaid so far
}

export interface LoanAppDTO {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'cancelled';
  submittedAt: string;
  /* applicant meta */
  name: string;
  surname: string;
  email: string;
  phone: string;
  /* projections */
  ratePct: number;
  monthPoints: ProjectionPoint[];
  yearPoints:  ProjectionPoint[];
  /* joined product */
  product: {
    name: string;
    images: string[];
    annualRatePct: number;
    termMonths: number;
  } | null;
}
