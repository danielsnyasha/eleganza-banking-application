'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useMyLoanApps } from '@/hooks/useMyLoanApps';
import ProjectionChart   from './ProjectionModal';
import {
  Card, CardHeader, CardContent, CardFooter,
} from '@/components/ui/card';
import { Badge }          from '@/components/ui/badge';
import { Button }         from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogTrigger, DialogClose,
} from '@/components/ui/dialog';

export default function MyLoanApplications() {
  const { data, isLoading, error } = useMyLoanApps();

  if (isLoading) return <p>Loading your applications…</p>;
  if (error)     return <p className="text-red-500">{error.message}</p>;
  if (!data?.length) return <p>No applications yet.</p>;

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((app) => (
        <LoanAppCard key={app.id} app={app} />
      ))}
    </section>
  );
}

/* ------------------ card with chart modal -------------------------- */
function LoanAppCard({ app }: { app: ReturnType<typeof useMyLoanApps>['data'][number] }) {
  const [period, setPeriod] = useState<'month' | 'year'>('year');
  const disabled = app.status !== 'approved';

  return (
    <Card
      className={`flex flex-col ${disabled ? 'opacity-60 grayscale' : ''}`}
    >
      <CardHeader className="relative h-36">
        <Image
          src={app.product?.images[0] ?? '/placeholder.jpg'}
          alt={app.product?.name ?? 'Loan product'}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </CardHeader>

      <CardContent className="p-4 space-y-2 flex-1">
        <h3 className="font-semibold text-[#02152b]">{app.product?.name}</h3>

        <p className="text-sm text-muted-foreground">
          {app.currency}&nbsp;{app.amount.toLocaleString()}
        </p>

        <Badge variant={
          app.status === 'approved' ? 'default'
          : app.status === 'pending'  ? 'secondary'
          : 'destructive'
        }>
          {app.status}
        </Badge>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white"
              disabled={disabled}
            >
              View projection
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl">
            <header className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-lg font-semibold">{app.product?.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {app.currency}&nbsp;{app.amount.toLocaleString()} •
                  &nbsp;{app.ratePct}% p.a.&nbsp;•&nbsp;{app.termMonths} mths
                </p>
              </div>

              <DialogClose asChild>
                <Button variant="ghost">✕</Button>
              </DialogClose>
            </header>

            {/* period toggle */}
            <div className="flex gap-2 mb-4">
              {(['year', 'month'] as const).map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={period === p ? 'default' : 'outline'}
                  onClick={() => setPeriod(p)}
                >
                  {p === 'year' ? 'Yearly' : 'Monthly'}
                </Button>
              ))}
            </div>

            <ProjectionChart
              currency={app.currency}
              points={period === 'year' ? app.yearPoints : app.monthPoints}
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
