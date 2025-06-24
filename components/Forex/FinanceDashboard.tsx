// components/Finance/FinanceDashboard.tsx
'use client';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import MyWalletCard from '@/components/Banking/MyWalletCard';
import ForexPanel from './ForexPanel';
import CryptoPanel from './CryptoPanel';

export default function FinanceDashboard() {
  return (
    <Tabs defaultValue="wallet">
      <TabsList className="mb-4">
        <TabsTrigger value="wallet">Wallet</TabsTrigger>
        <TabsTrigger value="forex">Forex</TabsTrigger>
        <TabsTrigger value="crypto">Crypto</TabsTrigger>
      </TabsList>

      <TabsContent value="wallet">
        <MyWalletCard />
      </TabsContent>
      <TabsContent value="forex">
        <ForexPanel />
      </TabsContent>
      <TabsContent value="crypto">
        <CryptoPanel />
      </TabsContent>
    </Tabs>
  );
}
