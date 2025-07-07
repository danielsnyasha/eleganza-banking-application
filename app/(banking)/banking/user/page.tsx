/* app/(banking)/banking/user/page.tsx
   User profile / wallet dashboard – now with banner                    */
   'use client'

   import { useState } from 'react'
   import { toast } from 'react-toastify'
   import { useQueryClient } from '@tanstack/react-query'
   import { motion } from 'framer-motion'
   
   /* hooks & components (unchanged) */
   import { useMe, useSaveMe }      from '@/hooks/useMe'
   import { useWallet }             from '@/hooks/useWallet'
   import { useCard }               from '@/hooks/useCard'
   import { UserTabs, UserSection } from '@/components/User/UserTabs'
   import { ProfileForm }           from '@/components/User/ProfileForm'
   import { DetailCard }            from '@/components/User/DetailCard'
   import { Skeleton }              from '@/components/ui/skeleton'
   import {
     Card,
     CardHeader,
     CardTitle,
     CardDescription,
     CardContent,
   } from '@/components/ui/card'
   
   /* ───────────────────────── banner ───────────────────────── */
   function UserBanner() {
     return (
       <motion.div
         initial={{ y: -24, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.55, ease: [0.42, 0, 0.58, 1] }}
       >
         <Card
           className="
             border-0 text-white overflow-hidden
             bg-gradient-to-r from-[#0056B6] to-[#0091FF]
           "
         >
           <CardHeader className="pb-0">
             <CardTitle className="text-2xl md:text-3xl font-semibold tracking-tight">
               My&nbsp;Profile&nbsp;&amp;&nbsp;Wallet
             </CardTitle>
             <CardDescription className="text-white/85">
               Manage your personal information, multi-currency balances, cards&nbsp;and&nbsp;more.
             </CardDescription>
           </CardHeader>
   
           <CardContent className="pt-4 text-sm md:text-base leading-relaxed space-y-1">
             <p>• <b>Profile:</b> Update name&nbsp;and&nbsp;photo instantly</p>
             <p>• <b>Wallet:</b> View bank, crypto &amp; FX positions in one place</p>
             <p>• <b>Cards:</b> Keep track of every Eleganza debit / credit card</p>
           </CardContent>
         </Card>
       </motion.div>
     )
   }
   
   /* ───────────────────────── page ───────────────────────── */
   export default function UserPage() {
     const [tab, setTab] = useState<UserSection>('profile')
   
     const { data: me,     isLoading: meLoading     } = useMe()
     const { data: wallet, isLoading: walletLoading } = useWallet()
     const { data: card,   isLoading: cardLoading   } = useCard()
     const saveMut      = useSaveMe()
     const queryClient  = useQueryClient()
   
     /* loading / not-found state */
     if (meLoading)
       return (
         <div className="p-6">
           <Skeleton className="h-5 w-56" />
           <Skeleton className="h-32 w-full" />
         </div>
       )
     if (!me)
       return <div className="p-6 text-destructive">User not found.</div>
   
     /* main */
     return (
       <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
         {/* banner */}
         <UserBanner />
   
         <div className="flex gap-6">
           {/* side tabs (unchanged) */}
           <UserTabs value={tab} onChange={setTab} />
   
           {/* main panel */}
           <div className="flex-1 space-y-6">
   
             {/* ─ Profile Tab ─ */}
             {tab === 'profile' && (
               <Card>
                 <CardHeader>
                   <CardTitle>Personal information</CardTitle>
                   <CardDescription>View and update your basic details</CardDescription>
                 </CardHeader>
                 <CardContent>
                   <ProfileForm
                     initial={{
                       firstName: me.firstName ?? '',
                       lastName : me.lastName  ?? '',
                       imageUrl : me.imageUrl  ?? '',
                       email    : me.email     ?? '',
                     }}
                     onSave={async (f) => {
                       await saveMut.mutateAsync(f)
                       toast.success('Profile updated')
                       queryClient.invalidateQueries({ queryKey: ['me'] }) // refetch
                     }}
                     saving={saveMut.isPending}
                   />
                 </CardContent>
               </Card>
             )}
   
             {/* ─ Wallet Tab ─ */}
             {tab === 'wallet' && (
               <Card>
                 <CardHeader>
                   <CardTitle>Wallet Overview</CardTitle>
                   <CardDescription>All accounts, cryptos, FX, transactions</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   {walletLoading ? (
                     <Skeleton className="h-20 w-full" />
                   ) : wallet ? (
                     <>
                       {/* bank accounts */}
                       <h4 className="pt-2 pb-1 font-semibold text-sm text-[#02152b]/80">
                         Bank accounts
                       </h4>
                       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                         {wallet.accounts.map((a) => (
                           <DetailCard
                             key={a.id}
                             title={`Acct • ${a.currency}`}
                             value={a.balance.toLocaleString(undefined, {
                               style: 'currency',
                               currency: a.currency,
                             })}
                             note={a.isActive ? 'Active' : 'Closed'}
                           />
                         ))}
                       </div>
   
                       {/* crypto */}
                       <h4 className="pt-2 pb-1 font-semibold text-sm text-[#02152b]/80">
                         Crypto holdings
                       </h4>
                       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                         {wallet.cryptos.map((c) => (
                           <DetailCard
                             key={c.id}
                             title={`Ξ ${c.symbol}`}
                             value={`${c.amount.toFixed(4)} ${c.symbol}`}
                             note={c.status}
                           />
                         ))}
                       </div>
   
                       {/* fx trades */}
                       <h4 className="pt-2 pb-1 font-semibold text-sm text-[#02152b]/80">
                         Latest FX trades
                       </h4>
                       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                         {wallet.forexTrades.slice(0, 6).map((fx) => (
                           <DetailCard
                             key={fx.id}
                             title={`${fx.fromCurrency}/${fx.toCurrency}`}
                             value={`${fx.amountFrom.toLocaleString()} ➜ ${fx.amountTo.toLocaleString()}`}
                             note={`@ ${fx.rate.toFixed(4)}`}
                           />
                         ))}
                       </div>
                     </>
                   ) : (
                     <div>No wallet info.</div>
                   )}
                 </CardContent>
               </Card>
             )}
   
             {/* ─ Cards Tab ─ */}
             {tab === 'cards' && (
               <Card>
                 <CardHeader>
                   <CardTitle>Cards</CardTitle>
                   <CardDescription>Your issued debit/credit cards</CardDescription>
                 </CardHeader>
                 <CardContent>
                   {cardLoading ? (
                     <Skeleton className="h-32 w-full" />
                   ) : card ? (
                     <DetailCard
                       title={`${card.network} ••${card.cardNumber.slice(-4)}`}
                       value={`Expires ${new Date(card.expiryDate).toLocaleDateString(
                         undefined,
                         { month: 'short', year: '2-digit' },
                       )}`}
                       note={card.status}
                     >
                       <div className="text-xs text-muted-foreground mt-1">
                         Balance:&nbsp;
                         {card.account.balance.toLocaleString(undefined, {
                           style: 'currency',
                           currency: card.account.currency,
                         })}
                       </div>
                     </DetailCard>
                   ) : (
                     <div>No cards found.</div>
                   )}
                 </CardContent>
               </Card>
             )}
           </div>
         </div>
       </main>
     )
   }
   