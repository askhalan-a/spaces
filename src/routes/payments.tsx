import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DataTable, PageHeader, Panel, StatusBadge } from "@/components/estate/ui";
import { COMPANY, inr, payments, type PaymentRow } from "@/lib/mock-data";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payments & Receipts — SpaceOps" },
      { name: "description", content: "Every rent and booking payment with GST-compliant receipts." },
      { property: "og:title", content: "Payments & Receipts — SpaceOps" },
      { property: "og:description", content: "Every rent and booking payment with GST-compliant receipts." },
    ],
  }),
  component: Payments,
});

function Payments() {
  const [sel, setSel] = useState<PaymentRow | null>(null);
  const sum = (s: string) => inr(payments.filter((p) => p.status === s).reduce((a, p) => a + p.amount, 0));
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Payments & Receipts" subtitle="October 2026 · click any row to view its receipt" actions={<Button variant="outline"><Download /> Export</Button>} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[["Received", sum("Paid"), "text-success"], ["Pending", sum("Pending"), "text-accent-foreground"], ["Overdue", sum("Overdue"), "text-destructive"]].map(([l, v, c]) => (
          <div key={l} className="rounded-lg border bg-card p-4"><div className="text-sm text-muted-foreground">{l}</div><div className={`tabular mt-1 text-xl font-semibold ${c}`}>{v}</div></div>
        ))}
      </div>
      <Panel>
        <DataTable head={["Date", "Payer", "Type", "Amount", "Mode", "Invoice / Receipt", "Status"]}>
          {payments.map((p) => (
            <tr key={p.invoice} className="cursor-pointer hover:bg-accent/40" onClick={() => setSel(p)}>
              <td>{p.date}</td><td className="font-medium">{p.payer}</td><td className="text-muted-foreground">{p.source}</td>
              <td className="tabular font-medium">{inr(p.amount)}</td><td>{p.mode}</td>
              <td className="font-mono text-xs text-primary underline-offset-2 hover:underline">{p.invoice}</td>
              <td><StatusBadge status={p.status} /></td>
            </tr>
          ))}
        </DataTable>
      </Panel>
      <Dialog open={!!sel} onOpenChange={(o) => !o && setSel(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          {sel && <ReceiptView p={sel} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ReceiptView({ p }: { p: PaymentRow }) {
  const taxable = Math.round(p.amount / 1.18);
  const cgst = Math.round(taxable * 0.09);
  const sgst = p.amount - taxable - cgst;
  const sac = p.source === "Lease" ? "997212" : "997212";
  return (
    <>
      <DialogHeader><DialogTitle>Tax Invoice cum Receipt</DialogTitle></DialogHeader>
      <div className="rounded-md border text-sm">
        <div className="flex flex-wrap justify-between gap-4 border-b bg-primary p-5 text-primary-foreground">
          <div>
            <div className="text-lg font-semibold">{COMPANY.name}</div>
            <div className="max-w-xs text-xs opacity-80">{COMPANY.address}</div>
            <div className="mt-1 font-mono text-xs">GSTIN: {COMPANY.gstin} · State: Kerala (32)</div>
          </div>
          <div className="text-right text-xs">
            <div className="opacity-80">Invoice No.</div><div className="font-mono text-sm">{p.invoice}</div>
            <div className="mt-1 opacity-80">Date</div><div>{p.date}</div>
          </div>
        </div>
        <div className="grid gap-4 border-b p-5 sm:grid-cols-2">
          <div><div className="text-xs text-muted-foreground">Billed to</div><div className="font-medium">{p.payer}</div><div className="font-mono text-xs text-muted-foreground">GSTIN 32AAKFK7712L1Z3</div></div>
          <div className="sm:text-right"><div className="text-xs text-muted-foreground">Place of supply</div><div>Kerala (32)</div><div className="text-xs text-muted-foreground">Reverse charge: No</div></div>
        </div>
        <table className="w-full">
          <thead><tr className="border-b bg-muted/50 text-left text-xs text-muted-foreground"><th className="p-3 font-medium">Description</th><th className="p-3 font-medium">HSN/SAC</th><th className="p-3 text-right font-medium">Taxable value</th></tr></thead>
          <tbody><tr className="border-b"><td className="p-3">{p.source === "Lease" ? "Commercial rent — October 2026" : "Auditorium hire charges"}</td><td className="p-3 font-mono text-xs">{sac}</td><td className="tabular p-3 text-right">{inr(taxable)}</td></tr></tbody>
        </table>
        <dl className="ml-auto max-w-xs space-y-1.5 p-5 tabular">
          <div className="flex justify-between"><dt className="text-muted-foreground">CGST @ 9%</dt><dd>{inr(cgst)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">SGST @ 9%</dt><dd>{inr(sgst)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">IGST @ 0%</dt><dd>Rs 0</dd></div>
          <div className="flex justify-between border-t pt-2 text-base font-semibold"><dt>Total</dt><dd>{inr(p.amount)}</dd></div>
        </dl>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t bg-muted/40 p-4 text-xs text-muted-foreground">
          <span>Payment: {p.mode === "—" ? "Awaiting" : p.mode} · <StatusBadge status={p.status} /></span>
          <span>Authorised signatory</span>
        </div>
      </div>
      <div className="flex justify-end gap-2"><Button variant="outline"><Printer /> Print</Button><Button><Download /> Download PDF</Button></div>
    </>
  );
}
