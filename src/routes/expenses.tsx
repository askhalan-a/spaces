import { createFileRoute } from "@tanstack/react-router";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, PageHeader, Panel } from "@/components/estate/ui";
import { expenses, inr } from "@/lib/mock-data";

export const Route = createFileRoute("/expenses")({
  head: () => ({
    meta: [
      { title: "Expenses — SpaceOps" },
      { name: "description", content: "Property expenses by category with a monthly breakdown." },
      { property: "og:title", content: "Expenses — SpaceOps" },
      { property: "og:description", content: "Property expenses by category with a monthly breakdown." },
    ],
  }),
  component: Expenses,
});

const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--destructive)"];

function Expenses() {
  const byCat = Object.entries(expenses.reduce<Record<string, number>>((a, e) => ({ ...a, [e.category]: (a[e.category] ?? 0) + e.amount }), {})).map(([name, value]) => ({ name, value }));
  const total = byCat.reduce((a, c) => a + c.value, 0);
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Expenses" subtitle={`October 2026 · ${inr(total)} total`} actions={<Button><Plus /> Add expense</Button>} />
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Panel>
          <DataTable head={["Date", "Category", "Description", "Property", "Amount"]}>
            {expenses.map((e) => (
              <tr key={e.desc}><td>{e.date}</td><td><span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">{e.category}</span></td><td>{e.desc}</td><td className="text-muted-foreground">{e.property}</td><td className="tabular font-medium">{inr(e.amount)}</td></tr>
            ))}
          </DataTable>
        </Panel>
        <Panel title="Breakdown by category">
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={byCat} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {byCat.map((c, i) => <Cell key={c.name} fill={colors[i]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => inr(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-2 px-5 pb-5 text-sm">
            {byCat.map((c, i) => (
              <li key={c.name} className="flex items-center gap-2"><span className="size-2.5 rounded-sm" style={{ background: colors[i] }} /><span className="flex-1">{c.name}</span><span className="tabular text-muted-foreground">{Math.round((c.value / total) * 100)}%</span><span className="tabular w-24 text-right font-medium">{inr(c.value)}</span></li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
