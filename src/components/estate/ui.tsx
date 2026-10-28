import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  success: "bg-success/10 text-success",
  danger: "bg-destructive/10 text-destructive",
  warning: "bg-warning/15 text-accent-foreground",
  info: "bg-info/10 text-info",
  neutral: "bg-muted text-muted-foreground",
};

const map: Record<string, keyof typeof tones> = {
  Paid: "success", Active: "success", Confirmed: "success", Won: "success", Occupied: "success",
  Overdue: "danger", Lost: "danger", Ended: "neutral",
  Upcoming: "warning", "Expiring soon": "warning", Pending: "warning", "Pending deposit": "warning", Tentative: "info",
  Negotiating: "info", "Quotation Sent": "warning", "New Lead": "neutral", Vacant: "danger",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const tone = map[status] ?? "neutral";
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[11.5px] font-medium", tones[tone], className)}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[28px] font-semibold leading-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-1.5 text-[14px] text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft", className)}>
      {title && (
        <div className="flex items-center justify-between px-5 pb-2 pt-4">
          <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function DataTable({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b text-left text-[11.5px] font-medium text-muted-foreground">
            {head.map((h) => (
              <th key={h} className="whitespace-nowrap px-5 py-2.5 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="[&>tr]:border-b [&>tr]:border-border/60 [&>tr:last-child]:border-0 [&>tr]:transition-colors [&>tr:hover]:bg-muted/50 [&_td]:px-5 [&_td]:py-3 [&_td]:whitespace-nowrap">
          {children}
        </tbody>
      </table>
    </div>
  );
}
