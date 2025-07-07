'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import AvatarUploader from '@/components/User/AvatarUploader'

export function ProfileForm({
  initial,
  onSave,
  saving,
}: {
  initial: { firstName: string; lastName: string; email: string; imageUrl: string }
  onSave: (f: { firstName: string; lastName: string; email: string; imageUrl: string }) => Promise<void>
  saving: boolean
}) {
  const [form, setForm] = useState(initial)
  return (
    <form
      className="space-y-6"
      onSubmit={async e => {
        e.preventDefault()
        await onSave(form)
      }}
    >
      <AvatarUploader
        url={form.imageUrl || null}
        onChange={u => setForm({ ...form, imageUrl: u })}
      />
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="First name">
          <Input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
        </Field>
        <Field label="Last name">
          <Input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
        </Field>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Email">
          <Input value={form.email} readOnly />
        </Field>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1"><Label>{label}</Label>{children}</div>
}
