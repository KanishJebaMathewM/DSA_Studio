import { useMemo, useState } from "react";
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
  ChevronDown,
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
  Check,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { TOPICS } from "@/data/problems";
import { ROADMAP } from "@/data/roadmap";
import { useProgress } from "@/lib/progress-store";
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

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const progress = useProgress();

  const [openTiers, setOpenTiers] = useState<Record<string, boolean>>({
    Foundation: true,
    Intermediate: true,
    Advanced: true,
  });

  const toggleTier = (tier: string) => {
    setOpenTiers((prev) => ({ ...prev, [tier]: !prev[tier] }));
  };

  const isActive = (p: string) => pathname === p;
  const isTopicActive = (slug: string) => pathname === `/topics/${slug}`;

  // Map each topic to its unique problem IDs
  const topicProblemIdsMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const t of TOPICS) {
      const ids = new Set<string>();
      t.levels?.forEach((lvl) => lvl.problems.forEach((lp) => ids.add(lp.id)));
      t.parts?.forEach((p) =>
        p.levels.forEach((lvl) => lvl.problems.forEach((lp) => ids.add(lp.id))),
      );
      map[t.slug] = Array.from(ids);
    }
    return map;
  }, []);

  const revisionCount = useMemo(
    () => Object.values(progress).filter((e) => e.needsRevision).length,
    [progress],
  );
  const bookmarkCount = useMemo(
    () => Object.values(progress).filter((e) => e.bookmarked).length,
    [progress],
  );

  const tiers = [
    {
      name: "Foundation",
      label: "Foundation Tier",
      badge: "8 topics",
      topics: ROADMAP.filter((r) => r.phase === "Foundation"),
    },
    {
      name: "Intermediate",
      label: "Intermediate Tier",
      badge: "6 topics",
      topics: ROADMAP.filter((r) => r.phase === "Intermediate"),
    },
    {
      name: "Advanced",
      label: "Advanced Tier",
      badge: "8 topics",
      topics: ROADMAP.filter((r) => r.phase === "Advanced"),
    },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-border/80">
      <SidebarHeader className="border-b border-border/80">
        <div className="flex h-13 items-center gap-2.5 px-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20">
            <Code2 className="h-4.5 w-4.5" />
          </div>
          {!collapsed && (
            <div className="flex flex-1 items-center justify-between">
              <div className="flex flex-col leading-tight">
                <span className="font-display text-sm font-bold tracking-tight text-foreground">
                  DSA Studio
                </span>
                <span className="font-accent text-[11px] text-muted-foreground">
                  Interview Mastery
                </span>
              </div>
              <span className="rounded border border-primary/25 bg-primary-soft px-1.5 py-0.5 font-mono text-[9.5px] font-semibold text-primary uppercase tracking-wider">
                v2.0
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="space-y-1">
        {/* Core Navigation Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-accent text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/")}
                  tooltip="Dashboard"
                  className="font-accent transition-colors hover:bg-hover"
                >
                  <Link to="/">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/practice")}
                  tooltip="Practice Roadmap"
                  className="font-accent transition-colors hover:bg-hover"
                >
                  <Link to="/practice">
                    <BookOpenCheck className="h-4 w-4" />
                    <span>Practice Roadmap</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/progress")}
                  tooltip="Progress Analytics"
                  className="font-accent transition-colors hover:bg-hover"
                >
                  <Link to="/progress">
                    <BarChart3 className="h-4 w-4" />
                    <span>Progress Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/bookmarks")}
                  tooltip="Bookmarks"
                  className="font-accent transition-colors hover:bg-hover"
                >
                  <Link to="/bookmarks" className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bookmark className="h-4 w-4" />
                      <span>Bookmarks</span>
                    </div>
                    {bookmarkCount > 0 && !collapsed && (
                      <span className="rounded-full bg-gold/15 px-1.5 py-0.2 font-mono text-[10px] font-semibold text-gold tabular-nums">
                        {bookmarkCount}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/revision")}
                  tooltip="Revision Queue"
                  className="font-accent transition-colors hover:bg-hover"
                >
                  <Link to="/revision" className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="h-4 w-4" />
                      <span>Revision Queue</span>
                    </div>
                    {revisionCount > 0 && !collapsed && (
                      <span className="rounded-full bg-warning/15 px-1.5 py-0.2 font-mono text-[10px] font-semibold text-warning tabular-nums">
                        {revisionCount}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Learning Tiers */}
        {tiers.map((tier) => {
          const isOpen = openTiers[tier.name];
          return (
            <SidebarGroup key={tier.name} className="py-1">
              {!collapsed ? (
                <div
                  onClick={() => toggleTier(tier.name)}
                  className="flex cursor-pointer items-center justify-between px-2 py-1.5 font-accent text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground select-none"
                >
                  <span>{tier.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-normal lowercase tracking-normal text-muted-foreground/70">
                      {tier.badge}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isOpen ? "" : "-rotate-90"
                      }`}
                    />
                  </div>
                </div>
              ) : (
                <SidebarGroupLabel className="font-accent">{tier.name[0]}</SidebarGroupLabel>
              )}

              {(isOpen || collapsed) && (
                <SidebarGroupContent>
                  <SidebarMenu>
                    {tier.topics.map((t) => {
                      const Icon = iconMap[t.icon] ?? Layers;
                      const ids = topicProblemIdsMap[t.slug] ?? [];
                      const total = ids.length;
                      const solved = ids.filter((id) => progress[id]?.completed).length;
                      const isDone = solved === total && total > 0;

                      return (
                        <SidebarMenuItem key={t.slug}>
                          <SidebarMenuButton
                            asChild
                            isActive={isTopicActive(t.slug)}
                            tooltip={`${t.name} (${solved}/${total})`}
                            className="transition-colors hover:bg-hover"
                          >
                            <Link
                              to="/topics/$slug"
                              params={{ slug: t.slug }}
                              className="flex items-center justify-between"
                            >
                              <div className="flex min-w-0 items-center gap-2">
                                <Icon className="h-4 w-4 shrink-0" />
                                <span className="truncate text-xs">{t.name}</span>
                              </div>
                              {!collapsed && (
                                <div className="ml-1 shrink-0">
                                  {isDone ? (
                                    <Check className="h-3.5 w-3.5 text-success" />
                                  ) : solved > 0 ? (
                                    <span className="font-mono text-[10.5px] tabular-nums text-muted-foreground">
                                      {solved}/{total}
                                    </span>
                                  ) : null}
                                </div>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/80 p-2">
        {!collapsed && (
          <div className="mb-1.5 rounded-lg border border-border/70 bg-surface-muted/40 p-2 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium text-foreground">Open-Source</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Contributions & feedback welcome on GitHub.
            </p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="w-full justify-start gap-2 text-muted-foreground transition-colors hover:bg-hover hover:text-foreground"
        >
          <ChevronsLeft
            className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
          {!collapsed && <span>Collapse Sidebar</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
