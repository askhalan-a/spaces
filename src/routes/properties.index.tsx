import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, MapPin, Plus, Theater } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, StatusBadge } from "@/components/estate/ui";
import { inr, properties, units } from "@/lib/mock-data";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Properties & Units — Estate" },
      { name: "description", content: "All commercial properties and the auditorium with unit occupancy." },
      { property: "og:title", content: "Properties & Units — Estate" },
      { property: "og:description", content: "All commercial properties and the auditorium with unit occupancy." },
    ],
  }),
  component: Properties,
});

function Properties() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Properties & Units" subtitle="6 properties · 30 units across Kochi, Aluva and Thrissur" actions={<Button><Plus /> Add property</Button>} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((p) => {
          const pct = Math.round((p.occupied / p.units) * 100);
          const pu = units.filter((u) => u.propertyId === p.id);
          return (
            <div key={p.id} className="rounded-lg border bg-card p-5 shadow-xs transition hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="grid size-10 place-items-center rounded-md bg-secondary text-primary">
                  {p.type === "Auditorium" ? <Theater className="size-5" /> : <Building2 className="size-5" />}
                </div>
                <span className={p.type === "Auditorium" ? "rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground" : "rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"}>{p.type}</span>
              </div>
              <h3 className="mt-4 font-semibold">{p.name}</h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="size-3.5" />{p.address}</p>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{p.type === "Auditorium" ? "Bookings this month: 13" : `${p.occupied} / ${p.units} units occupied`}</span>
                  <span className="font-medium text-foreground">{pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
              </div>
              {pu.length > 0 && (
                <ul className="mt-4 space-y-1 border-t pt-3">
                  {pu.map((u) => (
                    <li key={u.id}>
                      <Link to="/properties/$unitId" params={{ unitId: u.id }} className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted">
                        <span><span className="font-medium">{u.code}</span> <span className="text-muted-foreground">· {u.tenant}</span></span>
                        <span className="tabular text-xs text-muted-foreground">{inr(u.rent)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {p.type === "Auditorium" && (
                <Link to="/auditorium" className="mt-4 block border-t pt-3 text-sm font-medium text-primary hover:underline">View booking calendar →</Link>
              )}
              {p.occupied < p.units && p.type === "Commercial" && <div className="mt-3"><StatusBadge status="Vacant" /> <span className="text-xs text-muted-foreground">{p.units - p.occupied} unit(s) available</span></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
