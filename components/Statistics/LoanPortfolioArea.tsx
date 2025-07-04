'use client'

import { useState, useMemo } from 'react'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend)

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const years = ['2023', '2024'] as const
const products = ['Mortgage', 'SME', 'Retail'] as const
const banks = ['Eleganza', 'FirstBank'] as const

/** Generate nice realistic wave data for each month, product, bank, and year */
const rawData: Record<typeof years[number], Record<typeof products[number], Record<typeof banks[number], number[]>>> = {
  '2023': {
    Mortgage: {
      Eleganza: [5.2, 5.6, 5.3, 5.8, 6.1, 6.0, 6.3, 6.5, 6.4, 6.7, 6.8, 7.0],
      FirstBank: [4.9, 5.1, 5.0, 5.2, 5.3, 5.4, 5.7, 5.5, 5.6, 5.8, 5.9, 6.0],
    },
    SME: {
      Eleganza: [2.7, 2.9, 3.1, 3.4, 3.3, 3.7, 3.5, 3.9, 4.0, 4.1, 4.2, 4.5],
      FirstBank: [2.2, 2.3, 2.4, 2.6, 2.5, 2.7, 2.8, 2.9, 3.1, 3.2, 3.1, 3.3],
    },
    Retail: {
      Eleganza: [1.8, 2.1, 2.2, 2.0, 2.3, 2.4, 2.5, 2.3, 2.6, 2.8, 2.7, 2.9],
      FirstBank: [1.7, 1.9, 1.8, 1.8, 1.9, 2.0, 2.2, 2.1, 2.3, 2.2, 2.3, 2.5],
    }
  },
  '2024': {
    Mortgage: {
      Eleganza: [7.1, 7.3, 7.0, 7.2, 7.6, 7.5, 7.8, 7.7, 7.9, 8.1, 8.3, 8.2],
      FirstBank: [6.2, 6.3, 6.2, 6.5, 6.7, 6.9, 7.0, 7.0, 7.1, 7.3, 7.3, 7.5],
    },
    SME: {
      Eleganza: [4.8, 4.9, 5.0, 5.2, 5.4, 5.5, 5.7, 5.9, 6.0, 6.3, 6.5, 6.7],
      FirstBank: [3.7, 3.9, 3.9, 4.0, 4.2, 4.3, 4.5, 4.6, 4.8, 4.9, 5.0, 5.1],
    },
    Retail: {
      Eleganza: [3.1, 3.3, 3.2, 3.5, 3.7, 3.8, 4.0, 4.1, 4.2, 4.4, 4.6, 4.8],
      FirstBank: [2.7, 2.8, 2.8, 2.9, 3.0, 3.1, 3.1, 3.2, 3.4, 3.5, 3.7, 3.8],
    }
  }
}

const colors = {
  Eleganza: {
    Mortgage: 'rgba(46, 213, 115, 0.44)',     // emerald green
    SME: 'rgba(30, 144, 255, 0.43)',          // dodger blue
    Retail: 'rgba(250, 130, 49, 0.44)',       // orange
    border: {
      Mortgage: '#2ed573',
      SME: '#1e90ff',
      Retail: '#fa8231',
    }
  },
  FirstBank: {
    Mortgage: 'rgba(136, 84, 208, 0.37)',     // purple
    SME: 'rgba(149, 118, 58, 0.36)',          // brown
    Retail: 'rgba(255, 206, 86, 0.37)',       // gold
    border: {
      Mortgage: '#8854d0',
      SME: '#95763a',
      Retail: '#ffce56',
    }
  }
}

export default function LoanPortfolioWaveArea() {
  const [year, setYear] = useState<typeof years[number]>('2024')
  const [product, setProduct] = useState<typeof products[number]>('Mortgage')

  // Show two waves per product, one for Eleganza, one for FirstBank
  const chartData = useMemo(() => ({
    labels: months,
    datasets: [
      {
        label: 'Eleganza',
        data: rawData[year][product].Eleganza,
        fill: true,
        backgroundColor: colors.Eleganza[product],
        borderColor: colors.Eleganza.border[product],
        pointBackgroundColor: colors.Eleganza.border[product],
        tension: 0.49,
        borderWidth: 3,
        pointRadius: 3,
        order: 1,
      },
      {
        label: 'FirstBank',
        data: rawData[year][product].FirstBank,
        fill: true,
        backgroundColor: colors.FirstBank[product],
        borderColor: colors.FirstBank.border[product],
        pointBackgroundColor: colors.FirstBank.border[product],
        tension: 0.49,
        borderWidth: 3,
        pointRadius: 3,
        order: 2,
      }
    ]
  }), [year, product])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { boxWidth: 14 } },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    interaction: { mode: 'nearest' as const, axis: 'x' as const, intersect: false },
    scales: {
      y: {
        beginAtZero: false,
        min: Math.min(...rawData[year][product].Eleganza, ...rawData[year][product].FirstBank) - 0.4,
        max: Math.max(...rawData[year][product].Eleganza, ...rawData[year][product].FirstBank) + 0.4,
        grid: { color: '#eef1f4' },
        ticks: { stepSize: 0.5, callback: (v: any) => `${v} bn` },
        title: { display: true, text: 'USD (billions)' },
      },
      x: { grid: { display: false } },
    },
  }

  // Analytics
  const peakEleganza = Math.max(...rawData[year][product].Eleganza)
  const peakFirstBank = Math.max(...rawData[year][product].FirstBank)
  const trendMsg = peakEleganza > peakFirstBank
    ? `Eleganza leads in ${product} lending, maintaining an edge through smart portfolio growth and proactive risk management.`
    : `FirstBank briefly overtakes Eleganza in ${product}, but Eleganza’s resilience is clear in year-end recovery.`

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>
            {product} Lending Trend (USD billions)
          </CardTitle>
          <CardDescription>
            Fluctuations in {product} loans: <b>Eleganza</b> vs <b>FirstBank</b> ({year})
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Select value={year} onValueChange={v => setYear(v as typeof years[number])}>
            <SelectTrigger className="w-20 h-8"><SelectValue /></SelectTrigger>
            <SelectContent>
              {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={product} onValueChange={v => setProduct(v as typeof products[number])}>
            <SelectTrigger className="w-24 h-8"><SelectValue /></SelectTrigger>
            <SelectContent>
              {products.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent style={{ height: 240, paddingBottom: 0 }}>
        <Line data={chartData} options={options} />
      </CardContent>

      <CardFooter className="gap-2 text-xs flex flex-col items-start pt-2">
        <div>
          <b>{product}</b> balances fluctuate due to seasonality and market factors, showing dynamic competition between <b>Eleganza</b> and <b>FirstBank</b>.
        </div>
        <div>
          <b>Peak values</b> — Eleganza: {peakEleganza} bn, FirstBank: {peakFirstBank} bn.
        </div>
        <div>
          {trendMsg}
        </div>
      </CardFooter>
    </Card>
  )
}
