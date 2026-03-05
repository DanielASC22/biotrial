import StudyReportViewer from "@/components/StudyReportViewer";
import EvidencePanel from "@/components/EvidencePanel";
import DashboardLayout from "@/components/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Index = () => {
  return (
    <DashboardLayout activeView="audit">
      <PageTransition>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={55} minSize={30}>
            <StudyReportViewer />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={45} minSize={25}>
            <EvidencePanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Index;
