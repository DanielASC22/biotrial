import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuditSidebar } from "@/components/AuditSidebar";
import StudyReportViewer from "@/components/StudyReportViewer";
import EvidencePanel from "@/components/EvidencePanel";
import EvidenceVault from "@/components/EvidenceVault";
import StatusBar from "@/components/StatusBar";
import ComplianceReportModal from "@/components/ComplianceReportModal";
import { AuditProvider } from "@/contexts/AuditContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Index = () => {
  const [activeTab, setActiveTab] = useState("audit");

  return (
    <AuditProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AuditSidebar />

          <div className="flex-1 flex flex-col min-h-screen">
            {/* Top bar */}
            <header className="h-12 flex items-center justify-between border-b bg-card px-2">
              <div className="flex items-center">
                <SidebarTrigger className="ml-1" />
                <div className="ml-3 flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">Bio-Trial Auditor</span>
                  <span className="text-xs text-muted-foreground font-data">/ CSR-2026-0042</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mr-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="h-8">
                    <TabsTrigger value="audit" className="text-xs h-6 px-3">Audit View</TabsTrigger>
                    <TabsTrigger value="vault" className="text-xs h-6 px-3">Evidence Vault</TabsTrigger>
                  </TabsList>
                </Tabs>
                <ComplianceReportModal />
              </div>
            </header>

            {/* Content area */}
            <div className="flex-1">
              {activeTab === "audit" ? (
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize={55} minSize={30}>
                    <StudyReportViewer />
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={45} minSize={25}>
                    <EvidencePanel />
                  </ResizablePanel>
                </ResizablePanelGroup>
              ) : (
                <EvidenceVault />
              )}
            </div>

            {/* Status bar */}
            <StatusBar />
          </div>
        </div>
      </SidebarProvider>
    </AuditProvider>
  );
};

export default Index;
