import AdminLayout from '@/components/AdminPortal/AdminLayout';

export default function AdminGlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
