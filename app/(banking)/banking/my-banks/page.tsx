/* app/(banking)/banking/my-banks/page.tsx */
import LoansGrid from '@/components/Loans/LoansGrid'

export const dynamic = 'force-dynamic'   // always fresh

export default function LoansPage () {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <LoansGrid />
    </div>
  )
}
