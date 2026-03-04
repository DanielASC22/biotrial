import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export interface Auditor {
  id: string;
  name: string;
  role: string;
  department: string;
  clearanceLevel: "Tier 1" | "Tier 2" | "Tier 3";
}

const DEMO_AUDITORS: Record<string, Auditor> = {
  "dr.chen": {
    id: "aud-001", name: "Dr. Sarah Chen", role: "Lead Clinical Reviewer",
    department: "Regulatory Affairs", clearanceLevel: "Tier 3",
  },
  "dr.miller": {
    id: "aud-002", name: "Dr. James Miller", role: "Biostatistician",
    department: "Data Sciences", clearanceLevel: "Tier 2",
  },
  "dr.patel": {
    id: "aud-003", name: "Dr. Priya Patel", role: "Safety Officer",
    department: "Pharmacovigilance", clearanceLevel: "Tier 3",
  },
};

interface AuthContextType {
  auditor: Auditor | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // No sessionStorage persistence — refresh always returns to login
  const [auditor, setAuditor] = useState<Auditor | null>(null);

  const login = useCallback((username: string, _password: string) => {
    const key = username.toLowerCase().replace(/\s/g, "");
    const found = DEMO_AUDITORS[key];
    if (found) {
      setAuditor(found);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setAuditor(null);
  }, []);

  return (
    <AuthContext.Provider value={{ auditor, isAuthenticated: !!auditor, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { DEMO_AUDITORS };
