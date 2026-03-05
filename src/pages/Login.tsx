import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Shield, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, DEMO_AUDITORS } from "@/contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 800));

    const success = login(username, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid credentials. Enter any username to proceed.");
    }
    setIsLoading(false);
  };

  const handleQuickLogin = (key: string) => {
    login(key, "demo");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — branding */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex lg:w-[45%] bg-primary flex-col justify-between p-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="h-8 w-8 text-sidebar-primary" />
            <div>
              <h1 className="text-xl font-semibold text-primary-foreground">BioTrial Auditor</h1>
              <p className="text-[10px] font-data text-primary-foreground/50 tracking-widest">21 CFR PART 11 COMPLIANT</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative z-10 space-y-6"
        >
          <blockquote className="text-primary-foreground/80 text-sm leading-relaxed max-w-md">
            "Every AI-generated claim must have a human-verifiable traceability path.
            No exceptions."
          </blockquote>
          <p className="text-primary-foreground/40 text-xs font-data">
            — FDA/EMA Joint Framework on Good AI Practice, 2026
          </p>

          <div className="flex items-center gap-3 pt-6">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-sidebar-primary" />
              <span className="text-[10px] text-primary-foreground/60">Append-Only Ledger</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-sidebar-primary" />
              <span className="text-[10px] text-primary-foreground/60">Immutable Audit Trail</span>
            </div>
          </div>
        </motion.div>

        <div className="relative z-10">
          <p className="text-[10px] text-primary-foreground/30 font-data">
            Made by Daniel Olusheki for Lovable Buildathon 2026
          </p>
        </div>
      </motion.div>

      {/* Right panel — login form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        className="flex-1 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-4">
            <Activity className="h-6 w-6 text-amber-accent" />
            <h1 className="text-lg font-semibold text-foreground">BioTrial Auditor</h1>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Auditor Sign-In</h2>
            <p className="text-sm text-muted-foreground">
              Authenticate to access the Clinical Study Report workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs font-medium">Auditor ID</Label>
              <Input
                id="username"
                placeholder="dr.chen"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="font-data text-sm"
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-medium">Passphrase</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="font-data text-sm"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-destructive"
              >
                {error}
              </motion.p>
            )}

            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? (
                <span className="font-data text-xs">Authenticating…</span>
              ) : (
                <>
                  Authenticate
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Quick login for demo */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">Demo Quick Access</span>
              </div>
            </div>

            <div className="grid gap-2">
              {Object.entries(DEMO_AUDITORS).map(([key, auditor], index) => (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  onClick={() => handleQuickLogin(key)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-md border border-border bg-card hover:bg-muted/60 transition-colors text-left group"
                >
                  <div>
                    <p className="text-xs font-medium text-foreground">{auditor.name}</p>
                    <p className="text-[10px] text-muted-foreground">{auditor.role} • {auditor.department}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-data text-muted-foreground">{auditor.clearanceLevel}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;
