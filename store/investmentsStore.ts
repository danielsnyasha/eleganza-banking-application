import { create } from 'zustand';
import { InvestmentCategory } from '@prisma/client';

type InvestmentsStore = {
  selectedCategory: InvestmentCategory | 'ALL';
  setSelectedCategory: (cat: InvestmentCategory | 'ALL') => void;
};

export const useInvestmentsStore = create<InvestmentsStore>((set) => ({
  selectedCategory: 'ALL',
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
}));
