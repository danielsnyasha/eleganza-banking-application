// app/(admin-portal)/admin-portal/team/page.tsx
import TeamGrid from '@/components/AdminPortal/Team/TeamGrid';

export const revalidate = 60;

export default function TeamAdminPage() {
  return (
    <div className="p-6">
      <TeamGrid />
    </div>
  );
}
