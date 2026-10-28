import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, PageHeader, Panel } from "@/components/estate/ui";
import { gstMonthly, inr, monthlyRent, pnl } from "@/lib/mock-data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Financial Reports — Estate" },
      { name: "description", content: "Collections summary, profit & loss and GST summary reports." },
      { property: "og:title", content: "Financial Reports — Estate" },
      { property: "og:description", content: "Collections summary, profit & loss and GST summary reports." },
    ],
  }),
  component: Reports,
});

const lakh = (v: number) => `${(v / 100000).toFixed(1)}L`;
const axis = { tickLine: false, axisLine: false, fontSize: 12 } as const;

function Exp() {
  return <Button variant="outline" size="sm" onClick={() => toast.success("Export ready", { description: "Report downloaded as Excel" })}><Download /> Export</Button>;
}

function Reports() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Financial Reports" subtitle="FY 2026–27 · May to October" />
      <Tabs defaultValue="collections">
        <TabsList className="mb-4">
          <TabsTrigger value="collections">Collections Summary</TabsTrigger>
          <TabsTrigger value="pnl">Profit & Loss</TabsTrigger>
          <TabsTrigger value="gst">GST Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="collections" className="space-y-6">
          <Panel title="Collected vs expected rent" action={<Exp />}>
            <div className="h-72 p-4"><ResponsiveContainer><BarChart data={monthlyRent}><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="month" {...axis} /><YAxis {...axis} tickFormatter={lakh} /><Tooltip formatter={(v: number) => inr(v)} /><Legend /><Bar dataKey="expected" name="Expected" fill="var(--chart-5)" radius={[4, 4, 0, 0]} /><Bar dataKey="collected" name="Collected" fill="var(--chart-1)" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
            <DataTable head={["Month", "Expected", "Collected", "Shortfall", "Collection %"]}>
              {monthlyRent.map((m) => (<tr key={m.month}><td>{m.month} 2026</td><td className="tabular">{inr(m.expected)}</td><td className="tabular font-medium">{inr(m.collected)}</td><td className="tabular text-destructive">{inr(m.expected - m.collected)}</td><td className="tabular">{((m.collected / m.expected) * 100).toFixed(1)}%</td></tr>))}
            </DataTable>
          </Panel>
        </TabsContent>

        <TabsContent value="pnl">
          <Panel title="Income vs expenses" action={<Exp />}>
            <div className="h-72 p-4"><ResponsiveContainer><AreaChart data={pnl}><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="month" {...axis} /><YAxis {...axis} tickFormatter={lakh} /><Tooltip formatter={(v: number) => inr(v)} /><Legend /><Area dataKey="income" name="Income" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.15} /><Area dataKey="expense" name="Expenses" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.2} /></AreaChart></ResponsiveContainer></div>
            <DataTable head={["Month", "Income", "Expenses", "Net profit", "Margin"]}>
              {pnl.map((m) => (<tr key={m.month}><td>{m.month} 2026</td><td className="tabular">{inr(m.income)}</td><td className="tabular">{inr(m.expense)}</td><td className="tabular font-medium text-success">{inr(m.income - m.expense)}</td><td className="tabular">{(((m.income - m.expense) / m.income) * 100).toFixed(1)}%</td></tr>))}
            </DataTable>
          </Panel>
        </TabsContent>

        <TabsContent value="gst">
          <Panel title="GST liability by month (GSTIN 32AABCM4821K1Z7)" action={<Exp />}>
            <div className="h-72 p-4"><ResponsiveContainer><BarChart data={gstMonthly}><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="month" {...axis} /><YAxis {...axis} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} /><Tooltip formatter={(v: number) => inr(v)} /><Legend /><Bar dataKey="cgst" name="CGST" stackId="g" fill="var(--chart-1)" /><Bar dataKey="sgst" name="SGST" stackId="g" fill="var(--chart-2)" /><Bar dataKey="igst" name="IGST" stackId="g" fill="var(--chart-3)" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
            <DataTable head={["Month", "Taxable value", "CGST", "SGST", "IGST", "Total GST", "GSTR-3B"]}>
              {gstMonthly.map((m, i) => (<tr key={m.month}><td>{m.month} 2026</td><td className="tabular">{inr(m.taxable)}</td><td className="tabular">{inr(m.cgst)}</td><td className="tabular">{inr(m.sgst)}</td><td className="tabular">{inr(m.igst)}</td><td className="tabular font-medium">{inr(m.cgst + m.sgst + m.igst)}</td><td>{i < 5 ? <span className="text-xs font-medium text-success">Filed</span> : <span className="text-xs font-medium text-accent-foreground">Due 20 Nov</span>}</td></tr>))}
            </DataTable>
          </Panel>
        </TabsContent>
      </Tabs>
    </div>
  );
}
