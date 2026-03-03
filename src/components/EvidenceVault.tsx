import { useRef } from "react";
import { FileText, Upload, Calendar, Hash, User, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAudit, type SourceDocument } from "@/contexts/AuditContext";
import { cn } from "@/lib/utils";

const EvidenceVault = () => {
  const { documents, addDocument, selectedDocId, selectDocument } = useAudit();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedDoc = documents.find(d => d.id === selectedDocId);

  const handleMockUpload = () => {
    const newDoc: SourceDocument = {
      id: `doc-${Date.now()}`,
      name: `Upload_${new Date().toISOString().slice(0, 10)}.pdf`,
      uploadDate: new Date().toISOString().slice(0, 10),
      hashId: Array.from({ length: 16 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join(""),
      auditor: "Current User",
      size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
      linkedClaims: [],
    };
    addDocument(newDoc);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Evidence Vault</h2>
          <p className="text-xs text-muted-foreground font-data">{documents.length} source documents</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs gap-1.5" onClick={handleMockUpload}>
          <Upload className="h-3 w-3" />
          Upload PDF
        </Button>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Document list */}
        <div className="w-1/2 border-r overflow-auto">
          <div className="p-2 space-y-1">
            {documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => selectDocument(doc.id)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-md transition-all duration-200 group",
                  selectedDocId === doc.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-muted/60 border border-transparent"
                )}
              >
                <div className="flex items-start gap-2">
                  <FileText className={cn(
                    "h-4 w-4 mt-0.5 shrink-0 transition-colors",
                    selectedDocId === doc.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground truncate">{doc.name}</p>
                    <p className="text-[10px] text-muted-foreground font-data mt-0.5">{doc.uploadDate}</p>
                  </div>
                  {doc.linkedClaims.length > 0 && (
                    <Badge variant="secondary" className="text-[9px] shrink-0">
                      {doc.linkedClaims.length}
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Document detail */}
        <div className="w-1/2 overflow-auto">
          {selectedDoc ? (
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">{selectedDoc.name}</h3>
              </div>

              <Separator />

              <div className="space-y-3">
                <MetadataRow icon={Calendar} label="Upload Date" value={selectedDoc.uploadDate} />
                <MetadataRow icon={Hash} label="Hash ID" value={selectedDoc.hashId} mono />
                <MetadataRow icon={User} label="Uploaded By" value={selectedDoc.auditor} />
                <MetadataRow icon={FileText} label="File Size" value={selectedDoc.size} />
              </div>

              {selectedDoc.linkedClaims.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-semibold text-foreground">Linked Claims</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDoc.linkedClaims.map(cid => (
                        <Badge key={cid} variant="outline" className="text-[10px] font-data border-amber-accent/40 text-amber-accent">
                          {cid.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Mock PDF preview area */}
              <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-6 text-center mt-4">
                <FileText className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-[10px] text-muted-foreground">PDF preview will render here</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <FileText className="h-10 w-10 text-muted-foreground/30 mb-3" />
              <p className="text-xs text-muted-foreground">Select a document to view metadata</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function MetadataRow({ icon: Icon, label, value, mono = false }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3 w-3 text-muted-foreground" />
        <span className="text-[11px] text-muted-foreground">{label}</span>
      </div>
      <span className={cn("text-[11px] text-foreground", mono && "font-data")}>{value}</span>
    </div>
  );
}

export default EvidenceVault;
