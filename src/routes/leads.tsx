import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, Plus, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PageHeader, StatusBadge } from "@/components/estate/ui";
import { COMPANY, inr, leads, stages, type Lead } from "@/lib/mock-data";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Leads & Quotations — SpaceOps" },
      { name: "description", content: "Pipeline of prospective tenants and auditorium clients with GST quotations." },
      { property: "og:title", content: "Leads & Quotations — SpaceOps" },
      { property: "og:description", content: "Pipeline of prospective tenants and auditorium clients with GST quotations." },
    ],
  }),
  component: Leads,
});

function Leads() {
  const [sel, setSel] = useState<Lead | null>(null);
  return (
    <div className="mx-auto max-w-[1400px]">
      <PageHeader title="Leads & Quotations" subtitle="8 open opportunities · Rs 5,27,000 pipeline value" actions={<Button><Plus /> New lead</Button>} />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((s) => {
          const ls = leads.filter((l) => l.stage === s);
          return (
            <div key={s} className="w-64 shrink-0 rounded-lg bg-secondary/70 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-sm font-semibold">{s}</span>
                <span className="rounded-full bg-card px-2 text-xs text-muted-foreground">{ls.length}</span>
              </div>
              <div className="space-y-2">
                {ls.map((l) => (
                  <button key={l.id} onClick={() => setSel(l)} className="w-full rounded-md border bg-card p-3 text-left shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="text-xs text-muted-foreground">{l.id} · {l.source}</div>
                    <div className="mt-1 text-sm font-medium">{l.org}</div>
                    <div className="text-xs text-muted-foreground">{l.interest}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="tabular text-sm font-semibold">{inr(l.value)}</span>
                      <span className="grid size-6 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">{l.name.split(" ").map((x) => x[0]).join("")}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Sheet open={!!sel} onOpenChange={(o) => !o && setSel(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          {sel && <LeadDetail lead={sel} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function LeadDetail({ lead }: { lead: Lead }) {
  const sub = lead.items.reduce((a, i) => a + i.qty * i.rate, 0);
  const cgst = Math.round(sub * 0.09);
  return (
    <>
      <SheetHeader>
        <SheetTitle>{lead.org}</SheetTitle>
        <div><StatusBadge status={lead.stage} /></div>
      </SheetHeader>
      <div className="space-y-5 px-4 pb-6">
        <div className="space-y-1.5 rounded-md border p-4 text-sm">
          <div className="font-medium">{lead.name}</div>
          <div className="flex items-center gap-2 text-muted-foreground"><Phone className="size-3.5" />{lead.phone}</div>
          <div className="flex items-center gap-2 text-muted-foreground"><Mail className="size-3.5" />{lead.email}</div>
          <div className="text-muted-foreground">Interested in: {lead.interest}</div>
        </div>
        <div className="rounded-md border">
          <div className="flex items-start justify-between border-b bg-muted/50 p-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gold">Quotation</div>
              <div className="font-mono text-sm">QT/26-27/0{lead.id.slice(2)}</div>
            </div>
            <div className="text-right text-xs text-muted-foreground">{COMPANY.name}<br />GSTIN {COMPANY.gstin}<br />Valid till 27 Nov 2026</div>
          </div>
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="p-3 font-medium">Description</th><th className="p-3 font-medium">SAC</th><th className="p-3 text-right font-medium">Amount</th></tr></thead>
            <tbody>
              {lead.items.map((i) => (
                <tr key={i.desc} className="border-b"><td className="p-3">{i.desc}{i.qty > 1 && ` × ${i.qty}`}</td><td className="p-3 font-mono text-xs">{i.sac}</td><td className="tabular p-3 text-right">{inr(i.qty * i.rate)}</td></tr>
              ))}
            </tbody>
          </table>
          <dl className="space-y-1.5 p-4 text-sm tabular">
            <div className="flex justify-between"><dt className="text-muted-foreground">Taxable value</dt><dd>{inr(sub)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">CGST @ 9%</dt><dd>{inr(cgst)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">SGST @ 9%</dt><dd>{inr(cgst)}</dd></div>
            <div className="flex justify-between border-t pt-2 text-base font-semibold"><dt>Total</dt><dd>{inr(sub + cgst * 2)}</dd></div>
          </dl>
        </div>
        <Button className="w-full" onClick={() => toast.success("Quotation sent", { description: `Emailed to ${lead.email}` })}><Send /> Send quotation</Button>
      </div>
    </>
  );
}
