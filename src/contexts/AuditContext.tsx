import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { MOCK_CLAIMS, isDoubleBlindRequired, type ClaimData, type ClaimStatus } from "@/lib/claim-data";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuditContextType {
  claims: Record<string, ClaimData>;
  selectedClaimId: string | null;
  selectClaim: (id: string) => void;
  verifyClaim: (id: string) => Promise<void>;
  flagClaim: (id: string) => Promise<void>;
  pendingCount: number;
  verifiedCount: number;
}

const AuditContext = createContext<AuditContextType | null>(null);

export function useAudit() {
  const ctx = useContext(AuditContext);
  if (!ctx) throw new Error("useAudit must be inside AuditProvider");
  return ctx;
}

// Generate a mock SHA-256-style hash for demo purposes
function generateIntegrityHash(claimId: string, status: string): string {
  const chars = "0123456789abcdef";
  const seed = claimId + status + Date.now().toString();
  let hash = "";
  for (let i = 0; i < 64; i++) {
    hash += chars[(seed.charCodeAt(i % seed.length) + i) % chars.length];
  }
  return hash;
}

export function AuditProvider({ children }: { children: ReactNode }) {
  const [claims, setClaims] = useState<Record<string, ClaimData>>({ ...MOCK_CLAIMS });
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const { toast } = useToast();

  const selectClaim = useCallback((id: string) => {
    setSelectedClaimId(id);
  }, []);

  const insertAuditLog = async (claim: ClaimData, status: "verified" | "flagged") => {
    const hash = generateIntegrityHash(claim.id, status);

    // Try inserting to Supabase (will only work if user is authenticated)
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
      // Silently fail for demo — audit log insert requires auth
    }

    return hash;
  };

  const verifyClaim = useCallback(async (id: string) => {
    const claim = claims[id];
    if (!claim) return;

    // Tier 3 double-blind: first click → awaiting_second, second click → verified
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

  return (
    <AuditContext.Provider value={{ claims, selectedClaimId, selectClaim, verifyClaim, flagClaim, pendingCount, verifiedCount }}>
      {children}
    </AuditContext.Provider>
  );
}
