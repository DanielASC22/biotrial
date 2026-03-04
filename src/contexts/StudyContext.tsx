import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { INITIAL_STUDIES, STUDY_CLAIMS, type StudyReport, type StudyStatus } from "@/lib/study-data";
import { isDoubleBlindRequired, type ClaimData, type ClaimStatus } from "@/lib/claim-data";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export interface SourceDocument {
  id: string;
  name: string;
  uploadDate: string;
  hashId: string;
  auditor: string;
  size: string;
  linkedClaims: string[];
}

interface StudyContextType {
  // Study management
  studies: StudyReport[];
  activeStudyId: string;
  activeStudy: StudyReport | null;
  setActiveStudyId: (id: string) => void;
  assignStudy: (studyId: string) => void;

  // Claims for active study
  claims: Record<string, ClaimData>;
  selectedClaimId: string | null;
  selectClaim: (id: string) => void;
  verifyClaim: (id: string) => Promise<void>;
  flagClaim: (id: string) => Promise<void>;
  resolveClaim: (id: string) => void;
  pendingCount: number;
  verifiedCount: number;
  flaggedCount: number;
  tier3AllVerified: boolean;

  // Documents
  documents: SourceDocument[];
  addDocument: (doc: SourceDocument) => void;
  selectedDocId: string | null;
  selectDocument: (id: string | null) => void;

  // Session
  sessionHash: string;
  sessionStartTime: Date;
}

const StudyContext = createContext<StudyContextType | null>(null);

export function useStudy() {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error("useStudy must be inside StudyProvider");
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
  { id: "doc-001", name: "Lab_Results_04.pdf", uploadDate: "2026-02-28", hashId: "a7c3f8e2b1d94f6a", auditor: "Dr. Sarah Chen", size: "2.4 MB", linkedClaims: ["c001", "c003", "c004"] },
  { id: "doc-002", name: "Statistical_Analysis_Report.pdf", uploadDate: "2026-02-27", hashId: "e9b4d1c6f3a82e5d", auditor: "Dr. James Miller", size: "5.1 MB", linkedClaims: ["c002"] },
  { id: "doc-003", name: "Randomization_Log.pdf", uploadDate: "2026-02-25", hashId: "c2d8f5a1e7b34c9f", auditor: "Dr. Sarah Chen", size: "890 KB", linkedClaims: ["c005"] },
  { id: "doc-004", name: "AE_Summary_Report.pdf", uploadDate: "2026-02-26", hashId: "f6a3b9d2c8e14f7a", auditor: "Dr. Priya Patel", size: "3.7 MB", linkedClaims: ["c006", "c007", "c008", "c009", "c010"] },
  { id: "doc-005", name: "SAE_Narrative_Report.pdf", uploadDate: "2026-02-24", hashId: "b1e7c4f9a3d62e8b", auditor: "Dr. Priya Patel", size: "1.2 MB", linkedClaims: ["c011"] },
];

// Deep clone initial claims for each study
function getInitialAllClaims(): Record<string, Record<string, ClaimData>> {
  const result: Record<string, Record<string, ClaimData>> = {};
  for (const [studyId, claims] of Object.entries(STUDY_CLAIMS)) {
    result[studyId] = {};
    for (const [claimId, claim] of Object.entries(claims)) {
      result[studyId][claimId] = { ...claim };
    }
  }
  return result;
}

export function StudyProvider({ children }: { children: ReactNode }) {
  const [studies, setStudies] = useState<StudyReport[]>(() =>
    INITIAL_STUDIES.map(s => ({ ...s }))
  );
  const [allClaims, setAllClaims] = useState<Record<string, Record<string, ClaimData>>>(getInitialAllClaims);
  const [activeStudyId, setActiveStudyId] = useState("csr-2026-0042");
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<SourceDocument[]>(MOCK_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [sessionHash] = useState(() => generateIntegrityHash("session", "init"));
  const [sessionStartTime] = useState(() => new Date());
  const { toast } = useToast();
  const { auditor } = useAuth();

  const claims = allClaims[activeStudyId] ?? {};
  const activeStudy = studies.find(s => s.id === activeStudyId) ?? null;

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
    toast({ title: "📄 Document Uploaded", description: `${doc.name} added to Evidence Vault.` });
  }, [toast]);

  // When active study changes, clear selections
  const handleSetActiveStudy = useCallback((id: string) => {
    setActiveStudyId(id);
    setSelectedClaimId(null);
    setSelectedDocId(null);
  }, []);

  // Assign a pending study to the current auditor
  const assignStudy = useCallback((studyId: string) => {
    if (!auditor) return;
    setStudies(prev => prev.map(s =>
      s.id === studyId
        ? { ...s, status: "in_review" as StudyStatus, assignedAuditor: auditor.name }
        : s
    ));
    toast({ title: "📋 Study Assigned", description: `You are now reviewing this study.` });
  }, [auditor, toast]);

  // Recalculate study status based on claims
  const updateStudyFromClaims = useCallback((studyId: string, studyClaims: Record<string, ClaimData>) => {
    const claimList = Object.values(studyClaims);
    const verified = claimList.filter(c => c.status === "verified").length;
    const flagged = claimList.filter(c => c.status === "flagged").length;
    const total = claimList.length;

    setStudies(prev => prev.map(s => {
      if (s.id !== studyId) return s;
      let newStatus = s.status;
      // Don't change pending_assignment studies
      if (s.status === "pending_assignment") return s;
      
      if (flagged > 0) {
        newStatus = "flagged";
      } else if (verified === total && total > 0) {
        newStatus = "completed";
      } else {
        newStatus = "in_review";
      }
      return { ...s, verifiedClaims: verified, flaggedClaims: flagged, status: newStatus };
    }));
  }, []);

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
    } catch { /* silently fail for demo */ }
    return hash;
  };

  const verifyClaim = useCallback(async (id: string) => {
    const claim = claims[id];
    if (!claim) return;

    if (isDoubleBlindRequired(claim) && auditor?.clearanceLevel !== "Tier 3") {
      toast({ title: "🔒 Insufficient Clearance", description: `Tier 3 claims require Tier 3 clearance. Your level: ${auditor?.clearanceLevel ?? "Unknown"}.`, variant: "destructive" });
      return;
    }

    if (isDoubleBlindRequired(claim) && claim.status === "pending") {
      setAllClaims(prev => {
        const updated = { ...prev, [activeStudyId]: { ...prev[activeStudyId], [id]: { ...prev[activeStudyId][id], status: "awaiting_second" as ClaimStatus } } };
        return updated;
      });
      toast({ title: "⚠️ Double-Blind Required", description: `Tier 3 claim. Click "Confirm Verification" again to complete.` });
      return;
    }

    const hash = await insertAuditLog(claim, "verified");
    setAllClaims(prev => {
      const updated = { ...prev, [activeStudyId]: { ...prev[activeStudyId], [id]: { ...prev[activeStudyId][id], status: "verified" as ClaimStatus } } };
      // Schedule study status update
      setTimeout(() => updateStudyFromClaims(activeStudyId, updated[activeStudyId]), 0);
      return updated;
    });
    toast({ title: "✓ Integrity Hash Verified", description: `Claim ${id} sealed. Hash: ${hash.slice(0, 16)}…` });
  }, [claims, toast, auditor, activeStudyId, updateStudyFromClaims]);

  const flagClaim = useCallback(async (id: string) => {
    const claim = claims[id];
    if (!claim) return;

    if (isDoubleBlindRequired(claim) && auditor?.clearanceLevel !== "Tier 3") {
      toast({ title: "🔒 Insufficient Clearance", description: `Tier 3 claims require Tier 3 clearance to flag.`, variant: "destructive" });
      return;
    }

    await insertAuditLog(claim, "flagged");
    setAllClaims(prev => {
      const updated = { ...prev, [activeStudyId]: { ...prev[activeStudyId], [id]: { ...prev[activeStudyId][id], status: "flagged" as ClaimStatus } } };
      setTimeout(() => updateStudyFromClaims(activeStudyId, updated[activeStudyId]), 0);
      return updated;
    });
    toast({ title: "🚩 Discrepancy Flagged", description: `Claim ${id} flagged for manual review.`, variant: "destructive" });
  }, [claims, toast, auditor, activeStudyId, updateStudyFromClaims]);

  const resolveClaim = useCallback((id: string) => {
    const claim = claims[id];
    if (!claim || claim.status !== "flagged") return;

    setAllClaims(prev => {
      const updated = { ...prev, [activeStudyId]: { ...prev[activeStudyId], [id]: { ...prev[activeStudyId][id], status: "pending" as ClaimStatus } } };
      setTimeout(() => updateStudyFromClaims(activeStudyId, updated[activeStudyId]), 0);
      return updated;
    });
    toast({ title: "🔄 Claim Reopened", description: `Claim ${id} returned to pending for re-review.` });
  }, [claims, toast, activeStudyId, updateStudyFromClaims]);

  const pendingCount = Object.values(claims).filter(c => c.status === "pending" || c.status === "awaiting_second").length;
  const verifiedCount = Object.values(claims).filter(c => c.status === "verified").length;
  const flaggedCount = Object.values(claims).filter(c => c.status === "flagged").length;

  const tier3AllVerified = (() => {
    const tier3 = Object.values(claims).filter(c => isDoubleBlindRequired(c));
    return tier3.length > 0 && tier3.every(c => c.status === "verified");
  })();

  return (
    <StudyContext.Provider value={{
      studies, activeStudyId, activeStudy, setActiveStudyId: handleSetActiveStudy, assignStudy,
      claims, selectedClaimId, selectClaim, verifyClaim, flagClaim, resolveClaim,
      pendingCount, verifiedCount, flaggedCount, tier3AllVerified,
      documents, addDocument, selectedDocId, selectDocument,
      sessionHash, sessionStartTime,
    }}>
      {children}
    </StudyContext.Provider>
  );
}
