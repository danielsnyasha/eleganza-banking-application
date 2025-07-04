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

// Register Chart.js elements only once
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// Year and bank config
const years = ['2023', '2024', '2025'] as const
const banks = ['Eleganza', 'FirstRand'] as const
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

// More detailed, realistic growth data (in thousands)
const growthData: Record<typeof years[number], Record<string, Record<typeof banks[number], number>>> = {
  '2023': {
    Jan: { Eleganza: 480, FirstRand: 470 },
    Feb: { Eleganza: 510, FirstRand: 490 },
    Mar: { Eleganza: 540, FirstRand: 520 },
    Apr: { Eleganza: 570, FirstRand: 545 },
    May: { Eleganza: 620, FirstRand: 570 },
    Jun: { Eleganza: 670, FirstRand: 600 },
    Jul: { Eleganza: 720, FirstRand: 630 },
    Aug: { Eleganza: 760, FirstRand: 650 },
    Sep: { Eleganza: 810, FirstRand: 700 },
    Oct: { Eleganza: 860, FirstRand: 720 },
    Nov: { Eleganza: 910, FirstRand: 765 },
    Dec: { Eleganza: 960, FirstRand: 800 },
  },
  '2024': {
    Jan: { Eleganza: 1000, FirstRand: 850 },
    Feb: { Eleganza: 1080, FirstRand: 890 },
    Mar: { Eleganza: 1170, FirstRand: 930 },
    Apr: { Eleganza: 1250, FirstRand: 960 },
    May: { Eleganza: 1340, FirstRand: 1000 },
    Jun: { Eleganza: 1430, FirstRand: 1040 },
    Jul: { Eleganza: 1520, FirstRand: 1080 },
    Aug: { Eleganza: 1610, FirstRand: 1120 },
    Sep: { Eleganza: 1700, FirstRand: 1150 },
    Oct: { Eleganza: 1790, FirstRand: 1180 },
    Nov: { Eleganza: 1890, FirstRand: 1230 },
    Dec: { Eleganza: 2000, FirstRand: 1280 },
  },
  '2025': {
    Jan: { Eleganza: 2100, FirstRand: 1320 },
    Feb: { Eleganza: 2220, FirstRand: 1370 },
    Mar: { Eleganza: 2340, FirstRand: 1420 },
    Apr: { Eleganza: 2450, FirstRand: 1460 },
    May: { Eleganza: 2570, FirstRand: 1500 },
    Jun: { Eleganza: 2690, FirstRand: 1550 },
    Jul: { Eleganza: 2820, FirstRand: 1590 },
    Aug: { Eleganza: 2950, FirstRand: 1630 },
    Sep: { Eleganza: 3080, FirstRand: 1670 },
    Oct: { Eleganza: 3210, FirstRand: 1710 },
    Nov: { Eleganza: 3340, FirstRand: 1750 },
    Dec: { Eleganza: 3480, FirstRand: 1800 },
  }
}

// Distinct color palette (Emerald green & Deep purple)
const palette: Record<typeof banks[number], string> = {
  Eleganza: '#2ecc40',   // Emerald green
  FirstRand: '#8e44ad',  // Deep purple
}

export default function CustomerGrowthBar() {
  const [yr, setYr] = useState<typeof years[number]>('2024')
  const yearData = growthData[yr]

  // Chart.js data
  const chartData = useMemo(() => ({
    labels: months,
    datasets: banks.map((bank) => ({
      label: bank,
      data: months.map((m) => yearData[m][bank]),
      backgroundColor: palette[bank],
      borderRadius: 6,
      maxBarThickness: 24,
      borderWidth: 2,
    })),
  }), [yr, yearData])

  // Calculate YoY growth (Eleganza, Dec vs prev year Dec)
  const prevYear = String(Number(yr) - 1) as keyof typeof growthData
  const growth =
    prevYear && growthData[prevYear] && growthData[prevYear]['Dec']
      ? (
          ((growthData[yr]['Dec'].Eleganza - growthData[prevYear]['Dec'].Eleganza) /
            growthData[prevYear]['Dec'].Eleganza) *
          100
        ).toFixed(1)
      : '—'

  // Chart.js options (type-safe!)
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
        beginAtZero: true,
        suggestedMax: 3500,
        grid: { color: '#eef1f4' },
        ticks: { stepSize: 250, callback: (v: any) => `${v / 1000}k` },
        title: { display: true, text: 'New Customers (thousands)' },
      },
      x: { grid: { display: false } },
    },
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>New Customers (thousands)</CardTitle>
          <CardDescription>
            Eleganza vs FirstRand – growth by month
          </CardDescription>
        </div>
        <Select value={yr} onValueChange={(v) => setYr(v as typeof years[number])}>
          <SelectTrigger className="w-24 h-8"><SelectValue /></SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent style={{ height: 250, paddingBottom: 0 }}>
        <Bar data={chartData} options={options} />
      </CardContent>
      <CardFooter className="gap-2 text-xs flex flex-col items-start pt-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-3 w-3 text-green-600" />
          <span className="font-semibold text-green-700">
            +{growth}%
          </span>
          <span className="text-muted-foreground">vs last year</span>
        </div>
        <div className="text-xs text-muted-foreground pt-1">
          <b>Eleganza</b> continues to outpace competitors, posting strong and stable customer growth every quarter.
          Occasionally, established leaders like <b>FirstRand</b> see spikes, but Eleganza’s overall trend is
          positive and market leading.<br /><br />
          <b>Key wins:</b> Innovation, customer trust, and sustainable growth.<br />
          <b>Challenges:</b> Intense competition—especially from <b>FirstRand</b> in Q2, where they briefly closed the gap.
        </div>
      </CardFooter>
    </Card>
  )
}
