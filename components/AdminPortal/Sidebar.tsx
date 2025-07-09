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
    <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 overflow-y-auto bg-gradient-to-b from-[#fafdff] to-emerald-50 border-r border-emerald-100 shadow-[2px_0_8px_-6px_rgba(16,185,129,0.07)]">
      <div className="px-5 py-8">
        <h2 className="text-xl font-extrabold mb-8 tracking-wide text-emerald-700 select-none">
          Admin
        </h2>
        <nav className="space-y-2">
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
                  <AccordionTrigger
                    className={clsx(
                      'flex items-center gap-3 py-2 px-3 rounded-lg font-semibold transition-all',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300',
                      'hover:bg-emerald-100/60',
                      item.children.some((c) => c.href === pathname)
                        ? 'bg-emerald-100 text-emerald-700 shadow'
                        : 'text-emerald-800'
                    )}
                  >
                    <item.icon className="w-5 h-5 shrink-0 text-emerald-600" />
                    <span className="text-base">{item.label}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 pt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href!}
                        className={clsx(
                          'block py-2 px-2 text-sm rounded-md transition-colors duration-150',
                          pathname === child.href
                            ? 'bg-emerald-200/70 text-emerald-900 font-semibold shadow'
                            : 'text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900'
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
                  'flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all',
                  'hover:bg-emerald-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300',
                  pathname === item.href
                    ? 'bg-emerald-200/80 text-emerald-900 font-semibold shadow'
                    : 'text-emerald-800'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0 text-emerald-600" />
                <span className="text-base">{item.label}</span>
              </Link>
            )
          )}
        </nav>
      </div>
    </aside>
  );
}
