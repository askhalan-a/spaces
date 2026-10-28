import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, Panel, StatusBadge } from "@/components/estate/ui";
import { bookings, inr, type Booking } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auditorium")({
  head: () => ({
    meta: [
      { title: "Auditorium Calendar — Estate" },
      { name: "description", content: "Month and day views of Sree Rama Convention Hall bookings." },
      { property: "og:title", content: "Auditorium Calendar — Estate" },
      { property: "og:description", content: "Month and day views of Sree Rama Convention Hall bookings." },
    ],
  }),
  component: Auditorium,
});

const blockTone: Record<Booking["status"], string> = {
  Confirmed: "bg-primary text-primary-foreground",
  Tentative: "bg-info/15 text-info",
  "Pending deposit": "bg-gold/20 text-accent-foreground",
};

const overlaps = (a: Booking, b: Booking) => a.id !== b.id && a.start < b.end && b.start < a.end;
const hours = Array.from({ length: 16 }, (_, i) => i + 8);

function Auditorium() {
  const [day, setDay] = useState(7);
  const [open, setOpen] = useState(false);
  const offset = 0; // 1 Nov 2026 is a Sunday
  const cells = Array.from({ length: 35 }, (_, i) => i - offset + 1);
  const dayBookings = bookings.filter((b) => b.day === day);
  const clash = dayBookings.some((b) => dayBookings.some((o) => overlaps(b, o)));

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Auditorium Calendar" subtitle="Sree Rama Convention Hall, Thrissur · capacity 900" actions={<Button variant="default" className="bg-gold text-gold-foreground hover:bg-gold/90" onClick={() => setOpen(true)}><Plus /> New booking</Button>} />
      <div className="grid items-start gap-6 xl:grid-cols-[1fr_380px]">
        <Panel>
          <div className="flex items-center justify-between border-b px-5 py-3">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost"><ChevronLeft /></Button>
              <h2 className="font-semibold">November 2026</h2>
              <Button size="icon" variant="ghost"><ChevronRight /></Button>
            </div>
            <div className="hidden gap-3 text-xs text-muted-foreground sm:flex">
              <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-primary" />Confirmed</span>
              <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-info/40" />Tentative</span>
              <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-gold/50" />Pending deposit</span>
            </div>
          </div>
          <div className="grid grid-cols-7 border-b text-center text-xs font-medium text-muted-foreground">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="py-2">{d}</div>)}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((d, i) => {
              const valid = d >= 1 && d <= 30;
              const bs = bookings.filter((b) => b.day === d);
              return (
                <button key={i} disabled={!valid} onClick={() => setDay(d)}
                  className={cn("flex min-h-24 flex-col items-stretch justify-start border-b border-r p-1.5 text-left transition", !valid && "bg-muted/40", valid && "hover:bg-muted/60", d === day && "bg-accent/60 ring-2 ring-inset ring-gold")}>
                  {valid && <div className="mb-1 text-xs font-medium">{d}</div>}
                  <div className="space-y-1">
                    {bs.map((b) => (
                      <div key={b.id} className={cn("truncate rounded px-1.5 py-0.5 text-[11px] font-medium", blockTone[b.status])}>{b.event}</div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel title={`Day view · ${day} November 2026`}>
          {clash && (
            <div className="mx-4 mt-4 flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" /> Double-booking detected — two events overlap. Resolve before confirming.
            </div>
          )}
          <div className="relative m-4 ml-14" style={{ height: hours.length * 36 }}>
            {hours.map((h, i) => (
              <div key={h} className="absolute inset-x-0 border-t border-dashed" style={{ top: i * 36 }}>
                <span className="absolute -left-12 -top-2 text-[11px] text-muted-foreground tabular">{h <= 12 ? h : h - 12} {h < 12 ? "AM" : "PM"}</span>
              </div>
            ))}
            {dayBookings.map((b) => {
              const c = dayBookings.some((o) => overlaps(b, o));
              const idx = dayBookings.filter((o) => overlaps(b, o) && o.id < b.id).length;
              return (
                <div key={b.id} className={cn("absolute rounded-md p-2 text-xs shadow-sm", blockTone[b.status], c && "ring-2 ring-destructive")}
                  style={{ top: (b.start - 8) * 36, height: (b.end - b.start) * 36 - 2, left: c ? `${idx * 50}%` : 0, width: c ? "49%" : "100%" }}>
                  <div className="font-semibold">{b.event}</div>
                  <div className="opacity-80">{b.client}</div>
                  <div className="opacity-80 tabular">{inr(b.amount)}</div>
                </div>
              );
            })}
            {dayBookings.length === 0 && <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">Available all day — click "New booking"</div>}
          </div>
          <ul className="divide-y border-t">
            {dayBookings.map((b) => (
              <li key={b.id} className="flex items-center justify-between px-5 py-3 text-sm">
                <div><div className="font-medium">{b.client}</div><div className="text-xs text-muted-foreground">{b.start}:00 – {b.end}:00 · Deposit {inr(b.deposit)}</div></div>
                <StatusBadge status={b.status} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader><SheetTitle>New auditorium booking</SheetTitle></SheetHeader>
          <div className="space-y-4 px-4">
            <div className="space-y-1.5"><Label>Client name</Label><Input defaultValue="Anoop Chandran" /></div>
            <div className="space-y-1.5"><Label>Event type</Label>
              <Select defaultValue="wedding"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="wedding">Wedding / Reception</SelectItem><SelectItem value="corporate">Corporate meet</SelectItem><SelectItem value="cultural">Cultural programme</SelectItem><SelectItem value="conference">Conference</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Date</Label><Input type="date" defaultValue="2026-11-24" /></div>
              <div className="space-y-1.5"><Label>Guests</Label><Input defaultValue="650" /></div>
              <div className="space-y-1.5"><Label>Start</Label><Input type="time" defaultValue="17:00" /></div>
              <div className="space-y-1.5"><Label>End</Label><Input type="time" defaultValue="22:00" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Booking amount (Rs)</Label><Input defaultValue="1,10,000" /></div>
              <div className="space-y-1.5"><Label>Deposit (Rs)</Label><Input defaultValue="40,000" /></div>
            </div>
            <div className="space-y-1.5"><Label>Status</Label>
              <Select defaultValue="tentative"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="tentative">Tentative</SelectItem><SelectItem value="pending">Pending deposit</SelectItem><SelectItem value="confirmed">Confirmed</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="rounded-md bg-success/10 p-3 text-sm text-success">✓ 24 Nov is free from 5 PM – 10 PM</div>
          </div>
          <SheetFooter>
            <Button onClick={() => { setOpen(false); toast.success("Booking saved", { description: "Anoop Chandran · 24 Nov 2026" }); }}>Save booking</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
