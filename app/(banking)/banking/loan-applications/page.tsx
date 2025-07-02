import MyLoanApplicationsClient
  from '@/components/Loans/MyLoanApplicationsClient';

export const metadata = {
  title: 'Loan Applications • Eleganza Bank',
};

export default function LoanApplicationsPage() {
  return (
    /* page shell stays purely server-rendered */
    <main className="p-6 max-w-6xl mx-auto">
      <MyLoanApplicationsClient />
    </main>
  );
}
