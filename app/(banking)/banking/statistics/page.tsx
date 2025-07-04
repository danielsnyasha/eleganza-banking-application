import Banner from '@/components/Statistics/Banner'
import NetProfitLine from '@/components/Statistics/NetProfitLine'
import CustomerGrowthBar from '@/components/Statistics/CustomerGrowthBar'
import LoanPortfolioArea from '@/components/Statistics/LoanPortfolioArea'
import DepositMixPie from '@/components/Statistics/DepositMixPie'
import DigitalEngagementRadar from '@/components/Statistics/DigitalEngagementRadar'
import FxVolumeStacked from '@/components/Statistics/FxVolumeStacked'

export const metadata = { title: 'Statistics • Eleganza Bank' }

export default function StatisticsPage() {
  return (
    <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
      <Banner />

      {/* 6 independent charts */}
      <NetProfitLine />
      <CustomerGrowthBar />
      <LoanPortfolioArea />
      <DepositMixPie />
      <DigitalEngagementRadar />
      <FxVolumeStacked />
    </main>
  )
}
