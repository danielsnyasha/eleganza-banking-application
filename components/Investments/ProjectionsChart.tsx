'use client';

import { LineChart, Line, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import type { Point } from '@/hooks/use-my-investments';

export default function ProjectionsChart({ data }: { data: Point[] }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data}>
        <XAxis
          dataKey="label"
          tickFormatter={(d) => new Date(d).getFullYear().toString().slice(-2)}
          tick={{ fontSize: 11 }}
        />
        <YAxis
          tickFormatter={(v) => v.toLocaleString()}
          tick={{ fontSize: 11 }}
        />
        <Tooltip
          formatter={(v: number) => v.toLocaleString()}
          labelFormatter={(l) =>
            new Date(l).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
          }
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#4F46E5"          /* Eleganza violet */
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
