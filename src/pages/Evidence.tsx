import EvidenceVault from "@/components/EvidenceVault";
import DashboardLayout from "@/components/DashboardLayout";
import PageTransition from "@/components/PageTransition";

const EvidencePage = () => {
  return (
    <DashboardLayout activeView="vault">
      <PageTransition>
        <EvidenceVault />
      </PageTransition>
    </DashboardLayout>
  );
};

export default EvidencePage;
