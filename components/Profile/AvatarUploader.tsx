'use client'
import { useRef } from 'react'
import Image    from 'next/image'
import { Button } from '@/components/ui/button'

export default function AvatarUploader({
  url, onChange,
}:{ url:string|null, onChange:(u:string)=>void }) {
  const fileRef = useRef<HTMLInputElement>(null)

  async function pick() { fileRef.current?.click() }
  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const local = URL.createObjectURL(f)
    onChange(local)          // in real app you’d upload then set returned URL
  }

  return (
    <>
      <div className="relative h-24 w-24 rounded-full overflow-hidden">
        <Image src={url ?? '/avatar-placeholder.png'} fill alt="avatar" className="object-cover"/>
        <Button
          size="icon" variant="secondary"
          className="absolute bottom-1 right-1 h-7 w-7"
          onClick={pick}
        >✎</Button>
      </div>
      <input ref={fileRef} hidden type="file" accept="image/*" onChange={onFile}/>
    </>
  )
}
