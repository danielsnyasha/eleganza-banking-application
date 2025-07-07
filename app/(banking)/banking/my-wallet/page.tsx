/* app/(banking)/banking/wallet/page.tsx
   Wallet page + full-height coin animation (v 5)                     */
   'use client'

   import { motion } from 'framer-motion'
   import WalletPanel from '@/components/MyWallet/WalletPanel'
   import {
     Card,
     CardHeader,
     CardTitle,
     CardDescription,
     CardContent,
   } from '@/components/ui/card'
   
   /* ──────────────────────────────────────────────
      FloatingCoins  (absolute overlay)
   ────────────────────────────────────────────── */
   function FloatingCoins() {
     const coinsTop    = ['💵', '💳', '🪙', '💰'] as const   // descend
     const coinsBottom = ['💸', '💷', '💱', '🪙'] as const   // ascend
   
     const track = (dir: 'down' | 'up') =>
       dir === 'down'
         ? ['-120%', '0%', '120%']   // above → centre → below
         : ['120%',  '0%', '-120%']  // below → centre → above
   
     return (
       <div
         /* overlay that fills the banner */
         className="absolute inset-0 pointer-events-none flex justify-end overflow-visible"
       >
         {/* descending */}
         {coinsTop.map((c, i) => (
           <motion.span
             key={`top_${i}`}
             className="absolute text-3xl select-none"
             style={{ left: `${10 + i * 18}%`, top: 0 }}
             initial={{ y: '-120%', rotate: 0, opacity: 0 }}
             animate={{
               y: track('down'),
               rotate: [0, 360, 720],
               opacity: [0, 1, 0],
             }}
             transition={{
               delay: i * 0.35,
               duration: 7,
               repeat: Infinity,
               ease: [0.42, 0, 0.58, 1],
             }}
           >
             {c}
           </motion.span>
         ))}
   
         {/* ascending */}
         {coinsBottom.map((c, i) => (
           <motion.span
             key={`bot_${i}`}
             className="absolute text-3xl select-none"
             style={{ right: `${8 + i * 18}%`, top: 0 }}
             initial={{ y: '120%', rotate: 0, opacity: 0 }}
             animate={{
               y: track('up'),
               rotate: [0, -360, -720],
               opacity: [0, 1, 0],
             }}
             transition={{
               delay: i * 0.35 + 0.2,
               duration: 7,
               repeat: Infinity,
               ease: [0.42, 0, 0.58, 1],
             }}
           >
             {c}
           </motion.span>
         ))}
   
         {/* lightning flashes where paths cross (centre ≈ 48 %) */}
         {[...Array(4)].map((_, i) => (
           <motion.span
             key={`flash_${i}`}
             className="absolute text-yellow-300 text-2xl"
             style={{ left: `${15 + i * 22}%`, top: '48%' }}
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
             transition={{
               delay: 1.2 + i * 0.35,
               duration: 0.8,
               repeat: Infinity,
               repeatDelay: 6.1,
               ease: [0.42, 0, 0.58, 1],
             }}
           >
             ⚡
           </motion.span>
         ))}
       </div>
     )
   }
   
   /* ─────────────────────────────
      Wallet banner (card is now relative)
   ────────────────────────────── */
   function WalletBanner() {
     return (
       <motion.div
         initial={{ y: -28, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.55, ease: [0.42, 0, 0.58, 1] }}
       >
         <Card
           className="
             relative                                         /* 🔑 overlay anchor */
             border-0 overflow-hidden text-white
             bg-gradient-to-r from-[#0056B6] to-[#0091FF]
             flex flex-col md:flex-row
           "
         >
           <div className="flex-1 p-6 space-y-2">
             <CardHeader className="pb-1 px-0">
               <CardTitle className="text-2xl font-semibold tracking-tight">
                 My Wallet
               </CardTitle>
               <CardDescription className="text-white/85">
                 Multi-currency balances • Crypto • FX • Activity
               </CardDescription>
             </CardHeader>
             <CardContent className="px-0 text-sm leading-relaxed space-y-1">
               <p>
                 • <b>Fiat:</b> USD&nbsp;⇄&nbsp;ZAR&nbsp;
                 <span className="font-medium text-green-300">▲ 6 % MoM</span>
               </p>
               <p>• <b>Crypto:</b> BTC &amp; ETH holdings at a glance</p>
               <p>• <b>FX:</b> Live spreads on USD/ZAR, EUR/GBP</p>
               <p>• <b>Activity:</b> Latest 30&nbsp;transactions below</p>
             </CardContent>
           </div>
   
           {/* animated layer */}
           <FloatingCoins />
         </Card>
       </motion.div>
     )
   }
   
   /* ─────────────────────────────
      Page
   ────────────────────────────── */
   export default function WalletPage() {
     return (
       <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
         <WalletBanner />
   
         <motion.div
           initial={{ opacity: 0, scale: 0.97 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.4, delay: 0.15 }}
         >
           <WalletPanel />
         </motion.div>
       </main>
     )
   }
   