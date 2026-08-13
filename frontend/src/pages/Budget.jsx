import React from "react";
import "./Budget.css";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";

function Budget() {
  const navigate = useNavigate();
  const { aiPlan, projectData } = useProject();
  const { budget } = aiPlan;

  return (
    <div className="budget-page">
      <div className="budget-card" style={{ maxWidth: 950 }}>
        <h1>💰 Bill of Materials & Cost Optimization</h1>
        <p className="subtitle">
          Itemized budget calculation for <strong>{projectData.name}</strong> ({projectData.numComputers} Workstations)
        </p>

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
  );
}

export default Budget;