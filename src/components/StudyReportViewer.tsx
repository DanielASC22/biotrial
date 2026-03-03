import { Badge } from "@/components/ui/badge";

const StudyReportViewer = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Study Report Viewer</h2>
          <p className="text-xs text-muted-foreground font-data">CSR-2026-0042 • Phase III</p>
        </div>
        <Badge variant="outline" className="text-xs font-data border-amber-accent text-amber-accent">
          3 Claims Pending
        </Badge>
      </div>

      {/* Report Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div>
          <h3 className="text-base font-semibold mb-2">3.1 Primary Efficacy Analysis</h3>
          <p className="text-sm leading-relaxed text-foreground/90">
            The primary endpoint of the study was the change from baseline in HbA1c at Week 24.
            The treatment group demonstrated a statistically significant reduction in HbA1c of{" "}
            <span className="audit-highlight" data-claim-id="c001">−1.4%</span>{" "}
            (95% CI: <span className="audit-highlight" data-claim-id="c002">−1.7, −1.1</span>)
            compared with placebo (p{"<"}0.001). The proportion of patients achieving HbA1c{" "}
            {"<"}7.0% was <span className="audit-highlight" data-claim-id="c003">62.3%</span>{" "}
            in the treatment group versus{" "}
            <span className="audit-highlight" data-claim-id="c004">28.1%</span> in the placebo group.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-2">3.2 Safety Summary</h3>
          <p className="text-sm leading-relaxed text-foreground/90">
            A total of <span className="audit-highlight" data-claim-id="c005">847 patients</span>{" "}
            were randomized and received at least one dose of the study drug. Adverse events (AEs)
            were reported in <span className="audit-highlight" data-claim-id="c006">43.2%</span>{" "}
            of patients in the treatment group and{" "}
            <span className="audit-highlight" data-claim-id="c007">38.9%</span> in the placebo
            group. The most common AEs included nausea (
            <span className="audit-highlight" data-claim-id="c008">8.7%</span>), headache (
            <span className="audit-highlight" data-claim-id="c009">6.2%</span>), and injection
            site reactions (<span className="audit-highlight" data-claim-id="c010">4.1%</span>).
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-2">3.3 Serious Adverse Events</h3>
          <p className="text-sm leading-relaxed text-foreground/90">
            Serious adverse events (SAEs) occurred in{" "}
            <span className="audit-highlight" data-claim-id="c011">5.2%</span> of patients in
            the treatment group. No deaths were attributed to the study drug. One case of
            pancreatitis was reported and adjudicated by an independent committee. The overall
            benefit-risk profile remains favorable based on the integrated safety analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudyReportViewer;
