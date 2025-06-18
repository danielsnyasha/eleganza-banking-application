'use client';

import {
  Tabs,           TabsList,       TabsTrigger,      TabsContent,
} from '@/components/ui/tabs';
import {
  Card,           CardContent,
} from '@/components/ui/card';
import {
  Label,
} from '@/components/ui/label';
import {
  Input,
} from '@/components/ui/input';
import {
  Select,         SelectTrigger,  SelectValue,
  SelectContent,  SelectItem,
} from '@/components/ui/select';
import { Button }  from '@/components/ui/button';

import CountryFlag         from 'react-country-flag';
import { useState }        from 'react';
import RecipientSelect     from './RecipientSelect';
import ConfirmPinDialog    from './ConfirmPinDialog';
import { useFxFee }        from './hooks';

const ccyList = [
  { code: 'USD', country: 'US' },
  { code: 'EUR', country: 'DE' },
  { code: 'GBP', country: 'GB' },
  { code: 'ZAR', country: 'ZA' },
  { code: 'AUD', country: 'AU' },
];

export default function TransferForm() {
  const [tab, setTab]       = useState<'send'|'receive'|'deposit'|'withdraw'>('send');
  const [amount, setAmount] = useState('1000');
  const [from, setFrom]     = useState('USD');
  const [to,   setTo]       = useState('AUD');

  const { feeUSD, rate }    = useFxFee(from, to, Number(amount));
  const totalGets           = Number(amount) * rate - feeUSD;

  return (
    <Tabs value={tab} onValueChange={v => setTab(v as any)} defaultValue="send">
      <TabsList className="mb-4">
        <TabsTrigger value="send">Send</TabsTrigger>
        <TabsTrigger value="receive">Receive</TabsTrigger>
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
      </TabsList>

      {/* SEND ------------------------------------------------------------- */}
      <TabsContent value="send">
        <Card className="bg-[#fafdff] border border-[#e6effa] rounded-2xl">
          <CardContent className="p-6 space-y-6">

            <h2 className="text-xl font-semibold text-center">Send Money</h2>

            {/* You send */}
            <div className="space-y-2">
              <Label>You send</Label>
              <div className="grid grid-cols-[90px_1fr_200px] gap-2">
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ccyList.map(c => (
                      <SelectItem key={c.code} value={c.code}>
                        <CountryFlag svg countryCode={c.country} style={{ width: 18 }} /> {c.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input value={amount} onChange={e=>setAmount(e.target.value.replace(/[^\d.]/g,''))}/>
                <RecipientSelect />
              </div>
            </div>

            {/* Recipient gets */}
            <div className="space-y-2">
              <Label>Recipient gets</Label>
              <div className="grid grid-cols-[1fr_120px] gap-2">
                <Input disabled value={totalGets.toFixed(2)} />
                <Select value={to} onValueChange={setTo}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ccyList.filter(c=>c.code!==from).map(c=>(
                      <SelectItem key={c.code} value={c.code}>
                        <CountryFlag svg countryCode={c.country} style={{ width: 18 }} /> {c.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Summary */}
            <p className="text-sm text-[#02152b]/70">
              Total fees:&nbsp;<span className="font-medium text-[#e53935]">{feeUSD.toFixed(2)} USD</span><br/>
              Rate: 1 {from} = {rate.toFixed(5)} {to}
            </p>

            <ConfirmPinDialog>
              <Button className="w-full bg-[#21c87a] hover:bg-[#1eb26c]">Continue</Button>
            </ConfirmPinDialog>
          </CardContent>
        </Card>
      </TabsContent>

      {/* stubs for other tabs */}
      <TabsContent value="receive"><p>Receive — coming soon.</p></TabsContent>
      <TabsContent value="deposit"><p>Deposit — coming soon.</p></TabsContent>
      <TabsContent value="withdraw"><p>Withdraw — coming soon.</p></TabsContent>
    </Tabs>
  );
}
