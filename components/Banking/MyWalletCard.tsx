// components/Banking/MyWalletCard.tsx
'use client';

import { Card }    from '@/components/ui/card';
import Image       from 'next/image';
import { useCard } from '@/hooks/useCard';
import { useUser } from '@clerk/nextjs';

export default function MyWalletCard() {
  const { data: card, isLoading, error } = useCard();
  const { user } = useUser();

  if (isLoading) return <div>Loading your wallet…</div>;
  if (error)     return <div>Error: {error.message}</div>;
  if (!card)     return <div>No card data.</div>;

  const {
    cardNumber,
    cvv,
    expiryDate,
    type,
    network,
    status,
    issuedAt,
    account,
  } = card;

  return (
    <Card className="relative flex flex-col justify-between min-h-[250px] bg-[#fafdff] rounded-2xl shadow-md overflow-hidden">
      {/* Card art */}
      <div className="flex justify-center pt-4">
        <div className="w-[180px] h-[130px] animate-[wiggle_2.5s_ease-in-out_infinite]">
          <Image
            src="/credit-cards-isolated.png"
            alt="Credit cards"
            width={800}
            height={400}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Card details */}
      <div className="px-6 pb-4 space-y-1 text-center">
        <div className="text-sm font-semibold text-[#0056B6] tracking-wide uppercase">
          {network} • {type}
        </div>

        {/* Cardholder name */}
        <div className="text-xs text-gray-600 uppercase">
          Cardholder: {user?.firstName} {user?.lastName}
        </div>

        <div className="mt-1 font-mono text-lg text-[#02152b] tracking-widest">
          {cardNumber}
        </div>

        <div className="flex justify-between text-xs text-[#008fff] mt-2 px-4">
          <span>
            Expires:{' '}
            {new Date(expiryDate).toLocaleDateString('en-US', {
              month: '2-digit',
              year: '2-digit',
            })}
          </span>
          <span>CVV: {cvv}</span>
        </div>

        <div className="mt-2 text-[11px] text-gray-400">
          Issued: {new Date(issuedAt).toLocaleDateString()}
        </div>

        {/* Linked bank account info */}
        <div className="mt-4 text-sm text-[#02152b]">
          <strong>Account No:</strong> {account.accountNumber}
          <br />
          <strong>Balance:</strong> {account.balance.toFixed(2)} {account.currency}
        </div>

        <div className="mt-1 text-xs text-gray-500">
          Status: {status}
        </div>
      </div>

      {/* Wiggle keyframes */}
      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-4deg) scale(1.03); }
          30%       { transform: rotate(2deg) scale(1.03); }
          60%       { transform: rotate(-2deg) scale(1.01); }
        }
      `}</style>
    </Card>
  );
}
