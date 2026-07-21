import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpenCheck,
  RotateCcw,
  Bookmark,
  BarChart3,
  Share2,
  Network,
  Sigma,
  MoveHorizontal,
  ArrowLeftRight,
  ArrowDownAZ,
  GitFork,
  Link2,
  Layers,
  ChevronsLeft,
  Code2,
  SearchCode,
  Layers3,
  ListOrdered,
  GitBranch,
  TrendingUp,
  TreePine,
  Binary,
  CaseSensitive,
  Grid3x3,
  Calculator,
  LayoutList,
  Type,
  Hash,
  AppWindow,
  type LucideIcon,
} from "lucide-react";
import { TOPICS } from "@/data/problems";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, LucideIcon> = {
  Share2, Network, Sigma, MoveHorizontal, ArrowLeftRight,
  ArrowDownAZ, GitFork, Link2, Layers, SearchCode, Layers3,
  ListOrdered, GitBranch, TrendingUp, TreePine, Binary,
  CaseSensitive, Grid3x3, Calculator, LayoutList, Type, Hash, AppWindow,
};

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const isActive = (p: string) => pathname === p;
  const isTopicActive = (slug: string) => pathname === `/topics/${slug}`;

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b">
        <div className="flex h-12 items-center gap-2 px-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Code2 className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">DSA Sheet</span>
              <span className="text-[11px] text-muted-foreground">
                Practice tracker
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")} tooltip="Dashboard">
                  <Link to="/">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/practice")} tooltip="Practice">
                  <Link to="/practice">
                    <BookOpenCheck />
                    <span>Practice</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Topics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOPICS.map((t) => {
                const Icon = iconMap[t.icon] ?? Layers;
                return (
                  <SidebarMenuItem key={t.slug}>
                    <SidebarMenuButton
                      asChild
                      isActive={isTopicActive(t.slug)}
                      tooltip={t.name}
                    >
                      <Link
                        to="/topics/$slug"
                        params={{ slug: t.slug }}
                      >
                        <Icon />
                        <span className="truncate">{t.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/revision")} tooltip="Revision">
                  <Link to="/revision">
                    <RotateCcw />
                    <span>Revision</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/bookmarks")} tooltip="Bookmarks">
                  <Link to="/bookmarks">
                    <Bookmark />
                    <span>Bookmarks</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/progress")} tooltip="Progress">
                  <Link to="/progress">
                    <BarChart3 />
                    <span>Progress</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="w-full justify-start gap-2 text-muted-foreground"
        >
          <ChevronsLeft
            className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
          {!collapsed && <span>Collapse</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
