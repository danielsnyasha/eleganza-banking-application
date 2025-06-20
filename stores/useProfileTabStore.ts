// stores/useProfileTabStore.ts
'use client';

import { create } from 'zustand';

export type SectionId = 'account' | 'personal' | 'address';

type TabState = {
  active: SectionId;
  setActive: (tab: SectionId) => void;
};

export const useProfileTabStore = create<TabState>((set) => ({
  active: 'account',
  setActive: (tab) => set({ active: tab }),
}));
