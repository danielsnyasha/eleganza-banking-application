'use client'

import { useState, useMemo } from 'react'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { TrendingUp } from 'lucide-react'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Register Chart.js elements only once globally
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

const banks = [
  'Eleganza',
  'Standard Chartered',
  'Barclays',
  'HSBC',
  'Wells Fargo',
  'JP Morgan',
] as const

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

// Dummy data for demonstration
const data: Record<'2024' | '2025' | '2026', Record<string, Record<(typeof banks)[number], number>>> = {
  2024: {
    Jan: {
      Eleganza: 24,
      'Standard Chartered': 23,
      Barclays: 22,
      HSBC: 25,
      'Wells Fargo': 21,
      'JP Morgan': 22,
    },
    Feb: {
      Eleganza: 26,
      'Standard Chartered': 24,
      Barclays: 25,
      HSBC: 26,
      'Wells Fargo': 23,
      'JP Morgan': 24,
    },
    Mar: {
      Eleganza: 27,
      'Standard Chartered': 29,
      Barclays: 25,
      HSBC: 28,
      'Wells Fargo': 23,
      'JP Morgan': 26,
    },
    Apr: {
      Eleganza: 28,
      'Standard Chartered': 26,
      Barclays: 29,
      HSBC: 27,
      'Wells Fargo': 24,
      'JP Morgan': 28,
    },
    May: {
      Eleganza: 29,
      'Standard Chartered': 27,
      Barclays: 26,
      HSBC: 27,
      'Wells Fargo': 24,
      'JP Morgan': 27,
    },
    Jun: {
      Eleganza: 31,
      'Standard Chartered': 27,
      Barclays: 25,
      HSBC: 30,
      'Wells Fargo': 25,
      'JP Morgan': 29,
    },
    Jul: {
      Eleganza: 32,
      'Standard Chartered': 29,
      Barclays: 26,
      HSBC: 28,
      'Wells Fargo': 25,
      'JP Morgan': 27,
    },
    Aug: {
      Eleganza: 32,
      'Standard Chartered': 29,
      Barclays: 27,
      HSBC: 28,
      'Wells Fargo': 25,
      'JP Morgan': 27,
    },
    Sep: {
      Eleganza: 34,
      'Standard Chartered': 31,
      Barclays: 28,
      HSBC: 29,
      'Wells Fargo': 26,
      'JP Morgan': 28,
    },
    Oct: {
      Eleganza: 36,
      'Standard Chartered': 32,
      Barclays: 29,
      HSBC: 30,
      'Wells Fargo': 28,
      'JP Morgan': 31,
    },
    Nov: {
      Eleganza: 37,
      'Standard Chartered': 31,
      Barclays: 29,
      HSBC: 31,
      'Wells Fargo': 29,
      'JP Morgan': 33,
    },
    Dec: {
      Eleganza: 39,
      'Standard Chartered': 32,
      Barclays: 30,
      HSBC: 32,
      'Wells Fargo': 29,
      'JP Morgan': 34,
    },
  },
  2025: {
    Jan: {
      Eleganza: 40,
      'Standard Chartered': 32,
      Barclays: 30,
      HSBC: 32,
      'Wells Fargo': 30,
      'JP Morgan': 33,
    },
    Feb: {
      Eleganza: 41,
      'Standard Chartered': 33,
      Barclays: 32,
      HSBC: 33,
      'Wells Fargo': 30,
      'JP Morgan': 34,
    },
    Mar: {
      Eleganza: 42,
      'Standard Chartered': 32,
      Barclays: 34,
      HSBC: 33,
      'Wells Fargo': 32,
      'JP Morgan': 36,
    },
    Apr: {
      Eleganza: 43,
      'Standard Chartered': 34,
      Barclays: 34,
      HSBC: 34,
      'Wells Fargo': 32,
      'JP Morgan': 35,
    },
    May: {
      Eleganza: 44,
      'Standard Chartered': 34,
      Barclays: 32,
      HSBC: 33,
      'Wells Fargo': 33,
      'JP Morgan': 34,
    },
    Jun: {
      Eleganza: 45,
      'Standard Chartered': 36,
      Barclays: 31,
      HSBC: 36,
      'Wells Fargo': 33,
      'JP Morgan': 36,
    },
    Jul: {
      Eleganza: 47,
      'Standard Chartered': 37,
      Barclays: 32,
      HSBC: 37,
      'Wells Fargo': 34,
      'JP Morgan': 37,
    },
    Aug: {
      Eleganza: 48,
      'Standard Chartered': 36,
      Barclays: 33,
      HSBC: 37,
      'Wells Fargo': 35,
      'JP Morgan': 39,
    },
    Sep: {
      Eleganza: 49,
      'Standard Chartered': 38,
      Barclays: 34,
      HSBC: 39,
      'Wells Fargo': 36,
      'JP Morgan': 40,
    },
    Oct: {
      Eleganza: 50,
      'Standard Chartered': 39,
      Barclays: 34,
      HSBC: 39,
      'Wells Fargo': 36,
      'JP Morgan': 41,
    },
    Nov: {
      Eleganza: 52,
      'Standard Chartered': 41,
      Barclays: 36,
      HSBC: 41,
      'Wells Fargo': 37,
      'JP Morgan': 43,
    },
    Dec: {
      Eleganza: 54,
      'Standard Chartered': 43,
      Barclays: 37,
      HSBC: 42,
      'Wells Fargo': 38,
      'JP Morgan': 44,
    },
  },
  2026: {
    Jan: {
      Eleganza: 56,
      'Standard Chartered': 45,
      Barclays: 39,
      HSBC: 45,
      'Wells Fargo': 40,
      'JP Morgan': 45,
    },
    Feb: {
      Eleganza: 58,
      'Standard Chartered': 46,
      Barclays: 40,
      HSBC: 46,
      'Wells Fargo': 41,
      'JP Morgan': 46,
    },
    Mar: {
      Eleganza: 60,
      'Standard Chartered': 48,
      Barclays: 41,
      HSBC: 48,
      'Wells Fargo': 43,
      'JP Morgan': 48,
    },
    Apr: {
      Eleganza: 61,
      'Standard Chartered': 50,
      Barclays: 43,
      HSBC: 49,
      'Wells Fargo': 43,
      'JP Morgan': 49,
    },
    May: {
      Eleganza: 62,
      'Standard Chartered': 51,
      Barclays: 43,
      HSBC: 50,
      'Wells Fargo': 44,
      'JP Morgan': 50,
    },
    Jun: {
      Eleganza: 63,
      'Standard Chartered': 52,
      Barclays: 44,
      HSBC: 51,
      'Wells Fargo': 45,
      'JP Morgan': 52,
    },
    Jul: {
      Eleganza: 65,
      'Standard Chartered': 53,
      Barclays: 45,
      HSBC: 53,
      'Wells Fargo': 47,
      'JP Morgan': 54,
    },
    Aug: {
      Eleganza: 66,
      'Standard Chartered': 53,
      Barclays: 46,
      HSBC: 53,
      'Wells Fargo': 48,
      'JP Morgan': 55,
    },
    Sep: {
      Eleganza: 67,
      'Standard Chartered': 54,
      Barclays: 47,
      HSBC: 55,
      'Wells Fargo': 49,
      'JP Morgan': 56,
    },
    Oct: {
      Eleganza: 68,
      'Standard Chartered': 55,
      Barclays: 47,
      HSBC: 56,
      'Wells Fargo': 50,
      'JP Morgan': 57,
    },
    Nov: {
      Eleganza: 70,
      'Standard Chartered': 57,
      Barclays: 48,
      HSBC: 58,
      'Wells Fargo': 51,
      'JP Morgan': 59,
    },
    Dec: {
      Eleganza: 72,
      'Standard Chartered': 59,
      Barclays: 50,
      HSBC: 60,
      'Wells Fargo': 53,
      'JP Morgan': 60,
    },
  }
}

// Distinct palette (JP Morgan is now bright red)
const palette: Record<typeof banks[number], string> = {
  Eleganza: '#2ed573',              // green
  'Standard Chartered': '#1e90ff',  // blue
  Barclays: '#ff6f61',              // coral
  HSBC: '#fa8231',                  // orange
  'Wells Fargo': '#8854d0',         // purple
  'JP Morgan': '#ea3943',           // red (was teal)
}

export default function NetProfitLine() {
  const [year, setYear] = useState<'2024' | '2025' | '2026'>('2024')

  const chartData = useMemo(() => {
    const yearData = data[year]
    return {
      labels: [...months],
      datasets: banks.map((bank) => ({
        label: bank,
        data: months.map((m) => yearData[m][bank]),
        borderColor: palette[bank],
        backgroundColor: palette[bank],
        tension: 0.38,
        borderWidth: 3,
        fill: false,
        pointRadius: 2.2,
      })),
    }
  }, [year])

  // Fix Chart.js types for interaction.mode: use only accepted values!
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 14 } },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    interaction: { mode: 'nearest' as const, axis: 'x' as const, intersect: false },
    scales: {
      y: { suggestedMin: 15, suggestedMax: 80, grid: { color: '#eef1f4' }, ticks: { stepSize: 10 } },
      x: { grid: { display: false } },
    },
  }

  // YoY badge (Eleganza)
  const yoy =
    year === '2024'
      ? 0
      : (
          ((data[year]['Dec'].Eleganza - data['2024']['Dec'].Eleganza) /
            data['2024']['Dec'].Eleganza) *
          100
        ).toFixed(1)

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Net Profit (USD millions)</CardTitle>
          <CardDescription>
            Eleganza compared with Standard Chartered, Barclays, HSBC, Wells Fargo, and JP Morgan
          </CardDescription>
        </div>
        <Select value={year} onValueChange={(v) => setYear(v as typeof year)}>
          <SelectTrigger className="w-24 h-8"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2026">2026</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent style={{ height: 270, paddingBottom: 0 }}>
        <Line data={chartData} options={options} />
      </CardContent>

      <CardFooter className="gap-3 text-sm flex flex-col items-start">
        <div className="flex items-center gap-2">
          {year !== '2024' && (
            <>
              Y-o-Y growth: <span className="font-semibold text-green-700">{yoy}%</span>{' '}
              <TrendingUp className="h-4 w-4 text-green-700" />
            </>
          )}
        </div>
        <div className="text-xs text-muted-foreground pt-2">
          <b>Eleganza</b> continues to outpace competitors, posting strong and stable profits every quarter.
          Occasionally, global giants like <b>HSBC</b> and <b>Barclays</b> see spikes, but Eleganza’s overall trend is
          positive and market leading.<br /><br />
          <b>Key wins:</b> Innovation, customer trust, and sustainable growth.<br />
          <b>Challenges:</b> Fierce international competition—especially from <b>Standard Chartered</b> in Q1 and <b>Barclays</b> in Q2.
        </div>
      </CardFooter>
    </Card>
  )
}
