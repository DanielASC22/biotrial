import { Badge } from "@/components/ui/badge";
import { useAudit } from "@/contexts/AuditContext";
import { cn } from "@/lib/utils";
import type { ClaimData } from "@/lib/claim-data";

interface ClaimSpanProps {
  claimId: string;
  children: React.ReactNode;
}

const ClaimSpan = ({ claimId, children }: ClaimSpanProps) => {
  const { claims, selectedClaimId, selectClaim } = useAudit();
  const claim = claims[claimId];
  if (!claim) return <span>{children}</span>;

  const statusClass = claim.status === "verified" ? "verified" : claim.status === "flagged" ? "flagged" : "";
  const selectedClass = selectedClaimId === claimId && claim.status !== "verified" && claim.status !== "flagged" ? "selected" : "";

  return (
    <span
      className={cn("audit-highlight", statusClass, selectedClass)}
      data-claim-id={claimId}
      onClick={() => selectClaim(claimId)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && selectClaim(claimId)}
    >
      {children}
    </span>
  );
};

const StudyReportViewer = () => {
  const { pendingCount, verifiedCount, claims } = useAudit();
  const totalClaims = Object.keys(claims).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Study Report Viewer</h2>
          <p className="text-xs text-muted-foreground font-data">CSR-2026-0042 • Phase III</p>
        </div>
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <Badge variant="outline" className="text-xs font-data border-amber-accent text-amber-accent">
              {pendingCount} Pending
            </Badge>
          )}
          {verifiedCount > 0 && (
            <Badge variant="outline" className="text-xs font-data border-compliance text-compliance">
              {verifiedCount}/{totalClaims} Verified
            </Badge>
          )}
        </div>
      </div>

      {/* Report Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div>
          <h3 className="text-base font-semibold mb-2">3.1 Primary Efficacy Analysis</h3>
          <p className="text-sm leading-relaxed text-foreground/90">
            The primary endpoint of the study was the change from baseline in HbA1c at Week 24.
            The treatment group demonstrated a statistically significant reduction in HbA1c of{" "}
            <ClaimSpan claimId="c001">−1.4%</ClaimSpan>{" "}
            (95% CI: <ClaimSpan claimId="c002">−1.7, −1.1</ClaimSpan>)
            compared with placebo (p{"<"}0.001). The proportion of patients achieving HbA1c{" "}
            {"<"}7.0% was <ClaimSpan claimId="c003">62.3%</ClaimSpan>{" "}
            in the treatment group versus{" "}
            <ClaimSpan claimId="c004">28.1%</ClaimSpan> in the placebo group.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-2">3.2 Safety Summary</h3>
          <p className="text-sm leading-relaxed text-foreground/90">
            A total of <ClaimSpan claimId="c005">847 patients</ClaimSpan>{" "}
            were randomized and received at least one dose of the study drug. Adverse events (AEs)
            were reported in <ClaimSpan claimId="c006">43.2%</ClaimSpan>{" "}
            of patients in the treatment group and{" "}
            <ClaimSpan claimId="c007">38.9%</ClaimSpan> in the placebo
            group. The most common AEs included nausea (
            <ClaimSpan claimId="c008">8.7%</ClaimSpan>), headache (
            <ClaimSpan claimId="c009">6.2%</ClaimSpan>), and injection
            site reactions (<ClaimSpan claimId="c010">4.1%</ClaimSpan>).
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-2">3.3 Serious Adverse Events</h3>
          <p className="text-sm leading-relaxed text-foreground/90">
            Serious adverse events (SAEs) occurred in{" "}
            <ClaimSpan claimId="c011">5.2%</ClaimSpan> of patients in
            the treatment group. No deaths were attributed to the study drug. One case of
            pancreatitis was reported and adjudicated by an independent committee. The overall
            benefit-risk profile remains favorable based on the integrated safety analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudyReportViewer;
