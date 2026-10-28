import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BellRing, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader, Panel, StatusBadge } from "@/components/estate/ui";
import { inr, properties, units } from "@/lib/mock-data";

export const Route = createFileRoute("/tenants/$leaseId")({
  loader: ({ params }) => {
    const unit = units.find((u) => u.id === params.leaseId);
    if (!unit) throw notFound();
    return { unit, property: properties.find((p) => p.id === unit.propertyId)! };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.unit.tenant} lease — SpaceOps` : "Lease — SpaceOps" },
      { name: "description", content: "Lease record with terms and renewal reminders." },
      { property: "og:title", content: loaderData ? `${loaderData.unit.tenant} lease — SpaceOps` : "Lease — SpaceOps" },
      { property: "og:description", content: "Lease record with terms and renewal reminders." },
    ],
  }),
  component: Lease,
});

const daysLeft: Record<string, number> = { u102: 47, u104: 33, u109: 42 };

function Lease() {
  const { unit, property } = Route.useLoaderData();
  const left = daysLeft[unit.id];
  const terms = [
    ["Lessor", "Malabar Estates Pvt. Ltd."], ["Lessee", unit.tenant], ["Premises", `${unit.code}, ${property.name}`],
    ["Commencement", unit.start], ["Expiry", unit.end], ["Monthly rent", `${inr(unit.rent)} + 18% GST`],
    ["Escalation", "5% annually on anniversary"], ["Security deposit", `${inr(unit.deposit)} (6 months)`],
    ["Lock-in period", "24 months"], ["Notice period", "3 months"], ["Rent due", "5th of every month"], ["Registration", "SRO Ernakulam · Doc 4127/2023"],
  ];
  return (
    <div className="mx-auto max-w-5xl">
      <Link to="/tenants" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Tenants & Leases</Link>
      <PageHeader title={unit.tenant} subtitle={`Lease LS-${unit.code} · ${unit.contact} · ${unit.phone}`} actions={<StatusBadge status={unit.status} />} />
      {left && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-warning/40 bg-accent p-4">
          <BellRing className="size-5 text-gold" />
          <div className="flex-1 text-sm"><span className="font-semibold">Renewal reminder:</span> this lease expires in <span className="font-semibold">{left} days</span> ({unit.end}).</div>
          <Button size="sm" onClick={() => toast.success("Renewal draft created", { description: `Sent to ${unit.contact} for review` })}><RefreshCw /> Start renewal</Button>
        </div>
      )}
      <Panel title="Lease record">
        <dl className="grid gap-x-8 gap-y-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
          {terms.map(([k, v]) => (<div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className="tabular mt-0.5 text-sm font-medium">{v}</dd></div>))}
        </dl>
      </Panel>
      <Panel title="Timeline" className="mt-6">
        <ol className="space-y-4 p-5 text-sm">
          {[[unit.start, "Lease commenced & registered"], ["01 Apr 2025", "Rent escalated by 5%"], ["15 Sep 2026", "Renewal reminder sent (auto, 90 days)"], [unit.end, "Lease expiry"]].map(([d, t]) => (
            <li key={t} className="flex gap-4"><span className="w-28 shrink-0 text-muted-foreground">{d}</span><span>{t}</span></li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}
