import React, { useState } from "react";
import "./AIRecommendation.css";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import QuickRequirementBar from "../components/QuickRequirementBar";

function solveConstraints({ maxBudget, targetCapacity, priority, layoutPreference }) {
  const hardwareTiers = [
    { type: "basic", label: "Standard Academic Computing", costPerPC: 38000 + 12000, powerWatts: 220 + 45 },
    { type: "ai-ds", label: "High-Performance AI & Data Science", costPerPC: 72000 + 12000, powerWatts: 450 + 45 },
    { type: "networking", label: "Cybersecurity & Networking Lab", costPerPC: 62000 + 12000, powerWatts: 300 + 45 },
    { type: "cad-graphics", label: "3D Rendering & CAD Workstation", costPerPC: 95000 + 22000, powerWatts: 650 + 45 },
  ];

  const layouts = ["grid", "u-shape", "pods"];
  let bestConfig = null;
  let bestScore = -Infinity;

  for (const hw of hardwareTiers) {
    for (const lay of layouts) {
      if (layoutPreference !== "any" && lay !== layoutPreference) continue;

      let solvedLength = 40;
      let solvedWidth = 30;

      if (targetCapacity <= 12) {
        solvedLength = 26;
        solvedWidth = 20;
      } else if (targetCapacity <= 20) {
        solvedLength = 32;
        solvedWidth = 24;
      } else if (targetCapacity <= 28) {
        solvedLength = 36;
        solvedWidth = 28;
      } else if (targetCapacity <= 36) {
        solvedLength = 40;
        solvedWidth = 30;
      } else {
        solvedLength = Math.min(60, 40 + Math.ceil((targetCapacity - 36) / 4) * 3);
        solvedWidth = Math.min(45, 30 + Math.ceil((targetCapacity - 36) / 4) * 2);
      }

      const switchesCount = Math.ceil((targetCapacity + 4) / 24);
      const acUnitsCount = Math.max(2, Math.ceil((solvedLength * solvedWidth) / 350));
      const criticalWatts = targetCapacity * hw.powerWatts + 1200 + 500;
      const upsRatingKVA = Math.ceil((criticalWatts * 1.35) / (1000 * 0.8));
      const totalPowerSockets = targetCapacity * 2 + 8 + 4 + 8;
      const totalCableMeters = Math.round(targetCapacity * 12);

      const bomCost = 
        targetCapacity * hw.costPerPC +
        350000 +
        switchesCount * 28000 +
        45000 +
        totalCableMeters * 45 +
        (110000 + upsRatingKVA * 5000) +
        totalPowerSockets * 650 +
        targetCapacity * 6500 +
        25000 +
        140000 +
        acUnitsCount * 52000;

      let score = 0;
      const isWithinBudget = bomCost <= maxBudget;

      if (isWithinBudget) {
        score += 1000;
      } else {
        score -= (bomCost - maxBudget) / 1000;
      }

      if (priority === "performance") {
        if (hw.type === "cad-graphics") score += 500;
        if (hw.type === "ai-ds") score += 300;
        if (hw.type === "networking") score += 100;
        if (hw.type === "basic") score -= 200;
      } else if (priority === "budget") {
        const savings = maxBudget - bomCost;
        score += savings / 5000;
        if (hw.type === "basic") score += 200;
      } else {
        if (hw.type === "ai-ds" && isWithinBudget) score += 200;
        if (hw.type === "networking" && isWithinBudget) score += 150;
        if (hw.type === "basic" && isWithinBudget) score += 50;
        if (lay === "pods") score += 30;
      }

      if (score > bestScore) {
        bestScore = score;
        bestConfig = {
          seatingPreference: lay,
          labType: hw.type,
          numComputers: targetCapacity,
          numStudents: targetCapacity,
          roomLength: solvedLength,
          roomWidth: solvedWidth,
          budget: maxBudget,
          calculatedCost: bomCost,
          hardwareLabel: hw.label,
          acUnits: acUnitsCount,
        };
      }
    }
  }

  return bestConfig;
}

function AIRecommendation() {
  const navigate = useNavigate();
  const { aiPlan, projectData, updateProject } = useProject();
  const [activeTab, setActiveTab] = useState("summary");

  // Solver local inputs initialized with project defaults
  const [targetSeats, setTargetSeats] = useState(projectData.numComputers);
  const [maxBudgetInput, setMaxBudgetInput] = useState(projectData.budget);
  const [solverPriority, setSolverPriority] = useState("balanced");
  const [solverLayoutPref, setSolverLayoutPref] = useState("any");

  const [solvedPlan, setSolvedPlan] = useState(null);
  const [hasSolved, setHasSolved] = useState(false);

  const { spatial, hardware, network, electrical, budget, capacityWarning } = aiPlan;

  const handleSolve = (e) => {
    e.preventDefault();
    const result = solveConstraints({
      maxBudget: Number(maxBudgetInput),
      targetCapacity: Number(targetSeats),
      priority: solverPriority,
      layoutPreference: solverLayoutPref
    });
    setSolvedPlan(result);
    setHasSolved(true);
  };

  const handleApplyPlan = () => {
    if (solvedPlan) {
      updateProject({
        numComputers: solvedPlan.numComputers,
        numStudents: solvedPlan.numStudents,
        seatingPreference: solvedPlan.seatingPreference,
        labType: solvedPlan.labType,
        roomLength: solvedPlan.roomLength,
        roomWidth: solvedPlan.roomWidth,
        budget: solvedPlan.budget,
      });
      alert("✅ AI Layout Configuration applied successfully!");
      setActiveTab("summary");
      setHasSolved(false);
    }
  };

  return (
    <div className="ai-page">
      <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%" }}>
        <QuickRequirementBar />
        <div className="ai-card">
        <h1>🤖 AI Automated Planning</h1>
        <p className="subtitle">
          Optimize, design, and simulate computer laboratory planning.
        </p>

        {/* Tab Headers */}
        <div className="tab-header">
          <button
            className={`tab-btn ${activeTab === "summary" ? "active" : ""}`}
            onClick={() => setActiveTab("summary")}
          >
            📋 Current Recommendation
          </button>
          <button
            className={`tab-btn ${activeTab === "solver" ? "active" : ""}`}
            onClick={() => setActiveTab("solver")}
          >
            ⚙️ AI Constraint Solver
          </button>
        </div>

        {activeTab === "summary" ? (
          <div>
            <div style={{ margin: "20px 0" }}>
              <p style={{ textAlign: "center", color: "#475569", fontSize: "14px" }}>
                Active Plan for <strong>{projectData.institution} - {projectData.name}</strong>.
              </p>
            </div>

            {capacityWarning && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#991b1b", padding: 15, borderRadius: 12, marginBottom: 20 }}>
                ⚠️ <strong>Room Constraint Notice:</strong> {capacityWarning}
              </div>
            )}

            <div className="recommendation-grid">
              <div className="recommend-box">
                <h3>🖥 Workstations</h3>
                <p><strong>{spatial.numComputers} Systems</strong></p>
                <span style={{ fontSize: 12, color: "#64748b" }}>Max room cap: {aiPlan.maxCapacity} PCs</span>
              </div>

              <div className="recommend-box">
                <h3>🪑 Layout Engine</h3>
                <p><strong>{spatial.seatingPreference.toUpperCase()} Layout</strong></p>
                <span style={{ fontSize: 12, color: "#64748b" }}>{spatial.aisleWidth}ft Central Aisle</span>
              </div>

              <div className="recommend-box">
                <h3>🌐 Network Specs</h3>
                <p><strong>{network.topology}</strong></p>
                <span style={{ fontSize: 12, color: "#64748b" }}>{network.switchesNeeded24Port}x Switches · {network.totalCableMeters}m CAT6</span>
              </div>

              <div className="recommend-box">
                <h3>⚡ Electrical Load</h3>
                <p><strong>{electrical.totalKW} KW Total</strong></p>
                <span style={{ fontSize: 12, color: "#64748b" }}>{electrical.upsRatingKVA} kVA UPS ({electrical.upsBackupTime})</span>
              </div>

              <div className="recommend-box">
                <h3>🖥 Hardware Tier</h3>
                <p><strong>{hardware.tier}</strong></p>
                <span style={{ fontSize: 12, color: "#64748b" }}>{hardware.cpu} · {hardware.ram}</span>
              </div>

              <div className="recommend-box">
                <h3>💰 Estimated Budget</h3>
                <p><strong>₹{budget.totalCalculatedCost.toLocaleString("en-IN")}</strong></p>
                <span style={{ fontSize: 12, color: budget.isWithinBudget ? "#16a34a" : "#dc2626" }}>
                  {budget.isWithinBudget ? "Within Target Budget ✅" : "Exceeds Target Budget ⚠️"}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 15, marginTop: 30 }}>
              <button className="next-btn" style={{ background: "#64748b" }} onClick={() => navigate("/requirements")}>
                ← Adjust Requirements
              </button>
              <button className="next-btn" style={{ flex: 1 }} onClick={() => navigate("/budget")}>
                Continue to Budget Breakdown →
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="solver-intro">
              <p>
                Input your spatial capacity requirements and budget constraints. The AI Constraint Solver searches combinations of layouts, room sizes, and component specs to compute the optimal setup.
              </p>
            </div>

            <form onSubmit={handleSolve} className="solver-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Max Budget Allocation (₹)</label>
                  <input
                    type="number"
                    value={maxBudgetInput}
                    onChange={(e) => setMaxBudgetInput(e.target.value)}
                    required
                    min="100000"
                    placeholder="Enter maximum budget"
                  />
                </div>

                <div className="form-group">
                  <label>Target Workstations (Capacity)</label>
                  <input
                    type="number"
                    value={targetSeats}
                    onChange={(e) => setTargetSeats(e.target.value)}
                    required
                    min="4"
                    max="100"
                    placeholder="Enter number of student seats"
                  />
                </div>

                <div className="form-group">
                  <label>Optimization Priority</label>
                  <select
                    value={solverPriority}
                    onChange={(e) => setSolverPriority(e.target.value)}
                  >
                    <option value="balanced">Balanced Cost & Spec Quality (Recommended)</option>
                    <option value="performance">Maximize Spec Tiers (High-End Workstations)</option>
                    <option value="budget">Cost Optimization (Frugal / Standard PC Setup)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Preferred Layout Mode</label>
                  <select
                    value={solverLayoutPref}
                    onChange={(e) => setSolverLayoutPref(e.target.value)}
                  >
                    <option value="any">Let AI Decide Best Flow</option>
                    <option value="grid">Standard Column Grid</option>
                    <option value="u-shape">Perimeter U-Shape</option>
                    <option value="pods">Collaborative Team Pods</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="solve-btn">
                🤖 Run AI Constraint Solver
              </button>
            </form>

            {hasSolved && solvedPlan && (
              <div className="solver-result-card animate-slide-up">
                <h2>💡 AI Recommended Configuration</h2>
                
                <div className="result-grid">
                  <div className="result-item">
                    <span>🪑 Layout Engine</span>
                    <strong>{solvedPlan.seatingPreference.toUpperCase()}</strong>
                  </div>
                  <div className="result-item">
                    <span>💻 Hardware Specification</span>
                    <strong>{solvedPlan.hardwareLabel}</strong>
                  </div>
                  <div className="result-item">
                    <span>📐 Solved Room Size</span>
                    <strong>{solvedPlan.roomLength}ft × {solvedPlan.roomWidth}ft</strong>
                  </div>
                  <div className="result-item">
                    <span>💡 Cooling Requirement</span>
                    <strong>{solvedPlan.acUnits}x 2-Ton AC Units</strong>
                  </div>
                  <div className="result-item">
                    <span>💰 Total Estimated Cost</span>
                    <strong>₹{solvedPlan.calculatedCost.toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="result-item">
                    <span>⚡ Budget Variance</span>
                    <strong style={{ color: solvedPlan.calculatedCost <= solvedPlan.budget ? "#16a34a" : "#dc2626" }}>
                      {solvedPlan.calculatedCost <= solvedPlan.budget 
                        ? `₹${(solvedPlan.budget - solvedPlan.calculatedCost).toLocaleString("en-IN")} Under Budget ✅`
                        : `₹${(solvedPlan.calculatedCost - solvedPlan.budget).toLocaleString("en-IN")} Over Budget ⚠️`}
                    </strong>
                  </div>
                </div>

                <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
                  <button className="apply-btn" onClick={handleApplyPlan}>
                    🚀 Apply Layout & Hardware Settings
                  </button>
                </div>
              </div>
            )}

            {hasSolved && !solvedPlan && (
              <div className="solver-no-result">
                ⚠️ No optimal configuration could be solved for the given constraints. Try increasing the budget allocation or reducing student seats.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
  );
}

export default AIRecommendation;