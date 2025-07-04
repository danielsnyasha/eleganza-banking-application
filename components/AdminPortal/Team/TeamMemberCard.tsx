'use client';

import Image from 'next/image';
import type { BankingTeamDTO } from '@/types/team';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/* ------------------------------------------------------------------ *
 * `firstName`, `lastName`, `email` can now come **either** directly  *
 * on the TeamMember DTO (new schema) or via the `user` relation      *
 * (older records). This component gracefully handles both.           *
 * ------------------------------------------------------------------ */
export default function TeamMemberCard({ m }: { m: BankingTeamDTO }) {
  const firstName = m.firstName ?? m.user?.firstName ?? '';
  const lastName  = m.lastName  ?? m.user?.lastName  ?? '';
  const email     = m.email     ?? m.user?.email     ?? '';

  const avatar =
    m.avatar       // explicit avatar on TeamMember
    || m.user?.imageUrl           // fallback: user profile image
    || 'https://placehold.co/400x600?text=Portrait';

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all">
      {/* hero – half-body image */}
      <div className="relative w-full h-64">
        <Image
          src={avatar}
          alt={`${firstName} ${lastName}`}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          priority
          className="object-cover"
        />
        {/* subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
      </div>

      {/* details */}
      <CardHeader className="pt-4 pb-2 text-center">
        <CardTitle className="text-xl text-[#02152b] font-semibold">
          {firstName} {lastName}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-6 text-center space-y-1">
        <p className="text-[#0056B6] font-medium">{m.title}</p>
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          {m.role}
        </p>
        <p className="text-xs text-muted-foreground">{email}</p>
      </CardContent>
    </Card>
  );
}
