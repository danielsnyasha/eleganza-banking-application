// components/Transfer/useTransferTab.ts
'use client'

import { useS } from 'use-s-react'
import { useState, useEffect } from 'react'

type TabId = 'send' | 'request' | 'deposit' | 'withdraw'

export function useTransferTab(): [TabId, (tab: TabId) => void] {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const [tab, setTab] = useS<TabId>('transfer-tab', 'send', true)
  // Always return a tuple with correct types
  if (!mounted) return ['send', () => {}]
  return [tab, setTab]
}
