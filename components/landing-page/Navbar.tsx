'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';            // NEW

const mainLinks = [
  { name: 'Digital Banking', href: '/digital-banking' },
  { name: 'Bank accounts',    href: '/bank-accounts' },
  { name: 'Borrowing',        href: '/borrowing' },
  { name: 'Credit cards',     href: '/credit-cards' },
  { name: 'Savings',          href: '/savings' },
  { name: 'Investments',      href: '/investments' },
  { name: 'Insurance',        href: '/insurance' },
  { name: 'Sustainability',   href: '/sustainability' },
  { name: 'Help & support',   href: '/help-support' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#040b25] text-white/90 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        {/* LEFT – logo + segment switcher */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/eleganza_transparent.png" alt="Eleganza" width={28} height={28} />
            <span className="text-xl font-bold tracking-wide text-[#00a0ff]">
              ELEGANZA
            </span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 bg-transparent px-6 text-white hover:text-black hover:bg-white/40"
              >
                Personal ▾
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-32">
              <DropdownMenuItem>Personal</DropdownMenuItem>
              <DropdownMenuItem>Business</DropdownMenuItem>
              <DropdownMenuItem>Private</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* RIGHT – actions */}
        <div className="hidden items-center gap-6 lg:flex">
          {/* Contact us dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 text-[#00a0ff]">
                <PhoneIcon className="h-4 w-4" />
                <span>Contact&nbsp;us</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact us</DialogTitle>
                <DialogDescription>
                  Call us on <strong>0800&nbsp;123&nbsp;456</strong> or email{' '}
                  <strong>support@eleganza.bank</strong>.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* Find us dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 text-[#00a0ff]">
                <MapPinIcon className="h-4 w-4" />
                <span>Find&nbsp;us</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Branch &amp; ATM locator</DialogTitle>
                <DialogDescription>
                  Enter your postcode on our locator page to see nearby branches and ATMs.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* Search dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 text-[#00a0ff]">
                <SearchIcon className="h-4 w-4" />
                <span>Search</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Search Eleganza</DialogTitle>
              </DialogHeader>
              <input
                type="text"
                placeholder="What can we help you find?"
                className="w-full rounded-md border px-3 py-2 text-sm text-black"
                autoFocus
              />
            </DialogContent>
          </Dialog>

          {/* Clerk sign-in / sign-out */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="sm" className="bg-[#1e90ff] hover:bg-[#3aa5ff]">
                Log&nbsp;in
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <SignOutButton>
              <Button
                size="sm"
                variant="outline"
                className="border-white/30 bg-transparent px-6 text-white hover:text-black hover:bg-white/40"
              >
                Sign&nbsp;out
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>

      {/* SECOND ROW – main links */}
      <div className="hidden border-t border-white/10 lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-8 overflow-x-auto px-4 py-2 text-sm font-semibold">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap transition-colors hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* --- simple heroicons (inline for brevity) --- */
function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M2 3h3l2 5-3 3a16 16 0 007 7l3-3 5 2v3c0 1-1 2-2 2A19 19 0 013 5a2 2 0 012-2z" />
    </svg>
  );
}
function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 11a3 3 0 100-6 3 3 0 000 6z" />
      <path d="M12 22S4 15 4 9a8 8 0 1116 0c0 6-8 13-8 13z" />
    </svg>
  );
}
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}
