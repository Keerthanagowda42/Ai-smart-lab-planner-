import React, { useState } from "react";
import "./Network.css";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import QuickRequirementBar from "../components/QuickRequirementBar";

function Network() {
  const navigate = useNavigate();
  const { aiPlan, projectData } = useProject();
  const { network, hardware } = aiPlan;

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPort, setSelectedPort] = useState(1);
  const [speedTesting, setSpeedTesting] = useState(false);
  const [speedResults, setSpeedResults] = useState({
    download: 948.5,
    upload: 932.1,
    latency: 0.42,
    jitter: 0.04,
  });

  const runSpeedTest = () => {
    setSpeedTesting(true);
    setTimeout(() => {
      setSpeedResults({
        download: Math.round((930 + Math.random() * 40) * 10) / 10,
        upload: Math.round((910 + Math.random() * 35) * 10) / 10,
        latency: Math.round((0.35 + Math.random() * 0.15) * 100) / 100,
        jitter: Math.round((0.02 + Math.random() * 0.04) * 100) / 100,
      });
      setSpeedTesting(false);
    }, 1500);
  };

  const pcCount = projectData.numComputers || 24;

  return (
    <div className="network-page">
      <div style={{ maxWidth: 1050, margin: "0 auto", width: "100%" }}>
        <QuickRequirementBar />
        <div className="network-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
          <div>
            <h1>🌐 Star Network Topology & Structured Cabling</h1>
            <p className="subtitle">
              Enterprise Gigabit Ethernet infrastructure design & subnet allocation for <strong>{projectData.name}</strong>
            </p>
          </div>
          <button
            onClick={() => navigate("/viewer3d")}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #0284c7, #2563eb)",
              color: "white",
              border: "none",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
            }}
          >
            🧊 View in 3D Digital Twin →
          </button>
        </div>

        {/* Tab Selector */}
        <div className="network-tab-header">
          <button
            className={`network-tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Infrastructure Overview
          </button>
          <button
            className={`network-tab-btn ${activeTab === "switch" ? "active" : ""}`}
            onClick={() => setActiveTab("switch")}
          >
            🔀 24-Port Switch Panel Matrix
          </button>
          <button
            className={`network-tab-btn ${activeTab === "subnet" ? "active" : ""}`}
            onClick={() => setActiveTab("subnet")}
          >
            🏷️ VLAN & IP Subnet Allocation
          </button>
          <button
            className={`network-tab-btn ${activeTab === "speedtest" ? "active" : ""}`}
            onClick={() => setActiveTab("speedtest")}
          >
            ⚡ Live Speed & Latency Test
          </button>
        </div>

        {activeTab === "overview" && (
          <div>
            <div className="network-grid">
              <div className="network-box">
                <h3>🌐 Topology Architecture</h3>
                <p><strong>{network.topology}</strong></p>
                <span style={{ fontSize: 12, color: "#64748b" }}>Redundant Star Backhaul</span>
              </div>

              <div className="network-box">
                <h3>🖥 Server Rack Specs</h3>
                <p><strong>{hardware.serverSpec}</strong></p>
                <span style={{ fontSize: 12, color: "#64748b" }}>42U Cabinet + PDU + Patch Panels</span>
              </div>

              <div className="network-box">
                <h3>🔀 Managed Switches</h3>
                <p><strong>{network.switchesNeeded24Port}× 24-Port Switches</strong></p>
                <span style={{ fontSize: 12, color: "#64748b" }}>{hardware.switchSpec}</span>
              </div>

              <div className="network-box">
                <h3>🔌 CAT6 Structured Cabling</h3>
                <p><strong>{network.totalCableMeters} Meters Total</strong></p>
                <span style={{ fontSize: 12, color: "#64748b" }}>Shielded Twisted Pair (STP)</span>
              </div>

              <div className="network-box">
                <h3>🛡 Hardware Firewall</h3>
                <p><strong>{hardware.routerSpec}</strong></p>
                <span style={{ fontSize: 12, color: "#64748b" }}>Stateful Packet Inspection (SPI)</span>
              </div>

              <div className="network-box">
                <h3>🌍 Uplink Bandwidth</h3>
                <p><strong>1 Gbps Full-Duplex</strong></p>
                <span style={{ fontSize: 12, color: "#64748b" }}>Dedicated Institutional Fiber</span>
              </div>
            </div>

            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 14, padding: 18, marginTop: 20 }}>
              <h4 style={{ margin: "0 0 6px", color: "#1e40af" }}>ℹ️ Manhattan Routing & Cable Management</h4>
              <p style={{ margin: 0, fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
                All CAT6 drops originate from the central 42U Server Rack patch panels, traveling along ceiling cable trays and dropping into modular workstation risers. This eliminates floor tripping hazards, reduces EMI interference, and maintains a strict 1 Gbps link budget per node.
              </p>
            </div>
          </div>
        )}

        {activeTab === "switch" && (
          <div>
            <div style={{ background: "#0f172a", borderRadius: 16, padding: 22, color: "#f8fafc", border: "1px solid #334155" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, color: "#38bdf8" }}>CISCO CATALYST 24-PORT MANAGED GIGABIT SWITCH (SW-01)</h3>
                  <small style={{ color: "#94a3b8" }}>Layer 2/3 Managed PoE+ Switch · Status: ● NORMAL (All Ports Active)</small>
                </div>
                <span style={{ background: "#166534", color: "#4ade80", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                  24 / 24 Ports Connected
                </span>
              </div>

              {/* 24 Port Blade Visualizer */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 8, background: "#1e293b", padding: 16, borderRadius: 12, border: "1px solid #475569" }}>
                {Array.from({ length: 24 }).map((_, i) => {
                  const portNum = i + 1;
                  const isSelected = selectedPort === portNum;
                  const isTeacherOrServer = portNum === 1 || portNum === 2;
                  return (
                    <div
                      key={portNum}
                      onClick={() => setSelectedPort(portNum)}
                      style={{
                        background: isSelected ? "#0284c7" : "#0f172a",
                        border: isSelected ? "2px solid #38bdf8" : "1px solid #334155",
                        borderRadius: 8,
                        padding: "8px 4px",
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ fontSize: 9, color: isSelected ? "#ffffff" : "#94a3b8", fontWeight: 700 }}>#{portNum}</div>
                      <div style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: isTeacherOrServer ? "#eab308" : "#22c55e",
                        margin: "4px auto",
                        boxShadow: isTeacherOrServer ? "0 0 6px #eab308" : "0 0 6px #22c55e"
                      }} />
                      <div style={{ fontSize: 8, color: isSelected ? "#e0f2fe" : "#cbd5e1" }}>
                        {portNum === 1 ? "SERVER" : portNum === 2 ? "TEACHER" : `PC-${portNum - 2 < 10 ? "0" + (portNum - 2) : portNum - 2}`}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Port Inspector Detail */}
              <div style={{ marginTop: 18, background: "#161e2e", padding: 14, borderRadius: 10, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, fontSize: 13, border: "1px solid #1e293b" }}>
                <div>
                  <small style={{ color: "#94a3b8", display: "block" }}>Port Identifier</small>
                  <strong>GigabitEthernet 1/0/{selectedPort}</strong>
                </div>
                <div>
                  <small style={{ color: "#94a3b8", display: "block" }}>Connected Device</small>
                  <strong style={{ color: "#38bdf8" }}>
                    {selectedPort === 1 ? "Main Lab Server (RAID-10)" : selectedPort === 2 ? "Instructor Console Master" : `Student Workstation PC-${selectedPort - 2 < 10 ? "0" + (selectedPort - 2) : selectedPort - 2}`}
                  </strong>
                </div>
                <div>
                  <small style={{ color: "#94a3b8", display: "block" }}>Speed & Duplex</small>
                  <strong style={{ color: "#22c55e" }}>1000 Mbps Full-Duplex</strong>
                </div>
                <div>
                  <small style={{ color: "#94a3b8", display: "block" }}>VLAN Membership</small>
                  <strong style={{ color: "#f59e0b" }}>{selectedPort <= 2 ? "VLAN 20 (Management)" : "VLAN 10 (Academic Lab)"}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "subnet" && (
          <div>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f1f5f9", borderBottom: "2px solid #cbd5e1" }}>
                  <th style={{ padding: 12, color: "#475569" }}>VLAN ID</th>
                  <th style={{ padding: 12, color: "#475569" }}>VLAN Name</th>
                  <th style={{ padding: 12, color: "#475569" }}>Subnet Range</th>
                  <th style={{ padding: 12, color: "#475569" }}>Gateway IP</th>
                  <th style={{ padding: 12, color: "#475569" }}>DHCP Pool Scope</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: 12, fontWeight: 700, color: "#0284c7" }}>VLAN 10</td>
                  <td style={{ padding: 12, fontWeight: 600 }}>Academic Workstations</td>
                  <td style={{ padding: 12, fontFamily: "monospace" }}>192.168.10.0/24</td>
                  <td style={{ padding: 12, fontFamily: "monospace" }}>192.168.10.1</td>
                  <td style={{ padding: 12, color: "#16a34a" }}>192.168.10.10 - 192.168.10.99 ({pcCount} Active)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: 12, fontWeight: 700, color: "#9333ea" }}>VLAN 20</td>
                  <td style={{ padding: 12, fontWeight: 600 }}>Lab Servers & Infrastructure</td>
                  <td style={{ padding: 12, fontFamily: "monospace" }}>192.168.20.0/24</td>
                  <td style={{ padding: 12, fontFamily: "monospace" }}>192.168.20.1</td>
                  <td style={{ padding: 12, color: "#64748b" }}>192.168.20.2 - 192.168.20.10 (Static)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: 12, fontWeight: 700, color: "#ea580c" }}>VLAN 30</td>
                  <td style={{ padding: 12, fontWeight: 600 }}>Instructor Podium & Smart Display</td>
                  <td style={{ padding: 12, fontFamily: "monospace" }}>192.168.30.0/24</td>
                  <td style={{ padding: 12, fontFamily: "monospace" }}>192.168.30.1</td>
                  <td style={{ padding: 12, color: "#64748b" }}>192.168.30.10 - 192.168.30.20</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: 12, fontWeight: 700, color: "#475569" }}>VLAN 99</td>
                  <td style={{ padding: 12, fontWeight: 600 }}>Switch Management (SSH/SNMP)</td>
                  <td style={{ padding: 12, fontFamily: "monospace" }}>192.168.99.0/24</td>
                  <td style={{ padding: 12, fontFamily: "monospace" }}>192.168.99.1</td>
                  <td style={{ padding: 12, color: "#dc2626" }}>Admin Access Only (Protected)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "speedtest" && (
          <div>
            <div style={{ background: "#0f172a", borderRadius: 16, padding: 24, color: "white", textAlign: "center" }}>
              <h3 style={{ margin: "0 0 6px", color: "#38bdf8" }}>INTERNAL STAR BACKHAUL SPEED SIMULATOR</h3>
              <p style={{ margin: "0 0 20px", color: "#94a3b8", fontSize: 13 }}>
                Simulating throughput test from Workstation (PC-01) to Central Lab Server through CAT6 trunking
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 15, marginBottom: 25 }}>
                <div style={{ background: "#1e293b", padding: 18, borderRadius: 12, border: "1px solid #334155" }}>
                  <small style={{ color: "#94a3b8", display: "block" }}>DOWNLOAD SPEED</small>
                  <h2 style={{ margin: "6px 0 0", color: "#22c55e", fontSize: 28 }}>{speedResults.download} <span style={{ fontSize: 14 }}>Mbps</span></h2>
                </div>
                <div style={{ background: "#1e293b", padding: 18, borderRadius: 12, border: "1px solid #334155" }}>
                  <small style={{ color: "#94a3b8", display: "block" }}>UPLOAD SPEED</small>
                  <h2 style={{ margin: "6px 0 0", color: "#38bdf8", fontSize: 28 }}>{speedResults.upload} <span style={{ fontSize: 14 }}>Mbps</span></h2>
                </div>
                <div style={{ background: "#1e293b", padding: 18, borderRadius: 12, border: "1px solid #334155" }}>
                  <small style={{ color: "#94a3b8", display: "block" }}>PING LATENCY</small>
                  <h2 style={{ margin: "6px 0 0", color: "#f59e0b", fontSize: 28 }}>{speedResults.latency} <span style={{ fontSize: 14 }}>ms</span></h2>
                </div>
                <div style={{ background: "#1e293b", padding: 18, borderRadius: 12, border: "1px solid #334155" }}>
                  <small style={{ color: "#94a3b8", display: "block" }}>JITTER</small>
                  <h2 style={{ margin: "6px 0 0", color: "#a855f7", fontSize: 28 }}>{speedResults.jitter} <span style={{ fontSize: 14 }}>ms</span></h2>
                </div>
              </div>

              <button
                onClick={runSpeedTest}
                disabled={speedTesting}
                style={{
                  padding: "12px 30px",
                  borderRadius: "12px",
                  background: speedTesting ? "#475569" : "linear-gradient(135deg, #0284c7, #2563eb)",
                  color: "white",
                  border: "none",
                  fontWeight: 800,
                  fontSize: "14px",
                  cursor: speedTesting ? "wait" : "pointer",
                  boxShadow: "0 4px 15px rgba(2, 132, 199, 0.4)"
                }}
              >
                {speedTesting ? "🔄 Running Structured Cable Packet Stream..." : "⚡ Run Real-Time Speed & Ping Test"}
              </button>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 15, marginTop: 25 }}>
          <button className="next-btn" style={{ background: "#64748b" }} onClick={() => navigate("/budget")}>
            ← Back to Budget
          </button>
          <button className="next-btn" style={{ flex: 1 }} onClick={() => navigate("/electrical")}>
            Continue to Electrical Distribution →
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Network;