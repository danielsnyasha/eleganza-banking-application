/* components/Loans/ProjectionChart.tsx */
'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,                       // <-- area fill
} from 'chart.js';
import { motion } from 'framer-motion';
import type { ProjectionPoint } from '@/types/loan';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Filler);

/* --------------------------------------------------------------------- */
export default function ProjectionModal({
  points,
  currency,
}: {
  points: ProjectionPoint[];
  currency: string;
}) {
  /* ----------- chart.js dataset ----------- */
  const data = {
    labels: points.map((p) =>
      new Date(p.label).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
      }),
    ),
    datasets: [
      {
        data: points.map((p) => p.value),
        borderWidth: 2,
        borderColor: '#6d28d9',          // purple-blue line
        backgroundColor: (ctx: any) => {
          const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
          g.addColorStop(0, 'rgba(109,40,217,0.25)');
          g.addColorStop(1, 'rgba(109,40,217,0)');
          return g;
        },
        fill: 'start',
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { intersect: false } },
    interaction: { intersect: false, mode: 'index' as const },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      y: {
        grid: { color: '#f1f5f9' },
        ticks: {
          callback: (v: string | number) =>
            `${currency}\u00A0${(+v).toLocaleString()}`,
          font: { size: 11 },
        },
      },
    },
  };

  /* ----------- animated container ----------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Line data={data} options={options} />
    </motion.div>
  );
}
