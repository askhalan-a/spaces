import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, PageHeader, Panel, StatusBadge } from "@/components/estate/ui";
import { inr, units } from "@/lib/mock-data";

export const Route = createFileRoute("/tenants/")({
  head: () => ({
    meta: [
      { title: "Tenants & Leases — Estate" },
      { name: "description", content: "All tenants with lease terms, rent and renewal status." },
      { property: "og:title", content: "Tenants & Leases — Estate" },
      { property: "og:description", content: "All tenants with lease terms, rent and renewal status." },
    ],
  }),
  component: Tenants,
});

const filters = ["All", "Active", "Expiring soon", "Ended"] as const;

function Tenants() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const nav = useNavigate();
  const rows = units.filter((u) => f === "All" || u.status === f);
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Tenants & Leases" subtitle="10 leases · 3 expiring within 60 days" actions={<Button><Plus /> New lease</Button>} />
      <div className="mb-4 flex gap-1 rounded-lg border bg-card p-1 text-sm w-fit">
        {filters.map((x) => (
          <button key={x} onClick={() => setF(x)} className={x === f ? "rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground" : "rounded-md px-3 py-1.5 text-muted-foreground hover:bg-muted"}>{x}</button>
        ))}
      </div>
      <Panel>
        <DataTable head={["Tenant", "Unit", "Lease start", "Lease end", "Monthly rent", "Status"]}>
          {rows.map((u) => (
            <tr key={u.id} className="cursor-pointer hover:bg-accent/40" onClick={() => nav({ to: "/tenants/$leaseId", params: { leaseId: u.id } })}>
              <td><Link to="/tenants/$leaseId" params={{ leaseId: u.id }} className="font-medium hover:underline">{u.tenant}</Link><div className="text-xs text-muted-foreground">{u.contact}</div></td>
              <td>{u.code}</td><td>{u.start}</td><td>{u.end}</td>
              <td className="tabular font-medium">{inr(u.rent)}</td>
              <td><StatusBadge status={u.status} /></td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}
