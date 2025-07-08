'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import VerificationLoader from '@/components/verification/VerificationLoader';
import { useFullUser } from '@/hooks/useFullUser';

export default function VerificationPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'pending' | 'success' | 'fail' | 'done'>('pending');
  const [phase, setPhase] = useState<'loading' | 'explain' | 'redirect'>('loading');

  const { data: user, isLoading, error } = useFullUser();

  useEffect(() => {
    // Wait for timer to finish in VerificationLoader
    if (status !== 'pending' || phase !== 'loading') return;

    if (!isLoading && user) {
      // If no idNumber, user is NOT verified
      if (user.idNumber && typeof user.idNumber === 'string' && user.idNumber.length > 0) {
        setStatus('success');
        setPhase('explain');
        setTimeout(() => {
          setStatus('done');
          setPhase('redirect');
          setTimeout(() => router.replace('/banking'), 3000);
        }, 3000);
      } else {
        setStatus('fail');
        setPhase('explain');
        setTimeout(() => {
          setPhase('redirect');
          setTimeout(() => router.replace('/complete-registration'), 3000);
        }, 3000);
      }
    }
  }, [isLoading, user, status, phase, router]);

  // When VerificationLoader finishes scanning (countdown)
  const handleFinish = () => {
    if (user && user.idNumber && typeof user.idNumber === 'string' && user.idNumber.length > 0) {
      setStatus('success');
      setPhase('explain');
      setTimeout(() => {
        setStatus('done');
        setPhase('redirect');
        setTimeout(() => router.replace('/banking'), 3000);
      }, 3000);
    } else {
      setStatus('fail');
      setPhase('explain');
      setTimeout(() => {
        setPhase('redirect');
        setTimeout(() => router.replace('/complete-registration'), 3000);
      }, 3000);
    }
  };

  // Loader always starts with 7 sec, then shows "explain" screen for 3 sec
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-[#e5f3ff] via-[#fafdff] to-[#cbe6ff] flex items-center justify-center relative overflow-hidden">
      {/* Glow FX */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-[-60px] top-[8vh] w-[320px] h-[320px] bg-blue-400 blur-[88px] opacity-30 animate-pulse" />
        <div className="absolute right-[-50px] bottom-[6vh] w-[260px] h-[260px] bg-cyan-400 blur-[80px] opacity-20 animate-pulse" />
        <div className="absolute left-1/2 top-1/3 w-[200px] h-[220px] bg-gradient-to-br from-[#85ffdb] to-[#0091ff] blur-[80px] opacity-20" />
      </div>
      <section className="relative z-10 w-full max-w-2xl mx-auto rounded-3xl bg-white/80 shadow-xl py-16 px-6 md:px-12 flex flex-col items-center">
        {/* The loader handles all animations & messaging */}
        <VerificationLoader
          seconds={7}
          status={status}
          onFinish={handleFinish}
        />
      </section>
    </main>
  );
}
