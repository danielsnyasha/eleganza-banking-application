// app/(banking)/banking/wallet/page.tsx
'use client';

import WalletPanel from "@/components/MyWallet/WalletPanel";



export default function WalletPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">My Wallet</h1>
      <WalletPanel />
    </div>
  );
}
