import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageHeader, Panel } from "@/components/estate/ui";
import { COMPANY } from "@/lib/mock-data";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Estate" },
      { name: "description", content: "Company profile, GST details, invoice numbering and reminders." },
      { property: "og:title", content: "Settings — Estate" },
      { property: "og:description", content: "Company profile, GST details, invoice numbering and reminders." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const fields = [["Company name", COMPANY.name], ["GSTIN", COMPANY.gstin], ["PAN", COMPANY.pan], ["Registered address", COMPANY.address], ["Invoice prefix", "INV/26-27/"], ["Next invoice number", "0413"]];
  const toggles = ["Email tenants 7 days before rent due", "WhatsApp reminder on overdue rent", "Auto-alert 90 / 60 / 30 days before lease expiry", "Block double-bookings in auditorium calendar"];
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Settings" subtitle="Company profile, GST and automation" actions={<Button onClick={() => toast.success("Settings saved")}>Save changes</Button>} />
      <Panel title="Company & GST">
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          {fields.map(([l, v]) => (<div key={l} className="space-y-1.5"><Label>{l}</Label><Input defaultValue={v} /></div>))}
        </div>
      </Panel>
      <Panel title="Reminders & automation" className="mt-6">
        <ul className="divide-y">
          {toggles.map((t) => (<li key={t} className="flex items-center justify-between px-5 py-3.5 text-sm">{t}<Switch defaultChecked /></li>))}
        </ul>
      </Panel>
    </div>
  );
}
