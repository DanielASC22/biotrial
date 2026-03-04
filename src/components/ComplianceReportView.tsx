import { useStudy } from "@/contexts/StudyContext";
import { useAuth } from "@/contexts/AuthContext";
import { isDoubleBlindRequired } from "@/lib/claim-data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Flag, AlertTriangle, Lock, FileBarChart, Clock, User } from "lucide-react";
import type { ClaimData } from "@/lib/claim-data";

const ComplianceReportView = () => {
  const { claims, verifiedCount, sessionHash, sessionStartTime, activeStudy } = useStudy();
  const { auditor } = useAuth();

  const allClaims = Object.values(claims);
  const verifiedClaims = allClaims.filter(c => c.status === "verified");
  const flaggedClaims = allClaims.filter(c => c.status === "flagged");
  const pendingClaims = allClaims.filter(c => c.status === "pending" || c.status === "awaiting_second");
  const tier3Claims = allClaims.filter(c => isDoubleBlindRequired(c));
  const tier3Verified = tier3Claims.filter(c => c.status === "verified");

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="px-6 py-5 border-b">
        <div className="flex items-center gap-2 mb-1">
          <FileBarChart className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Compliance Reports</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          21 CFR Part 11 audit trail summary for {activeStudy?.id.toUpperCase() ?? "—"}
        </p>
      </div>

      <div className="p-6 space-y-6 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <SummaryCard label="Total Claims" value={allClaims.length} icon={<FileBarChart className="h-4 w-4 text-primary" />} />
          <SummaryCard label="Verified" value={verifiedClaims.length} icon={<ShieldCheck className="h-4 w-4 text-compliance" />} highlight={verifiedClaims.length === allClaims.length} />
          <SummaryCard label="Flagged" value={flaggedClaims.length} icon={<Flag className="h-4 w-4 text-destructive" />} />
          <SummaryCard label="Tier 3 Progress" value={`${tier3Verified.length}/${tier3Claims.length}`} icon={<AlertTriangle className="h-4 w-4 text-amber-accent" />} highlight={tier3Verified.length === tier3Claims.length} />
        </div>

        <div className="rounded-lg border bg-card p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Lock className="h-4 w-4" /> Session Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <User className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Active Auditor:</span>
              <span className="font-medium text-foreground">{auditor?.name ?? "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Session Started:</span>
              <span className="font-data text-foreground">{sessionStartTime.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Lock className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Integrity Hash:</span>
            <span className="font-data text-[10px] text-foreground break-all">{sessionHash}</span>
          </div>
        </div>

        {verifiedClaims.length > 0 && (
          <ClaimSection title="Verified Claims" icon={<ShieldCheck className="h-4 w-4 text-compliance" />} claims={verifiedClaims} showAuditor />
        )}
        {flaggedClaims.length > 0 && (
          <ClaimSection title="Flagged for Review" icon={<Flag className="h-4 w-4 text-destructive" />} claims={flaggedClaims} showAuditor />
        )}
        {pendingClaims.length > 0 && (
          <ClaimSection title="Pending Verification" icon={<AlertTriangle className="h-4 w-4 text-amber-accent" />} claims={pendingClaims} />
        )}

        <div className="rounded-lg border border-dashed bg-muted/30 p-4 text-center">
          <p className="text-[10px] text-muted-foreground font-data">
            GENERATED FOR 21 CFR PART 11 COMPLIANCE DEMONSTRATION • BIO-TRIAL AUDITOR v1.0 • {new Date().toISOString().slice(0, 10)}
          </p>
        </div>
      </div>
    </div>
  );
};

function SummaryCard({ label, value, icon, highlight = false }: { label: string; value: number | string; icon: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-3 transition-colors ${highlight ? "border-compliance/30 bg-compliance/5" : "bg-card"}`}>
      <div className="flex items-center gap-1.5 mb-2">{icon}</div>
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function ClaimSection({ title, icon, claims, showAuditor }: { title: string; icon: React.ReactNode; claims: ClaimData[]; showAuditor?: boolean }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">{icon} {title} ({claims.length})</h3>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-3 py-2 text-left font-medium text-[10px] uppercase tracking-wider">Claim</th>
              <th className="px-3 py-2 text-left font-medium text-[10px] uppercase tracking-wider">Value</th>
              <th className="px-3 py-2 text-left font-medium text-[10px] uppercase tracking-wider">Section</th>
              <th className="px-3 py-2 text-left font-medium text-[10px] uppercase tracking-wider">Source</th>
              <th className="px-3 py-2 text-center font-medium text-[10px] uppercase tracking-wider">Tier</th>
              {showAuditor && <th className="px-3 py-2 text-left font-medium text-[10px] uppercase tracking-wider">Auditor</th>}
            </tr>
          </thead>
          <tbody>
            {claims.map((claim, i) => (
              <tr key={claim.id} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="px-3 py-2 font-data">{claim.id.toUpperCase()}</td>
                <td className="px-3 py-2 font-data font-semibold">{claim.value}</td>
                <td className="px-3 py-2">{claim.section}</td>
                <td className="px-3 py-2 font-data text-[10px]">{claim.sourceRef}</td>
                <td className="px-3 py-2 text-center">
                  <Badge variant="outline" className={`text-[9px] ${claim.tier === 3 ? "border-destructive/40 text-destructive" : "border-muted-foreground/40"}`}>
                    T{claim.tier}
                  </Badge>
                </td>
                {showAuditor && <td className="px-3 py-2 text-[10px]">{claim.verifiedBy ?? "—"}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplianceReportView;
