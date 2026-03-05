export type ClaimTier = 1 | 2 | 3;

export type ClaimCategory = "efficacy" | "safety" | "adverse_event" | "patient_vitals" | "administrative";

export type ClaimStatus = "pending" | "verified" | "flagged" | "awaiting_second" | "overridden";

export interface ClaimData {
  id: string;
  value: string;
  category: ClaimCategory;
  tier: ClaimTier;
  status: ClaimStatus;
  confidence: number;
  sourceRef: string;
  sourceSnippet: string;
  section: string;
  verifiedBy?: string;
}

// Tier 3 categories require double-blind verification
export const TIER_3_CATEGORIES: ClaimCategory[] = ["adverse_event", "patient_vitals"];

export function isDoubleBlindRequired(claim: ClaimData): boolean {
  return claim.tier === 3 || TIER_3_CATEGORIES.includes(claim.category);
}

export const MOCK_CLAIMS: Record<string, ClaimData> = {
  c001: {
    id: "c001",
    value: "−1.4%",
    category: "efficacy",
    tier: 2,
    status: "pending",
    confidence: 98,
    sourceRef: "Lab_Results_04.pdf, Page 12",
    sourceSnippet: "Table 4.1: The mean change from baseline in HbA1c was −1.4% (SD ± 0.3) in the active treatment arm at the Week 24 visit. Statistical significance confirmed via ANCOVA model (p < 0.001).",
    section: "3.1 Primary Efficacy Analysis",
  },
  c002: {
    id: "c002",
    value: "−1.7, −1.1",
    category: "efficacy",
    tier: 2,
    status: "pending",
    confidence: 97,
    sourceRef: "Statistical_Analysis_Report.pdf, Page 28",
    sourceSnippet: "95% Confidence Interval for primary endpoint: Lower bound −1.7%, Upper bound −1.1%. Calculated using restricted maximum likelihood estimation.",
    section: "3.1 Primary Efficacy Analysis",
  },
  c003: {
    id: "c003",
    value: "62.3%",
    category: "efficacy",
    tier: 2,
    status: "pending",
    confidence: 95,
    sourceRef: "Lab_Results_04.pdf, Page 14",
    sourceSnippet: "Responder analysis: 62.3% of patients in the treatment group achieved HbA1c < 7.0% at Week 24, compared to 28.1% in the placebo group (OR = 4.21, p < 0.001).",
    section: "3.1 Primary Efficacy Analysis",
  },
  c004: {
    id: "c004",
    value: "28.1%",
    category: "efficacy",
    tier: 2,
    status: "pending",
    confidence: 95,
    sourceRef: "Lab_Results_04.pdf, Page 14",
    sourceSnippet: "Placebo arm responder rate: 28.1% achieved target HbA1c. See Table 4.3 for full stratification by baseline HbA1c category.",
    section: "3.1 Primary Efficacy Analysis",
  },
  c005: {
    id: "c005",
    value: "847 patients",
    category: "administrative",
    tier: 1,
    status: "pending",
    confidence: 100,
    sourceRef: "Randomization_Log.pdf, Page 1",
    sourceSnippet: "Total patients randomized: 847. Treatment arm: 424, Placebo arm: 423. All received at least one dose per modified ITT analysis set.",
    section: "3.2 Safety Summary",
  },
  c006: {
    id: "c006",
    value: "43.2%",
    category: "adverse_event",
    tier: 3,
    status: "pending",
    confidence: 82,
    sourceRef: "AE_Summary_Report.pdf, Page 7",
    sourceSnippet: "Treatment-emergent adverse events (TEAEs) were reported in 181 of 424 patients (43.2%) in the active treatment arm. Most were mild to moderate in severity (Grade 1–2). Note: numerator/denominator yields 42.7%, not 43.2%.",
    section: "3.2 Safety Summary",
  },
  c007: {
    id: "c007",
    value: "38.9%",
    category: "adverse_event",
    tier: 3,
    status: "pending",
    confidence: 93,
    sourceRef: "AE_Summary_Report.pdf, Page 7",
    sourceSnippet: "Placebo arm TEAEs: 164 of 423 patients (38.9%). No statistically significant difference between arms for overall AE incidence (p = 0.21).",
    section: "3.2 Safety Summary",
  },
  c008: {
    id: "c008",
    value: "8.7%",
    category: "adverse_event",
    tier: 3,
    status: "pending",
    confidence: 96,
    sourceRef: "AE_Summary_Report.pdf, Page 9",
    sourceSnippet: "Nausea was the most frequently reported TEAE in the treatment group: 37 of 424 patients (8.7%). Median onset: Day 14. Median duration: 5 days.",
    section: "3.2 Safety Summary",
  },
  c009: {
    id: "c009",
    value: "6.2%",
    category: "adverse_event",
    tier: 3,
    status: "pending",
    confidence: 97,
    sourceRef: "AE_Summary_Report.pdf, Page 9",
    sourceSnippet: "Headache: reported in 26 of 424 patients (6.2%) in the treatment arm vs 5.1% in the placebo arm. No dose-response relationship observed.",
    section: "3.2 Safety Summary",
  },
  c010: {
    id: "c010",
    value: "4.1%",
    category: "adverse_event",
    tier: 3,
    status: "pending",
    confidence: 99,
    sourceRef: "AE_Summary_Report.pdf, Page 10",
    sourceSnippet: "Injection site reactions: 17 of 424 patients (4.1%). All Grade 1 (mild). No discontinuations due to injection site reactions.",
    section: "3.2 Safety Summary",
  },
  c011: {
    id: "c011",
    value: "5.2%",
    category: "patient_vitals",
    tier: 3,
    status: "pending",
    confidence: 91,
    sourceRef: "SAE_Narrative_Report.pdf, Page 3",
    sourceSnippet: "Serious adverse events occurred in 22 of 424 patients (5.2%) in the treatment group. Events included: hospitalization for hypoglycemia (n=3), pancreatitis (n=1), cardiac events (n=2).",
    section: "3.3 Serious Adverse Events",
  },
};
