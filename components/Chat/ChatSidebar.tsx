// components/ChatSidebar.tsx
'use client';
import { useState } from 'react';
import Avatar from './Avatar';
import { Input } from '@/components/ui/input';

export interface UserLite {
  id:        string;  // now clerkId
  firstName: string;
  lastName:  string;
  avatar?:   string;
}

export default function ChatSidebar({
  meId,
  onSelect,
}: {
  meId:     string;
  onSelect: (u: UserLite) => void;
}) {
  const [q, setQ]       = useState('');
  const [users, setUsers] = useState<UserLite[]>([]);

  async function search(term: string) {
    setQ(term);
    if (!term.trim()) return setUsers([]);
    const res  = await fetch(`/api/chat/search?q=${encodeURIComponent(term)}`);
    const list = (await res.json()) as UserLite[];
    setUsers(list.filter(u => u.id !== meId));
  }

  return (
    <div className="w-64 flex flex-col border-r bg-white">
      <div className="p-4">
        <Input
          placeholder="Search user…"
          value={q}
          onChange={e => search(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-auto">
        {users.map(u => (
          <div
            key={u.id}
            className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(u)}
          >
            <Avatar src={u.avatar} size={36} />
            <span>{`${u.firstName} ${u.lastName}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
