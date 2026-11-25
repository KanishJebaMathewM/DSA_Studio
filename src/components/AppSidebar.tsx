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
  X,
  type LucideIcon,
} from "lucide-react";
import { TOPICS } from "@/data/problems";
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
  SidebarTrigger,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Share2,
  Network,
  Sigma,
  MoveHorizontal,
  ArrowLeftRight,
  ArrowDownAZ,
  GitFork,
  Link2,
  Layers,
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
};

const sourceUrl =
  import.meta.env.VITE_SOURCE_URL || "https://github.com/KanishJebaMathewM/DSA_Studio";

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { state, toggleSidebar, isMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const isActive = (p: string) => pathname === p;
  const isTopicActive = (slug: string) => pathname === `/topics/${slug}`;

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/40 p-2 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-2">
        <div
          className={cn(
            "flex h-[clamp(2.5rem,calc(2rem+0.2vw+0.5vh),3.1rem)] w-full items-center justify-between transition-all",
            collapsed
              ? "h-8 w-8 justify-center p-0"
              : "px-2 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center",
          )}
        >
          {collapsed ? (
            <SidebarTrigger
              className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
              title="Expand sidebar"
            />
          ) : (
            <>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-[var(--ctrl-sm)] w-[var(--ctrl-sm)] shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
                  <Code2 className="h-[var(--icon-sm)] w-[var(--icon-sm)]" />
                </div>
                <div className="flex flex-col leading-tight truncate">
                  <span className="text-fluid-sm font-semibold truncate">DSA Studio</span>
                  <span className="text-fluid-2xs text-muted-foreground">Practice tracker</span>
                </div>
              </div>
              {isMobile ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="h-[var(--ctrl-sm)] w-[var(--ctrl-sm)] text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label="Close sidebar"
                >
                  <X className="h-[var(--icon-sm)] w-[var(--icon-sm)]" />
                </Button>
              ) : (
                <SidebarTrigger
                  className="h-[var(--ctrl-sm)] w-[var(--ctrl-sm)] text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Collapse sidebar"
                />
              )}
            </>
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

        <div className="mx-3 my-0.5 hairline-divider group-data-[collapsible=icon]:hidden" />

        <SidebarGroup>
          <SidebarGroupLabel>Topics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOPICS.map((t) => {
                const Icon = iconMap[t.icon] ?? Layers;
                return (
                  <SidebarMenuItem key={t.slug}>
                    <SidebarMenuButton asChild isActive={isTopicActive(t.slug)} tooltip={t.name}>
                      <Link to="/topics/$slug" params={{ slug: t.slug }}>
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

        <div className="mx-3 my-0.5 hairline-divider group-data-[collapsible=icon]:hidden" />

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

      <SidebarFooter className="border-t border-sidebar-border/40 p-2 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-2">
        {!collapsed && (
          <div className="flex items-center justify-center gap-3 px-2 py-1 text-fluid-2xs text-muted-foreground">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Source
            </a>
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.html"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              AGPL-3.0-only
            </a>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
