import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuditSidebar } from "@/components/AuditSidebar";
import StudyReportViewer from "@/components/StudyReportViewer";
import EvidencePanel from "@/components/EvidencePanel";
import StatusBar from "@/components/StatusBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AuditSidebar />

        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top bar */}
          <header className="h-12 flex items-center border-b bg-card px-2">
            <SidebarTrigger className="ml-1" />
            <div className="ml-3 flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">Bio-Trial Auditor</span>
              <span className="text-xs text-muted-foreground font-data">/ CSR-2026-0042</span>
            </div>
          </header>

          {/* Split view workspace */}
          <div className="flex-1">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={55} minSize={30}>
                <StudyReportViewer />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={45} minSize={25}>
                <EvidencePanel />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          {/* Status bar */}
          <StatusBar />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
