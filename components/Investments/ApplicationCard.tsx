'use client';

import { Card }  from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProjectionsChart from './ProjectionsChart';
import type { MyApp } from '@/hooks/use-my-investments';

export default function ApplicationCard({ app }: { app: MyApp }) {
  const grey = app.status !== 'approved';

  return (
    <Card
      className={`p-5 space-y-4 rounded-2xl ${
        grey ? 'opacity-60 grayscale pointer-events-none' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#02152b]">
          {app.product?.name ?? app.id.slice(0, 6)}
        </h3>
        <Badge variant={grey ? 'secondary' : 'default'}>{app.status}</Badge>
      </div>

      <p className="text-sm text-muted-foreground">
        {app.currency} {app.amount.toLocaleString()} • {app.ratePct}% p.a.
      </p>

      <ProjectionsChart data={app.points} />

      {!grey && (
        <p className="text-xs text-muted-foreground">
          Projected value&nbsp;
          <strong>
            {app.currency}{' '}
            {app.points.at(-1)?.value.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </strong>{' '}
          after&nbsp;
          {Math.round(app.termDays / 30)} mo.
        </p>
      )}
    </Card>
  );
}
