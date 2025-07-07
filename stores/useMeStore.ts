// stores/useMeStore.ts
'use client';

import { create } from 'zustand';

export interface BankAccount {
  number:   string;
  type:     string;
  balance:  number;
  currency: string;
  isActive: boolean;
  openedAt: string;
}

export interface Me {
  imageUrl: string;
  id:        string;
  firstName: string;
  lastName:  string;
  email:     string;
  phone?:    string | null;
  avatarUrl?: string | null;
  address1?: string | null;
  city?:     string | null;
  country?:  string | null;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  account:   BankAccount;
}

type MeState = {
  me: Me | null;
  setMe: (m: Me) => void;
};

export const useMeStore = create<MeState>((set) => ({
  me: null,
  setMe: (me) => set({ me }),
}));
