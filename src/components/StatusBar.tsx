import { useEffect, useState } from "react";
import { Lock } from "lucide-react";

const StatusBar = () => {
  const [hash, setHash] = useState("a3f8c2...");

  useEffect(() => {
    const interval = setInterval(() => {
      const chars = "0123456789abcdef";
      const newHash = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
      setHash(newHash + "...");
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between border-t bg-card px-4 py-2">
      <div className="flex items-center gap-2">
        <Lock className="h-3 w-3 text-muted-foreground" />
        <span className="integrity-hash">INTEGRITY: SHA-256:{hash}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Active Auditor:</span>
        <span className="text-xs font-data text-foreground">—</span>
      </div>
    </div>
  );
};

export default StatusBar;
