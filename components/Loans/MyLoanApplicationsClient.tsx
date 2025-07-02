'use client';

import dynamic from 'next/dynamic';

/** Client-only wrapper so we can keep page.tsx as an RSC */
const MyLoanApplications = dynamic(
  () => import('@/components/Loans/MyLoanApplications'),
  { ssr: false }
);

export default function MyLoanApplicationsClient() {
  return <MyLoanApplications />;
}
