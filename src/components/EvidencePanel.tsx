import { FileText, Upload, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EvidencePanel = () => {
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

      {/* Empty state / placeholder */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="rounded-xl border-2 border-dashed border-border p-8 max-w-sm">
          <FileText className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
          <h3 className="text-sm font-semibold text-foreground mb-1">No Source Selected</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Click an <span className="text-amber-accent font-semibold">amber-highlighted</span> claim
            in the Study Report to view its corresponding source document.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ExternalLink className="h-3 w-3" />
              <span>PDF viewer will load source documents here</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mock confidence / verification section */}
      <div className="border-t p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Confidence Score</span>
          <Badge variant="secondary" className="font-data text-xs">
            — / 100
          </Badge>
        </div>
        <Button
          className="w-full bg-compliance text-compliance-foreground hover:bg-compliance/90"
          disabled
        >
          Verify &amp; Sign
        </Button>
        <p className="text-[10px] text-center text-muted-foreground">
          Verification logs auditor ID + timestamp to the immutable ledger
        </p>
      </div>
    </div>
  );
};

export default EvidencePanel;
