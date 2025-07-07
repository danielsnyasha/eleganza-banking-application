'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { uploadToCloudinary } from '@/lib/cloudinary';

export default function AvatarUploader({
  url,
  onChange,
  disabled,
}: {
  url: string | null;
  onChange: (url: string) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const uploaded = await uploadToCloudinary(file);
      onChange(uploaded);
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  }

  /** If `url` is falsy we render a placeholder — we **never**
      pass an empty string to <Image src>. */
  const safeSrc = url || '/avatar-placeholder.png';

  return (
    <div className="flex items-center gap-5">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#e0e8f4] bg-muted">
        <Image
          src={safeSrc}
          alt="Profile avatar"
          fill
          sizes="80px"
          className="object-cover"
          priority
        />
      </div>

      <div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || busy}
        >
          {busy ? 'Uploading…' : 'Change Photo'}
        </Button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleSelect}
          disabled={disabled || busy}
        />
      </div>
    </div>
  );
}
