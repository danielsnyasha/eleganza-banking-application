import { Card, CardContent } from '@/components/ui/card'

export function DetailCard({
  title,
  value,
  note,
  children,
}: {
  title: string
  value: string
  note?: string
  children?: React.ReactNode
}) {
  return (
    <Card className="bg-[#f6f9ff] border border-[#e0e8f4]">
      <CardContent className="p-4">
        <div className="font-medium text-[#02152b]">{title}</div>
        <div className="text-lg font-semibold text-[#0056b6]">{value}</div>
        {note && <div className="text-xs text-muted-foreground">{note}</div>}
        {children}
      </CardContent>
    </Card>
  )
}
