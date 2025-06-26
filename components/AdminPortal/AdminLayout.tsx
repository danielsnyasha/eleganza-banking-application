'use client';

import { ReactNode } from 'react';
import MobileSidebar from './MobileSidebar';
import Sidebar from './Sidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      {/* desktop sidebar */}
      <Sidebar />

      {/* page content */}
      <div className="flex-1 min-h-screen bg-white">
        {/* mobile header */}
        <header className="lg:hidden sticky top-0 z-40 flex items-center gap-2 border-b bg-[#fafdff] h-14 px-4">
          <MobileSidebar />
          <h1 className="font-semibold text-lg">Admin</h1>
        </header>

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
