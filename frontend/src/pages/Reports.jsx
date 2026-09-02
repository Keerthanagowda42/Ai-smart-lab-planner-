import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import { exportInstitutionalPDF, exportCADBlueprintSVG } from "../utils/pdfExporter";

const reports = [
  { title: "AI & Data Science Lab Proposal", date: "Aug 14, 2026", type: "Full AI Infrastructure Proposal", status: "Completed", budget: "₹12,30,000", icon: "🖥️" },
  { title: "Networking & Cyber Block", date: "Aug 08, 2026", type: "Gigabit Star Network Plan", status: "Planning", budget: "₹8,50,000", icon: "🌐" },
  { title: "3D Room Layout & Cabling", date: "Aug 05, 2026", type: "3D WebGL Spatial Audit", status: "Completed", budget: "₹4,20,000", icon: "🤖" },
  { title: "Electrical Load & UPS Sizing", date: "Aug 01, 2026", type: "10 kVA Power Distribution", status: "Completed", budget: "₹1,50,000", icon: "⚡" },
];

const statusColor = {
  Completed: { bg: "#dcfce7", color: "#16a34a" },
  Planning: { bg: "#dbeafe", color: "#2563eb" },
  "In Progress": { bg: "#fef3c7", color: "#d97706" },
};

export default function Reports() {
  const navigate = useNavigate();
  const { aiPlan, projectData } = useProject();

  const handlePrintPdf = () => {
    exportInstitutionalPDF(projectData, aiPlan);
  };

  const handleExportCAD = () => {
    exportCADBlueprintSVG(projectData, aiPlan);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", padding: "36px", fontFamily: "'Inter', Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            style={{ background: "none", border: "none", color: "#2563eb", fontSize: "14px", fontWeight: 600, cursor: "pointer", marginBottom: "8px" }}
          >
            ← Back to Dashboard
          </button>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#0f172a" }}>📄 Executive Reports & Proposals</h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>Generate, export, and download official laboratory infrastructure reports</p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={handlePrintPdf}
            style={{
              padding: "13px 22px",
              background: "linear-gradient(135deg, #0284c7, #2563eb)",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(2, 132, 199, 0.3)",
            }}
          >
            📄 Download Institutional PDF Report
          </button>
          <button
            onClick={handleExportCAD}
            style={{
              padding: "13px 22px",
              background: "#ffffff",
              color: "#0f172a",
              border: "1px solid #cbd5e1",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            📐 Export CAD Blueprint (SVG)
          </button>
          <button
            onClick={() => navigate("/create-project")}
            style={{
              padding: "13px 24px",
              background: "linear-gradient(135deg,#2563eb,#4f46e5)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(37,99,235,0.3)",
            }}
          >
            + New Project Proposal
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", marginBottom: "28px" }}>
        {[
          { label: "Active Project", value: projectData?.name || "AI & DS Computer Lab", icon: "🖥️", bg: "#eff6ff", color: "#2563eb" },
          { label: "Workstations Configured", value: `${aiPlan?.spatial?.numComputers || 24} PCs`, icon: "💻", bg: "#f0fdf4", color: "#16a34a" },
          { label: "Estimated Budget", value: `₹${((aiPlan?.budget?.totalBudget || 1230000) / 100000).toFixed(2)} L`, icon: "💰", bg: "#fefce8", color: "#d97706" },
        ].map(({ label, value, icon, bg, color }) => (
          <div key={label} style={{ background: "white", borderRadius: "16px", padding: "22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: bg, color, fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: 800, color }}>{value}</div>
              <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Reports list */}
      <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ padding: "22px 26px", borderBottom: "1px solid #f1f5f9" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>Project Proposal Reports</h2>
        </div>

        {reports.map((r, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 26px", borderBottom: i < reports.length - 1 ? "1px solid #f1f5f9" : "none", transition: "0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fafbff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "#f1f5f9", fontSize: "22px", display: "flex", alignItems: "center", justifyContent: "center" }}>{r.icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "15px" }}>{r.title}</div>
                <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>{r.type} · {r.date}</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <span style={{ fontWeight: 700, color: "#16a34a", fontSize: "15px" }}>{r.budget}</span>
              <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, background: statusColor[r.status].bg, color: statusColor[r.status].color }}>{r.status}</span>
              <button
                onClick={() => navigate("/viewer3d")}
                style={{ padding: "8px 18px", background: "none", border: "1px solid #e2e8f0", color: "#2563eb", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
              >
                Inspect 3D →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
