import { useEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, Plus, Receipt, CalendarPlus, UserPlus, FileSignature, Bell } from "lucide-react";
import { toast } from "sonner";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { navGroups } from "./app-sidebar";
import { units, leads } from "@/lib/mock-data";

export const quickActions = [
  { label: "Record a payment", icon: Receipt, hint: "Collections" },
  { label: "Hold a hall date", icon: CalendarPlus, hint: "Events" },
  { label: "Add an enquiry", icon: UserPlus, hint: "Events" },
  { label: "Start a new lease", icon: FileSignature, hint: "Leasing" },
];

export function TopBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const path = useRouterState({ select: (r) => r.location.pathname });
  const current = navGroups.flatMap((g) => g.items.map((i) => ({ ...i, group: g.label }))).find((i) => (i.url === "/" ? path === "/" : path.startsWith(i.url)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (to: string) => { setOpen(false); navigate({ to }); };

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 bg-background/75 px-4 backdrop-blur-xl md:px-6">
      <SidebarTrigger className="text-muted-foreground" />
      <div className="hidden items-center gap-1.5 text-[13px] sm:flex">
        {current?.group && <span className="text-muted-foreground">{current.group}</span>}
        {current?.group && <span className="text-muted-foreground/50">/</span>}
        <span className="font-medium text-foreground">{current?.title ?? "Settings"}</span>
      </div>
      <button onClick={() => setOpen(true)} className="mx-auto flex h-8 w-full max-w-sm items-center gap-2 rounded-lg border bg-card px-3 text-[13px] text-muted-foreground shadow-soft transition hover:text-foreground">
        <Search className="size-3.5" />
        <span className="truncate">Search or jump to…</span>
        <kbd className="ml-auto hidden rounded-md border bg-muted px-1.5 font-mono text-[10px] sm:inline">⌘K</kbd>
      </button>
      <button className="relative rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground" aria-label="Notifications">
        <Bell className="size-4" />
        <span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-[13px] font-medium text-primary-foreground shadow-soft transition hover:opacity-90">
            <Plus className="size-3.5" /> <span className="hidden sm:inline">New</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5 backdrop-blur-xl">
          {quickActions.map((a) => (
            <DropdownMenuItem key={a.label} className="gap-2.5 rounded-lg py-2 text-[13px]" onSelect={() => toast(a.label, { description: "This opens a form in the full version." })}>
              <a.icon className="size-4 text-muted-foreground" /> {a.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search tenants, units, enquiries, pages…" />
        <CommandList>
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup heading="Go to">
            {navGroups.flatMap((g) => g.items).map((i) => (
              <CommandItem key={i.url} onSelect={() => go(i.url)}><i.icon /> {i.title}</CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Tenants">
            {units.map((u) => (
              <CommandItem key={u.id} value={`${u.tenant} ${u.code}`} onSelect={() => go(`/properties/${u.id}`)}>
                <span>{u.tenant}</span><span className="ml-auto text-xs text-muted-foreground">{u.code}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Enquiries">
            {leads.map((l) => (
              <CommandItem key={l.id} value={`${l.name} ${l.org}`} onSelect={() => go("/leads")}>
                <span>{l.org}</span><span className="ml-auto text-xs text-muted-foreground">{l.stage}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
