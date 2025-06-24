// components/Finance/WalletPanel.tsx
'use client';

import { useWallet } from '@/hooks/useWallet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent }                        from '@/components/ui/card';
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell
}                                                   from '@/components/ui/table';

export default function WalletPanel() {
  const { data, isLoading, error } = useWallet();

  if (isLoading) return <div>Loading your wallet…</div>;
  if (error)     return <div>Error: {error.message}</div>;

  const { accounts, cryptos, forexTrades, transactions } = data!;

  return (
    <Tabs defaultValue="accounts" className="space-y-6">
      <TabsList>
        <TabsTrigger value="accounts">Fiat Wallets</TabsTrigger>
        <TabsTrigger value="crypto"  >Crypto Holdings</TabsTrigger>
        <TabsTrigger value="forex"   >Forex Trades</TabsTrigger>
        <TabsTrigger value="history" >Transactions</TabsTrigger>
      </TabsList>

      {/* Fiat accounts */}
      <TabsContent value="accounts">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((a) => (
            <Card key={a.id}>
              <CardContent className="text-center">
                <div className="text-sm font-medium">{a.currency}</div>
                <div className="text-2xl font-bold">{a.balance.toFixed(2)}</div>
                <div className="text-xs text-gray-500">{a.isActive ? 'Active' : 'Inactive'}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Crypto */}
      <TabsContent value="crypto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cryptos.map((c) => (
            <Card key={c.id}>
              <CardContent className="text-center">
                <div className="text-sm font-medium">{c.symbol}</div>
                <div className="text-2xl font-bold">
                  {c.amount.toFixed(6)} {c.currency}
                </div>
                <div className="text-xs text-gray-500">{c.status}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Forex trades */}
      <TabsContent value="forex">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Pair</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Fee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forexTrades.map((f) => (
              <TableRow key={f.id}>
                <TableCell>{new Date(f.executedAt).toLocaleString()}</TableCell>
                <TableCell>{f.fromCurrency}/{f.toCurrency}</TableCell>
                <TableCell>{f.amountFrom.toFixed(2)}</TableCell>
                <TableCell>{f.amountTo.toFixed(2)}</TableCell>
                <TableCell>{f.fee.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>

      {/* Transaction history */}
      <TabsContent value="history">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{new Date(t.happenedAt).toLocaleString()}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>{t.amount.toFixed(2)}</TableCell>
                <TableCell>{t.currency}</TableCell>
                <TableCell>{t.note ?? '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}
