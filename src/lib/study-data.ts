import type { ClaimData } from "./claim-data";

export interface SourceDocument {
  id: string;
  name: string;
  uploadDate: string;
  hashId: string;
  auditor: string;
  size: string;
  linkedClaims: string[];
}

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

export const STUDY_CLAIMS: Record<string, Record<string, ClaimData>> = {
  "csr-2026-0042": {
    c001: { id: "c001", value: "−1.4%", category: "efficacy", tier: 2, status: "pending", confidence: 98, sourceRef: "Lab_Results_04.pdf, Page 12", sourceSnippet: "Table 4.1: The mean change from baseline in HbA1c was −1.4% (SD ± 0.3) in the active treatment arm at the Week 24 visit.", section: "3.1 Primary Efficacy Analysis" },
    c002: { id: "c002", value: "−1.7, −1.1", category: "efficacy", tier: 2, status: "pending", confidence: 97, sourceRef: "Statistical_Analysis_Report.pdf, Page 28", sourceSnippet: "95% Confidence Interval for primary endpoint: Lower bound −1.7%, Upper bound −1.1%.", section: "3.1 Primary Efficacy Analysis" },
    c003: { id: "c003", value: "62.3%", category: "efficacy", tier: 2, status: "pending", confidence: 95, sourceRef: "Lab_Results_04.pdf, Page 14", sourceSnippet: "Responder analysis: 62.3% of patients in the treatment group achieved HbA1c < 7.0% at Week 24.", section: "3.1 Primary Efficacy Analysis" },
    c004: { id: "c004", value: "28.1%", category: "efficacy", tier: 2, status: "pending", confidence: 95, sourceRef: "Lab_Results_04.pdf, Page 14", sourceSnippet: "Placebo arm responder rate: 28.1% achieved target HbA1c.", section: "3.1 Primary Efficacy Analysis" },
    c005: { id: "c005", value: "847 patients", category: "administrative", tier: 1, status: "pending", confidence: 100, sourceRef: "Randomization_Log.pdf, Page 1", sourceSnippet: "Total patients randomized: 847. Treatment arm: 424, Placebo arm: 423.", section: "3.2 Safety Summary" },
    c006: { id: "c006", value: "43.2%", category: "adverse_event", tier: 3, status: "pending", confidence: 94, sourceRef: "AE_Summary_Report.pdf, Page 7", sourceSnippet: "TEAEs were reported in 183 of 424 patients (43.2%) in the active treatment arm.", section: "3.2 Safety Summary" },
    c007: { id: "c007", value: "38.9%", category: "adverse_event", tier: 3, status: "pending", confidence: 93, sourceRef: "AE_Summary_Report.pdf, Page 7", sourceSnippet: "Placebo arm TEAEs: 164 of 423 patients (38.9%).", section: "3.2 Safety Summary" },
    c008: { id: "c008", value: "8.7%", category: "adverse_event", tier: 3, status: "pending", confidence: 96, sourceRef: "AE_Summary_Report.pdf, Page 9", sourceSnippet: "Nausea was the most frequently reported TEAE: 37 of 424 patients (8.7%).", section: "3.2 Safety Summary" },
    c009: { id: "c009", value: "6.2%", category: "adverse_event", tier: 3, status: "pending", confidence: 97, sourceRef: "AE_Summary_Report.pdf, Page 9", sourceSnippet: "Headache: reported in 26 of 424 patients (6.2%) in the treatment arm.", section: "3.2 Safety Summary" },
    c010: { id: "c010", value: "4.1%", category: "adverse_event", tier: 3, status: "pending", confidence: 99, sourceRef: "AE_Summary_Report.pdf, Page 10", sourceSnippet: "Injection site reactions: 17 of 424 patients (4.1%). All Grade 1.", section: "3.2 Safety Summary" },
    c011: { id: "c011", value: "5.2%", category: "patient_vitals", tier: 3, status: "pending", confidence: 91, sourceRef: "SAE_Narrative_Report.pdf, Page 3", sourceSnippet: "Serious adverse events occurred in 22 of 424 patients (5.2%).", section: "3.3 Serious Adverse Events" },
  },

  "csr-2026-0039": {
    n001: { id: "n001", value: "42%", category: "efficacy", tier: 2, status: "verified", confidence: 96, sourceRef: "ORR_Analysis.pdf, Page 8", sourceSnippet: "Objective response rate (ORR) was 42% (95% CI: 33–51%) in the evaluable population by RECIST v1.1.", section: "4.1 Tumor Response", verifiedBy: "Dr. Priya Patel" },
    n002: { id: "n002", value: "8.4 months", category: "efficacy", tier: 2, status: "verified", confidence: 97, sourceRef: "PFS_Kaplan_Meier.pdf, Page 3", sourceSnippet: "Median progression-free survival was 8.4 months (95% CI: 6.9–10.1).", section: "4.1 Tumor Response", verifiedBy: "Dr. Priya Patel" },
    n003: { id: "n003", value: "14.2 months", category: "efficacy", tier: 2, status: "verified", confidence: 94, sourceRef: "OS_Interim.pdf, Page 11", sourceSnippet: "Median overall survival was 14.2 months at interim analysis (data cutoff: Jan 2026).", section: "4.2 Overall Survival", verifiedBy: "Dr. James Miller" },
    n004: { id: "n004", value: "12%", category: "efficacy", tier: 2, status: "verified", confidence: 93, sourceRef: "ORR_Analysis.pdf, Page 10", sourceSnippet: "Complete response (CR) rate was 12% (15 of 125 evaluable patients).", section: "4.1 Tumor Response", verifiedBy: "Dr. Priya Patel" },
    n005: { id: "n005", value: "125 patients", category: "administrative", tier: 1, status: "verified", confidence: 100, sourceRef: "Enrollment_Log.pdf, Page 1", sourceSnippet: "125 patients enrolled across 18 sites. Dose levels: 3mg/kg (n=42), 6mg/kg (n=42), 10mg/kg (n=41).", section: "4.3 Dose Escalation", verifiedBy: "Dr. Sarah Chen" },
    n006: { id: "n006", value: "67%", category: "adverse_event", tier: 3, status: "verified", confidence: 92, sourceRef: "Safety_Summary_NVX.pdf, Page 5", sourceSnippet: "Treatment-related AEs occurred in 67% of patients. Most common: fatigue (32%), diarrhea (24%).", section: "4.4 Safety Profile", verifiedBy: "Dr. Priya Patel" },
    n007: { id: "n007", value: "3mg/kg", category: "efficacy", tier: 2, status: "verified", confidence: 98, sourceRef: "DLT_Report.pdf, Page 7", sourceSnippet: "Recommended Phase 2 dose (RP2D) determined as 3mg/kg based on DLT assessment.", section: "4.3 Dose Escalation", verifiedBy: "Dr. James Miller" },
    n008: { id: "n008", value: "18%", category: "adverse_event", tier: 3, status: "verified", confidence: 90, sourceRef: "Safety_Summary_NVX.pdf, Page 8", sourceSnippet: "Grade ≥3 AEs occurred in 18% of all treated patients.", section: "4.4 Safety Profile", verifiedBy: "Dr. Priya Patel" },
    n009: { id: "n009", value: "4.8%", category: "patient_vitals", tier: 3, status: "verified", confidence: 89, sourceRef: "Cardiac_Monitoring.pdf, Page 4", sourceSnippet: "QTcF prolongation >60ms from baseline observed in 6 of 125 patients (4.8%).", section: "4.5 Cardiac Safety", verifiedBy: "Dr. Sarah Chen" },
    n010: { id: "n010", value: "2 DLTs", category: "adverse_event", tier: 3, status: "verified", confidence: 95, sourceRef: "DLT_Report.pdf, Page 3", sourceSnippet: "Two dose-limiting toxicities observed at 10mg/kg: Grade 4 neutropenia (n=1), Grade 3 hepatotoxicity (n=1).", section: "4.3 Dose Escalation", verifiedBy: "Dr. Priya Patel" },
    n011: { id: "n011", value: "HER2 3+", category: "efficacy", tier: 2, status: "verified", confidence: 99, sourceRef: "Biomarker_Report.pdf, Page 6", sourceSnippet: "HER2 3+ by IHC was required for enrollment. Concordance with FISH: 96%.", section: "4.6 Biomarker Analysis", verifiedBy: "Dr. James Miller" },
    n012: { id: "n012", value: "76%", category: "efficacy", tier: 2, status: "verified", confidence: 91, sourceRef: "DCR_Analysis.pdf, Page 2", sourceSnippet: "Disease control rate (DCR) was 76% (CR+PR+SD ≥ 24 weeks).", section: "4.1 Tumor Response", verifiedBy: "Dr. Priya Patel" },
    n013: { id: "n013", value: "8.2%", category: "adverse_event", tier: 3, status: "flagged", confidence: 78, sourceRef: "Safety_Summary_NVX.pdf, Page 12", sourceSnippet: "Infusion-related reactions reported in 8.2% of patients. Note: discrepancy with source table showing 10.4%.", section: "4.4 Safety Profile", verifiedBy: "Dr. James Miller" },
    n014: { id: "n014", value: "3.2%", category: "patient_vitals", tier: 3, status: "flagged", confidence: 72, sourceRef: "Lab_Abnormalities.pdf, Page 9", sourceSnippet: "Grade 4 lab abnormalities: 3.2%. Cross-reference with narratives shows 4 events not captured.", section: "4.4 Safety Profile", verifiedBy: "Dr. Sarah Chen" },
    n015: { id: "n015", value: "5.6 months", category: "efficacy", tier: 2, status: "pending", confidence: 94, sourceRef: "DOR_Analysis.pdf, Page 5", sourceSnippet: "Median duration of response was 5.6 months (range: 1.4–14.8).", section: "4.1 Tumor Response" },
    n016: { id: "n016", value: "28 days", category: "administrative", tier: 1, status: "pending", confidence: 100, sourceRef: "Protocol_v4.pdf, Page 22", sourceSnippet: "DLT observation period: 28 days from first dose at each dose level.", section: "4.3 Dose Escalation" },
    n017: { id: "n017", value: "92%", category: "administrative", tier: 1, status: "pending", confidence: 98, sourceRef: "Compliance_Log.pdf, Page 1", sourceSnippet: "Treatment compliance rate: 92% across all dose cohorts.", section: "4.7 Treatment Compliance" },
    n018: { id: "n018", value: "3 deaths", category: "patient_vitals", tier: 3, status: "pending", confidence: 88, sourceRef: "SAE_Narratives_NVX.pdf, Page 1", sourceSnippet: "Three on-study deaths: disease progression (n=2), cardiac arrest (n=1, deemed unrelated).", section: "4.5 Cardiac Safety" },
  },

  "csr-2026-0037": {
    h001: { id: "h001", value: "−2.1 mL/kg/min", category: "efficacy", tier: 2, status: "pending", confidence: 95, sourceRef: "CPET_Results.pdf, Page 14", sourceSnippet: "Mean change in peak VO2 from baseline was −2.1 mL/kg/min (95% CI: −3.0, −1.2).", section: "5.1 Exercise Capacity" },
    h002: { id: "h002", value: "18.2%", category: "efficacy", tier: 2, status: "pending", confidence: 93, sourceRef: "HF_Hospitalization.pdf, Page 6", sourceSnippet: "Heart failure hospitalization rate at 12 months: 18.2% in treatment arm vs 26.7% in placebo.", section: "5.2 Hospitalization Outcomes" },
    h003: { id: "h003", value: "LVEF +4.3%", category: "patient_vitals", tier: 3, status: "pending", confidence: 96, sourceRef: "Echo_Summary.pdf, Page 8", sourceSnippet: "Mean improvement in LVEF: +4.3% from baseline (SD ± 2.1) at Week 52.", section: "5.3 Cardiac Function" },
    h004: { id: "h004", value: "NT-proBNP −32%", category: "patient_vitals", tier: 3, status: "pending", confidence: 94, sourceRef: "Biomarker_Panel.pdf, Page 3", sourceSnippet: "NT-proBNP decreased by 32% from baseline in the treatment group (geometric mean ratio: 0.68).", section: "5.3 Cardiac Function" },
    h005: { id: "h005", value: "1,204 patients", category: "administrative", tier: 1, status: "pending", confidence: 100, sourceRef: "Randomization_CRD.pdf, Page 1", sourceSnippet: "Total randomized: 1,204. Treatment: 602, Placebo: 602. Modified ITT: 1,189.", section: "5.1 Exercise Capacity" },
    h006: { id: "h006", value: "HR 0.72", category: "efficacy", tier: 2, status: "pending", confidence: 97, sourceRef: "CV_Death_Analysis.pdf, Page 11", sourceSnippet: "Hazard ratio for cardiovascular death or HF hospitalization: 0.72 (95% CI: 0.59–0.88, p=0.001).", section: "5.2 Hospitalization Outcomes" },
    h007: { id: "h007", value: "8.4%", category: "adverse_event", tier: 3, status: "pending", confidence: 92, sourceRef: "AE_Cardiac.pdf, Page 5", sourceSnippet: "Symptomatic hypotension reported in 8.4% of treatment group vs 3.1% in placebo.", section: "5.4 Safety" },
    h008: { id: "h008", value: "2.9%", category: "adverse_event", tier: 3, status: "pending", confidence: 94, sourceRef: "AE_Cardiac.pdf, Page 7", sourceSnippet: "Hyperkalemia (K+ >6.0 mmol/L): 2.9% in treatment arm. Two patients required dose adjustment.", section: "5.4 Safety" },
    h009: { id: "h009", value: "eGFR −3.2", category: "patient_vitals", tier: 3, status: "pending", confidence: 91, sourceRef: "Renal_Monitoring.pdf, Page 4", sourceSnippet: "Mean change in eGFR at 12 months: −3.2 mL/min/1.73m² (not clinically significant).", section: "5.5 Renal Function" },
    h010: { id: "h010", value: "NYHA I–II: 71%", category: "efficacy", tier: 2, status: "pending", confidence: 96, sourceRef: "NYHA_Shift.pdf, Page 2", sourceSnippet: "71% of patients improved to NYHA Class I–II at Week 52, vs 54% in placebo.", section: "5.3 Cardiac Function" },
    h011: { id: "h011", value: "KCCQ +8.4", category: "efficacy", tier: 2, status: "pending", confidence: 93, sourceRef: "PRO_Report.pdf, Page 6", sourceSnippet: "Mean improvement in KCCQ-TSS from baseline: +8.4 points (MCID: 5 points).", section: "5.6 Patient-Reported Outcomes" },
    h012: { id: "h012", value: "6MWD +34m", category: "efficacy", tier: 2, status: "pending", confidence: 95, sourceRef: "Walk_Test.pdf, Page 3", sourceSnippet: "Six-minute walk distance improved by 34 meters in the treatment group (p=0.003).", section: "5.1 Exercise Capacity" },
    h013: { id: "h013", value: "5.1%", category: "adverse_event", tier: 3, status: "pending", confidence: 90, sourceRef: "SAE_Cardiac.pdf, Page 2", sourceSnippet: "SAEs occurred in 5.1% of treatment group: acute decompensation (n=12), arrhythmia (n=8).", section: "5.4 Safety" },
    h014: { id: "h014", value: "All-cause mortality 7.2%", category: "patient_vitals", tier: 3, status: "pending", confidence: 88, sourceRef: "Mortality_Analysis.pdf, Page 1", sourceSnippet: "All-cause mortality at 12 months: 7.2% treatment vs 10.1% placebo (HR 0.69, p=0.04).", section: "5.2 Hospitalization Outcomes" },
    h015: { id: "h015", value: "BP −6/−3 mmHg", category: "patient_vitals", tier: 3, status: "pending", confidence: 97, sourceRef: "Vitals_Summary.pdf, Page 5", sourceSnippet: "Mean reduction in SBP/DBP: −6/−3 mmHg from baseline. No syncope events reported.", section: "5.4 Safety" },
    h016: { id: "h016", value: "Compliance 89%", category: "administrative", tier: 1, status: "pending", confidence: 99, sourceRef: "Drug_Accountability.pdf, Page 2", sourceSnippet: "Overall treatment compliance: 89%. Dose interruptions in 14% of patients.", section: "5.7 Treatment Compliance" },
    h017: { id: "h017", value: "52 weeks", category: "administrative", tier: 1, status: "pending", confidence: 100, sourceRef: "Protocol_CRD.pdf, Page 8", sourceSnippet: "Primary analysis timepoint: 52 weeks. Extension study ongoing for long-term outcomes.", section: "5.1 Exercise Capacity" },
    h018: { id: "h018", value: "Subgroup: DM +", category: "efficacy", tier: 2, status: "pending", confidence: 92, sourceRef: "Subgroup_Forest.pdf, Page 3", sourceSnippet: "Diabetic subgroup showed enhanced benefit: HR 0.61 (95% CI: 0.44–0.85).", section: "5.8 Subgroup Analyses" },
    h019: { id: "h019", value: "ICD events −41%", category: "patient_vitals", tier: 3, status: "pending", confidence: 89, sourceRef: "Device_Report.pdf, Page 7", sourceSnippet: "ICD-detected arrhythmic events reduced by 41% in patients with implanted devices (n=187).", section: "5.3 Cardiac Function" },
    h020: { id: "h020", value: "BNP <100: 38%", category: "patient_vitals", tier: 3, status: "pending", confidence: 93, sourceRef: "Biomarker_Panel.pdf, Page 8", sourceSnippet: "38% of treatment group achieved BNP <100 pg/mL at 12 months vs 19% placebo.", section: "5.3 Cardiac Function" },
    h021: { id: "h021", value: "Weight −1.8kg", category: "patient_vitals", tier: 3, status: "pending", confidence: 96, sourceRef: "Vitals_Summary.pdf, Page 9", sourceSnippet: "Mean weight change: −1.8 kg (reflecting fluid loss). No cases of dehydration.", section: "5.4 Safety" },
    h022: { id: "h022", value: "QoL NNT=6", category: "efficacy", tier: 2, status: "pending", confidence: 90, sourceRef: "NNT_Calculations.pdf, Page 2", sourceSnippet: "NNT for clinically meaningful QoL improvement (KCCQ ≥5 pts): 6 patients.", section: "5.6 Patient-Reported Outcomes" },
    h023: { id: "h023", value: "Diuretic ↓ 23%", category: "efficacy", tier: 2, status: "pending", confidence: 94, sourceRef: "Concomitant_Meds.pdf, Page 4", sourceSnippet: "23% of treatment patients had loop diuretic dose reduced vs 8% placebo.", section: "5.7 Treatment Compliance" },
    h024: { id: "h024", value: "Readmission −28%", category: "efficacy", tier: 2, status: "pending", confidence: 95, sourceRef: "Readmission_Analysis.pdf, Page 1", sourceSnippet: "30-day readmission rate reduced by 28% in treatment group (p=0.01).", section: "5.2 Hospitalization Outcomes" },
  },

  "csr-2026-0035": {
    s001: { id: "s001", value: "MADRS −12.4", category: "efficacy", tier: 2, status: "pending", confidence: 94, sourceRef: "MADRS_Analysis.pdf, Page 5", sourceSnippet: "Mean change in MADRS total score from baseline: −12.4 points (SD ± 4.8).", section: "6.1 Primary Endpoint" },
    s002: { id: "s002", value: "Response 48%", category: "efficacy", tier: 2, status: "pending", confidence: 93, sourceRef: "Responder_Analysis.pdf, Page 3", sourceSnippet: "Response rate (≥50% reduction in MADRS): 48% vs 22% with standard care.", section: "6.1 Primary Endpoint" },
    s003: { id: "s003", value: "Remission 31%", category: "efficacy", tier: 2, status: "pending", confidence: 91, sourceRef: "Responder_Analysis.pdf, Page 5", sourceSnippet: "Remission rate (MADRS ≤10): 31% in Serenix group vs 14% standard care.", section: "6.1 Primary Endpoint" },
    s004: { id: "s004", value: "2,847 patients", category: "administrative", tier: 1, status: "pending", confidence: 100, sourceRef: "RWE_Enrollment.pdf, Page 1", sourceSnippet: "Real-world evidence cohort: 2,847 patients across 42 sites. Mean treatment duration: 8.2 months.", section: "6.2 Study Population" },
    s005: { id: "s005", value: "Suicidality 1.2%", category: "patient_vitals", tier: 3, status: "pending", confidence: 87, sourceRef: "C-SSRS_Report.pdf, Page 8", sourceSnippet: "Suicidal ideation (C-SSRS): 1.2% treatment vs 2.1% standard care. No completed suicides.", section: "6.3 Safety Monitoring" },
    s006: { id: "s006", value: "Weight +2.3kg", category: "patient_vitals", tier: 3, status: "pending", confidence: 95, sourceRef: "Metabolic_Panel.pdf, Page 4", sourceSnippet: "Mean weight gain at 6 months: +2.3 kg. 8% of patients gained >7% body weight.", section: "6.4 Metabolic Effects" },
    s007: { id: "s007", value: "Discontinuation 18%", category: "adverse_event", tier: 3, status: "pending", confidence: 92, sourceRef: "Discontinuation_Log.pdf, Page 2", sourceSnippet: "Treatment discontinuation due to AEs: 18%. Most common: sedation (6%), GI disturbance (5%).", section: "6.3 Safety Monitoring" },
    s008: { id: "s008", value: "CGI-S improved 62%", category: "efficacy", tier: 2, status: "pending", confidence: 93, sourceRef: "CGI_Analysis.pdf, Page 3", sourceSnippet: "62% of patients showed CGI-S improvement of ≥1 point at 6 months.", section: "6.1 Primary Endpoint" },
    s009: { id: "s009", value: "PHQ-9 −8.1", category: "efficacy", tier: 2, status: "pending", confidence: 94, sourceRef: "PRO_Depression.pdf, Page 6", sourceSnippet: "Patient-reported PHQ-9 score change from baseline: −8.1 (MCID: 5 points).", section: "6.5 Patient-Reported Outcomes" },
    s010: { id: "s010", value: "Sleep quality +34%", category: "efficacy", tier: 2, status: "pending", confidence: 90, sourceRef: "PSQI_Report.pdf, Page 4", sourceSnippet: "PSQI global score improved by 34% from baseline. Sleep onset latency reduced by 22 minutes.", section: "6.5 Patient-Reported Outcomes" },
    s011: { id: "s011", value: "QTc unchanged", category: "patient_vitals", tier: 3, status: "pending", confidence: 98, sourceRef: "ECG_Monitoring.pdf, Page 2", sourceSnippet: "No clinically significant QTc prolongation observed. Mean ΔQTcF: +2.1ms (not significant).", section: "6.3 Safety Monitoring" },
    s012: { id: "s012", value: "Prior failures: 2.8", category: "administrative", tier: 1, status: "pending", confidence: 99, sourceRef: "Baseline_Chars.pdf, Page 3", sourceSnippet: "Mean number of prior antidepressant failures: 2.8 (range 2–7). All patients met TRD criteria.", section: "6.2 Study Population" },
    s013: { id: "s013", value: "Anxiety −22%", category: "efficacy", tier: 2, status: "pending", confidence: 91, sourceRef: "HAM-A_Analysis.pdf, Page 5", sourceSnippet: "HAM-A score reduced by 22% from baseline. Comorbid anxiety present in 64% of cohort.", section: "6.5 Patient-Reported Outcomes" },
    s014: { id: "s014", value: "Sexual dysfunction 14%", category: "adverse_event", tier: 3, status: "pending", confidence: 89, sourceRef: "ASEX_Report.pdf, Page 3", sourceSnippet: "Treatment-emergent sexual dysfunction reported in 14% of patients (ASEX scale).", section: "6.4 Metabolic Effects" },
    s015: { id: "s015", value: "Healthcare cost −$4,200", category: "administrative", tier: 1, status: "pending", confidence: 88, sourceRef: "HEOR_Analysis.pdf, Page 7", sourceSnippet: "Annualized healthcare cost reduction: $4,200 per patient vs standard care.", section: "6.6 Health Economics" },
  },

  "csr-2026-0031": {
    r001: { id: "r001", value: "ACR50 48%", category: "efficacy", tier: 2, status: "verified", confidence: 97, sourceRef: "ACR_Response.pdf, Page 8", sourceSnippet: "ACR50 response rate at Week 24: 48% vs 18% placebo.", section: "7.1 Clinical Response", verifiedBy: "Dr. Sarah Chen" },
    r002: { id: "r002", value: "DAS28 −2.4", category: "efficacy", tier: 2, status: "verified", confidence: 96, sourceRef: "DAS28_Analysis.pdf, Page 5", sourceSnippet: "Mean change in DAS28-CRP from baseline: −2.4 (SD ± 0.9).", section: "7.1 Clinical Response", verifiedBy: "Dr. Sarah Chen" },
    r003: { id: "r003", value: "HAQ-DI −0.6", category: "efficacy", tier: 2, status: "verified", confidence: 95, sourceRef: "PRO_RA.pdf, Page 4", sourceSnippet: "HAQ-DI improvement from baseline: −0.6 (MCID: −0.22).", section: "7.2 Physical Function", verifiedBy: "Dr. James Miller" },
    r004: { id: "r004", value: "620 patients", category: "administrative", tier: 1, status: "verified", confidence: 100, sourceRef: "Randomization_IMM.pdf, Page 1", sourceSnippet: "620 biologic-naïve patients randomized 1:1. All received background methotrexate.", section: "7.1 Clinical Response", verifiedBy: "Dr. James Miller" },
    r005: { id: "r005", value: "mTSS 0.2", category: "efficacy", tier: 2, status: "verified", confidence: 94, sourceRef: "Radiographic_Report.pdf, Page 11", sourceSnippet: "Mean change in mTSS: 0.2 vs 1.8 placebo (p<0.001). Radiographic progression inhibited.", section: "7.3 Structural Outcomes", verifiedBy: "Dr. Sarah Chen" },
    r006: { id: "r006", value: "Infections 12%", category: "adverse_event", tier: 3, status: "verified", confidence: 93, sourceRef: "Infection_Report.pdf, Page 3", sourceSnippet: "Serious infections: 12% in treatment group vs 8% placebo. UTI and pneumonia most common.", section: "7.4 Safety", verifiedBy: "Dr. Priya Patel" },
    r007: { id: "r007", value: "CRP −68%", category: "patient_vitals", tier: 3, status: "verified", confidence: 96, sourceRef: "Biomarker_RA.pdf, Page 5", sourceSnippet: "CRP reduced by 68% from baseline (geometric mean ratio: 0.32). Rapid onset by Week 4.", section: "7.1 Clinical Response", verifiedBy: "Dr. Sarah Chen" },
    r008: { id: "r008", value: "Boolean remission 22%", category: "efficacy", tier: 2, status: "verified", confidence: 92, sourceRef: "Remission_Analysis.pdf, Page 7", sourceSnippet: "Boolean (ACR/EULAR) remission achieved by 22% of treatment group at Week 52.", section: "7.1 Clinical Response", verifiedBy: "Dr. James Miller" },
    r009: { id: "r009", value: "Morning stiffness −45min", category: "efficacy", tier: 2, status: "verified", confidence: 94, sourceRef: "PRO_RA.pdf, Page 8", sourceSnippet: "Mean reduction in duration of morning stiffness: 45 minutes from baseline.", section: "7.2 Physical Function", verifiedBy: "Dr. Sarah Chen" },
    r010: { id: "r010", value: "ADA formation 4.2%", category: "safety", tier: 2, status: "verified", confidence: 97, sourceRef: "Immunogenicity.pdf, Page 3", sourceSnippet: "Anti-drug antibody (ADA) formation: 4.2%. No correlation with efficacy loss or AEs.", section: "7.4 Safety", verifiedBy: "Dr. Priya Patel" },
    r011: { id: "r011", value: "Hepatotoxicity 1.6%", category: "adverse_event", tier: 3, status: "verified", confidence: 95, sourceRef: "Liver_Safety.pdf, Page 5", sourceSnippet: "ALT >3× ULN: 1.6%. One case of drug-induced liver injury (resolved).", section: "7.4 Safety", verifiedBy: "Dr. Priya Patel" },
    r012: { id: "r012", value: "TB screening 100%", category: "administrative", tier: 1, status: "verified", confidence: 100, sourceRef: "Screening_Log.pdf, Page 1", sourceSnippet: "TB screening completed for 100% of patients prior to treatment initiation.", section: "7.4 Safety", verifiedBy: "Dr. James Miller" },
    r013: { id: "r013", value: "Tender joints −14", category: "efficacy", tier: 2, status: "verified", confidence: 95, sourceRef: "Joint_Counts.pdf, Page 6", sourceSnippet: "Mean reduction in tender joint count (68): −14 from baseline (SD ± 6.2).", section: "7.1 Clinical Response", verifiedBy: "Dr. Sarah Chen" },
    r014: { id: "r014", value: "Swollen joints −10", category: "efficacy", tier: 2, status: "verified", confidence: 95, sourceRef: "Joint_Counts.pdf, Page 7", sourceSnippet: "Mean reduction in swollen joint count (66): −10 from baseline (SD ± 4.8).", section: "7.1 Clinical Response", verifiedBy: "Dr. James Miller" },
    r015: { id: "r015", value: "Patient global −32mm", category: "efficacy", tier: 2, status: "verified", confidence: 93, sourceRef: "PRO_RA.pdf, Page 10", sourceSnippet: "Patient global assessment (VAS): reduced by 32mm from baseline.", section: "7.2 Physical Function", verifiedBy: "Dr. Sarah Chen" },
    r016: { id: "r016", value: "Fatigue −28%", category: "efficacy", tier: 2, status: "verified", confidence: 91, sourceRef: "FACIT_Fatigue.pdf, Page 4", sourceSnippet: "FACIT-Fatigue score improved by 28% from baseline (MCID: 3 points).", section: "7.2 Physical Function", verifiedBy: "Dr. Priya Patel" },
    r017: { id: "r017", value: "Injection site 6.1%", category: "adverse_event", tier: 3, status: "verified", confidence: 98, sourceRef: "Local_Reactions.pdf, Page 2", sourceSnippet: "Injection site reactions: 6.1%. All mild (Grade 1). No discontinuations.", section: "7.4 Safety", verifiedBy: "Dr. Priya Patel" },
    r018: { id: "r018", value: "Neutropenia 3.5%", category: "adverse_event", tier: 3, status: "verified", confidence: 94, sourceRef: "Hematology.pdf, Page 6", sourceSnippet: "Neutropenia (ANC <1.5): 3.5% treatment vs 0.6% placebo. No febrile neutropenia.", section: "7.4 Safety", verifiedBy: "Dr. Sarah Chen" },
    r019: { id: "r019", value: "Work productivity +18%", category: "efficacy", tier: 2, status: "verified", confidence: 90, sourceRef: "WPAI_Report.pdf, Page 3", sourceSnippet: "Work productivity improved by 18% (WPAI questionnaire) from baseline.", section: "7.2 Physical Function", verifiedBy: "Dr. James Miller" },
    r020: { id: "r020", value: "52-week retention 84%", category: "administrative", tier: 1, status: "verified", confidence: 99, sourceRef: "Retention_Analysis.pdf, Page 1", sourceSnippet: "Treatment retention at 52 weeks: 84%. Main reason for discontinuation: patient choice (8%).", section: "7.5 Treatment Persistence", verifiedBy: "Dr. Sarah Chen" },
  },

  "csr-2026-0028": {
    l001: { id: "l001", value: "NAS −2.1", category: "efficacy", tier: 2, status: "verified", confidence: 96, sourceRef: "Histology_Report.pdf, Page 8", sourceSnippet: "Mean reduction in NAS from baseline: −2.1 points (SD ± 1.3). Histological improvement in 42%.", section: "8.1 Histological Endpoints", verifiedBy: "Dr. James Miller" },
    l002: { id: "l002", value: "Fibrosis stable 78%", category: "efficacy", tier: 2, status: "verified", confidence: 94, sourceRef: "Fibrosis_Staging.pdf, Page 5", sourceSnippet: "78% of patients had no fibrosis progression (≥1 stage worsening) at Week 52.", section: "8.1 Histological Endpoints", verifiedBy: "Dr. Sarah Chen" },
    l003: { id: "l003", value: "ALT normalized 56%", category: "patient_vitals", tier: 3, status: "verified", confidence: 95, sourceRef: "LFT_Analysis.pdf, Page 3", sourceSnippet: "ALT normalization achieved in 56% of treatment group vs 24% placebo.", section: "8.2 Liver Biochemistry", verifiedBy: "Dr. Priya Patel" },
    l004: { id: "l004", value: "380 patients", category: "administrative", tier: 1, status: "verified", confidence: 100, sourceRef: "Enrollment_HEP.pdf, Page 1", sourceSnippet: "380 patients with biopsy-confirmed NASH enrolled. Fibrosis stages F1–F3.", section: "8.1 Histological Endpoints", verifiedBy: "Dr. James Miller" },
    l005: { id: "l005", value: "Steatosis −31%", category: "efficacy", tier: 2, status: "verified", confidence: 93, sourceRef: "MRI_PDFF.pdf, Page 6", sourceSnippet: "Hepatic fat fraction by MRI-PDFF reduced by 31% from baseline.", section: "8.1 Histological Endpoints", verifiedBy: "Dr. James Miller" },
    l006: { id: "l006", value: "GI AEs 34%", category: "adverse_event", tier: 3, status: "verified", confidence: 92, sourceRef: "AE_Summary_HEP.pdf, Page 4", sourceSnippet: "Gastrointestinal AEs in 34% of treatment group: diarrhea (18%), nausea (12%), abdominal pain (8%).", section: "8.3 Safety", verifiedBy: "Dr. Priya Patel" },
    l007: { id: "l007", value: "Weight −4.2kg", category: "patient_vitals", tier: 3, status: "verified", confidence: 96, sourceRef: "Body_Comp.pdf, Page 3", sourceSnippet: "Mean weight loss: −4.2 kg at 52 weeks. Greater loss in patients with BMI >35.", section: "8.4 Metabolic Parameters", verifiedBy: "Dr. Sarah Chen" },
    l008: { id: "l008", value: "HbA1c −0.4%", category: "patient_vitals", tier: 3, status: "verified", confidence: 94, sourceRef: "Metabolic_HEP.pdf, Page 5", sourceSnippet: "HbA1c change in diabetic subgroup (n=142): −0.4% from baseline.", section: "8.4 Metabolic Parameters", verifiedBy: "Dr. James Miller" },
    l009: { id: "l009", value: "Liver stiffness −2.1kPa", category: "efficacy", tier: 2, status: "verified", confidence: 93, sourceRef: "Elastography.pdf, Page 4", sourceSnippet: "Liver stiffness by FibroScan decreased by 2.1 kPa from baseline (p=0.008).", section: "8.1 Histological Endpoints", verifiedBy: "Dr. Sarah Chen" },
    l010: { id: "l010", value: "Triglycerides −18%", category: "patient_vitals", tier: 3, status: "verified", confidence: 95, sourceRef: "Lipid_Panel.pdf, Page 3", sourceSnippet: "Triglycerides reduced by 18% from baseline. LDL: no significant change.", section: "8.4 Metabolic Parameters", verifiedBy: "Dr. Priya Patel" },
    l011: { id: "l011", value: "Pruritus 8.4%", category: "adverse_event", tier: 3, status: "verified", confidence: 91, sourceRef: "AE_Summary_HEP.pdf, Page 7", sourceSnippet: "Pruritus reported in 8.4% of treatment group vs 2.1% placebo. Dose-related.", section: "8.3 Safety", verifiedBy: "Dr. Priya Patel" },
    l012: { id: "l012", value: "Biopsy compliance 94%", category: "administrative", tier: 1, status: "verified", confidence: 99, sourceRef: "Biopsy_Log.pdf, Page 1", sourceSnippet: "End-of-treatment biopsy completed in 94% of enrolled patients.", section: "8.1 Histological Endpoints", verifiedBy: "Dr. James Miller" },
    l013: { id: "l013", value: "DILI suspected: 1", category: "adverse_event", tier: 3, status: "verified", confidence: 95, sourceRef: "Hepatotoxicity_Review.pdf, Page 2", sourceSnippet: "One case of suspected DILI at Week 28. Hy's Law criteria not met. ALT 8× ULN with bilirubin 2.2× ULN. Causality assessment: possible. Independent adjudication: unlikely related.", section: "8.3 Safety", verifiedBy: "Dr. Priya Patel" },
    l014: { id: "l014", value: "ELF score −0.8", category: "efficacy", tier: 2, status: "verified", confidence: 92, sourceRef: "Fibrosis_Biomarkers.pdf, Page 5", sourceSnippet: "Enhanced Liver Fibrosis (ELF) score decreased by 0.8 from baseline.", section: "8.2 Liver Biochemistry", verifiedBy: "Dr. Sarah Chen" },
  },

  "csr-2026-0044": {
    b001: { id: "b001", value: "FEV1 +180mL", category: "efficacy", tier: 2, status: "verified", confidence: 95, sourceRef: "Spirometry_Report.pdf, Page 6", sourceSnippet: "Mean change in trough FEV1 from baseline: +180 mL (95% CI: 120–240 mL).", section: "9.1 Lung Function", verifiedBy: "Dr. James Miller" },
    b002: { id: "b002", value: "Exacerbation rate 0.42", category: "efficacy", tier: 2, status: "verified", confidence: 93, sourceRef: "Exacerbation_Analysis.pdf, Page 4", sourceSnippet: "Annualized moderate-to-severe exacerbation rate: 0.42 vs 0.78 placebo (RR 0.54).", section: "9.2 Exacerbation Prevention", verifiedBy: "Dr. James Miller" },
    b003: { id: "b003", value: "54 patients", category: "administrative", tier: 1, status: "verified", confidence: 100, sourceRef: "Enrollment_PUL.pdf, Page 1", sourceSnippet: "54 patients enrolled in dose-finding study. Three dose cohorts: low (n=18), mid (n=18), high (n=18).", section: "9.1 Lung Function", verifiedBy: "Dr. Priya Patel" },
    b004: { id: "b004", value: "Cough AE 22%", category: "adverse_event", tier: 3, status: "flagged", confidence: 74, sourceRef: "AE_Respiratory.pdf, Page 3", sourceSnippet: "Cough reported as AE in 22% of patients. Note: pre-existing cough in COPD population not adequately distinguished from treatment-emergent cough in source data.", section: "9.3 Safety", verifiedBy: "Dr. Priya Patel" },
    b005: { id: "b005", value: "Oral candidiasis 11%", category: "adverse_event", tier: 3, status: "flagged", confidence: 71, sourceRef: "AE_Respiratory.pdf, Page 5", sourceSnippet: "Oral candidiasis: 11%. Source table lists 14% — discrepancy with narrative text. Possible data entry error.", section: "9.3 Safety", verifiedBy: "Dr. Sarah Chen" },
    b006: { id: "b006", value: "Dysphonia 7.4%", category: "adverse_event", tier: 3, status: "flagged", confidence: 69, sourceRef: "AE_Respiratory.pdf, Page 5", sourceSnippet: "Dysphonia: 7.4% per narrative but source CRF shows 9.3%. Missing data from site 004.", section: "9.3 Safety", verifiedBy: "Dr. Priya Patel" },
    b007: { id: "b007", value: "SGRQ −6.2", category: "efficacy", tier: 2, status: "pending", confidence: 92, sourceRef: "PRO_COPD.pdf, Page 4", sourceSnippet: "SGRQ total score improved by −6.2 points from baseline (MCID: −4 points).", section: "9.4 Quality of Life" },
    b008: { id: "b008", value: "Pneumonia 5.6%", category: "adverse_event", tier: 3, status: "flagged", confidence: 65, sourceRef: "SAE_Respiratory.pdf, Page 2", sourceSnippet: "Pneumonia occurred in 5.6% of treatment group. Radiographic confirmation missing for 2 of 3 cases. Adjudication incomplete.", section: "9.3 Safety", verifiedBy: "Dr. Priya Patel" },
    b009: { id: "b009", value: "Peak flow +28 L/min", category: "patient_vitals", tier: 3, status: "pending", confidence: 94, sourceRef: "PEF_Diary.pdf, Page 3", sourceSnippet: "Mean morning peak expiratory flow improved by 28 L/min from baseline.", section: "9.1 Lung Function" },
  },
};

// Report content sections per study (for the report viewer)
export interface ReportSection {
  title: string;
  content: string; // HTML-like string with claim placeholders
  claimIds: string[];
}

export const STUDY_REPORT_SECTIONS: Record<string, ReportSection[]> = {
  "csr-2026-0042": [
    {
      title: "3.1 Primary Efficacy Analysis",
      claimIds: ["c001", "c002", "c003", "c004"],
      content: `The primary endpoint of the study was the change from baseline in HbA1c at Week 24. The treatment group demonstrated a statistically significant reduction in HbA1c of {c001} (95% CI: {c002}) compared with placebo (p<0.001). The proportion of patients achieving HbA1c <7.0% was {c003} in the treatment group versus {c004} in the placebo group.`,
    },
    {
      title: "3.2 Safety Summary",
      claimIds: ["c005", "c006", "c007", "c008", "c009", "c010"],
      content: `A total of {c005} were randomized and received at least one dose of the study drug. Adverse events (AEs) were reported in {c006} of patients in the treatment group and {c007} in the placebo group. The most common AEs included nausea ({c008}), headache ({c009}), and injection site reactions ({c010}).`,
    },
    {
      title: "3.3 Serious Adverse Events",
      claimIds: ["c011"],
      content: `Serious adverse events (SAEs) occurred in {c011} of patients in the treatment group. No deaths were attributed to the study drug. One case of pancreatitis was reported and adjudicated by an independent committee. The overall benefit-risk profile remains favorable based on the integrated safety analysis.`,
    },
  ],
  "csr-2026-0039": [
    {
      title: "4.1 Tumor Response",
      claimIds: ["n001", "n002", "n004", "n012", "n015"],
      content: `The objective response rate (ORR) was {n001} in the evaluable population by RECIST v1.1. Complete response (CR) rate was {n004}. The disease control rate (DCR) was {n012}. Median progression-free survival was {n002}. Median duration of response was {n015}.`,
    },
    {
      title: "4.2 Overall Survival",
      claimIds: ["n003"],
      content: `Median overall survival was {n003} at interim analysis. Data maturity is expected at the final analysis in Q3 2026.`,
    },
    {
      title: "4.3 Dose Escalation",
      claimIds: ["n005", "n007", "n010", "n016"],
      content: `{n005} were enrolled across 18 sites in a 3+3 dose escalation design. The DLT observation period was {n016}. {n010} were observed at the highest dose level. The recommended Phase 2 dose was determined as {n007}.`,
    },
    {
      title: "4.4 Safety Profile",
      claimIds: ["n006", "n008", "n013", "n014"],
      content: `Treatment-related AEs occurred in {n006} of patients. Grade ≥3 AEs occurred in {n008}. Infusion-related reactions were reported in {n013}. Grade 4 lab abnormalities: {n014}.`,
    },
    {
      title: "4.5 Cardiac Safety",
      claimIds: ["n009", "n018"],
      content: `QTcF prolongation >60ms from baseline was observed in {n009} of patients. {n018} occurred during the study period.`,
    },
    {
      title: "4.6 Biomarker Analysis",
      claimIds: ["n011"],
      content: `{n011} by IHC was required for enrollment. Concordance with FISH was 96%. Exploratory biomarker analyses are ongoing.`,
    },
    {
      title: "4.7 Treatment Compliance",
      claimIds: ["n017"],
      content: `Treatment compliance rate was {n017} across all dose cohorts.`,
    },
  ],
  "csr-2026-0037": [
    {
      title: "5.1 Exercise Capacity",
      claimIds: ["h001", "h005", "h012", "h017"],
      content: `Mean change in peak VO2 from baseline was {h001}. A total of {h005} were randomized. Six-minute walk distance improved by {h012}. The primary analysis timepoint was {h017}.`,
    },
    {
      title: "5.2 Hospitalization Outcomes",
      claimIds: ["h002", "h006", "h014", "h024"],
      content: `Heart failure hospitalization rate at 12 months: {h002}. Hazard ratio for CV death or HF hospitalization: {h006}. {h014}. 30-day readmission rate reduced by {h024}.`,
    },
    {
      title: "5.3 Cardiac Function",
      claimIds: ["h003", "h004", "h010", "h019", "h020"],
      content: `Mean improvement in LVEF: {h003}. NT-proBNP decreased by {h004}. {h010} of patients improved to NYHA Class I–II. ICD-detected arrhythmic events: {h019}. {h020} of treatment group achieved BNP <100.`,
    },
    {
      title: "5.4 Safety",
      claimIds: ["h007", "h008", "h013", "h015", "h021"],
      content: `Symptomatic hypotension in {h007}. Hyperkalemia: {h008}. SAEs: {h013}. Blood pressure change: {h015}. Weight change: {h021}.`,
    },
    {
      title: "5.5 Renal Function",
      claimIds: ["h009"],
      content: `Mean change in eGFR at 12 months: {h009}. Not considered clinically significant.`,
    },
    {
      title: "5.6 Patient-Reported Outcomes",
      claimIds: ["h011", "h022"],
      content: `KCCQ total symptom score improved by {h011}. NNT for clinically meaningful QoL improvement: {h022}.`,
    },
    {
      title: "5.7 Treatment Compliance",
      claimIds: ["h016", "h023"],
      content: `Overall treatment compliance: {h016}. Loop diuretic dose reduced in {h023} of patients.`,
    },
    {
      title: "5.8 Subgroup Analyses",
      claimIds: ["h018"],
      content: `Diabetic subgroup showed enhanced benefit: {h018}.`,
    },
  ],
  "csr-2026-0035": [
    {
      title: "6.1 Primary Endpoint",
      claimIds: ["s001", "s002", "s003", "s008"],
      content: `Mean change in MADRS total score: {s001}. Response rate (≥50% reduction): {s002}. Remission rate (MADRS ≤10): {s003}. CGI-S improvement: {s008}.`,
    },
    {
      title: "6.2 Study Population",
      claimIds: ["s004", "s012"],
      content: `Real-world evidence cohort: {s004}. Mean prior antidepressant failures: {s012}.`,
    },
    {
      title: "6.3 Safety Monitoring",
      claimIds: ["s005", "s007", "s011"],
      content: `Suicidality (C-SSRS): {s005}. Treatment discontinuation due to AEs: {s007}. QTc: {s011}.`,
    },
    {
      title: "6.4 Metabolic Effects",
      claimIds: ["s006", "s014"],
      content: `Weight gain at 6 months: {s006}. Sexual dysfunction: {s014}.`,
    },
    {
      title: "6.5 Patient-Reported Outcomes",
      claimIds: ["s009", "s010", "s013"],
      content: `PHQ-9 score change: {s009}. Sleep quality improvement: {s010}. Anxiety reduction: {s013}.`,
    },
    {
      title: "6.6 Health Economics",
      claimIds: ["s015"],
      content: `Annualized healthcare cost reduction: {s015} per patient vs standard care.`,
    },
  ],
  "csr-2026-0031": [
    {
      title: "7.1 Clinical Response",
      claimIds: ["r001", "r002", "r004", "r007", "r008", "r013", "r014"],
      content: `ACR50 response rate: {r001}. DAS28-CRP change: {r002}. {r004} biologic-naïve patients were randomized. CRP reduction: {r007}. Boolean remission: {r008}. Tender joint reduction: {r013}. Swollen joint reduction: {r014}.`,
    },
    {
      title: "7.2 Physical Function",
      claimIds: ["r003", "r009", "r015", "r016", "r019"],
      content: `HAQ-DI improvement: {r003}. Morning stiffness reduction: {r009}. Patient global assessment: {r015}. Fatigue improvement: {r016}. Work productivity: {r019}.`,
    },
    {
      title: "7.3 Structural Outcomes",
      claimIds: ["r005"],
      content: `Mean change in mTSS: {r005}. Radiographic progression was significantly inhibited.`,
    },
    {
      title: "7.4 Safety",
      claimIds: ["r006", "r010", "r011", "r012", "r017", "r018"],
      content: `Serious infections: {r006}. ADA formation: {r010}. Hepatotoxicity: {r011}. TB screening: {r012}. Injection site reactions: {r017}. Neutropenia: {r018}.`,
    },
    {
      title: "7.5 Treatment Persistence",
      claimIds: ["r020"],
      content: `52-week retention rate: {r020}.`,
    },
  ],
  "csr-2026-0028": [
    {
      title: "8.1 Histological Endpoints",
      claimIds: ["l001", "l002", "l004", "l005", "l009", "l012"],
      content: `NAS reduction: {l001}. Fibrosis stability: {l002}. {l004} patients enrolled. Steatosis reduction by MRI-PDFF: {l005}. Liver stiffness change: {l009}. Biopsy compliance: {l012}.`,
    },
    {
      title: "8.2 Liver Biochemistry",
      claimIds: ["l003", "l014"],
      content: `ALT normalization: {l003}. ELF score change: {l014}.`,
    },
    {
      title: "8.3 Safety",
      claimIds: ["l006", "l011", "l013"],
      content: `GI adverse events: {l006}. Pruritus: {l011}. Suspected DILI: {l013}.`,
    },
    {
      title: "8.4 Metabolic Parameters",
      claimIds: ["l007", "l008", "l010"],
      content: `Weight change: {l007}. HbA1c change in diabetic subgroup: {l008}. Triglyceride reduction: {l010}.`,
    },
  ],
  "csr-2026-0044": [
    {
      title: "9.1 Lung Function",
      claimIds: ["b001", "b003", "b009"],
      content: `Mean change in trough FEV1: {b001}. {b003} patients enrolled. Peak flow improvement: {b009}.`,
    },
    {
      title: "9.2 Exacerbation Prevention",
      claimIds: ["b002"],
      content: `Annualized moderate-to-severe exacerbation rate: {b002} vs 0.78 placebo.`,
    },
    {
      title: "9.3 Safety",
      claimIds: ["b004", "b005", "b006", "b008"],
      content: `Cough as AE: {b004}. Oral candidiasis: {b005}. Dysphonia: {b006}. Pneumonia: {b008}.`,
    },
    {
      title: "9.4 Quality of Life",
      claimIds: ["b007"],
      content: `SGRQ total score improvement: {b007}.`,
    },
  ],
};

export const INITIAL_STUDIES: StudyReport[] = [
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
    verifiedClaims: 14,
    flaggedClaims: 0,
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

export const STUDY_DOCUMENTS: Record<string, SourceDocument[]> = {
  "csr-2026-0042": [
    { id: "doc-001", name: "Lab_Results_04.pdf", uploadDate: "2026-02-28", hashId: "a7c3f8e2b1d94f6a", auditor: "Dr. Sarah Chen", size: "2.4 MB", linkedClaims: ["c001", "c003", "c004"] },
    { id: "doc-002", name: "Statistical_Analysis_Report.pdf", uploadDate: "2026-02-27", hashId: "e9b4d1c6f3a82e5d", auditor: "Dr. James Miller", size: "5.1 MB", linkedClaims: ["c002"] },
    { id: "doc-003", name: "Randomization_Log.pdf", uploadDate: "2026-02-25", hashId: "c2d8f5a1e7b34c9f", auditor: "Dr. Sarah Chen", size: "890 KB", linkedClaims: ["c005"] },
    { id: "doc-004", name: "AE_Summary_Report.pdf", uploadDate: "2026-02-26", hashId: "f6a3b9d2c8e14f7a", auditor: "Dr. Priya Patel", size: "3.7 MB", linkedClaims: ["c006", "c007", "c008", "c009", "c010"] },
    { id: "doc-005", name: "SAE_Narrative_Report.pdf", uploadDate: "2026-02-24", hashId: "b1e7c4f9a3d62e8b", auditor: "Dr. Priya Patel", size: "1.2 MB", linkedClaims: ["c011"] },
  ],
  "csr-2026-0039": [
    { id: "doc-n01", name: "ORR_Analysis.pdf", uploadDate: "2026-02-18", hashId: "d4f2a8c1e3b76d9a", auditor: "Dr. Priya Patel", size: "3.2 MB", linkedClaims: ["n001", "n004"] },
    { id: "doc-n02", name: "PFS_Kaplan_Meier.pdf", uploadDate: "2026-02-17", hashId: "a1c9e5f3b7d24a8e", auditor: "Dr. James Miller", size: "1.8 MB", linkedClaims: ["n002"] },
    { id: "doc-n03", name: "OS_Interim.pdf", uploadDate: "2026-02-16", hashId: "f8d3b1a6c4e97f2d", auditor: "Dr. James Miller", size: "2.9 MB", linkedClaims: ["n003"] },
    { id: "doc-n04", name: "Safety_Summary_NVX.pdf", uploadDate: "2026-02-19", hashId: "b6e2d4f8a1c39b7e", auditor: "Dr. Priya Patel", size: "4.5 MB", linkedClaims: ["n006", "n008", "n013"] },
    { id: "doc-n05", name: "DLT_Report.pdf", uploadDate: "2026-02-15", hashId: "c9a1f7e3d5b82c4a", auditor: "Dr. Sarah Chen", size: "1.4 MB", linkedClaims: ["n007", "n010"] },
    { id: "doc-n06", name: "Enrollment_Log.pdf", uploadDate: "2026-02-14", hashId: "e3b7d1a9f5c48e6d", auditor: "Dr. Sarah Chen", size: "620 KB", linkedClaims: ["n005"] },
    { id: "doc-n07", name: "Cardiac_Monitoring.pdf", uploadDate: "2026-02-18", hashId: "a8f4c2e6b9d13a7e", auditor: "Dr. Sarah Chen", size: "2.1 MB", linkedClaims: ["n009"] },
    { id: "doc-n08", name: "Biomarker_Report.pdf", uploadDate: "2026-02-17", hashId: "d1e9a3f7c5b82d4a", auditor: "Dr. James Miller", size: "1.6 MB", linkedClaims: ["n011"] },
    { id: "doc-n09", name: "DCR_Analysis.pdf", uploadDate: "2026-02-16", hashId: "f3a7e1c9d5b42e8d", auditor: "Dr. Priya Patel", size: "980 KB", linkedClaims: ["n012"] },
    { id: "doc-n10", name: "Lab_Abnormalities.pdf", uploadDate: "2026-02-19", hashId: "b2d6f8a4c1e93a7e", auditor: "Dr. Sarah Chen", size: "2.3 MB", linkedClaims: ["n014"] },
    { id: "doc-n11", name: "DOR_Analysis.pdf", uploadDate: "2026-02-15", hashId: "e7c1a9f3d5b82e4d", auditor: "Dr. James Miller", size: "1.1 MB", linkedClaims: ["n015"] },
    { id: "doc-n12", name: "SAE_Narratives_NVX.pdf", uploadDate: "2026-02-20", hashId: "a4f8c2e6d9b13a7e", auditor: "Dr. Priya Patel", size: "3.8 MB", linkedClaims: ["n018"] },
  ],
  "csr-2026-0037": [
    { id: "doc-h01", name: "CPET_Results.pdf", uploadDate: "2026-02-28", hashId: "c3e7a1f9d5b42e8d", auditor: "Dr. Sarah Chen", size: "4.2 MB", linkedClaims: ["h001"] },
    { id: "doc-h02", name: "HF_Hospitalization.pdf", uploadDate: "2026-02-27", hashId: "a6d2f8c4e1b93a7e", auditor: "Dr. James Miller", size: "2.8 MB", linkedClaims: ["h002"] },
    { id: "doc-h03", name: "Echo_Summary.pdf", uploadDate: "2026-02-26", hashId: "f1c9a3e7d5b82e4d", auditor: "Dr. Priya Patel", size: "5.4 MB", linkedClaims: ["h003"] },
    { id: "doc-h04", name: "Biomarker_Panel.pdf", uploadDate: "2026-02-25", hashId: "b8e4d2f6a1c93a7e", auditor: "Dr. James Miller", size: "1.9 MB", linkedClaims: ["h004", "h020"] },
    { id: "doc-h05", name: "Randomization_CRD.pdf", uploadDate: "2026-02-24", hashId: "d5a1f9c3e7b42e8d", auditor: "Dr. Sarah Chen", size: "740 KB", linkedClaims: ["h005"] },
    { id: "doc-h06", name: "CV_Death_Analysis.pdf", uploadDate: "2026-02-27", hashId: "e2c6a8f4d1b93a7e", auditor: "Dr. Priya Patel", size: "3.1 MB", linkedClaims: ["h006", "h014"] },
    { id: "doc-h07", name: "AE_Cardiac.pdf", uploadDate: "2026-02-26", hashId: "a9f3c1e7d5b82e4d", auditor: "Dr. Priya Patel", size: "2.6 MB", linkedClaims: ["h007", "h008"] },
    { id: "doc-h08", name: "Renal_Monitoring.pdf", uploadDate: "2026-02-25", hashId: "c4e8a2f6d1b93a7e", auditor: "Dr. James Miller", size: "1.3 MB", linkedClaims: ["h009"] },
    { id: "doc-h09", name: "NYHA_Shift.pdf", uploadDate: "2026-02-28", hashId: "f7d1a9c3e5b42e8d", auditor: "Dr. Sarah Chen", size: "890 KB", linkedClaims: ["h010"] },
    { id: "doc-h10", name: "PRO_Report.pdf", uploadDate: "2026-02-27", hashId: "b3e7c1a9f5d82e4d", auditor: "Dr. James Miller", size: "1.7 MB", linkedClaims: ["h011", "h022"] },
    { id: "doc-h11", name: "Walk_Test.pdf", uploadDate: "2026-02-26", hashId: "d8a4f2c6e1b93a7e", auditor: "Dr. Sarah Chen", size: "950 KB", linkedClaims: ["h012"] },
    { id: "doc-h12", name: "SAE_Cardiac.pdf", uploadDate: "2026-02-25", hashId: "a1c9e5f3b7d24a8e", auditor: "Dr. Priya Patel", size: "2.2 MB", linkedClaims: ["h013"] },
    { id: "doc-h13", name: "Vitals_Summary.pdf", uploadDate: "2026-02-28", hashId: "f4d8a2c6e1b93a7e", auditor: "Dr. James Miller", size: "1.5 MB", linkedClaims: ["h015", "h021"] },
    { id: "doc-h14", name: "Drug_Accountability.pdf", uploadDate: "2026-02-24", hashId: "c7e1a9f3d5b42e8d", auditor: "Dr. Sarah Chen", size: "680 KB", linkedClaims: ["h016"] },
    { id: "doc-h15", name: "Device_Report.pdf", uploadDate: "2026-02-27", hashId: "b9f3c1a7e5d82e4d", auditor: "Dr. Priya Patel", size: "3.4 MB", linkedClaims: ["h019"] },
  ],
  "csr-2026-0035": [
    { id: "doc-s01", name: "MADRS_Analysis.pdf", uploadDate: "2026-02-28", hashId: "e4a8c2f6d1b93a7e", auditor: "Dr. Sarah Chen", size: "2.1 MB", linkedClaims: ["s001"] },
    { id: "doc-s02", name: "Responder_Analysis.pdf", uploadDate: "2026-02-27", hashId: "a3f7c1e9d5b42e8d", auditor: "Dr. James Miller", size: "1.8 MB", linkedClaims: ["s002", "s003"] },
    { id: "doc-s03", name: "RWE_Enrollment.pdf", uploadDate: "2026-02-26", hashId: "d6e2a8f4c1b93a7e", auditor: "Dr. Priya Patel", size: "560 KB", linkedClaims: ["s004"] },
    { id: "doc-s04", name: "C-SSRS_Report.pdf", uploadDate: "2026-02-28", hashId: "f9c3a1e7d5b82e4d", auditor: "Dr. Priya Patel", size: "3.6 MB", linkedClaims: ["s005"] },
    { id: "doc-s05", name: "Metabolic_Panel.pdf", uploadDate: "2026-02-25", hashId: "b4e8a2c6f1d93a7e", auditor: "Dr. James Miller", size: "2.3 MB", linkedClaims: ["s006"] },
    { id: "doc-s06", name: "Discontinuation_Log.pdf", uploadDate: "2026-02-27", hashId: "c1a9f3e7d5b42e8d", auditor: "Dr. Sarah Chen", size: "980 KB", linkedClaims: ["s007"] },
    { id: "doc-s07", name: "CGI_Analysis.pdf", uploadDate: "2026-02-26", hashId: "e7d3a1c9f5b82e4d", auditor: "Dr. James Miller", size: "1.4 MB", linkedClaims: ["s008"] },
    { id: "doc-s08", name: "PRO_Depression.pdf", uploadDate: "2026-02-28", hashId: "a2f6c8e4d1b93a7e", auditor: "Dr. Sarah Chen", size: "1.9 MB", linkedClaims: ["s009", "s010"] },
    { id: "doc-s09", name: "ECG_Monitoring.pdf", uploadDate: "2026-02-25", hashId: "d9c1a3f7e5b42e8d", auditor: "Dr. Priya Patel", size: "2.7 MB", linkedClaims: ["s011"] },
  ],
  "csr-2026-0031": [
    { id: "doc-r01", name: "ACR_Response.pdf", uploadDate: "2026-02-08", hashId: "f2e6a8c4d1b93a7e", auditor: "Dr. Sarah Chen", size: "2.9 MB", linkedClaims: ["r001"] },
    { id: "doc-r02", name: "DAS28_Analysis.pdf", uploadDate: "2026-02-07", hashId: "a5c9f1e3d7b42e8d", auditor: "Dr. Sarah Chen", size: "1.6 MB", linkedClaims: ["r002"] },
    { id: "doc-r03", name: "PRO_RA.pdf", uploadDate: "2026-02-06", hashId: "b8d2a6f4c1e93a7e", auditor: "Dr. James Miller", size: "3.4 MB", linkedClaims: ["r003", "r009", "r015"] },
    { id: "doc-r04", name: "Randomization_IMM.pdf", uploadDate: "2026-02-05", hashId: "c1e9a3f7d5b82e4d", auditor: "Dr. James Miller", size: "480 KB", linkedClaims: ["r004"] },
    { id: "doc-r05", name: "Radiographic_Report.pdf", uploadDate: "2026-02-08", hashId: "e4a8c2f6d1b93a7e", auditor: "Dr. Sarah Chen", size: "6.2 MB", linkedClaims: ["r005"] },
    { id: "doc-r06", name: "Infection_Report.pdf", uploadDate: "2026-02-07", hashId: "d7f3a1c9e5b42e8d", auditor: "Dr. Priya Patel", size: "2.1 MB", linkedClaims: ["r006"] },
    { id: "doc-r07", name: "Biomarker_RA.pdf", uploadDate: "2026-02-06", hashId: "a2e6c8f4d1b93a7e", auditor: "Dr. Sarah Chen", size: "1.8 MB", linkedClaims: ["r007"] },
    { id: "doc-r08", name: "Joint_Counts.pdf", uploadDate: "2026-02-08", hashId: "f9d3a1c7e5b42e8d", auditor: "Dr. James Miller", size: "1.2 MB", linkedClaims: ["r013", "r014"] },
    { id: "doc-r09", name: "Immunogenicity.pdf", uploadDate: "2026-02-07", hashId: "b4e8a2c6f1d93a7e", auditor: "Dr. Priya Patel", size: "2.5 MB", linkedClaims: ["r010"] },
    { id: "doc-r10", name: "Liver_Safety.pdf", uploadDate: "2026-02-06", hashId: "c7f1a9e3d5b82e4d", auditor: "Dr. Priya Patel", size: "1.9 MB", linkedClaims: ["r011"] },
    { id: "doc-r11", name: "Hematology.pdf", uploadDate: "2026-02-08", hashId: "e3a7c1f9d5b42e8d", auditor: "Dr. Sarah Chen", size: "2.3 MB", linkedClaims: ["r018"] },
  ],
  "csr-2026-0028": [
    { id: "doc-l01", name: "Histology_Report.pdf", uploadDate: "2026-01-26", hashId: "a6d2f8c4e1b93a7e", auditor: "Dr. James Miller", size: "7.8 MB", linkedClaims: ["l001"] },
    { id: "doc-l02", name: "Fibrosis_Staging.pdf", uploadDate: "2026-01-25", hashId: "f1c9a3e7d5b82e4d", auditor: "Dr. Sarah Chen", size: "4.1 MB", linkedClaims: ["l002"] },
    { id: "doc-l03", name: "LFT_Analysis.pdf", uploadDate: "2026-01-24", hashId: "b8e4d2f6a1c93a7e", auditor: "Dr. Priya Patel", size: "1.6 MB", linkedClaims: ["l003"] },
    { id: "doc-l04", name: "Enrollment_HEP.pdf", uploadDate: "2026-01-23", hashId: "d5a1f9c3e7b42e8d", auditor: "Dr. James Miller", size: "520 KB", linkedClaims: ["l004"] },
    { id: "doc-l05", name: "MRI_PDFF.pdf", uploadDate: "2026-01-26", hashId: "e2c6a8f4d1b93a7e", auditor: "Dr. James Miller", size: "12.4 MB", linkedClaims: ["l005"] },
    { id: "doc-l06", name: "AE_Summary_HEP.pdf", uploadDate: "2026-01-25", hashId: "a9f3c1e7d5b82e4d", auditor: "Dr. Priya Patel", size: "2.8 MB", linkedClaims: ["l006", "l011"] },
    { id: "doc-l07", name: "Body_Comp.pdf", uploadDate: "2026-01-24", hashId: "c4e8a2f6d1b93a7e", auditor: "Dr. Sarah Chen", size: "3.2 MB", linkedClaims: ["l007"] },
    { id: "doc-l08", name: "Metabolic_HEP.pdf", uploadDate: "2026-01-26", hashId: "f7d1a9c3e5b42e8d", auditor: "Dr. James Miller", size: "1.9 MB", linkedClaims: ["l008"] },
    { id: "doc-l09", name: "Hepatotoxicity_Review.pdf", uploadDate: "2026-01-25", hashId: "b3e7c1a9f5d82e4d", auditor: "Dr. Priya Patel", size: "4.5 MB", linkedClaims: ["l013"] },
    { id: "doc-l10", name: "Fibrosis_Biomarkers.pdf", uploadDate: "2026-01-24", hashId: "d8a4f2c6e1b93a7e", auditor: "Dr. Sarah Chen", size: "1.4 MB", linkedClaims: ["l014"] },
  ],
  "csr-2026-0044": [
    { id: "doc-b01", name: "Spirometry_Report.pdf", uploadDate: "2026-02-20", hashId: "a1c9e5f3b7d24a8e", auditor: "Dr. James Miller", size: "3.6 MB", linkedClaims: ["b001"] },
    { id: "doc-b02", name: "Exacerbation_Analysis.pdf", uploadDate: "2026-02-19", hashId: "f4d8a2c6e1b93a7e", auditor: "Dr. James Miller", size: "2.1 MB", linkedClaims: ["b002"] },
    { id: "doc-b03", name: "Enrollment_PUL.pdf", uploadDate: "2026-02-18", hashId: "c7e1a9f3d5b42e8d", auditor: "Dr. Priya Patel", size: "380 KB", linkedClaims: ["b003"] },
    { id: "doc-b04", name: "AE_Respiratory.pdf", uploadDate: "2026-02-20", hashId: "b9f3c1a7e5d82e4d", auditor: "Dr. Priya Patel", size: "2.9 MB", linkedClaims: ["b004", "b005", "b006"] },
    { id: "doc-b05", name: "PRO_COPD.pdf", uploadDate: "2026-02-19", hashId: "e4a8c2f6d1b93a7e", auditor: "Dr. Sarah Chen", size: "1.5 MB", linkedClaims: ["b007"] },
    { id: "doc-b06", name: "SAE_Respiratory.pdf", uploadDate: "2026-02-21", hashId: "a3f7c1e9d5b42e8d", auditor: "Dr. Priya Patel", size: "3.8 MB", linkedClaims: ["b008"] },
    { id: "doc-b07", name: "PEF_Diary.pdf", uploadDate: "2026-02-18", hashId: "d6e2a8f4c1b93a7e", auditor: "Dr. Sarah Chen", size: "1.1 MB", linkedClaims: ["b009"] },
  ],
};
