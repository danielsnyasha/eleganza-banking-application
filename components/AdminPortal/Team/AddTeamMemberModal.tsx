'use client';

import { useState } from 'react';
import {
  Dialog, DialogContent, DialogTitle,
} from '@/components/ui/dialog';
import { Input }  from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from '@/components/ui/tabs';
import { Label }   from '@/components/ui/label';
import { uploadToCloudinary } from '@/lib/cloudinary';
import type { BankingTeamDTO } from '@/types/team';
import { ImagePlus } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdded: (m: BankingTeamDTO) => void;
}

export default function AddTeamMemberModal({ open, onClose, onAdded }: Props) {
  const [loading, setLoading] = useState(false);
  const [avatarMode, setAvatarMode] = useState<'upload' | 'url'>('upload');

  const [form, setForm] = useState({
    firstName  : '',
    lastName   : '',
    email      : '',
    role       : '',
    title      : '',
    hubId      : '',
    businessId : '',
    avatarFile : null as File | null,
    avatarUrl  : '',
  });

  /* preview helper */
  const preview =
    avatarMode === 'upload' && form.avatarFile
      ? URL.createObjectURL(form.avatarFile)
      : avatarMode === 'url' && form.avatarUrl
        ? form.avatarUrl
        : '';

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm((f) =>
      name === 'avatarFile'
        ? { ...f, avatarFile: (files && files[0]) || null }
        : { ...f, [name]: value },
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    /* decide avatar URL */
    let avatar = '';
    if (avatarMode === 'upload') {
      if (form.avatarFile) avatar = await uploadToCloudinary(form.avatarFile);
    } else {
      avatar = form.avatarUrl.trim();
    }

    const res = await fetch('/api/admin-portal/team/members', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({
        ...form,
        role  : form.role.toUpperCase(),   // server expects enum-case
        avatar,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const msg = (await res.json()).error ?? 'Could not add member';
      alert(msg);
      return;
    }
    const member = (await res.json()) as BankingTeamDTO;
    onAdded(member);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogTitle className="mb-4 text-xl font-semibold">
          Add Team Member
        </DialogTitle>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* names */}
          <div className="flex gap-3">
            <Input name="firstName" placeholder="First name" required onChange={handleChange}/>
            <Input name="lastName"  placeholder="Last name"  required onChange={handleChange}/>
          </div>

          <Input name="email" type="email" placeholder="E-mail" onChange={handleChange}/>

          <div className="flex gap-3">
            <Input name="role"  placeholder="Role (e.g. MANAGER)" required onChange={handleChange}/>
            <Input name="title" placeholder="Title"              required onChange={handleChange}/>
          </div>

          <div className="flex gap-3">
            <Input name="hubId"      placeholder="Hub ID (optional)"      onChange={handleChange}/>
            <Input name="businessId" placeholder="Business ID (optional)" onChange={handleChange}/>
          </div>

          {/* avatar picker */}
          <div>
            <Label className="block mb-2 text-sm font-medium text-[#02152b]">
              Team Member Photo
            </Label>

            <Tabs value={avatarMode} onValueChange={(v)=>setAvatarMode(v as 'upload'|'url')}>
              <TabsList className="grid grid-cols-2 mb-3">
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="url">Link</TabsTrigger>
              </TabsList>

              {/* upload */}
              <TabsContent value="upload">
                <label
                  htmlFor="avatar-upload"
                  className="flex flex-col items-center justify-center cursor-pointer group
                             h-24 w-24 rounded-full bg-muted border border-dashed border-[#0091FF]
                             mx-auto transition-all hover:shadow-md"
                >
                  {preview ? (
                    <img src={preview} alt="preview" className="h-24 w-24 rounded-full object-cover"/>
                  ) : (
                    <span className="flex flex-col items-center justify-center text-muted-foreground">
                      <ImagePlus className="h-8 w-8 mb-1 text-[#0091FF] group-hover:scale-110 transition"/>
                      <span className="text-xs">Add Photo</span>
                    </span>
                  )}
                  <input
                    id="avatar-upload"
                    type="file"
                    name="avatarFile"
                    accept="image/*"
                    required={avatarMode === 'upload'}
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </TabsContent>

              {/* link */}
              <TabsContent value="url">
                <Input
                  name="avatarUrl"
                  placeholder="Paste image URL (https:// …)"
                  required={avatarMode === 'url'}
                  onChange={handleChange}
                />
                {preview && (
                  <div className="flex flex-col items-center mt-3">
                    <img src={preview} alt="preview" className="h-24 w-24 rounded-full object-cover border border-[#0091FF]"/>
                    <span className="text-xs text-muted-foreground mt-1">Preview</span>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#0056B6] to-[#0091FF] text-white">
            {loading ? 'Adding…' : 'Add Member'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
