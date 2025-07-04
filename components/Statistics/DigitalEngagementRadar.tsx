'use client'

import { useState, useMemo } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { TrendingUp } from 'lucide-react'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const KPIS = ['Log-ins', 'Transfers', 'BillPay', 'Invest', 'FX'] as const

const metrics = {
  '2023': {
    Eleganza:   [90, 85, 80, 70, 65],
    Competitor: [75, 70, 60, 55, 50],
  },
  '2024': {
    Eleganza:   [93, 88, 83, 75, 72],
    Competitor: [78, 72, 63, 57, 53],
  },
}

const chartColors = {
  Eleganza:    'rgba(63,131,248,0.55)', // blue-600, semi
  EleganzaLine: '#3f83f8',              // blue-600, solid
  Competitor:  'rgba(251, 113, 133, 0.25)', // rose-400, pale
  CompetitorLine: '#fb7185',            // rose-400
}

export default function DigitalEngagementRadar() {
  const [year, setYear] = useState<'2024' | '2023'>('2024')

  const data = useMemo(() => ({
    labels: [...KPIS],
    datasets: [
      {
        label: 'Eleganza',
        data: metrics[year].Eleganza,
        backgroundColor: chartColors.Eleganza,
        borderColor: chartColors.EleganzaLine,
        borderWidth: 3,
        pointBackgroundColor: chartColors.EleganzaLine,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
      },
      {
        label: 'Top Banks',
        data: metrics[year].Competitor,
        backgroundColor: chartColors.Competitor,
        borderColor: chartColors.CompetitorLine,
        borderWidth: 2,
        pointBackgroundColor: chartColors.CompetitorLine,
        pointRadius: 4,
        pointHoverRadius: 7,
        fill: true,
      },
    ],
  }), [year])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: '#eef1f4' },
        grid: { color: '#eef1f4' },
        suggestedMin: 40,
        suggestedMax: 100,
        ticks: { stepSize: 10, color: '#757575', font: { size: 14, family: 'inherit' } },
        pointLabels: { color: '#111827', font: { size: 15, weight: 600, family: 'inherit' } },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { boxWidth: 14, font: { size: 13, family: 'inherit' } },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.formattedValue}/100`
          }
        }
      }
    }
  }

  // Compute YoY delta for summary
  const yoy = ((metrics['2024'].Eleganza.reduce((a, b) => a + b, 0) -
    metrics['2023'].Eleganza.reduce((a, b) => a + b, 0)) /
    metrics['2023'].Eleganza.reduce((a, b) => a + b, 0) * 100).toFixed(1)

  return (
    <Card className="overflow-hidden w-full max-w-3xl mx-auto">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Digital Engagement Index</CardTitle>
          <CardDescription className="text-base">
            {`Year-on-year: Eleganza vs. Top Banks`} <span className="text-xs text-muted-foreground">(out of 100)</span>
          </CardDescription>
        </div>
        <Select value={year} onValueChange={v => setYear(v as typeof year)}>
          <SelectTrigger className="w-24 h-8"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex justify-center pt-2 pb-1" style={{ height: 270 }}>
        <Radar data={data} options={options} />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 pt-0">
        <div className="flex items-center gap-2 text-green-700 text-sm">
          {year === '2024' && (
            <>
              <span>YoY growth: <span className="font-semibold">{yoy}%</span></span>
              <TrendingUp className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="text-xs text-muted-foreground pt-1">
          <b>Eleganza</b> outperforms industry averages on every digital channel, especially in <b>log-ins</b> and <b>transfers</b>.<br/>
          <b>Key drivers:</b> New mobile app, quick FX, and seamless billpay. <br/>
          <b>Opportunity:</b> Boost investment features and expand retail digital onboarding for 2025.
        </div>
      </CardFooter>
    </Card>
  )
}
