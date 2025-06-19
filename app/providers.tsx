'use client';

import { ClerkProvider } from '@clerk/nextjs';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Providers({ children }: { children: ReactNode }) {
  // ensure the client is created only once per browser session
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </QueryClientProvider>
    </ClerkProvider>
  );
}
