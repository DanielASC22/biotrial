import { FlaskConical, Archive, FileBarChart, Activity, ChevronDown, Clock, ShieldCheck, AlertTriangle, Inbox, UserPlus } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import ComplianceHeartbeat from "./ComplianceHeartbeat";
import { STATUS_CONFIG, PRIORITY_CONFIG, type StudyStatus } from "@/lib/study-data";
import { useStudy } from "@/contexts/StudyContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";


const navItems = [
  { title: "Active Trials", url: "/", icon: FlaskConical },
  { title: "Evidence Vault", url: "/evidence", icon: Archive },
  { title: "Compliance Reports", url: "/reports", icon: FileBarChart },
];

const statusOrder: StudyStatus[] = ["in_review", "flagged", "pending_assignment", "completed"];
const statusIcons: Record<StudyStatus, typeof Clock> = {
  in_review: Clock,
  flagged: AlertTriangle,
  pending_assignment: Inbox,
  completed: ShieldCheck,
};

export function AuditSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { studies, activeStudyId, setActiveStudyId, assignStudy, sidebarOpenSections: openSections, setSidebarOpenSections: setOpenSections } = useStudy();
  const { auditor } = useAuth();

  const studiesByStatus = statusOrder.reduce((acc, status) => {
    acc[status] = studies.filter(s => s.status === status);
    return acc;
  }, {} as Record<StudyStatus, typeof studies>);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-sidebar-primary" />
            <div>
              <h1 className="text-sm font-semibold text-sidebar-foreground">Bio-Trial</h1>
              <p className="text-[10px] text-sidebar-foreground/60 font-data">AUDITOR v1.0</p>
            </div>
          </div>
        )}
        {collapsed && <Activity className="h-6 w-6 text-sidebar-primary mx-auto" />}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] uppercase tracking-widest">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] uppercase tracking-widest">
              Study Queue ({studies.length})
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-1 px-1">
                {statusOrder.map((status) => {
                  const sectionStudies = studiesByStatus[status];
                  if (sectionStudies.length === 0) return null;
                  const config = STATUS_CONFIG[status];
                  const StatusIcon = statusIcons[status];

                  return (
                    <Collapsible
                      key={status}
                      open={openSections[status]}
                      onOpenChange={(open) => setOpenSections(prev => ({ ...prev, [status]: open }))}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1.5 rounded-md hover:bg-sidebar-accent/30 transition-colors group">
                        <div className="flex items-center gap-1.5">
                          <StatusIcon className={cn("h-3 w-3", config.color)} />
                          <span className={cn("text-[11px] font-semibold", config.color)}>{config.label}</span>
                          <span className="text-[10px] text-sidebar-foreground/40 font-data">{sectionStudies.length}</span>
                        </div>
                        <ChevronDown className="h-3 w-3 text-sidebar-foreground/40 transition-transform group-data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="space-y-0.5 mt-0.5 ml-1">
                          {sectionStudies.map((study) => {
                            const isActive = study.id === activeStudyId;
                            const priorityCfg = PRIORITY_CONFIG[study.priority];
                            const progress = study.totalClaims > 0 ? Math.round((study.verifiedClaims / study.totalClaims) * 100) : 0;
                            const isPending = study.status === "pending_assignment";

                            return (
                              <button
                                key={study.id}
                                onClick={() => {
                                  if (isPending) return;
                                  setActiveStudyId(study.id);
                                }}
                                className={cn(
                                  "w-full text-left px-2.5 py-2 rounded-md transition-all group/study",
                                  isPending && "opacity-70",
                                  isActive ? "bg-sidebar-accent border border-sidebar-primary/20" : "hover:bg-sidebar-accent/40 border border-transparent"
                                )}
                              >
                                <div className="flex items-start justify-between gap-1">
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", priorityCfg.dot)} />
                                      <span className="text-[10px] font-data text-sidebar-foreground/60 truncate">{study.protocolId}</span>
                                    </div>
                                    <p className={cn("text-[11px] leading-tight line-clamp-2", isActive ? "text-sidebar-foreground font-medium" : "text-sidebar-foreground/80")}>
                                      {study.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-[9px] text-sidebar-foreground/50 font-data">{study.phase}</span>
                                      <span className="text-[9px] text-sidebar-foreground/40">•</span>
                                      <span className="text-[9px] text-sidebar-foreground/50 font-data">{study.sponsor}</span>
                                    </div>
                                  </div>
                                </div>

                                {isPending && auditor && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="mt-1.5 h-6 text-[10px] w-full gap-1"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      assignStudy(study.id);
                                    }}
                                  >
                                    <UserPlus className="h-3 w-3" />
                                    Assign to Me
                                  </Button>
                                )}

                                {!isPending && (
                                  <div className="mt-1.5 flex items-center gap-2">
                                    <div className="flex-1 h-1 rounded-full bg-sidebar-accent overflow-hidden">
                                      <div
                                        className={cn(
                                          "h-full rounded-full transition-all",
                                          study.flaggedClaims > 0 && progress < 100 ? "bg-destructive"
                                            : progress === 100 ? "bg-compliance" : "bg-amber-accent"
                                        )}
                                        style={{ width: `${progress}%` }}
                                      />
                                    </div>
                                    <span className="text-[9px] font-data text-sidebar-foreground/50">
                                      {study.verifiedClaims}/{study.totalClaims}
                                    </span>
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-3">
        <ComplianceHeartbeat collapsed={collapsed} />
      </SidebarFooter>
    </Sidebar>
  );
}
