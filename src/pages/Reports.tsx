import DashboardLayout from "@/components/DashboardLayout";
import ComplianceReportView from "@/components/ComplianceReportView";
import PageTransition from "@/components/PageTransition";

const Reports = () => {
  return (
    <DashboardLayout activeView="reports">
      <PageTransition>
        <ComplianceReportView />
      </PageTransition>
    </DashboardLayout>
  );
};

export default Reports;
