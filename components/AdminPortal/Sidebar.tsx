'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { navItems } from './nav';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-64 shrink-0 border-r bg-[#fafdff] h-screen sticky top-0 overflow-y-auto">
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold mb-6">Admin</h2>

        <nav className="space-y-1">
          {navItems.map((item) =>
            item.children ? (
              <Accordion
                key={item.label}
                type="single"
                collapsible
                className="w-full"
                defaultValue={
                  item.children.some((c) => c.href === pathname)
                    ? item.label
                    : undefined
                }
              >
                <AccordionItem value={item.label} className="border-b-0">
                  <AccordionTrigger className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-[#e8f4ff]">
                    <item.icon className="w-5 h-5 shrink-0 text-[#0056B6]" />
                    <span className="text-sm">{item.label}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href!}
                        className={clsx(
                          'block py-1.5 text-sm rounded-md',
                          pathname === child.href
                            ? 'text-[#0056B6] font-medium'
                            : 'text-neutral-600 hover:text-[#0056B6]'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={clsx(
                  'flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-[#e8f4ff]',
                  pathname === item.href
                    ? 'bg-[#e8f4ff] text-[#0056B6]'
                    : 'text-neutral-700'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0 text-[#0056B6]" />
                <span className="text-sm">{item.label}</span>
              </Link>
            )
          )}
        </nav>
      </div>
    </aside>
  );
}
