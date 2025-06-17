import Link from 'next/link';
import { ReactNode } from 'react';

type SidebarItemProps = {
  href: string;
  icon: ReactNode;
  label: string;
  collapsed: boolean;
  className?: string;
};

export default function SidebarItem({
  href,
  icon,
  label,
  collapsed,
  className = '',
}: SidebarItemProps) {
  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer ${className}`}
      >
        {icon}
        {!collapsed && <span className="text-sm font-medium">{label}</span>}
      </div>
    </Link>
  );
}
