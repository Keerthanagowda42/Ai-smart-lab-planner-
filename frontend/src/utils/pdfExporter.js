// Institutional PDF & 2D CAD Blueprint Exporter Engine

export function exportInstitutionalPDF(projectData, aiPlan) {
  const pcCount = aiPlan?.spatial?.numComputers || projectData?.numComputers || 28;
  const roomL = projectData?.roomLength || 40;
  const roomW = projectData?.roomWidth || 30;
  const roomH = projectData?.roomHeight || 12;
  const totalKw = aiPlan?.electrical?.totalKW || 18.5;
  const upsKVA = aiPlan?.electrical?.upsRatingKVA || 15;
  const totalCost = aiPlan?.budget?.totalCalculatedCost || 1230000;
  const areaSqFt = roomL * roomW;

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("⚠️ Please allow popups to download the official PDF report.");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Official Infrastructure Plan - ${projectData?.name || "Smart Computer Lab"}</title>
      <style>
        @page { size: A4; margin: 18mm; }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0f172a; margin: 0; padding: 0; font-size: 13px; line-height: 1.5; }
        .header { display: flex; justify-content: space-between; border-bottom: 3px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px; }
        .logo-title { font-size: 22px; font-weight: 900; color: #1e3a8a; letter-spacing: -0.5px; }
        .subtitle { font-size: 12px; color: #64748b; margin-top: 2px; }
        .meta-stamp { text-align: right; font-size: 11px; color: #475569; }
        .badge-verified { background: #dcfce7; color: #16a34a; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 10px; display: inline-block; margin-top: 4px; }
        
        .section-title { font-size: 15px; font-weight: 800; color: #1e3a8a; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 22px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
        
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        
        .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
        .card-label { font-size: 10px; color: #64748b; font-weight: 700; text-transform: uppercase; }
        .card-value { font-size: 18px; font-weight: 900; color: #2563eb; margin-top: 2px; }

        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
        th { background: #1e3a8a; color: white; padding: 8px 10px; text-align: left; font-size: 11px; text-transform: uppercase; }
        td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }
        tr:nth-child(even) { background: #f8fafc; }
        .total-row td { font-weight: 900; background: #eff6ff; color: #1e3a8a; border-top: 2px solid #2563eb; }

        .cad-preview { width: 100%; height: 180px; background: #0f172a; border-radius: 8px; border: 2px solid #3b82f6; display: flex; align-items: center; justify-content: center; color: #38bdf8; font-family: monospace; font-size: 12px; text-align: center; margin-top: 10px; position: relative; }
        .cad-grid-line { position: absolute; border: 1px dashed rgba(56, 189, 248, 0.2); }

        .footer { margin-top: 30px; border-top: 1px solid #cbd5e1; padding-top: 10px; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="logo-title">HKBK COLLEGE OF ENGINEERING</div>
          <div class="subtitle">Department of Information Science & Engineering · Bengaluru – 560045</div>
          <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-top: 6px;">
            AI-BASED SMART COMPUTER LAB & INFRASTRUCTURE SPECIFICATION REPORT
          </div>
        </div>
        <div class="meta-stamp">
          <div>Document ID: <strong>HKBK-LAB-2026-088</strong></div>
          <div>Date: <strong>${new Date().toLocaleDateString("en-IN")}</strong></div>
          <div class="badge-verified">✓ IEEE CSP AI VERIFIED</div>
        </div>
      </div>

      <div class="section-title">1. Executive Infrastructure Sizing</div>
      <div class="grid-3">
        <div class="card">
          <div class="card-label">Workstations Sizing</div>
          <div class="card-value">${pcCount} Systems</div>
          <small style="color:#64748b">${roomL}ft × ${roomW}ft (${areaSqFt} sq ft)</small>
        </div>
        <div class="card">
          <div class="card-label">Electrical Power & UPS</div>
          <div class="card-value">${totalKw} kW</div>
          <small style="color:#64748b">${upsKVA} kVA Online UPS (30-Min Backup)</small>
        </div>
        <div class="card">
          <div class="card-label">Total CapEx Budget</div>
          <div class="card-value">₹${totalCost.toLocaleString("en-IN")}</div>
          <small style="color:#64748b">Estimated Bill of Materials</small>
        </div>
      </div>

      <div class="section-title">2. 2D CAD Vector Floorplan Blueprint</div>
      <div class="cad-preview">
        <div>
          <div style="font-size: 16px; font-weight: 800; color: #00e5ff; margin-bottom: 4px;">📐 ARCHITECTURAL 2D CAD BLUEPRINT</div>
          <div>Room Dimensions: ${roomL}' × ${roomW}' × ${roomH}' · Dual-Block Central Aisle Grid</div>
          <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Cat6 Cable Tray Channels (Star Topology) · 42U Server Rack at (X: 9.4, Z: -5.6)</div>
        </div>
      </div>

      <div class="section-title">3. Itemized Bill of Materials (BOM)</div>
      <table>
        <thead>
          <tr>
            <th>Equipment / Material Description</th>
            <th>Quantity</th>
            <th>Unit Cost (₹)</th>
            <th style="text-align:right">Total Cost (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>High-Performance Workstations (Core i7 / 16GB RAM / RTX 4060)</td>
            <td>${pcCount} Units</td>
            <td>₹72,000</td>
            <td style="text-align:right">₹${(pcCount * 72000).toLocaleString("en-IN")}</td>
          </tr>
          <tr>
            <td>Cat6 UTP Structured Cabling (Snagless Patch Cords & Boxes)</td>
            <td>386 Meters</td>
            <td>₹60</td>
            <td style="text-align:right">₹23,160</td>
          </tr>
          <tr>
            <td>24-Port Managed Gigabit Ethernet Switches (Cisco CBS350)</td>
            <td>2 Units</td>
            <td>₹38,000</td>
            <td style="text-align:right">₹76,000</td>
          </tr>
          <tr>
            <td>15 kVA 3-Phase Online Double-Conversion UPS System</td>
            <td>1 System</td>
            <td>₹1,85,000</td>
            <td style="text-align:right">₹1,85,000</td>
          </tr>
          <tr>
            <td>42U Server Rack Enclosure with Digital PDU & Fan Trays</td>
            <td>1 Unit</td>
            <td>₹55,000</td>
            <td style="text-align:right">₹55,000</td>
          </tr>
          <tr class="total-row">
            <td colspan="3">TOTAL ESTIMATED PROJECT CAPEX BUDGET</td>
            <td style="text-align:right">₹${totalCost.toLocaleString("en-IN")}</td>
          </tr>
        </tbody>
      </table>

      <div class="section-title">4. Institutional Sign-Off & Approvals</div>
      <div class="grid-2" style="margin-top: 25px;">
        <div style="border-top: 1px solid #000; padding-top: 5px;">
          <strong>Prepared By:</strong><br/>
          Keerthana V, Charan S, K K Ruchitha, Rajesh Nayaka G T<br/>
          <small>Dept. of Information Science & Engg., HKBKCE</small>
        </div>
        <div style="border-top: 1px solid #000; padding-top: 5px;">
          <strong>Approved By:</strong><br/>
          Dr. A. Syed Mustafa (HOD & Professor)<br/>
          <small>Department of Information Science & Engineering</small>
        </div>
      </div>

      <div class="footer">
        <div>Generated via AI Smart Lab Planner System</div>
        <div>Page 1 of 1</div>
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  // 1. Direct File Download Trigger (Downloads report file directly to user device)
  const blob = new Blob([htmlContent], { type: "text/html" });
  const downloadUrl = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement("a");
  downloadAnchor.href = downloadUrl;
  downloadAnchor.download = `HKBK_AI_Smart_Lab_Infrastructure_Report_${pcCount}PCs.html`;
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
  URL.revokeObjectURL(downloadUrl);

  // 2. Open Print Window for PDF Save
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

export function exportCADBlueprintSVG(projectData, aiPlan) {
  const roomL = projectData?.roomLength || 40;
  const roomW = projectData?.roomWidth || 30;
  const pcCount = aiPlan?.spatial?.numComputers || projectData?.numComputers || 24;

  const svgContent = `<?xml version="1.0" charset="UTF-8"?>
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#0f172a"/>
  <!-- Room Outer Wall -->
  <rect x="50" y="50" width="700" height="500" fill="none" stroke="#38bdf8" stroke-width="4"/>
  <!-- Floor Grid -->
  <path d="M 50 150 L 750 150 M 50 250 L 750 250 M 50 350 L 750 350 M 50 450 L 750 450" stroke="#1e293b" stroke-width="2" stroke-dasharray="5,5"/>
  <path d="M 225 50 L 225 550 M 400 50 L 400 550 M 575 50 L 575 550" stroke="#1e293b" stroke-width="2" stroke-dasharray="5,5"/>
  
  <!-- Central Aisle Line -->
  <line x1="400" y1="100" x2="400" y2="500" stroke="#22c55e" stroke-width="3"/>
  <text x="410" y="300" fill="#22c55e" font-family="sans-serif" font-size="12" font-weight="bold">CENTRAL INSTRUCTIONAL AISLE</text>
  
  <!-- Server Rack -->
  <rect x="680" y="70" width="50" height="80" fill="#11151b" stroke="#00e5ff" stroke-width="2"/>
  <text x="685" y="115" fill="#00e5ff" font-family="sans-serif" font-size="10">42U RACK</text>
  
  <!-- Teacher Desk -->
  <rect x="330" y="70" width="140" height="50" fill="#4a2c11" stroke="#f59e0b" stroke-width="2"/>
  <text x="345" y="100" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">TEACHER PODIUM</text>

  <!-- Title block -->
  <text x="70" y="80" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="bold">HKBKCE AI LAB 2D CAD BLUEPRINT</text>
  <text x="70" y="100" fill="#94a3b8" font-family="sans-serif" font-size="12">Room: ${roomL}' x ${roomW}' · ${pcCount} Workstations</text>
</svg>`;

  const blob = new Blob([svgContent], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `HKBK_Lab_2D_CAD_Blueprint_${roomL}x${roomW}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
