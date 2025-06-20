'use client'

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'

import SendPanel     from './SendPanel'
import RequestPanel  from './RequestPanel'
import DepositPanel  from './DepositPanel'
import WithdrawPanel from './WithdrawPanel'
import { useTransferTab } from './useTransferTab'

export default function TransferForm() {
  const [tab, setTab] = useTransferTab()

  return (
    <Tabs value={tab} onValueChange={v => setTab(v as any)} defaultValue="send">
      <TabsList className="mb-4 w-full">
        <TabsTrigger value="send"     className="flex-1">Send</TabsTrigger>
        <TabsTrigger value="request"  className="flex-1">Request</TabsTrigger>
        <TabsTrigger value="deposit"  className="flex-1">Deposit</TabsTrigger>
        <TabsTrigger value="withdraw" className="flex-1">Withdraw</TabsTrigger>
      </TabsList>

      <TabsContent value="send">
        <SendPanel />
      </TabsContent>
      <TabsContent value="request">
        <RequestPanel />
      </TabsContent>
      <TabsContent value="deposit">
        <DepositPanel />
      </TabsContent>
      <TabsContent value="withdraw">
        <WithdrawPanel />
      </TabsContent>
    </Tabs>
  )
}
