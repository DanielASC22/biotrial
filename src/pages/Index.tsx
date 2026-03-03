import StudyReportViewer from "@/components/StudyReportViewer";
import EvidencePanel from "@/components/EvidencePanel";
import DashboardLayout from "@/components/DashboardLayout";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Index = () => {
  return (
    <DashboardLayout activeView="audit">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={55} minSize={30}>
          <StudyReportViewer />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={45} minSize={25}>
          <EvidencePanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </DashboardLayout>
  );
};

export default Index;
