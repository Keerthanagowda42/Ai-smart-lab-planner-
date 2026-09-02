import React from "react";
import "./Budget.css";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import QuickRequirementBar from "../components/QuickRequirementBar";
import { exportInstitutionalPDF, exportCADBlueprintSVG } from "../utils/pdfExporter";

function Budget() {
  const navigate = useNavigate();
  const { aiPlan, projectData } = useProject();
  const { budget } = aiPlan;

  return (
    <div className="budget-page">
      <div style={{ maxWidth: 950, margin: "0 auto", width: "100%" }}>
        <QuickRequirementBar />
        <div className="budget-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1>💰 Bill of Materials & Cost Optimization</h1>
            <p className="subtitle">
              Itemized budget calculation for <strong>{projectData.name}</strong> ({projectData.numComputers} Workstations)
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => exportInstitutionalPDF(projectData, aiPlan)}
              style={{
                padding: "10px 18px",
                background: "linear-gradient(135deg, #0284c7, #2563eb)",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                fontWeight: 800,
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)",
              }}
            >
              📄 Download PDF Report
            </button>
            <button
              onClick={() => exportCADBlueprintSVG(projectData, aiPlan)}
              style={{
                padding: "10px 18px",
                background: "#ffffff",
                color: "#0f172a",
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              📐 CAD SVG Blueprint
            </button>
          </div>
        </div>

        <div style={{ marginBottom: 25, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f1f5f9", borderBottom: "2px solid #cbd5e1" }}>
                <th style={{ padding: 12, fontSize: 13, color: "#475569" }}>Equipment Item</th>
                <th style={{ padding: 12, fontSize: 13, color: "#475569" }}>Qty</th>
                <th style={{ padding: 12, fontSize: 13, color: "#475569" }}>Unit Cost (₹)</th>
                <th style={{ padding: 12, fontSize: 13, color: "#475569", textAlign: "right" }}>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {budget.bom.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: 12, fontWeight: 600, fontSize: 14, color: "#0f172a" }}>{item.item}</td>
                  <td style={{ padding: 12, fontSize: 14, color: "#475569" }}>{item.qty}</td>
                  <td style={{ padding: 12, fontSize: 14, color: "#475569" }}>₹{item.unitCost.toLocaleString("en-IN")}</td>
                  <td style={{ padding: 12, fontWeight: 700, fontSize: 14, color: "#173b8f", textAlign: "right" }}>
                    ₹{item.total.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="total-budget" style={{ background: "linear-gradient(135deg,#173b8f,#2563eb)", color: "white", padding: 25, borderRadius: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, opacity: 0.85, fontSize: 14 }}>Total Estimated Project Cost</p>
              <h1 style={{ margin: "5px 0 0", fontSize: 36, color: "#ffffff" }}>
                ₹{budget.totalCalculatedCost.toLocaleString("en-IN")}
              </h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, opacity: 0.85, fontSize: 13 }}>Target Budget</p>
              <h3 style={{ margin: "3px 0 0", color: "#ffffff" }}>
                ₹{budget.requestedBudget.toLocaleString("en-IN")}
              </h3>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 15, marginTop: 25 }}>
          <button className="next-btn" style={{ background: "#64748b" }} onClick={() => navigate("/ai")}>
            ← Back to AI Recommendation
          </button>
          <button className="next-btn" style={{ flex: 1 }} onClick={() => navigate("/network")}>
            Continue to Network Plan →
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Budget;