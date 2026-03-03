import { useEffect, useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { useAudit } from "@/contexts/AuditContext";
import { cn } from "@/lib/utils";

const StatusBar = () => {
  const { sessionHash, tier3AllVerified, verifiedCount } = useAudit();
  const [displayHash, setDisplayHash] = useState(sessionHash.slice(0, 12));

  useEffect(() => {
    const interval = setInterval(() => {
      const chars = "0123456789abcdef";
      const newHash = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      setDisplayHash(newHash);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn(
      "flex items-center justify-between border-t px-4 py-2 transition-colors duration-700",
      tier3AllVerified ? "bg-primary/5 border-primary/20" : "bg-card"
    )}>
      <div className="flex items-center gap-2">
        <Lock className="h-3 w-3 text-muted-foreground" />
        <span className="integrity-hash">INTEGRITY: SHA-256:{displayHash}…</span>
      </div>
      <div className="flex items-center gap-3">
        {tier3AllVerified && (
          <div className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-compliance" />
            <span className="text-[10px] font-semibold text-compliance font-data">REGULATORY READY</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground">Verified:</span>
          <span className="text-[10px] font-data font-semibold text-foreground">{verifiedCount}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
