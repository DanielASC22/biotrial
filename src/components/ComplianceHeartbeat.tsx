import { Shield } from "lucide-react";

const ComplianceHeartbeat = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-sidebar-accent">
      <div className="relative">
        <Shield className="h-4 w-4 text-compliance" />
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-compliance compliance-pulse" />
      </div>
      <span className="text-xs font-data text-sidebar-foreground">
        21 CFR Part 11
      </span>
    </div>
  );
};

export default ComplianceHeartbeat;
