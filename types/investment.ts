import { InvestmentCategory, CurrencyCode } from '@prisma/client';

export interface InvestmentProductDTO {
  maxValue: any;
  id: string;
  slug: string;
  name: string;
  shortDescription?: string | null;
  category: InvestmentCategory;
  currency: CurrencyCode;
  minimumAmount: number;
  annualRatePct: number;
  termDays?: number | null;
  images: string[];
  createdAt: string;
}
