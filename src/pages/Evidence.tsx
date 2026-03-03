import EvidenceVault from "@/components/EvidenceVault";
import DashboardLayout from "@/components/DashboardLayout";

const EvidencePage = () => {
  return (
    <DashboardLayout activeView="vault">
      <EvidenceVault />
    </DashboardLayout>
  );
};

export default EvidencePage;
