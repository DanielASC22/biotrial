import { FileText, Upload, ExternalLink, ShieldCheck, Flag, AlertTriangle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAudit } from "@/contexts/AuditContext";
import { useAuth } from "@/contexts/AuthContext";
import { isDoubleBlindRequired } from "@/lib/claim-data";
import { Separator } from "@/components/ui/separator";

const EvidencePanel = () => {
  const { claims, selectedClaimId, verifyClaim, flagClaim } = useAudit();
  const { auditor } = useAuth();
  const selectedClaim = selectedClaimId ? claims[selectedClaimId] : null;
  const insufficientClearance = selectedClaim && isDoubleBlindRequired(selectedClaim) && auditor?.clearanceLevel !== "Tier 3";

  return (
    <div className="flex flex-col h-full border-l">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Evidence Panel</h2>
          <p className="text-xs text-muted-foreground">Source Document Viewer</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs gap-1">
          <Upload className="h-3 w-3" />
          Upload
        </Button>
      </div>

      {!selectedClaim ? (
        /* Empty state */
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="rounded-xl border-2 border-dashed border-border p-8 max-w-sm">
            <FileText className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-sm font-semibold text-foreground mb-1">No Source Selected</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Click an <span className="text-amber-accent font-semibold">amber-highlighted</span> claim
              in the Study Report to view its corresponding source document.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
              <ExternalLink className="h-3 w-3" />
              <span>PDF viewer will load source documents here</span>
            </div>
          </div>
        </div>
      ) : (
        /* Claim detail view */
        <div className="flex-1 overflow-auto">
          {/* Source snippet */}
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-data">
                Claim {selectedClaim.id.toUpperCase()}
              </Badge>
              <Badge
                variant="outline"
                className={`text-[10px] font-data ${
                  selectedClaim.tier === 3
                    ? "border-destructive text-destructive"
                    : selectedClaim.tier === 2
                    ? "border-amber-accent text-amber-accent"
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                Tier {selectedClaim.tier}
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                {selectedClaim.category.replace("_", " ")}
              </Badge>
            </div>

            <div className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Section:</span> {selectedClaim.section}
            </div>

            <Separator />

            {/* Source reference */}
            <div className="flex items-center gap-2 text-xs">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-data text-foreground">{selectedClaim.sourceRef}</span>
            </div>

            {/* Source snippet display */}
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-xs font-data leading-relaxed text-foreground/80">
                {selectedClaim.sourceSnippet}
              </p>
            </div>

            {/* Tier 3 warning */}
            {isDoubleBlindRequired(selectedClaim) && (
              <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2">
                <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-destructive">Double-Blind Verification Required</p>
                  <p className="text-[10px] text-muted-foreground">
                    This claim involves {selectedClaim.category.replace("_", " ")} data (Tier 3).
                    Two independent confirmations are required before regulatory clearance.
                  </p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Verification card */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Confidence Score</span>
              <Badge
                className={`font-data text-xs ${
                  selectedClaim.confidence >= 95
                    ? "bg-compliance/10 text-compliance border-compliance/30"
                    : selectedClaim.confidence >= 90
                    ? "bg-amber-accent/10 text-amber-accent border-amber-accent/30"
                    : "bg-destructive/10 text-destructive border-destructive/30"
                }`}
                variant="outline"
              >
                {selectedClaim.confidence}% Match
              </Badge>
            </div>

            {/* Status display */}
            {selectedClaim.status === "verified" && (
              <div className="flex items-center gap-2 rounded-md border border-compliance/30 bg-compliance/5 px-3 py-2">
                <ShieldCheck className="h-4 w-4 text-compliance" />
                <span className="text-xs font-semibold text-compliance">Verified & Sealed</span>
              </div>
            )}

            {selectedClaim.status === "flagged" && (
              <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2">
                <Flag className="h-4 w-4 text-destructive" />
                <span className="text-xs font-semibold text-destructive">Flagged for Review</span>
              </div>
            )}

            {/* Action buttons */}
            {(selectedClaim.status === "pending" || selectedClaim.status === "awaiting_second") && (
              <div className="space-y-2">
                {insufficientClearance ? (
                  <div className="flex items-start gap-2 rounded-md border border-amber-accent/30 bg-amber-accent/5 px-3 py-3">
                    <Lock className="h-4 w-4 text-amber-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-amber-accent">Insufficient Clearance</p>
                      <p className="text-[10px] text-muted-foreground">
                        This Tier 3 claim requires <span className="font-semibold">Tier 3 clearance</span> to verify or flag.
                        Your clearance: <span className="font-data font-semibold">{auditor?.clearanceLevel}</span>.
                        Contact a Tier 3 auditor (e.g., Dr. Chen or Dr. Patel).
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button
                      className="w-full bg-compliance text-compliance-foreground hover:bg-compliance/90 font-semibold"
                      onClick={() => verifyClaim(selectedClaim.id)}
                    >
                      <ShieldCheck className="h-4 w-4 mr-1" />
                      {selectedClaim.status === "awaiting_second"
                        ? "Confirm Verification (2nd Review)"
                        : "Verify & Sign"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-destructive/40 text-destructive hover:bg-destructive/10"
                      onClick={() => flagClaim(selectedClaim.id)}
                    >
                      <Flag className="h-4 w-4 mr-1" />
                      Flag Discrepancy
                    </Button>
                  </>
                )}
              </div>
            )}

            <p className="text-[10px] text-center text-muted-foreground">
              Verification logs auditor ID + timestamp to the immutable ledger
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidencePanel;
