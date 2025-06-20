'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useProfileTabStore, SectionId } from '@/stores/useProfileTabStore';
import { JSX } from 'react/jsx-runtime';

const SECTIONS: { id: SectionId; title: string }[] = [
  { id: 'account',  title: 'Account details' },
  { id: 'personal', title: 'Personal info'  },
  { id: 'address',  title: 'Address'        },
];

export function useProfileTab(): readonly [SectionId, (id: SectionId) => void] {
  const active    = useProfileTabStore((s) => s.active);
  const setActive = useProfileTabStore((s) => s.setActive);
  return [active, setActive] as const;
}

export default function SideTabs(): React.JSX.Element {
  const [active, setActive] = useProfileTab();

  return (
    <aside className="space-y-2 pr-4 border-r">
      {SECTIONS.map((s) => (
        <Button
          key={s.id}
          variant={active === s.id ? 'default' : 'secondary'}
          className="w-full justify-start"
          onClick={() => setActive(s.id)}
        >
          {s.title}
        </Button>
      ))}
    </aside>
  );
}
