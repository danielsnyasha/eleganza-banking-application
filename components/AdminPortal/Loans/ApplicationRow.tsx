//components/AdminPortal/Loans/ApplicationRow.tsx
'use client';
import { Badge }              from '@/components/ui/badge';
import { Button }             from '@/components/ui/button';
import { cn }                 from '@/lib/utils';
import {
  useUpdateLoanApp,
  type LoanAppDTO,
} from '@/hooks/admin-loan-applications';

/* Badge variants allowed by shadcn */
type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export default function LoanApplicationRow({ app }: { app: LoanAppDTO }) {
  const mut      = useUpdateLoanApp();
  const disabled = mut.isPending;

  const badgeVariant: BadgeVariant =
    app.status === 'approved'
      ? 'default'
      : app.status === 'cancelled'
        ? 'destructive'
        : 'secondary';

  const applicant = `${app.name} ${app.surname}`.trim() ||
                    app.userId.slice(0, 6) + '…';

  return (
    <tr className="border-b last:border-none text-sm">
      {/* PRODUCT ----------------------------------------------------- */}
      <td className="px-4 py-3 font-medium text-[#02152b] max-w-[220px]">
        {app.product?.name ?? app.slug}
        {app.product && (
          <p className="text-xs text-muted-foreground">
            {app.product.annualRatePct}% • {app.product.termMonths} m
          </p>
        )}
      </td>

      {/* AMOUNT ------------------------------------------------------ */}
      <td className="px-4 py-3 whitespace-nowrap">
        {app.currency}&nbsp;{app.amount.toLocaleString()}
      </td>

      {/* PURPOSE (hidden on xs) ------------------------------------- */}
      <td className="px-4 py-3 hidden sm:table-cell">{app.purpose}</td>

      {/* DATE -------------------------------------------------------- */}
      <td className="px-4 py-3 hidden md:table-cell">
        {new Date(app.submittedAt).toLocaleDateString()}
      </td>

      {/* APPLICANT --------------------------------------------------- */}
      <td className="px-4 py-3">
        <span className="font-medium">{applicant}</span>
        <p className="text-xs text-muted-foreground truncate max-w-[160px]">
          {app.email}
        </p>
      </td>

      {/* STATUS ------------------------------------------------------ */}
      <td className="px-4 py-3">
        <Badge variant={badgeVariant}>{app.status}</Badge>
      </td>

      {/* ACTIONS ----------------------------------------------------- */}
      <td className="px-4 py-3">
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button
            size="sm"
            className={cn(
              'bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:opacity-90',
              (disabled || app.status === 'approved') &&
                'opacity-50 cursor-not-allowed',
            )}
            disabled={disabled || app.status === 'approved'}
            onClick={() => mut.mutate({ id: app.id, status: 'approved' })}
          >
            Approve
          </Button>

          <Button
            size="sm"
            variant="destructive"
            disabled={disabled || app.status === 'cancelled'}
            onClick={() => mut.mutate({ id: app.id, status: 'cancelled' })}
          >
            Cancel
          </Button>
        </div>
      </td>
    </tr>
  );
}
