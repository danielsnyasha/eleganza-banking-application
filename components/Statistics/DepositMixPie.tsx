'use client'

import { useState, useMemo } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend)

const depositTypes = [
  'Savings',
  'Current',
  'Fixed',
  'Call',
  'Corporate',
  'Foreign Currency',
]

const colors = [
  '#8f5aff',  // purple
  '#fd7f20',  // orange
  '#f43f5e',  // rose
  '#fbbf24',  // amber
  '#f472b6',  // pink
  '#3b82f6',  // blue
]

const dataByBranch: Record<'Head Office' | 'CBD Branch' | 'Harare North', number[]> = {
  'Head Office': [35, 18, 15, 12, 10, 10],
  'CBD Branch':  [32, 23, 16, 9, 12, 8],
  'Harare North': [29, 25, 14, 10, 16, 6],
}

export default function DepositMixPie() {
  const [branch, setBranch] = useState<'Head Office' | 'CBD Branch' | 'Harare North'>('Head Office')

  // Use mutable array for labels
  const chartData = useMemo(() => ({
    labels: [...depositTypes],
    datasets: [
      {
        data: dataByBranch[branch],
        backgroundColor: colors,
        borderColor: '#fff',
        borderWidth: 4,
        hoverOffset: 10,
      },
    ],
  }), [branch])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const value = context.parsed
            const percent = ((value / total) * 100).toFixed(1)
            return ` ${context.label}: ${value}% (${percent}%)`
          }
        }
      },
    },
    cutout: '60%', // thick inner radius for a fatter ring
  }

  // Get largest deposit type for highlight in summary
  const mainDriverIdx = dataByBranch[branch].indexOf(Math.max(...dataByBranch[branch]))
  const mainDriver = depositTypes[mainDriverIdx]

  return (
    <Card className="overflow-hidden w-full max-w-3xl mx-auto">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Deposit Mix (%)</CardTitle>
          <CardDescription className="text-base">
            Distribution by deposit type — <span className="font-semibold">{branch}</span>
          </CardDescription>
        </div>
        <Select value={branch} onValueChange={v => setBranch(v as typeof branch)}>
          <SelectTrigger className="w-56 h-8 rounded-lg border-2 border-violet-400 text-base font-semibold shadow">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Head Office">New York</SelectItem>
            <SelectItem value="CBD Branch">Africa</SelectItem>
            <SelectItem value="Harare North">Washington North</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <div className="flex flex-row items-center gap-7 md:gap-16">
          {/* Big, thick doughnut */}
          <div style={{ width: 350, height: 260 }} className="flex items-center justify-center">
            <Doughnut data={chartData} options={options} />
          </div>
          {/* Explanatory text, mimicking other charts */}
          <div className="flex flex-col gap-3 text-sm md:text-base w-full max-w-md">
            <div>
              <b>Insights:</b>
              <span className="text-muted-foreground">
                {' '}{mainDriver} deposits are dominant at <b>{branch}</b>, but <b>Current</b> accounts are
                quickly rising, especially in urban branches. Higher diversity at <b>Harare North</b> points to growing 
                business sector influence.
              </span>
            </div>
            <div className="text-muted-foreground">
              <b>Strategic Move:</b> Focus on boosting <span className="text-[#fd7f20] font-semibold">Call</span> and <span className="text-[#f43f5e] font-semibold">Corporate</span> deposits to enhance funding mix and flexibility.
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground pt-2 pb-3">
        Branches with a more balanced deposit mix enjoy better funding stability and resilience to market shocks.
      </CardFooter>
    </Card>
  )
}
