import { Badge } from "@/components/ui/badge";
import { useStudy } from "@/contexts/StudyContext";
import { cn } from "@/lib/utils";
import { STUDY_REPORT_SECTIONS } from "@/lib/study-data";

interface ClaimSpanProps {
  claimId: string;
  children: React.ReactNode;
}

const ClaimSpan = ({ claimId, children }: ClaimSpanProps) => {
  const { claims, selectedClaimId, selectClaim } = useStudy();
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
  const { pendingCount, verifiedCount, flaggedCount, claims, activeStudy, activeStudyId } = useStudy();
  const totalClaims = Object.keys(claims).length;
  const sections = STUDY_REPORT_SECTIONS[activeStudyId] ?? [];

  // Render content with claim placeholders replaced by ClaimSpan components
  const renderContent = (content: string, claimIds: string[]) => {
    const parts: (string | React.ReactNode)[] = [];
    let remaining = content;
    let key = 0;

    // Find all {claimId} placeholders and replace with ClaimSpan
    const regex = /\{([^}]+)\}/g;
    let match;
    let lastIndex = 0;

    const matches: { index: number; length: number; claimId: string }[] = [];
    while ((match = regex.exec(content)) !== null) {
      matches.push({ index: match.index, length: match[0].length, claimId: match[1] });
    }

    for (const m of matches) {
      if (m.index > lastIndex) {
        parts.push(content.slice(lastIndex, m.index));
      }
      const claim = claims[m.claimId];
      parts.push(
        <ClaimSpan key={key++} claimId={m.claimId}>
          {claim?.value ?? m.claimId}
        </ClaimSpan>
      );
      lastIndex = m.index + m.length;
    }
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Study Report Viewer</h2>
          <p className="text-xs text-muted-foreground font-data">
            {activeStudy?.id.toUpperCase() ?? "—"} • {activeStudy?.phase ?? "—"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {flaggedCount > 0 && (
            <Badge variant="outline" className="text-xs font-data border-destructive text-destructive">
              {flaggedCount} Flagged
            </Badge>
          )}
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

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-base font-semibold mb-2">{section.title}</h3>
            <p className="text-sm leading-relaxed text-foreground/90">
              {renderContent(section.content, section.claimIds)}
            </p>
          </div>
        ))}

        {sections.length === 0 && (
          <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
            No report sections available for this study.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyReportViewer;
