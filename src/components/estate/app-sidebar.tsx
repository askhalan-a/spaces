import { Link, useRouterState } from "@tanstack/react-router";
import { Sun, Building2, FileSignature, CalendarDays, KanbanSquare, Receipt, Wallet, BarChart3, Settings } from "lucide-react";
import tile from "@/assets/spaceops-icon-tile.png.asset.json";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader,
  SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";

type Item = { title: string; url: string; icon: typeof Sun; badge?: string };
// Grouped by how the estate team actually works: daily triage → leasing → events → money → insight.
export const navGroups: { label: string; items: Item[] }[] = [
  { label: "", items: [{ title: "Today", url: "/", icon: Sun, badge: "6" }] },
  {
    label: "Leasing",
    items: [
      { title: "Properties", url: "/properties", icon: Building2 },
      { title: "Tenants & Leases", url: "/tenants", icon: FileSignature, badge: "3" },
    ],
  },
  {
    label: "Events",
    items: [
      { title: "Enquiries", url: "/leads", icon: KanbanSquare, badge: "4" },
      { title: "Hall Calendar", url: "/auditorium", icon: CalendarDays },
    ],
  },
  {
    label: "Money",
    items: [
      { title: "Collections", url: "/payments", icon: Receipt, badge: "2" },
      { title: "Expenses", url: "/expenses", icon: Wallet },
      { title: "Reports", url: "/reports", icon: BarChart3 },
    ],
  },
];

export function AppSidebar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const active = (u: string) => (u === "/" ? path === "/" : path.startsWith(u));
  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="px-3 pb-2 pt-4">
        <div className="flex items-center gap-2.5 px-1">
          <img src={tile.url} alt="SpaceOps" className="size-7 shrink-0 rounded-[8px]" />
          <div className="leading-tight group-data-[collapsible=icon]:hidden">
            <div className="text-[13px] font-semibold text-foreground">Space<span className="text-gold">Ops</span></div>
            <div className="text-[11px] text-muted-foreground">Malabar Estates</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {navGroups.map((g) => (
          <SidebarGroup key={g.label || "home"} className="py-1.5">
            {g.label && <SidebarGroupLabel className="h-6 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">{g.label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {g.items.map((i) => (
                  <SidebarMenuItem key={i.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={active(i.url)}
                      tooltip={i.title}
                      className="h-8 rounded-lg text-[13px] font-medium data-[active=true]:bg-card data-[active=true]:text-foreground data-[active=true]:shadow-soft"
                    >
                      <Link to={i.url}>
                        <i.icon className="!size-[15px]" />
                        <span>{i.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {i.badge && <SidebarMenuBadge className="text-[11px] font-medium text-muted-foreground tabular">{i.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={active("/settings")} tooltip="Settings" className="h-8 rounded-lg text-[13px] font-medium data-[active=true]:bg-card data-[active=true]:shadow-soft">
              <Link to="/settings"><Settings className="!size-[15px]" /><span>Settings</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-1 flex items-center gap-2.5 rounded-lg px-1.5 py-1.5">
          <div className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary-foreground text-[11px] font-semibold text-primary-foreground">SK</div>
          <div className="leading-tight group-data-[collapsible=icon]:hidden">
            <div className="text-[13px] font-medium text-foreground">Suresh Kumar</div>
            <div className="text-[11px] text-muted-foreground">Estate manager</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
