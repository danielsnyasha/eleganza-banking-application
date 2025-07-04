'use client'

import { useState, useMemo } from 'react'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { TrendingUp } from 'lucide-react'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const pairs = [
  'USD/ZAR', 'EUR/ZAR', 'GBP/ZAR', 'BTC/USD', 'ETH/USD', 'JPY/ZAR', 'CNY/ZAR', 'USD/NGN'
]

const volumes = {
  H1: {
    Eleganza:   [38, 32, 28, 50, 22, 18, 12, 9],
    Market:     [62, 68, 72, 50, 78, 82, 88, 91],
  },
  H2: {
    Eleganza:   [43, 36, 34, 60, 29, 22, 15, 10],
    Market:     [57, 64, 66, 40, 71, 78, 85, 90],
  },
  FULL: {
    Eleganza:   [40, 34, 31, 55, 25, 20, 14, 10],
    Market:     [60, 66, 69, 45, 75, 80, 86, 90],
  }
}

// Nice distinct color palette
const palette = {
  Eleganza: '#805ad5', // purple
  Market:   '#f59e42', // orange
}

export default function FxVolumeStacked() {
  const [period, setPeriod] = useState<'H1' | 'H2' | 'FULL'>('H1')

  // Chart.js data and options
  const data = useMemo(() => ({
    labels: [...pairs],
    datasets: [
      {
        label: 'Eleganza',
        data: volumes[period].Eleganza,
        backgroundColor: palette.Eleganza,
        borderRadius: 7,
        barPercentage: 0.72,
        categoryPercentage: 0.85,
      },
      {
        label: 'Market',
        data: volumes[period].Market,
        backgroundColor: palette.Market,
        borderRadius: 7,
        barPercentage: 0.72,
        categoryPercentage: 0.85,
      }
    ]
  }), [period])

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        min: 0,
        max: 100,
        grid: { color: '#eef1f4' },
        ticks: { color: '#757575', font: { size: 14 } },
      },
      y: {
        stacked: true,
        grid: { display: false },
        ticks: { color: '#111827', font: { size: 15, weight: 600 } },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 16, font: { size: 13 } }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw}%`
          }
        }
      }
    }
  }

  return (
    <Card className="overflow-hidden w-full max-w-3xl mx-auto">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">FX Volume Share (%)</CardTitle>
          <CardDescription className="text-base">
            Eleganza vs. Market on major and digital currency pairs
          </CardDescription>
        </div>
        <Select value={period} onValueChange={v => setPeriod(v as typeof period)}>
          <SelectTrigger className="w-24 h-8"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="H1">H1 2024</SelectItem>
            <SelectItem value="H2">H2 2024</SelectItem>
            <SelectItem value="FULL">Full Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent style={{ height: 270, paddingBottom: 0 }}>
        <Bar data={data} options={options} />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 pt-0 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 text-purple-700 font-medium text-sm">
          <TrendingUp className="h-4 w-4" />
          Eleganza is a leader in digital assets (BTC, ETH) and has increased market share on core FX pairs.<br />
        </div>
        <div>
          <b>Highlights:</b> <span className="text-[#805ad5]">Eleganza</span> shows a significant lead in <b>crypto liquidity</b> and steady growth in USD/ZAR. Market share improvements are seen in <b>EUR/ZAR</b> and <b>GBP/ZAR</b> too.<br />
          <b>Focus:</b> Drive innovation in digital assets, while reinforcing major currency trading volumes.
        </div>
      </CardFooter>
    </Card>
  )
}
