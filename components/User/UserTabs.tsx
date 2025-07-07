'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export type UserSection = 'profile' | 'wallet' | 'cards'

const TAB_LABELS: Record<UserSection, string> = {
  profile: 'Profile',
  wallet: 'Wallet',
  cards: 'Cards',
}

export function UserTabs({
  value,
  onChange,
  className,
}: {
  value: UserSection
  onChange: (tab: UserSection) => void
  className?: string
}) {
  return (
    <nav className={cn('flex flex-col gap-2 w-44 pt-2', className)}>
      {(Object.keys(TAB_LABELS) as UserSection[]).map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            'px-4 py-2 rounded-lg text-left text-sm font-medium transition',
            value === key
              ? 'bg-[#0056B6]/10 text-[#0056B6]'
              : 'hover:bg-muted text-[#02152b]'
          )}
        >
          {TAB_LABELS[key]}
        </button>
      ))}
    </nav>
  )
}
