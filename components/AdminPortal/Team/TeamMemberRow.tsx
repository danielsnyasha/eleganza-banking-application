import Image from 'next/image';
import type { BankingTeamDTO } from '@/types/team';
import { Badge } from '@/components/ui/badge';

export default function TeamMemberRow({ m }: { m: BankingTeamDTO }) {
  const avatar = m.avatar || m.user.imageUrl || '/placeholder.jpg';
  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg bg-white">
      <Image src={avatar} alt={m.user.firstName} width={48} height={48} className="rounded-full object-cover"/>
      <div className="flex-1">
        <p className="font-medium">
          {m.user.firstName} {m.user.lastName}
        </p>
        <p className="text-xs text-muted-foreground">{m.title}</p>
      </div>
      <Badge>{m.role}</Badge>
    </div>
  );
}
