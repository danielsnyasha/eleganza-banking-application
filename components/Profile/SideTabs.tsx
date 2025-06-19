'use client'
import { Button } from '@/components/ui/button'
import { useS }   from 'use-s-react'

const SECTIONS = [
  { id:'account',    title:'Account details' },
  { id:'personal',   title:'Personal info'  },
  { id:'address',    title:'Address'        },
]

export default function SideTabs() {
  const [active, set] = useS<string>('profile-tab', 'account', true)

  return (
    <aside className="space-y-2 pr-4 border-r">
      {SECTIONS.map(s=>(
        <Button
          key={s.id}
          variant={active===s.id ? 'default' : 'secondary'}
          className="w-full justify-start"
          onClick={()=>set(s.id)}
        >{s.title}</Button>
      ))}
    </aside>
  )
}

export function useProfileTab() {
  return useS<string>('profile-tab', 'account', true)
}
