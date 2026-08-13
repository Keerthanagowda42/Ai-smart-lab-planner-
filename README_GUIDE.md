# 🚀 AI Smart Lab Planner

An interactive full-stack 3D Web Application designed for educational institutions to plan computer laboratories, spatial layouts, network topologies, electrical power distribution, and budget estimations.

---

## 🛠️ How to Run the Project (Step-by-Step Guide)

### Step 1: Open Terminal in Project Directory
Open PowerShell, Command Prompt, or VS Code Terminal in the project root directory:
```bash
cd c:\Users\keert\OneDrive\Desktop\AI-Smart-Lab-Planner
```

---

### Step 2: Start the Backend Server (Express API)
Open **Terminal 1** and run:
```bash
cd backend
npm install
npm start
```
- **Backend Server**: Running live on `http://localhost:5000`
- **Health Check API**: `http://localhost:5000/api/health`

---

### Step 3: Start the Frontend Application (React + Vite + WebGL)
Open **Terminal 2** and run:
```bash
cd frontend
npm install
npm run dev
```
- **Frontend App**: Running live on `http://localhost:5173` (or `http://localhost:5174`)
- **Direct 3D Viewer Link**: `http://localhost:5173/viewer3d`

---

## 🌟 Key Application Features

1. **🖥️ 3D Laboratory Viewer Engine (`/viewer3d`)**:
   - 24 Student Workstations + 1 Executive Master Console displaying active OS textures: **`🤖 AI-BASED COMPUTER SYSTEM & NETWORK PLANNING FOR EDUCATIONAL INSTITUTIONS`**.
   - **6 3D Room Layout Modes**: Grid Columns, U-Shape Perimeter, Team Pods, High Density, Boardroom Square, and Chevron Auditorium.
   - **🔍 Click-to-Inspect Spec Sheet Modal**: Click any computer in 3D to view CPU, RAM, GPU, SSD, IP `192.168.1.107`, and power draw.
   - **🌙 Dark Neon Matrix vs ☀️ Cyber Day Lighting Switcher**.
   - **⚡ Animated Fiber Optic Data Packet Pulses** flowing in real-time.
   - **📊 Live Infrastructure Telemetry HUD** overlay.

2. **👔 Executive Instructor Workstation**:
   - Beveled mahogany walnut executive desk with ambient cyan LED accent bar, MacBook Pro silver workstation, gooseneck podium microphone, LED desk lamp, and ceramic mug.

3. **🔋 Standalone Floor UPS Unit & Separated Fixtures**:
   - Standalone 10 kVA Compact Floor-standing UPS Battery Backup Unit positioned beside the main Server Rack.
   - Centered Exit Door (`EXIT`), Smart Whiteboard, and Windows with sky views.

4. **📄 Executive PDF Reports & Proposals (`/reports`)**:
   - 1-Click PDF export (`🖨️ Export PDF / Print`) linked to live project context.

---

## 💻 System Technology Stack

- **Frontend**: React, Vite, Three.js, React Three Fiber, React Three Drei, React Router DOM
- **Backend**: Node.js, Express.js, CORS, File-based JSON Persistence
- **Styling**: Vanilla CSS3, Glassmorphism, Modern Google Fonts (Inter)
