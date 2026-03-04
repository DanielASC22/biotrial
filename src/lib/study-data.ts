export type StudyPhase = "Phase I" | "Phase II" | "Phase III" | "Phase IV";
export type StudyStatus = "in_review" | "pending_assignment" | "completed" | "flagged";

export interface StudyReport {
  id: string;
  protocolId: string;
  title: string;
  sponsor: string;
  phase: StudyPhase;
  indication: string;
  status: StudyStatus;
  totalClaims: number;
  verifiedClaims: number;
  flaggedClaims: number;
  assignedAuditor: string;
  aiModel: string;
  generatedDate: string;
  dueDate: string;
  priority: "critical" | "high" | "standard";
}

export const MOCK_STUDIES: StudyReport[] = [
  {
    id: "csr-2026-0042",
    protocolId: "GLX-DM2-301",
    title: "Glucovex XR in Type 2 Diabetes — Pivotal Efficacy & Safety",
    sponsor: "Meridian Biopharma",
    phase: "Phase III",
    indication: "Type 2 Diabetes Mellitus",
    status: "in_review",
    totalClaims: 11,
    verifiedClaims: 0,
    flaggedClaims: 0,
    assignedAuditor: "Dr. Sarah Chen",
    aiModel: "BioScribe-4 (GPT-5 Fine-Tuned)",
    generatedDate: "2026-02-28",
    dueDate: "2026-03-15",
    priority: "critical",
  },
  {
    id: "csr-2026-0039",
    protocolId: "NVX-ONC-205",
    title: "Novaximab in HER2+ Breast Cancer — Dose Escalation",
    sponsor: "Apex Oncology",
    phase: "Phase II",
    indication: "HER2+ Metastatic Breast Cancer",
    status: "in_review",
    totalClaims: 18,
    verifiedClaims: 12,
    flaggedClaims: 2,
    assignedAuditor: "Dr. Priya Patel",
    aiModel: "BioScribe-4 (GPT-5 Fine-Tuned)",
    generatedDate: "2026-02-20",
    dueDate: "2026-03-10",
    priority: "critical",
  },
  {
    id: "csr-2026-0037",
    protocolId: "CRD-CV-108",
    title: "Cardiolift in Chronic Heart Failure — Long-term Outcomes",
    sponsor: "Corvin Therapeutics",
    phase: "Phase III",
    indication: "Chronic Heart Failure (HFrEF)",
    status: "pending_assignment",
    totalClaims: 24,
    verifiedClaims: 0,
    flaggedClaims: 0,
    assignedAuditor: "Unassigned",
    aiModel: "MedNarrator-2 (Gemini Pro)",
    generatedDate: "2026-03-01",
    dueDate: "2026-03-20",
    priority: "high",
  },
  {
    id: "csr-2026-0035",
    protocolId: "PSY-MDD-401",
    title: "Serenix in Treatment-Resistant Depression — Real-World Evidence",
    sponsor: "NeuraCure Labs",
    phase: "Phase IV",
    indication: "Major Depressive Disorder (TRD)",
    status: "pending_assignment",
    totalClaims: 15,
    verifiedClaims: 0,
    flaggedClaims: 0,
    assignedAuditor: "Unassigned",
    aiModel: "ClinReport-3 (Claude Opus)",
    generatedDate: "2026-03-02",
    dueDate: "2026-03-25",
    priority: "standard",
  },
  {
    id: "csr-2026-0031",
    protocolId: "IMM-RA-302",
    title: "Rheumavex in Rheumatoid Arthritis — Biologic-naïve Patients",
    sponsor: "Immunis Pharma",
    phase: "Phase III",
    indication: "Rheumatoid Arthritis",
    status: "completed",
    totalClaims: 20,
    verifiedClaims: 20,
    flaggedClaims: 0,
    assignedAuditor: "Dr. Sarah Chen",
    aiModel: "BioScribe-4 (GPT-5 Fine-Tuned)",
    generatedDate: "2026-02-10",
    dueDate: "2026-02-28",
    priority: "standard",
  },
  {
    id: "csr-2026-0028",
    protocolId: "HEP-NASH-201",
    title: "Livorex in Nonalcoholic Steatohepatitis — Histological Improvement",
    sponsor: "Hepagen Sciences",
    phase: "Phase II",
    indication: "NASH / MAFLD",
    status: "completed",
    totalClaims: 14,
    verifiedClaims: 13,
    flaggedClaims: 1,
    assignedAuditor: "Dr. James Miller",
    aiModel: "MedNarrator-2 (Gemini Pro)",
    generatedDate: "2026-01-28",
    dueDate: "2026-02-15",
    priority: "standard",
  },
  {
    id: "csr-2026-0044",
    protocolId: "PUL-COPD-104",
    title: "Bronchex Inhaler in COPD — Acute Exacerbation Prevention",
    sponsor: "AeroMed Devices",
    phase: "Phase I",
    indication: "Chronic Obstructive Pulmonary Disease",
    status: "flagged",
    totalClaims: 9,
    verifiedClaims: 3,
    flaggedClaims: 4,
    assignedAuditor: "Dr. Priya Patel",
    aiModel: "ClinReport-3 (Claude Opus)",
    generatedDate: "2026-02-22",
    dueDate: "2026-03-08",
    priority: "high",
  },
];

export const STATUS_CONFIG: Record<StudyStatus, { label: string; color: string }> = {
  in_review: { label: "In Review", color: "text-amber-accent" },
  pending_assignment: { label: "Pending Assignment", color: "text-muted-foreground" },
  completed: { label: "Completed", color: "text-compliance" },
  flagged: { label: "Flagged", color: "text-destructive" },
};

export const PRIORITY_CONFIG: Record<string, { label: string; dot: string }> = {
  critical: { label: "Critical", dot: "bg-destructive" },
  high: { label: "High", dot: "bg-amber-accent" },
  standard: { label: "Standard", dot: "bg-muted-foreground" },
};
