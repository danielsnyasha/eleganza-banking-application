'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { uploadToCloudinary } from '@/lib/cloudinary'

export default function AvatarUploader({
  url,
  onChange,
  disabled,
}: {
  url: string | null
  onChange: (url: string) => void
  disabled?: boolean
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    setBusy(true)
    try {
      const uploadedUrl = await uploadToCloudinary(e.target.files[0])
      onChange(uploadedUrl)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex items-center gap-5">
      <div className="w-20 h-20 rounded-full overflow-hidden border border-[#e0e8f4] bg-muted">
        <img
          src={url && url.trim() !== '' ? url : '/avatar-placeholder.png'}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || busy}
        >
          {busy ? 'Uploading…' : 'Change photo'}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
          disabled={disabled || busy}
        />
      </div>
    </div>
  )
}
