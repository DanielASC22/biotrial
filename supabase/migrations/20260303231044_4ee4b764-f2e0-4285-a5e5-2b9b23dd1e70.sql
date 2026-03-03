-- Create enum for verification status
CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'flagged', 'overridden');

-- Create audit_logs table (append-only)
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  human_auditor_id UUID NOT NULL REFERENCES auth.users(id),
  claim_content TEXT NOT NULL,
  verification_status public.verification_status NOT NULL DEFAULT 'pending',
  source_link TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  integrity_hash TEXT
);

-- Enable RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to INSERT only
CREATE POLICY "Users can insert audit logs"
  ON public.audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = human_auditor_id);

-- Allow authenticated users to SELECT all logs
CREATE POLICY "Users can view audit logs"
  ON public.audit_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- No UPDATE or DELETE policies = append-only enforcement via RLS