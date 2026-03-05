import type { ReactNode } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AuditSidebar } from "@/components/AuditSidebar";
import StatusBar from "@/components/StatusBar";
import ComplianceReportModal from "@/components/ComplianceReportModal";
import { useStudy } from "@/contexts/StudyContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
  activeView?: "audit" | "vault" | "reports";
}

const DashboardLayout = ({ children, activeView = "audit" }: DashboardLayoutProps) => {
  const { auditor, logout } = useAuth();
  const { activeStudy } = useStudy();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
      <div className="min-h-screen flex w-full">
        <AuditSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-12 flex items-center justify-between border-b bg-card px-2">
            <div className="flex items-center">
              <SidebarTrigger className="ml-1" />
              <div className="ml-3 flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">BioTrial Auditor</span>
                {activeStudy && (
                  <>
                    <span className="text-xs text-muted-foreground font-data">/ {activeStudy.protocolId}</span>
                    <span className="text-[10px] text-muted-foreground hidden md:inline">— {activeStudy.title.split("—")[0].trim()}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 mr-2">
              <ComplianceReportModal />
              {auditor && (
                <div className="flex items-center gap-2 border-l pl-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-[11px] font-medium text-foreground leading-tight">{auditor.name}</p>
                    <p className="text-[9px] text-muted-foreground font-data">{auditor.clearanceLevel}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleLogout} title="Sign Out">
                    <LogOut className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          </header>
          <div className="flex-1">{children}</div>
          <StatusBar />
        </div>
      </div>
  );
};

export default DashboardLayout;
