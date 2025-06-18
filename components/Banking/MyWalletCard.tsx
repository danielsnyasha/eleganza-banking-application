"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils"; // If you use classnames utility, else remove this.

export default function MyWalletCard() {
  return (
    <Card className="relative flex flex-col justify-between min-h-[210px] bg-[#fafdff] rounded-2xl border-none shadow-md overflow-hidden">
      <div className="flex flex-col items-center pt-3 pb-2">
        {/* Animated Card Images */}
        <div className="w-[175px] h-[120px] relative animate-[wiggle_2.5s_ease-in-out_infinite]">
          <Image
            src="/credit-cards-isolated.png"
            alt="Credit cards"
            width={600}
            height={400}
            className="object-contain"
            priority
          />
        </div>
      </div>
      <div className="flex flex-col items-center pb-2">
        <div className="text-[13px] font-semibold text-[#0056B6] tracking-wide uppercase">
          Eleganza Wallet
        </div>
        <div className="text-[22px] font-bold text-[#02152b] mt-1">
          $24,098.00
        </div>
        <div className="mt-2 text-xs text-[#008fff] tracking-widest font-medium">
          Cardholder Name: <span className="text-[#02152b]">Nyasha Musanhu</span>
        </div>
        <div className="text-[11px] text-gray-400 mt-1 tracking-wider">
          BankCo. VISA • Eleganza
        </div>
      </div>
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-4deg) scale(1.03); }
          30% { transform: rotate(2deg) scale(1.03);}
          60% { transform: rotate(-2deg) scale(1.01);}
        }
      `}</style>
    </Card>
  );
}
