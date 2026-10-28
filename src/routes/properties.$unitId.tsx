import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, PageHeader, Panel, StatusBadge } from "@/components/estate/ui";
import { inr, properties, units } from "@/lib/mock-data";

export const Route = createFileRoute("/properties/$unitId")({
  loader: ({ params }) => {
    const unit = units.find((u) => u.id === params.unitId);
    if (!unit) throw notFound();
    return { unit, property: properties.find((p) => p.id === unit.propertyId)! };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.unit.code} — SpaceOps` : "Unit — SpaceOps" },
      { name: "description", content: "Unit details, lease and payment history." },
      { property: "og:title", content: loaderData ? `${loaderData.unit.code} — SpaceOps` : "Unit — SpaceOps" },
      { property: "og:description", content: "Unit details, lease and payment history." },
    ],
  }),
  component: UnitPage,
});

function UnitPage() {
  const { unit, property } = Route.useLoaderData();
  const facts = [
    ["Tenant", unit.tenant], ["Contact", `${unit.contact} · ${unit.phone}`], ["Tenant GSTIN", unit.gstin],
    ["Lease period", `${unit.start} – ${unit.end}`], ["Monthly rent", inr(unit.rent)], ["Security deposit", inr(unit.deposit)], ["Carpet area", `${unit.area.toLocaleString("en-IN")} sq ft`],
  ];
  return (
    <div className="mx-auto max-w-6xl">
      <Link to="/properties" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Properties</Link>
      <PageHeader title={`Unit ${unit.code}`} subtitle={`${property.name} · ${property.address}`} actions={<><StatusBadge status={unit.status} /><Button variant="outline">Edit unit</Button></>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Lease details" className="lg:col-span-2">
          <dl className="grid gap-x-6 gap-y-4 p-5 sm:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className="tabular mt-0.5 text-sm font-medium">{v}</dd></div>
            ))}
          </dl>
        </Panel>
        <Panel title="Lease document">
          <div className="p-5">
            <div className="flex items-center gap-3 rounded-md border bg-muted/40 p-3">
              <FileText className="size-8 text-destructive" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">Lease_{unit.code}_signed.pdf</div>
                <div className="text-xs text-muted-foreground">2.4 MB · Registered at SRO Ernakulam</div>
              </div>
            </div>
            <Button variant="outline" className="mt-3 w-full"><Download /> Download</Button>
          </div>
        </Panel>
      </div>
      <Panel title="Payment history" className="mt-6">
        <DataTable head={["Date", "Invoice", "Amount", "Mode", "Status"]}>
          {unit.payments.map((p) => (
            <tr key={p.ref}><td>{p.date}</td><td className="font-mono text-xs">{p.ref}</td><td className="tabular font-medium">{inr(p.amount)}</td><td>{p.status === "Overdue" ? "—" : p.mode}</td><td><StatusBadge status={p.status} /></td></tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}
