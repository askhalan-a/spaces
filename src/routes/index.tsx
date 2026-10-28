import { createFileRoute, Link } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowUpRight, Phone, Send, FileSignature, CalendarCheck, Receipt, CheckCircle2, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Panel, StatusBadge } from "@/components/estate/ui";
import { quickActions } from "@/components/estate/top-bar";
import { activity, inr, monthlyRent, upcoming } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Estate" },
      { name: "description", content: "Your daily to-do list for rent follow-ups, lease renewals, hall bookings and enquiries." },
      { property: "og:title", content: "Today — Estate" },
      { property: "og:description", content: "Your daily to-do list for rent follow-ups, lease renewals, hall bookings and enquiries." },
    ],
  }),
  component: Today,
});

// What needs a human today — ordered by money at risk, then time sensitivity.
const tasks = [
  { kind: "Collect", tone: "Overdue", title: "Backwater Tech Solutions", detail: "October rent · 27 days late", amount: 78000, action: "Call", icon: Phone, to: "/payments" },
  { kind: "Collect", tone: "Overdue", title: "Chai Kada Café", detail: "October rent · 27 days late", amount: 28000, action: "Remind", icon: Send, to: "/payments" },
  { kind: "Renew", tone: "Expiring soon", title: "Kalyan Silks Boutique — LA-G04", detail: "Lease ends 30 Nov · no reply yet", amount: 54000, action: "Draft renewal", icon: FileSignature, to: "/tenants" },
  { kind: "Event", tone: "Pending deposit", title: "IMA Thrissur — Medical Conference", detail: "19 Nov · deposit not received", amount: 110000, action: "Request deposit", icon: Receipt, to: "/auditorium" },
  { kind: "Enquiry", tone: "Quotation Sent", title: "Thomas & Annamma wedding party", detail: "Quote sent yesterday · follow up", amount: 150000, action: "Follow up", icon: Send, to: "/leads" },
  { kind: "Event", tone: "Confirmed", title: "Federal Bank Annual Meet — tomorrow", detail: "Hall setup check with caretaker", action: "Mark ready", icon: CalendarCheck, to: "/auditorium" },
];

const pulse = [
  { label: "Collected this month", value: "Rs 13.61L", sub: "96% of expected", to: "/payments" },
  { label: "Still to collect", value: "Rs 1.06L", sub: "2 tenants overdue", to: "/payments", danger: true },
  { label: "Occupancy", value: "86%", sub: "4 units vacant", to: "/properties" },
  { label: "Hall bookings", value: "13", sub: "Next 30 days", to: "/auditorium" },
];

function Today() {
  const due = tasks.filter((t) => t.amount && t.kind === "Collect").reduce((s, t) => s + (t.amount ?? 0), 0);
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <p className="text-[13px] font-medium text-muted-foreground">Wednesday, 28 October</p>
        <h1 className="mt-1 text-[32px] font-semibold leading-tight">Good afternoon, Suresh.</h1>
        <p className="mt-1.5 text-[15px] text-muted-foreground">
          You have <span className="font-medium text-foreground">{tasks.length} things</span> to look at today, including{" "}
          <span className="font-medium text-destructive">{inr(due)}</span> in late rent.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pulse.map((p) => (
          <Link key={p.label} to={p.to} className="group rounded-2xl border border-border/70 bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
            <div className="flex items-center justify-between text-[12.5px] text-muted-foreground">
              {p.label}
              <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-100" />
            </div>
            <div className="tabular mt-2 text-[26px] font-semibold tracking-tight">{p.value}</div>
            <div className={p.danger ? "mt-0.5 text-[12.5px] text-destructive" : "mt-0.5 text-[12.5px] text-muted-foreground"}>{p.sub}</div>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <Panel title="Needs your attention" action={<span className="text-[12px] text-muted-foreground">Sorted by urgency</span>}>
          <ul className="px-2 pb-2">
            {tasks.map((t) => (
              <li key={t.title} className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-muted/60">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground"><t.icon className="size-4" /></div>
                <Link to={t.to} className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-[14px] font-medium">{t.title}</span>
                    <StatusBadge status={t.tone} className="hidden md:inline-flex" />
                  </div>
                  <div className="truncate text-[12.5px] text-muted-foreground">{t.kind} · {t.detail}</div>
                </Link>
                {t.amount && <div className="tabular hidden text-[13px] font-medium sm:block">{inr(t.amount)}</div>}
                <button
                  onClick={() => toast.success(`${t.action}: ${t.title}`)}
                  className="shrink-0 rounded-full border bg-card px-3 py-1 text-[12.5px] font-medium shadow-soft transition hover:bg-primary hover:text-primary-foreground"
                >
                  {t.action}
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-6">
          <Panel title="Coming up">
            <ul className="px-2 pb-2">
              {upcoming.map((u) => (
                <li key={u.title} className="flex gap-3 rounded-xl px-3 py-2.5">
                  <div className="w-12 shrink-0 text-center">
                    <div className="text-[10.5px] font-medium uppercase text-destructive">{u.date.split(",")[0]}</div>
                    <div className="tabular text-[18px] font-semibold leading-tight">{u.date.split(" ")[1]}</div>
                  </div>
                  <div className="min-w-0 border-l pl-3">
                    <div className="truncate text-[13px] font-medium">{u.title}</div>
                    <div className="truncate text-[12px] text-muted-foreground">{u.detail}</div>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/auditorium" className="flex items-center justify-between border-t px-5 py-3 text-[13px] font-medium text-info hover:bg-muted/50">
              Open hall calendar <ChevronRight className="size-4" />
            </Link>
          </Panel>

          <Panel title="Quick actions">
            <div className="grid grid-cols-2 gap-2 px-4 pb-4">
              {quickActions.map((a) => (
                <button key={a.label} onClick={() => toast(a.label, { description: "This opens a form in the full version." })} className="flex flex-col items-start gap-2 rounded-xl bg-muted/70 p-3 text-left text-[12.5px] font-medium transition hover:bg-muted">
                  <a.icon className="size-4 text-muted-foreground" />
                  {a.label}
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <Panel title="Rent collected" action={<Link to="/reports" className="text-[12.5px] font-medium text-info hover:underline">See reports</Link>}>
          <div className="h-[220px] px-2 pb-3">
            <ResponsiveContainer>
              <AreaChart data={monthlyRent} margin={{ left: 12, right: 12, top: 8 }}>
                <defs>
                  <linearGradient id="fillC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip formatter={(v: number) => inr(v)} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", boxShadow: "var(--shadow-lift)" }} />
                <Area type="monotone" dataKey="expected" name="Expected" stroke="var(--chart-5)" strokeDasharray="4 4" fill="none" strokeWidth={1.5} />
                <Area type="monotone" dataKey="collected" name="Collected" stroke="var(--chart-3)" fill="url(#fillC)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Recently">
          <ul className="px-5 pb-4">
            {activity.slice(0, 4).map((a, i) => (
              <li key={i} className="flex gap-2.5 py-2">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-success" />
                <div>
                  <p className="text-[12.5px] leading-snug">{a.text}</p>
                  <p className="text-[11.5px] text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
