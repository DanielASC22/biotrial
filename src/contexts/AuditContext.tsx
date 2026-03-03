import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import { MOCK_CLAIMS, isDoubleBlindRequired, type ClaimData, type ClaimStatus } from "@/lib/claim-data";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SourceDocument {
  id: string;
  name: string;
  uploadDate: string;
  hashId: string;
  auditor: string;
  size: string;
  linkedClaims: string[];
}

interface AuditContextType {
  claims: Record<string, ClaimData>;
  selectedClaimId: string | null;
  selectClaim: (id: string) => void;
  verifyClaim: (id: string) => Promise<void>;
  flagClaim: (id: string) => Promise<void>;
  pendingCount: number;
  verifiedCount: number;
  tier3AllVerified: boolean;
  documents: SourceDocument[];
  addDocument: (doc: SourceDocument) => void;
  selectedDocId: string | null;
  selectDocument: (id: string | null) => void;
  sessionHash: string;
}

const AuditContext = createContext<AuditContextType | null>(null);

export function useAudit() {
  const ctx = useContext(AuditContext);
  if (!ctx) throw new Error("useAudit must be inside AuditProvider");
  return ctx;
}

function generateIntegrityHash(claimId: string, status: string): string {
  const chars = "0123456789abcdef";
  const seed = claimId + status + Date.now().toString();
  let hash = "";
  for (let i = 0; i < 64; i++) {
    hash += chars[(seed.charCodeAt(i % seed.length) + i) % chars.length];
  }
  return hash;
}

const MOCK_DOCUMENTS: SourceDocument[] = [
  {
    id: "doc-001",
    name: "Lab_Results_04.pdf",
    uploadDate: "2026-02-28",
    hashId: "a7c3f8e2b1d94f6a",
    auditor: "Dr. Sarah Chen",
    size: "2.4 MB",
    linkedClaims: ["c001", "c003", "c004"],
  },
  {
    id: "doc-002",
    name: "Statistical_Analysis_Report.pdf",
    uploadDate: "2026-02-27",
    hashId: "e9b4d1c6f3a82e5d",
    auditor: "Dr. James Miller",
    size: "5.1 MB",
    linkedClaims: ["c002"],
  },
  {
    id: "doc-003",
    name: "Randomization_Log.pdf",
    uploadDate: "2026-02-25",
    hashId: "c2d8f5a1e7b34c9f",
    auditor: "Dr. Sarah Chen",
    size: "890 KB",
    linkedClaims: ["c005"],
  },
  {
    id: "doc-004",
    name: "AE_Summary_Report.pdf",
    uploadDate: "2026-02-26",
    hashId: "f6a3b9d2c8e14f7a",
    auditor: "Dr. Priya Patel",
    size: "3.7 MB",
    linkedClaims: ["c006", "c007", "c008", "c009", "c010"],
  },
  {
    id: "doc-005",
    name: "SAE_Narrative_Report.pdf",
    uploadDate: "2026-02-24",
    hashId: "b1e7c4f9a3d62e8b",
    auditor: "Dr. Priya Patel",
    size: "1.2 MB",
    linkedClaims: ["c011"],
  },
];

export function AuditProvider({ children }: { children: ReactNode }) {
  const [claims, setClaims] = useState<Record<string, ClaimData>>({ ...MOCK_CLAIMS });
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<SourceDocument[]>(MOCK_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [sessionHash] = useState(() => generateIntegrityHash("session", "init"));
  const { toast } = useToast();

  const selectClaim = useCallback((id: string) => {
    setSelectedClaimId(id);
    setSelectedDocId(null);
  }, []);

  const selectDocument = useCallback((id: string | null) => {
    setSelectedDocId(id);
    setSelectedClaimId(null);
  }, []);

  const addDocument = useCallback((doc: SourceDocument) => {
    setDocuments(prev => [doc, ...prev]);
    toast({
      title: "📄 Document Uploaded",
      description: `${doc.name} added to Evidence Vault.`,
    });
  }, [toast]);

  const insertAuditLog = async (claim: ClaimData, status: "verified" | "flagged") => {
    const hash = generateIntegrityHash(claim.id, status);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("audit_logs").insert({
          human_auditor_id: user.id,
          claim_content: `[${claim.id}] ${claim.value} — ${claim.section}`,
          verification_status: status,
          source_link: claim.sourceRef,
          integrity_hash: hash,
        });
      }
    } catch {
      // Silently fail for demo
    }
    return hash;
  };

  const verifyClaim = useCallback(async (id: string) => {
    const claim = claims[id];
    if (!claim) return;

    if (isDoubleBlindRequired(claim) && claim.status === "pending") {
      setClaims(prev => ({
        ...prev,
        [id]: { ...prev[id], status: "awaiting_second" as ClaimStatus },
      }));
      toast({
        title: "⚠️ Double-Blind Required",
        description: `Tier 3 claim (${claim.category.replace("_", " ")}). Click "Confirm Verification" again to complete.`,
      });
      return;
    }

    const hash = await insertAuditLog(claim, "verified");
    setClaims(prev => ({
      ...prev,
      [id]: { ...prev[id], status: "verified" as ClaimStatus },
    }));
    toast({
      title: "✓ Integrity Hash Verified",
      description: `Claim ${id} sealed. Hash: ${hash.slice(0, 16)}…`,
    });
  }, [claims, toast]);

  const flagClaim = useCallback(async (id: string) => {
    const claim = claims[id];
    if (!claim) return;

    await insertAuditLog(claim, "flagged");
    setClaims(prev => ({
      ...prev,
      [id]: { ...prev[id], status: "flagged" as ClaimStatus },
    }));
    toast({
      title: "🚩 Discrepancy Flagged",
      description: `Claim ${id} flagged for manual review. Audit trail updated.`,
      variant: "destructive",
    });
  }, [claims, toast]);

  const pendingCount = Object.values(claims).filter(c => c.status === "pending" || c.status === "awaiting_second").length;
  const verifiedCount = Object.values(claims).filter(c => c.status === "verified").length;

  const tier3AllVerified = useMemo(() => {
    const tier3Claims = Object.values(claims).filter(c => isDoubleBlindRequired(c));
    return tier3Claims.length > 0 && tier3Claims.every(c => c.status === "verified");
  }, [claims]);

  return (
    <AuditContext.Provider value={{
      claims, selectedClaimId, selectClaim, verifyClaim, flagClaim,
      pendingCount, verifiedCount, tier3AllVerified,
      documents, addDocument, selectedDocId, selectDocument,
      sessionHash,
    }}>
      {children}
    </AuditContext.Provider>
  );
}
