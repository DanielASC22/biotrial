import { Shield, ShieldCheck } from "lucide-react";
import { useAudit } from "@/contexts/AuditContext";
import { cn } from "@/lib/utils";

const ComplianceHeartbeat = ({ collapsed = false }: { collapsed?: boolean }) => {
  const { tier3AllVerified } = useAudit();

  if (collapsed) {
    return (
      <div className="flex justify-center">
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-all duration-700",
            tier3AllVerified
              ? "bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
              : "bg-amber-accent compliance-pulse"
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2.5 rounded-md transition-all duration-700",
        tier3AllVerified
          ? "bg-primary/15 border border-primary/30"
          : "bg-sidebar-accent border border-transparent"
      )}
    >
      <div className="relative">
        {tier3AllVerified ? (
          <ShieldCheck className="h-4 w-4 text-primary" />
        ) : (
          <>
            <Shield className="h-4 w-4 text-amber-accent" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-accent compliance-pulse" />
          </>
        )}
      </div>
      <div className="flex flex-col">
        <span className={cn(
          "text-[10px] font-semibold transition-colors duration-500",
          tier3AllVerified ? "text-primary-foreground" : "text-sidebar-foreground"
        )}>
          {tier3AllVerified ? "ALL TIER 3 VERIFIED" : "AWAITING REVIEW"}
        </span>
        <span className="text-[9px] text-sidebar-foreground/50 font-data">
          21 CFR Part 11
        </span>
      </div>
    </div>
  );
};

export default ComplianceHeartbeat;
