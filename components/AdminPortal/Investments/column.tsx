/* Investment‑applications → column definitions                 */
'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Badge }          from '@/components/ui/badge';
import { Button }         from '@/components/ui/button';
import { cn }             from '@/lib/utils';
import {
  useUpdateApp,
  type InvestmentApp,
} from '@/hooks/admin-investment-applications';

/* map app.status → shadcn badge variant */
const statusToVariant = (s: InvestmentApp['status']) =>
  s === 'approved'
    ? 'default'
    : s === 'cancelled'
      ? 'destructive'
      : ('secondary' as const);

export const columns: ColumnDef<InvestmentApp>[] = [
  /* ───── PRODUCT ───────────────────────────────────────────────── */
  {
    accessorKey: 'product',
    header     : 'Product',
    cell       : ({ row }) => {
      const a = row.original;
      return (
        <div className="space-y-0.5 max-w-[220px]">
          <p className="font-medium">{a.product?.name ?? a.slug}</p>
          {a.product && (
            <p className="text-xs text-muted-foreground">
              {a.product.annualRatePct}% • Min {a.currency}{' '}
              {a.product.minimumAmount.toLocaleString()}
            </p>
          )}
        </div>
      );
    },
  },

  /* ───── AMOUNT ───────────────────────────────────────────────── */
  {
    accessorKey: 'amount',
    header     : 'Amount',
    cell       : ({ row }) => {
      const { amount, currency } = row.original;
      return (
        <span className="whitespace-nowrap">
          {currency} {amount.toLocaleString()}
        </span>
      );
    },
  },

  /* ───── RISK (hidden <640 px) ───────────────────────────────── */
  {
    accessorKey : 'risk',
    header      : 'Risk',
    enableHiding: true,
    cell        : ({ row }) => row.original.risk,
  },

  /* ───── DATE (hidden <768 px) ──────────────────────────────── */
  {
    id          : 'submitted',
    header      : 'Date',
    enableHiding: true,
    cell        : ({ row }) =>
      new Date(row.original.submittedAt).toLocaleDateString(),
  },

  /* ───── APPLICANT ──────────────────────────────────────────── */
  {
    id    : 'applicant',
    header: 'User',
    cell  : ({ row }) => {
      const { name, surname, email } = row.original;
      return (
        <div className="space-y-0.5">
          <p className="font-medium">{`${name} ${surname}`}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[160px]">
            {email}
          </p>
        </div>
      );
    },
  },

  /* ───── STATUS ─────────────────────────────────────────────── */
  {
    accessorKey: 'status',
    header     : 'Status',
    cell       : ({ row }) => (
      <Badge variant={statusToVariant(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },

  /* ───── ACTIONS ────────────────────────────────────────────── */
  {
    id    : 'actions',
    header: 'Actions',
    cell  : ({ row }) => {
      const app      = row.original;
      const update   = useUpdateApp();
      const pending  = update.isPending;

      return (
        <div className="flex flex-col sm:flex-row gap-2 justify-end min-w-[140px]">
          <Button
            size="sm"
            className={cn(
              'bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:opacity-90',
              (pending || app.status === 'approved') &&
                'opacity-50 cursor-not-allowed',
            )}
            disabled={pending || app.status === 'approved'}
            onClick={() => update.mutate({ id: app.id, status: 'approved' })}
          >
            Approve
          </Button>

          <Button
            size="sm"
            variant="destructive"
            disabled={pending || app.status === 'cancelled'}
            onClick={() => update.mutate({ id: app.id, status: 'cancelled' })}
          >
            Cancel
          </Button>
        </div>
      );
    },
  },
];
