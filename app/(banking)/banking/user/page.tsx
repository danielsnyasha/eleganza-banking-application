/* prettier-ignore */
'use client'

import { useMe, useSaveMe } from '@/hooks/useMe'
import SideTabs, { useProfileTab } from '@/components/Profile/SideTabs'
import AccountCard   from '@/components/Profile/AccountCard'
import AvatarUploader from '@/components/Profile/AvatarUploader'
import { Input }  from '@/components/ui/input'
import { Label }  from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function SettingsPage() {
  const { data:me, isLoading } = useMe()
  const saveMut = useSaveMe()
  const [tab] = useProfileTab()

  /* editable state for personal tab */
  const [form,set] = useState({ firstName:'', lastName:'', avatarUrl:'' })
  if (me && !form.firstName && !isLoading) {
    set({ firstName:me.firstName, lastName:me.lastName,
          avatarUrl:me.avatarUrl ?? '' })
  }

  async function save() {
    await saveMut.mutateAsync(form)
    toast.success('Profile saved')
  }

  if (isLoading) return <p className="p-6">Loading…</p>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex gap-6">
      <SideTabs/>

      <div className="flex-1 space-y-6">
        {tab==='account'  && <AccountCard me={me!}/>}

        {tab==='personal' && (
          <Card className="bg-[#fafdff] border border-[#e6effa]">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-lg font-semibold">Personal information</h3>
              <AvatarUploader
                url={form.avatarUrl||null}
                onChange={u=>set({ ...form, avatarUrl:u })}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="First name">
                  <Input value={form.firstName}
                         onChange={e=>set({ ...form, firstName:e.target.value })}/>
                </Field>
                <Field label="Last name">
                  <Input value={form.lastName}
                         onChange={e=>set({ ...form, lastName:e.target.value })}/>
                </Field>
              </div>
              <div className="flex justify-end">
                <Button onClick={save} disabled={saveMut.isPending}>
                  {saveMut.isPending ? 'Saving…' : 'Save'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* you can add address/other tabs later */}
      </div>
    </div>
  )
}

function Field({ label, children }:{
  label:string; children:React.ReactNode
}) {
  return <div className="space-y-1"><Label>{label}</Label>{children}</div>
}
