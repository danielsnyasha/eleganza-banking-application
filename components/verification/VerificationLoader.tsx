'use client';

import { useEffect, useState } from 'react';
import { Loader2, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VerificationLoaderProps {
  seconds?: number;
  status: 'pending' | 'success' | 'fail' | 'done';
  onFinish?: () => void;
}

const scanColors = [
  'from-[#00c3ff] to-[#0056b6]',
  'from-[#0056b6] to-[#00c3ff]',
  'from-[#4f8cff] to-[#00eaff]',
  'from-[#00eaff] to-[#4f8cff]',
];

export default function VerificationLoader({
  seconds = 7,
  status,
  onFinish,
}: VerificationLoaderProps) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (status !== 'pending') return;
    if (count === 0) {
      onFinish?.();
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, status, onFinish]);

  // Nice glow scan effect
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] w-full relative z-10">
      {/* Animated border ring */}
      {status === 'pending' && (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: 360, height: 360 }}
        >
          <span
            className={`
              block w-full h-full rounded-full blur-xl
              bg-gradient-to-tr
              ${scanColors[count % scanColors.length]}
              opacity-40
              animate-pulse
            `}
          />
        </motion.div>
      )}

      <div className="relative z-20 flex flex-col items-center gap-4">
        {/* Icon animation */}
        <motion.div
          key={status}
          initial={{ scale: 0.8, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          className="bg-white/80 rounded-full shadow-xl flex items-center justify-center mb-2"
          style={{ width: 140, height: 140 }}
        >
          {status === 'pending' ? (
            <Loader2 className="animate-spin text-blue-500" size={78} />
          ) : status === 'success' ? (
            <ShieldCheck className="text-green-500 drop-shadow-xl animate-bounce-in" size={80} />
          ) : status === 'done' ? (
            <CheckCircle2 className="text-green-600 drop-shadow-xl animate-pulse" size={80} />
          ) : (
            <AlertTriangle className="text-red-500 drop-shadow-xl animate-shake" size={80} />
          )}
        </motion.div>

        {/* Title & subtext */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-extrabold text-3xl md:text-4xl text-[#011437] mb-2 tracking-tight drop-shadow">
            {status === 'pending'
              ? "AI-Powered Verification"
              : status === 'success'
              ? "You're Verified!"
              : status === 'done'
              ? "Profile is up to date"
              : "Verification Failed"}
          </h1>
          <p className="text-base md:text-lg text-blue-900/80 font-medium">
            {status === 'pending' && (
              <>
                Our AI chatbots are reviewing your details.<br />
                <span className="text-blue-600 font-semibold">This may take a few seconds…</span>
              </>
            )}
            {status === 'success' && (
              <>
                Your profile is up to date!<br />
                <span className="text-green-600 font-semibold">Redirecting you to your banking dashboard…</span>
              </>
            )}
            {status === 'done' && (
              <>
                Everything looks good.<br />
                <span className="text-green-600 font-semibold">Enjoy seamless access to all features.</span>
              </>
            )}
            {status === 'fail' && (
              <>
                Some required details are missing.<br />
                Please complete registration to continue.
              </>
            )}
          </p>
        </motion.div>

        {/* Countdown */}
        <AnimatePresence>
          {status === 'pending' && (
            <motion.div
              key={count}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="flex items-center gap-3 mt-4"
            >
              <span className="text-6xl md:text-7xl font-bold tracking-wide text-[#0056b6]">
                {count}
              </span>
              <span className="text-xl text-blue-700 font-semibold">
                sec
              </span>
              <motion.span
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.18, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="ml-4 text-blue-400/90 font-mono text-lg"
              >
                Scanning...
              </motion.span>
            </motion.div>
          )}
          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="mt-4 flex flex-col items-center"
            >
              <span className="text-4xl md:text-5xl font-bold tracking-wide text-[#15b464] animate-pulse">
                ✓
              </span>
              <span className="text-lg text-green-700 font-semibold mt-2">
                Redirecting...
              </span>
            </motion.div>
          )}
          {status === 'fail' && (
            <motion.div
              key="fail"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="mt-4 flex flex-col items-center"
            >
              <span className="text-4xl md:text-5xl font-bold tracking-wide text-[#ff3c3c] animate-pulse">
                !
              </span>
              <span className="text-lg text-red-700 font-semibold mt-2">
                Redirecting to registration...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
