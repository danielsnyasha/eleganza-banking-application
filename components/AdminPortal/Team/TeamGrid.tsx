'use client';

import { useEffect, useState } from 'react';
import TeamMemberCard          from './TeamMemberCard';
import type { BankingTeamDTO } from '@/types/team';
import AddTeamMemberModal      from './AddTeamMemberModal';
import { Button }              from '@/components/ui/button';

export default function TeamGrid() {
  const [team, setTeam]       = useState<BankingTeamDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen]       = useState(false);

  /* ───────── fetch all active team members ───────── */
  useEffect(() => {
    fetch('/api/admin-portal/team/members')
      .then((r) => r.json())
      .then(setTeam)
      .finally(() => setLoading(false));
  }, []);

  /* ───────── callback after successful add ───────── */
  function handleAdded(m: BankingTeamDTO) {
    setTeam((t) => [...t, m]);
  }

  /* ───────── UI ───────── */
  return (
    <div className="space-y-8">
      {/* toolbar */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Team Members</h1>
        <Button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-[#0056B6] to-[#0091FF] text-white"
        >
          + Add member
        </Button>
      </div>

      {/* grid OR zero-state */}
      {loading ? (
        <p className="text-center text-muted-foreground">Loading…</p>
      ) : team.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No active team members yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <TeamMemberCard key={m.id} m={m} />
          ))}
        </div>
      )}

      {/* modal */}
      <AddTeamMemberModal
        open={open}
        onClose={() => setOpen(false)}
        onAdded={handleAdded}
      />
    </div>
  );
}
