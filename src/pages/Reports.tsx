import DashboardLayout from "@/components/DashboardLayout";
import ComplianceReportView from "@/components/ComplianceReportView";

const Reports = () => {
  return (
    <DashboardLayout activeView="reports">
      <ComplianceReportView />
    </DashboardLayout>
  );
};

export default Reports;
