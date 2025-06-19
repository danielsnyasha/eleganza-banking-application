'use client'

import Image             from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Label }         from '@/components/ui/label'
import { Me }            from '@/hooks/useMe'

export default function IdentityCard ({ me }: { me: Me }) {
  return (
    <Card className="bg-[#fafdff] border border-[#e6effa]">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Image
            src={me.avatarUrl || '/avatar-placeholder.png'}
            alt="avatar"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {me.firstName} {me.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">{me.email}</p>
          </div>
        </div>

        <Field label="Phone">{me.phone || '—'}</Field>
        <Field label="Address">
          {me.address1 ? `${me.address1}, ${me.city || ''}` : '—'}
        </Field>
        <Field label="Country">{me.country || '—'}</Field>
        <Field label="KYC status">{me.kycStatus}</Field>
      </CardContent>
    </Card>
  )
}

function Field (
  { label, children }: { label:string; children:React.ReactNode },
) {
  return (
    <p className="text-sm flex justify-between">
      <Label className="font-normal text-[#02152b]/70">{label}</Label>
      <span className="font-medium">{children}</span>
    </p>
  )
}
