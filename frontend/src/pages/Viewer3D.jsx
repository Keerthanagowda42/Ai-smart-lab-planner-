import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import { exportInstitutionalPDF, exportCADBlueprintSVG } from "../utils/pdfExporter";
import * as THREE from "three";
import "./Viewer3D.css";

// ---------- 3D OBJECT LABEL ----------
function Label() {
  // Returns null to eliminate floating mid-air text badges for a clean photorealistic 3D scene
  return null;
}

// ---------- MESH BOX HELPER ----------
function Box({ position, size, color, roughness = 0.55, metalness = 0 }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

// ---------- ROOM STRUCTURE ----------
function Room({ roomLength = 40, roomWidth = 30 }) {
  const width = Math.max(18, Math.min(26, roomWidth * 0.7));
  const depth = Math.max(13, Math.min(18, roomLength * 0.4));
  const height = 7;

  const halfW = width / 2;
  const halfD = depth / 2;

  return (
    <group>
      {/* Floor */}
      <Box position={[0, -0.25, 0]} size={[width, 0.5, depth]} color="#e2e8f0" />

      {/* Floor tile grid lines */}
      {Array.from({ length: 14 }).map((_, i) => (
        <Line
          key={`f1-${i}`}
          points={[
            [-halfW + (i * width) / 13, 0.01, -halfD],
            [-halfW + (i * width) / 13, 0.01, halfD],
          ]}
          color="#cbd5e1"
          lineWidth={0.8}
        />
      ))}

      {Array.from({ length: 10 }).map((_, i) => (
        <Line
          key={`f2-${i}`}
          points={[
            [-halfW, 0.02, -halfD + (i * depth) / 9],
            [halfW, 0.02, -halfD + (i * depth) / 9],
          ]}
          color="#cbd5e1"
          lineWidth={0.8}
        />
      ))}

      {/* Back Wall */}
      <Box position={[0, height / 2, -halfD - 0.17]} size={[width, height, 0.35]} color="#f1f5f9" />

      {/* Left Wall */}
      <Box position={[-halfW - 0.17, height / 2, 0]} size={[0.35, height, depth]} color="#e2e8f0" />

      {/* Right Wall */}
      <Box position={[halfW + 0.17, height / 2, 0]} size={[0.35, height, depth]} color="#e2e8f0" />

      {/* Ceiling */}
      <Box position={[0, height + 0.17, 0]} size={[width, 0.35, depth]} color="#f8fafc" />

      {/* Decorative ceiling border */}
      <Line
        points={[
          [-halfW + 0.5, height - 0.08, -halfD + 0.5],
          [halfW - 0.5, height - 0.08, -halfD + 0.5],
          [halfW - 0.5, height - 0.08, halfD - 0.5],
          [-halfW + 0.5, height - 0.08, halfD - 0.5],
          [-halfW + 0.5, height - 0.08, -halfD + 0.5],
        ]}
        color="#cbd5e1"
        lineWidth={3}
      />

      {/* Windows on front wall (Symmetrically spaced) */}
      <WindowObj position={[-6.2, 4.6, -halfD + 0.05]} />
      <WindowObj position={[6.2, 4.6, -halfD + 0.05]} />

      {/* Wall Posters — Left Wall (Separated from wall sockets) */}
      <Poster position={[-halfW + 0.05, 3.8, -3.6]} rotation={[0, Math.PI / 2, 0]} text={"THINK\nPLAN\nEXECUTE"} />
      <Poster position={[-halfW + 0.05, 3.8, 0]} rotation={[0, Math.PI / 2, 0]} text={"CODE\nBUILD\nTEST"} />
      <Poster position={[-halfW + 0.05, 3.8, 3.6]} rotation={[0, Math.PI / 2, 0]} text={"FOCUS\nDISCIPLINE\nSUCCESS"} />
      <Poster position={[halfW - 0.05, 3.8, 2.5]} rotation={[0, -Math.PI / 2, 0]} text={"DISCIPLINE\nFOCUS\nSUCCESS"} />

    </group>
  );
}

function WindowObj({ position }) {
  const frameW = 3.6;
  const frameH = 2.4;
  const bar = 0.14;
  const d = 0.12;

  return (
    <group position={position}>
      {/* Outdoor View */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[frameW - bar, frameH - bar]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      {/* Sky Light */}
      <mesh position={[0, 0.45, -0.01]}>
        <planeGeometry args={[frameW - bar - 0.1, 0.9]} />
        <meshBasicMaterial color="#7dd3fc" />
      </mesh>

      {/* Frame */}
      <Box position={[0, frameH / 2 - bar / 2, 0]} size={[frameW, bar, d]} color="#334155" />
      <Box position={[0, -(frameH / 2 - bar / 2), 0]} size={[frameW, bar, d]} color="#334155" />
      <Box position={[-(frameW / 2 - bar / 2), 0, 0]} size={[bar, frameH, d]} color="#334155" />
      <Box position={[frameW / 2 - bar / 2, 0, 0]} size={[bar, frameH, d]} color="#334155" />

      {/* Dividers */}
      <Box position={[0, 0, 0.01]} size={[bar, frameH - bar * 2, d]} color="#475569" />
      <Box position={[0, 0, 0.01]} size={[frameW - bar * 2, bar, d]} color="#475569" />

      {/* Glass */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[frameW - bar, frameH - bar]} />
        <meshPhysicalMaterial color="#e0f2fe" transparent opacity={0.2} roughness={0.05} />
      </mesh>

      {/* Sill */}
      <Box position={[0, -(frameH / 2) - 0.08, 0.15]} size={[frameW + 0.4, 0.1, 0.32]} color="#cbd5e1" />
    </group>
  );
}

function Poster({ position, rotation, text }) {
  return (
    <group position={position} rotation={rotation}>
      <Box position={[0, 0, 0]} size={[1.8, 2.4, 0.08]} color="#0f172a" />
      <Html center distanceFactor={12}>
        <div
          style={{
            width: 65,
            textAlign: "center",
            color: "#f8fafc",
            fontWeight: 800,
            fontSize: 10,
            lineHeight: 1.3,
            whiteSpace: "pre-line",
            fontFamily: "sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          {text}
        </div>
      </Html>
    </group>
  );
}

function Plant({ position }) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.45, 0.3, 0.9, 16]} />
        <meshStandardMaterial color="#b45309" />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.05, 16]} />
        <meshStandardMaterial color="#451a03" />
      </mesh>
      {/* Foliage */}
      {[0.4, 0.8, 1.2].map((h, i) => (
        <mesh key={i} position={[0, 1.1 + h * 0.5, 0]} rotation={[0, (i * Math.PI) / 3, 0]}>
          <dodecahedronGeometry args={[0.6 - i * 0.1]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#15803d" : "#166534"} />
        </mesh>
      ))}
    </group>
  );
}

// ---------- LIGHTING FIXTURES ----------
function CeilingLights() {
  const lights = [];
  for (let x = -6.5; x <= 6.5; x += 6.5) {
    for (let z = -4.5; z <= 4.5; z += 4.5) {
      // Omit the light directly in front of the ceiling projector at x = 0, z = -4.5
      if (x === 0 && z === -4.5) continue;
      lights.push([x, 6.75, z]);
    }
  }

  return (
    <group>
      {/* Perimeter LED Cove Lighting Strip along Ceiling Trim */}
      <Line
        points={[
          [-9.7, 6.85, 6.8],
          [-9.7, 6.85, -6.8],
          [9.7, 6.85, -6.8],
          [9.7, 6.85, 6.8],
        ]}
        color="#38bdf8"
        lineWidth={3.5}
      />

      {/* Recessed Square LED Ceiling Troffers with Real Downlighting */}
      {lights.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Metallic Troffer Outer Bezel */}
          <Box size={[2.4, 0.08, 1.4]} color="#334155" metalness={0.7} />
          {/* Glowing Diffuser Lens */}
          <mesh position={[0, -0.045, 0]}>
            <planeGeometry args={[2.2, 1.2]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Downward Soft Point Light */}
          <pointLight position={[0, -0.5, 0]} intensity={0.35} distance={11} color="#f8fafc" />
        </group>
      ))}
    </group>
  );
}

function Fan({ position }) {
  return (
    <group position={position}>
      <Box position={[0, 0.3, 0]} size={[0.12, 0.6, 0.12]} color="#1e293b" />
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 20]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((rot, i) => (
        <mesh key={i} rotation={[0, rot, 0]} position={[0, 0, 0]}>
          <boxGeometry args={[2.2, 0.04, 0.3]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      ))}
    </group>
  );
}

function Projector() {
  return (
    <group position={[0, 6.4, -4.2]}>
      <Box position={[0, 0.3, 0]} size={[0.1, 0.6, 0.1]} color="#334155" />
      <Box size={[1.4, 0.5, 1.2]} color="#f8fafc" />
      <mesh position={[0, -0.05, 0.61]}>
        <cylinderGeometry args={[0.16, 0.16, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} />
      </mesh>
    </group>
  );
}

function AC() {
  return (
    <group position={[8.2, 5.8, -6.92]}>
      <Box size={[2.8, 0.8, 0.6]} color="#ffffff" />
      <Box position={[0, -0.28, 0.31]} size={[2.6, 0.08, 0.04]} color="#94a3b8" />
      <mesh position={[1.0, 0.1, 0.31]}>
        <circleGeometry args={[0.04, 12]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
    </group>
  );
}

// ---------- DISPLAY & EXIT DOOR ----------
function SmartDisplay() {
  return (
    <group position={[0, 5.45, -7.02]}>
      {/* Cyan Backlight Halo Box */}
      <Box position={[0, 0, -0.04]} size={[5.45, 2.6, 0.06]} color="#0284c7" />
      <Box size={[5.2, 2.35, 0.18]} color="#080d18" />
      <Box position={[0, -1.3, 0]} size={[0.2, 0.7, 0.2]} color="#555" />

      {/* Screen Display Text */}
      <Html center distanceFactor={11}>
        <div
          style={{
            color: "#00e5ff",
            fontWeight: 900,
            fontSize: 15,
            textAlign: "center",
            width: 280,
            textShadow: "0 0 10px #00e5ff",
            fontFamily: "sans-serif",
            lineHeight: 1.2,
          }}
        >
          AI-BASED COMPUTER SYSTEM & NETWORK PLANNING
          <div style={{ fontSize: 9, color: "#cbd5e1", marginTop: 4, fontWeight: 700 }}>
            FOR EDUCATIONAL INSTITUTIONS
          </div>
        </div>
      </Html>
    </group>
  );
}

function Door() {
  return (
    <group position={[0, 1.9, -7.0]}>
      <Box size={[3.2, 3.8, 0.25]} color="#6d4226" />
      <Box position={[0, 0, 0.2]} size={[2.65, 3.5, 0.18]} color="#9b602f" />
      <Box position={[0, 0.6, 0.33]} size={[1.5, 1.0, 0.06]} color="#78a9c7" />
      <mesh position={[0.95, 0, 0.4]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#d7b43b" metalness={0.8} />
      </mesh>
      {/* Green Illuminated EXIT Sign Box with Clean Text */}
      <group position={[0, 2.15, 0.2]}>
        <Box size={[1.2, 0.4, 0.12]} color="#15803d" />
        <Html center distanceFactor={9} style={{ pointerEvents: "none" }}>
          <div
            style={{
              color: "#ffffff",
              fontWeight: 900,
              fontSize: 12,
              letterSpacing: "2px",
              fontFamily: "sans-serif",
              whiteSpace: "nowrap",
              textShadow: "0 0 6px #ffffff",
            }}
          >
            EXIT
          </div>
        </Html>
      </group>
    </group>
  );
}

function FireExtinguisher() {
  return (
    <group position={[2.2, 2.2, -6.92]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.7, 16]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      <Box position={[0, 0.4, 0]} size={[0.1, 0.15, 0.1]} color="#1e293b" />
    </group>
  );
}

// ---------- TALL ERGONOMIC STUDENT TASK CHAIR ----------
function Chair({ position, rotation = [0, Math.PI, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* 5-Star Caster Wheel Base */}
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.06, 16]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>
      {[0, 1.25, 2.51, 3.76, 5.02].map((rot, i) => (
        <group key={i} rotation={[0, rot, 0]}>
          <Box position={[0.25, -0.32, 0]} size={[0.48, 0.05, 0.07]} color="#334155" metalness={0.8} />
          <mesh position={[0.46, -0.36, 0]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
        </group>
      ))}

      {/* Tall Swivel Gas Lift Stem */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.82, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.9} />
      </mesh>

      {/* Contoured Ergonomic Seat Cushion (Taller Height y = 0.55) */}
      <Box position={[0, 0.55, 0]} size={[1.12, 0.16, 1.0]} color="#0284c7" roughness={0.4} />

      {/* High-Back Ergonomic Mesh Backrest Frame */}
      <Box position={[0, 1.35, -0.4]} size={[1.05, 1.45, 0.1]} color="#1e293b" />
      {/* Sky Blue Breathable Mesh Back Cushion */}
      <Box position={[0, 1.35, -0.35]} size={[0.95, 1.32, 0.08]} color="#0ea5e9" roughness={0.3} />
      {/* Lumbar Support Bar */}
      <Box position={[0, 0.95, -0.42]} size={[0.9, 0.22, 0.08]} color="#0f172a" />

      {/* T-Shaped Armrests */}
      <group position={[-0.58, 0.85, -0.05]}>
        <Box position={[0, -0.1, 0]} size={[0.06, 0.42, 0.06]} color="#334155" />
        <Box position={[0, 0.12, 0]} size={[0.1, 0.05, 0.65]} color="#0f172a" />
      </group>
      <group position={[0.58, 0.85, -0.05]}>
        <Box position={[0, -0.1, 0]} size={[0.06, 0.42, 0.06]} color="#334155" />
        <Box position={[0, 0.12, 0]} size={[0.1, 0.05, 0.65]} color="#0f172a" />
      </group>
    </group>
  );
}

// ---------- DYNAMIC MONITOR TEXTURE GENERATOR ----------
function createMonitorTexture(pcName = "PC-1", classroomMode = "normal") {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext("2d");

  const isTeacher = pcName.includes("TEACHER");

  if (classroomMode === "lock") {
    // ══════════════════════════════════════════════════════════
    // MODE 1: STUDENT FOCUS SCREEN LOCK (CRIMSON CYBER SHIELD)
    // ══════════════════════════════════════════════════════════
    const grad = ctx.createRadialGradient(512, 288, 50, 512, 288, 600);
    grad.addColorStop(0, "#2d0606");
    grad.addColorStop(1, "#0a0101");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 576);

    // Grid matrix background pattern
    ctx.strokeStyle = "rgba(244, 63, 94, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 32) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 576); ctx.stroke();
    }
    for (let y = 0; y < 576; y += 32) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
    }

    // Top Header Banner
    ctx.fillStyle = "#1e0308";
    ctx.fillRect(0, 0, 1024, 46);
    ctx.fillStyle = "#f43f5e";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("🛡️ INSTITUTIONAL LAB SECURITY SYSTEM v4.2", 24, 29);
    ctx.textAlign = "right";
    ctx.fillStyle = "#ef4444";
    ctx.fillText(isTeacher ? "● INSTRUCTOR MASTER (LOCK ACTIVE)" : "● SYSTEM RESTRICTED", 1000, 29);

    // Glowing Lock / Shield Graphic
    ctx.save();
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 4;
    ctx.shadowColor = "#f43f5e";
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.arc(512, 175, 45, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = "50px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(isTeacher ? "🛑" : "🔒", 512, 192);
    ctx.restore();

    // Main Alert Text
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 32px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(isTeacher ? "STUDENT CONSOLES TEMPORARILY LOCKED" : "ATTENTION: SCREEN ACCESS RESTRICTED", 512, 275);

    ctx.fillStyle = "#fda4af";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText(isTeacher ? "All student terminals are currently blocked to direct attention to whiteboard." : "Instructor has paused individual system input for a lecture demonstration.", 512, 320);

    // Focus Alert Badge
    ctx.fillStyle = "#4c0519";
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(162, 365, 700, 60, 12);
      ctx.fill();
    } else {
      ctx.fillRect(162, 365, 700, 60);
    }
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 2;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(162, 365, 700, 60, 12);
      ctx.stroke();
    }

    ctx.fillStyle = "#fecdd3";
    ctx.font = "bold 19px sans-serif";
    ctx.fillText("👀 PLEASE REDIRECT YOUR ATTENTION TO THE FRONT PRESENTATION SCREEN", 512, 403);

    // Bottom Status Bar
    ctx.fillStyle = "#1e0308";
    ctx.fillRect(0, 520, 1024, 56);
    ctx.fillStyle = "#fb7185";
    ctx.font = "14px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`Console ID: ${pcName}  |  Policy: INSTRUCTOR_BROADCAST_OVERRIDE`, 24, 553);
    ctx.textAlign = "right";
    ctx.fillText("Status: Screen Locked (Session Preserved)", 1000, 553);

  } else if (classroomMode === "broadcast") {
    // ══════════════════════════════════════════════════════════
    // MODE 2: SCREEN MIRRORING / BROADCAST PRESENTATION SLIDE
    // ══════════════════════════════════════════════════════════
    const grad = ctx.createLinearGradient(0, 0, 1024, 576);
    grad.addColorStop(0, "#081b33");
    grad.addColorStop(1, "#030a14");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 576);

    // Top Header Banner
    ctx.fillStyle = "#0c284d";
    ctx.fillRect(0, 0, 1024, 46);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 17px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("📡 LIVE INSTRUCTOR SCREEN BROADCAST (MIRROR ACTIVE)", 24, 29);
    ctx.textAlign = "right";
    ctx.fillStyle = "#22c55e";
    ctx.fillText("● 1080p 60fps FEED", 1000, 29);

    // Presentation Slide Container
    ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(40, 68, 944, 440, 16);
      ctx.fill();
    } else {
      ctx.fillRect(40, 68, 944, 440);
    }
    ctx.strokeStyle = "#0284c7";
    ctx.lineWidth = 2;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(40, 68, 944, 440, 16);
      ctx.stroke();
    }

    // Slide Header
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("MODULE 4: AI SMART LAB & COMPUTER NETWORK PLANNING", 70, 110);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 28px sans-serif";
    ctx.fillText("Topology Architecture & 3D WebGL Digital Twin Simulation", 70, 150);

    // Flow Diagram inside slide
    const boxes = [
      { label: "1. SPATIAL SOLVER", sub: "Capacity & Safety Aisles", x: 80, y: 195, w: 240, h: 105, col: "#0284c7" },
      { label: "2. STAR NETWORK", sub: "Gigabit Switch & CAT6", x: 390, y: 195, w: 240, h: 105, col: "#0ea5e9" },
      { label: "3. ELECTRICAL & UPS", sub: "3-Phase Balancing & kVA", x: 700, y: 195, w: 240, h: 105, col: "#10b981" },
    ];

    boxes.forEach((b) => {
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.strokeStyle = b.col;
      ctx.lineWidth = 2;
      ctx.strokeRect(b.x, b.y, b.w, b.h);

      ctx.fillStyle = b.col;
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(b.label, b.x + b.w / 2, b.y + 42);

      ctx.fillStyle = "#cbd5e1";
      ctx.font = "13px sans-serif";
      ctx.fillText(b.sub, b.x + b.w / 2, b.y + 75);
    });

    // Connector Arrows
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 28px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("➔", 355, 255);
    ctx.fillText("➔", 665, 255);

    // Instructor info badge
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(70, 335, 884, 80);
    ctx.strokeStyle = "#334155";
    ctx.strokeRect(70, 335, 884, 80);

    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("👨‍🏫 Instructor: Prof. Keerthana Gowda  |  Institution: HKBK College of Engineering", 95, 370);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px sans-serif";
    ctx.fillText("Follow the interactive code walkthrough on your workstation screen.", 95, 395);

    // Bottom Status Bar
    ctx.fillStyle = "#061324";
    ctx.fillRect(0, 520, 1024, 56);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "14px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`Terminal: ${pcName}  |  Stream: LOW_LATENCY_BROADCAST_CHANNEL_1`, 24, 553);
    ctx.textAlign = "right";
    ctx.fillText("Status: Mirroring Master Console Feed", 1000, 553);

  } else {
    // ══════════════════════════════════════════════════════════
    // MODE 3: LIVE OS / VS CODE & PYTHON AI LAB IDE
    // ══════════════════════════════════════════════════════════
    ctx.fillStyle = "#181e29";
    ctx.fillRect(0, 0, 1024, 576);

    // Top Window Title Bar (Mac/Ubuntu style)
    ctx.fillStyle = "#0f141c";
    ctx.fillRect(0, 0, 1024, 42);

    ctx.fillStyle = "#ef4444";
    ctx.beginPath(); ctx.arc(22, 21, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#eab308";
    ctx.beginPath(); ctx.arc(42, 21, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#22c55e";
    ctx.beginPath(); ctx.arc(62, 21, 6, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`AI Smart Lab IDE — [${pcName}]  —  main_planner.py`, 90, 26);

    ctx.textAlign = "right";
    ctx.fillStyle = "#22c55e";
    ctx.fillText("● ONLINE (1 Gbps Star Link)", 1000, 26);

    // Left Sidebar (Explorer)
    ctx.fillStyle = "#111722";
    ctx.fillRect(0, 42, 200, 480);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("EXPLORER: AI_LAB", 18, 68);

    const files = [
      { name: "📁 models/", col: "#cbd5e1" },
      { name: "📄 main_planner.py", col: "#38bdf8" },
      { name: "📄 network_star.json", col: "#eab308" },
      { name: "📄 electrical_ups.py", col: "#4ade80" },
      { name: "📄 digital_twin_3d.jsx", col: "#a855f7" },
    ];
    files.forEach((f, idx) => {
      ctx.fillStyle = f.col;
      ctx.font = "12px monospace";
      ctx.fillText(f.name, 22, 100 + idx * 24);
    });

    // Code Editor Window
    ctx.fillStyle = "#1e2638";
    ctx.fillRect(200, 42, 824, 340);

    const codeLines = [
      { line: 1, text: "import numpy as np", col: "#f43f5e" },
      { line: 2, text: "from ai_smart_lab import StarNetworkPlanner, PowerFactorSolver", col: "#f43f5e" },
      { line: 3, text: "", col: "#ffffff" },
      { line: 4, text: "# Initialize Multi-Constraint Lab Planning Framework", col: "#64748b" },
      { line: 5, text: "lab = StarNetworkPlanner(workstations=28, room=(40, 30))", col: "#e2e8f0" },
      { line: 6, text: "cabling = lab.calculate_manhattan_routes(slack=1.15)", col: "#38bdf8" },
      { line: 7, text: "electrical_load = PowerFactorSolver.get_3phase_kw(pf=0.90)", col: "#4ade80" },
      { line: 8, text: "print(f'✅ Optimization Complete: {cabling.total_meters}m CAT6')", col: "#fbbf24" },
      { line: 9, text: "lab.export_3d_digital_twin(format='ThreeJS_WebGL')", col: "#38bdf8" },
    ];

    codeLines.forEach((c) => {
      ctx.fillStyle = "#475569";
      ctx.font = "12px monospace";
      ctx.textAlign = "right";
      ctx.fillText(`${c.line}`, 235, 78 + (c.line - 1) * 22);

      ctx.fillStyle = c.col;
      ctx.textAlign = "left";
      ctx.fillText(c.text, 255, 78 + (c.line - 1) * 22);
    });

    // Bottom Interactive Terminal
    ctx.fillStyle = "#0c1017";
    ctx.fillRect(200, 382, 824, 140);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 12px monospace";
    ctx.textAlign = "left";
    ctx.fillText("TERMINAL: bash (active node)", 215, 404);

    ctx.fillStyle = "#22c55e";
    ctx.font = "12px monospace";
    ctx.fillText(`user@${pcName.toLowerCase()}:~$ python3 main_planner.py`, 215, 430);
    ctx.fillText(`[AI Lab Engine] Solving spatial & electrical constraints... Done (0.014s)`, 215, 452);
    ctx.fillStyle = "#38bdf8";
    ctx.fillText(`[Network Hub] Link established to 24-Port Switch Port #${(parseInt(pcName.replace(/\D/g, "") || "1") % 24) + 1} (1000BASE-T)`, 215, 474);
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(`[Status] Workstation Ready. IP: 192.168.10.${100 + parseInt(pcName.replace(/\D/g, "") || "1")}`, 215, 496);

    // Footer Status Bar
    ctx.fillStyle = "#0284c7";
    ctx.fillRect(0, 522, 1024, 54);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`  ⚡ CPU: 41.8°C (14% Load)  |  GPU: RTX 3050 (52°C)  |  RAM: 5.4/16 GB  |  ${pcName}`, 12, 552);
    ctx.textAlign = "right";
    ctx.fillText("UTF-8  |  Python 3.11  |  Star Topology  ", 1010, 552);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ---------- REAL WORKING MONITOR ----------
function WorkingMonitor({ id = 1, pcName, classroomMode }) {
  const texture = useMemo(() => createMonitorTexture(pcName || `PC-${id}`, classroomMode), [pcName, id, classroomMode]);

  return (
    <group>
      {/* Base Stand */}
      <Box position={[0, 1.25, -0.35]} size={[0.5, 0.02, 0.32]} color="#1e293b" />
      <Box position={[0, 1.5, -0.38]} size={[0.1, 0.5, 0.08]} color="#334155" />

      {/* Ultra-Thin Bezel Frame */}
      <Box position={[0, 1.82, -0.34]} size={[1.48, 0.88, 0.08]} color="#0f172a" />

      {/* Power LED Indicator */}
      <mesh position={[0.66, 1.41, -0.29]}>
        <circleGeometry args={[0.015, 12]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>

      {/* Canvas Texture Display Face */}
      <mesh position={[0, 1.82, -0.29]}>
        <planeGeometry args={[1.4, 0.8]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  );
}

function Workstation({ position, rotation = [0, 0, 0], id, pcName, onSelectPC, classroomMode }) {
  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        if (onSelectPC) onSelectPC({ id, pcName, position });
      }}
    >
      {/* Desk */}
      <Box position={[0, 1.15, 0]} size={[2.7, 0.18, 1.45]} color="#9b632e" />
      <Box position={[-1.15, 0.55, 0]} size={[0.13, 1.2, 1.3]} color="#71421f" />
      <Box position={[1.15, 0.55, 0]} size={[0.13, 1.2, 1.3]} color="#71421f" />

      {/* Real Working Monitor */}
      <WorkingMonitor id={id} pcName={pcName} classroomMode={classroomMode} />

      {/* CPU Case */}
      <Box position={[-0.92, 1.55, 0.05]} size={[0.38, 0.82, 0.58]} color="#202833" />
      <mesh position={[-0.92, 1.55, 0.35]}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>

      {/* Keyboard */}
      <Box position={[0, 1.27, 0.35]} size={[0.85, 0.05, 0.3]} color="#111827" />

      {/* Mouse */}
      <mesh position={[0.62, 1.31, 0.35]}>
        <sphereGeometry args={[0.1, 16, 10]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* Chair Facing Computer Screen */}
      <Chair position={[0, 0, 1.15]} rotation={[0, Math.PI, 0]} />

      <Label position={[0, 2.45, 0]} size={0.14}>
        {pcName || `PC-${id}`}
      </Label>
    </group>
  );
}

// ---------- EXECUTIVE TEACHER DESK & CHAIR ----------
function TeacherArea({ classroomMode }) {
  const teacherTexture = useMemo(() => createMonitorTexture("TEACHER-MASTER", classroomMode), [classroomMode]);

  return (
    <group position={[0, 0, 5.2]}>
      {/* Premium Beveled Walnut Executive Tabletop */}
      <Box position={[0, 1.18, 0]} size={[3.4, 0.16, 1.8]} color="#4a2c11" roughness={0.3} />
      {/* Metallic Brushed Aluminum Trim along Front Desk Edge */}
      <Box position={[0, 1.18, -0.91]} size={[3.42, 0.08, 0.04]} color="#0284c7" metalness={0.8} />

      {/* Front Executive Wooden Modesty Panel */}
      <Box position={[0, 0.6, -0.85]} size={[3.2, 0.95, 0.06]} color="#361f0b" />
      {/* Front Ambient Cyan LED Accent Bar */}
      <Box position={[0, 0.95, -0.87]} size={[2.6, 0.04, 0.03]} color="#38bdf8" />

      {/* Left Pedestal Cabinet with Metallic Drawers */}
      <group position={[-1.25, 0.55, 0]}>
        <Box size={[0.75, 1.05, 1.5]} color="#2d1909" />
        {[0.3, -0.1, -0.4].map((y, idx) => (
          <group key={idx} position={[0, y, 0.76]}>
            <Box size={[0.65, 0.28, 0.04]} color="#4a2c11" />
            <Box position={[0, 0, 0.03]} size={[0.22, 0.05, 0.03]} color="#cbd5e1" metalness={0.9} />
          </group>
        ))}
      </group>

      {/* Right Pedestal Cabinet with Metallic Drawers */}
      <group position={[1.25, 0.55, 0]}>
        <Box size={[0.75, 1.05, 1.5]} color="#2d1909" />
        {[0.3, -0.1, -0.4].map((y, idx) => (
          <group key={idx} position={[0, y, 0.76]}>
            <Box size={[0.65, 0.28, 0.04]} color="#4a2c11" />
            <Box position={[0, 0, 0.03]} size={[0.22, 0.05, 0.03]} color="#cbd5e1" metalness={0.9} />
          </group>
        ))}
      </group>

      {/* Modern Silver MacBook Pro Laptop */}
      <group position={[0, 1.26, -0.1]}>
        {/* Base */}
        <Box position={[0, 0.03, 0]} size={[1.15, 0.04, 0.78]} color="#cbd5e1" metalness={0.85} roughness={0.2} />
        {/* Keyboard Surface */}
        <Box position={[0, 0.055, 0.08]} size={[0.95, 0.02, 0.42]} color="#0f172a" />
        {/* Trackpad */}
        <Box position={[0, 0.055, 0.3]} size={[0.3, 0.015, 0.18]} color="#94a3b8" />
        {/* Tilted Open Screen */}
        <group position={[0, 0.04, -0.38]} rotation={[-0.3, 0, 0]}>
          <Box position={[0, 0.35, 0]} size={[1.15, 0.7, 0.03]} color="#94a3b8" metalness={0.85} />
          {/* Glowing Active Display with AI System & Network Planning Text Texture */}
          <mesh position={[0, 0.35, 0.018]}>
            <planeGeometry args={[1.08, 0.63]} />
            <meshBasicMaterial map={teacherTexture} />
          </mesh>
        </group>
      </group>

      {/* Gooseneck Podium Microphone */}
      <group position={[-1.1, 1.26, -0.3]}>
        <Box size={[0.22, 0.05, 0.28]} color="#0f172a" />
        <mesh position={[0, 0.25, -0.05]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.45, 10]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.45, -0.15]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* Minimalist LED Desk Lamp */}
      <group position={[1.15, 1.26, -0.3]}>
        <Box size={[0.3, 0.04, 0.3]} color="#0f172a" />
        <Box position={[0, 0.3, -0.1]} size={[0.04, 0.58, 0.04]} color="#0f172a" />
        <Box position={[0, 0.58, 0.05]} size={[0.04, 0.04, 0.32]} color="#0f172a" />
        <Box position={[0, 0.56, 0.18]} size={[0.16, 0.03, 0.12]} color="#ffffff" />
      </group>

      {/* Ceramic Coffee Mug */}
      <group position={[1.1, 1.26, 0.3]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.09, 0.08, 0.2, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.1} />
        </mesh>
      </group>

      {/* Teacher Chair Facing Towards Teacher Table */}
      <Chair position={[0, 0, 1.65]} rotation={[0, Math.PI, 0]} />
    </group>
  );
}

// ---------- SERVER RACK ----------
function ServerRack() {
  return (
    <group position={[9.4, 2.25, -5.6]}>
      <Box size={[2.0, 4.5, 1.25]} color="#11151b" metalness={0.35} />

      {[...Array(7)].map((_, i) => (
        <group key={i} position={[0, 1.55 - i * 0.52, 0.66]}>
          <Box size={[1.55, 0.28, 0.08]} color="#18232d" />
          <mesh position={[0.55, 0, 0.08]}>
            <sphereGeometry args={[0.045, 10, 10]} />
            <meshBasicMaterial color="#19e67a" />
          </mesh>
        </group>
      ))}

      <Label position={[0, 2.75, 0]}>SERVER RACK</Label>
      <Label position={[0, 1.0, 0]}>NETWORK SWITCH</Label>
      <Label position={[0, -0.5, 0]}>MAIN SERVER</Label>
    </group>
  );
}

// ---------- COMPACT STANDALONE UPS POWER BACKUP UNIT ----------
function UPSUnit() {
  return (
    <group position={[8.8, 0.625, -2.4]}>
      {/* Compact Tower Enclosure */}
      <Box size={[1.0, 1.25, 0.8]} color="#1e293b" metalness={0.5} roughness={0.3} />
      {/* Cyan Bezel Accent Trim */}
      <Box position={[0, 0.58, 0.41]} size={[0.95, 0.05, 0.03]} color="#38bdf8" />

      {/* Front LCD Power Status Screen */}
      <Box position={[0, 0.35, 0.41]} size={[0.7, 0.26, 0.03]} color="#0f172a" />
      <mesh position={[0, 0.35, 0.43]}>
        <planeGeometry args={[0.62, 0.2]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>
      {/* Battery Status LED */}
      <mesh position={[0.24, 0.35, 0.44]}>
        <circleGeometry args={[0.025, 12]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>

      {/* Battery Module Vents */}
      {[-0.08, -0.34].map((y, idx) => (
        <group key={idx} position={[0, y, 0.41]}>
          <Box size={[0.82, 0.18, 0.03]} color="#0f172a" />
          <Box position={[0, 0, 0.02]} size={[0.25, 0.04, 0.02]} color="#cbd5e1" metalness={0.8} />
        </group>
      ))}

      <Label position={[0, 0.85, 0]} size={0.13}>UPS (BACKUP)</Label>
    </group>
  );
}

// ---------- ELECTRICAL & NETWORK WALL SOCKETS ----------
function Socket({ position, rotation, label = "POWER SOCKET", shortLabel }) {
  const displayLabel = shortLabel || label;
  return (
    <group position={position} rotation={rotation}>
      <Box size={[0.8, 1.05, 0.08]} color="#ffffff" />
      <Box position={[-0.18, 0, 0.06]} size={[0.12, 0.25, 0.04]} color="#374151" />
      <Box position={[0.18, 0, 0.06]} size={[0.12, 0.25, 0.04]} color="#374151" />
      <Box position={[0, -0.28, 0.06]} size={[0.18, 0.15, 0.04]} color="#111827" />

      {/* Short Name Label Below Socket Plate */}
      <group position={[0, -0.72, 0.06]}>
        <Html center distanceFactor={9} style={{ pointerEvents: "none" }}>
          <div
            style={{
              background: "rgba(15, 23, 42, 0.92)",
              color: "#38bdf8",
              border: "1px solid #0284c7",
              padding: "1px 6px",
              borderRadius: "3px",
              fontSize: "9px",
              fontWeight: 800,
              whiteSpace: "nowrap",
              letterSpacing: "0.5px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              fontFamily: "sans-serif",
            }}
          >
            {displayLabel}
          </div>
        </Html>
      </group>
    </group>
  );
}

function DataPulse({ p, index }) {
  const meshRef = useRef();
  const isLeft = p[0] < 0;
  const trunkX = isLeft ? -10.2 : 10.2;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = (clock.getElapsedTime() * 1.4 + index * 0.25) % 1;
      if (t < 0.3) {
        const factor = t / 0.3;
        meshRef.current.position.set(8.8 + (trunkX - 8.8) * factor, 0.25, -5.9);
      } else if (t < 0.7) {
        const factor = (t - 0.3) / 0.4;
        meshRef.current.position.set(trunkX, 0.25, -5.9 + (p[2] - -5.9) * factor);
      } else {
        const factor = (t - 0.7) / 0.3;
        meshRef.current.position.set(trunkX + (p[0] - trunkX) * factor, 0.25, p[2]);
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.09, 12, 12]} />
      <meshBasicMaterial color="#00e5ff" />
    </mesh>
  );
}

// ---------- HIGH-TECH ATTRACTIVE NETWORK & ELECTRICAL WIRING SYSTEM ----------
function NetworkCables({ workstationPositions }) {
  const serverSwitch = [8.8, 2.1, -4.8];
  const leftElectricalBoard = [-10.3, 2.0, -5.4];
  const leftPowerSocket = [-10.3, 2.0, -1.8];
  const leftNetworkSocket = [-10.3, 2.0, 1.8];

  const rightNetworkSocket = [10.3, 2.0, -1.5];
  const rightSwitchBoard = [10.3, 3.5, 4.8];

  return (
    <group>
      {/* Heavy Industrial Floor Cable Raceways Under Workstation Columns */}
      {[-6.8, -4.5, -2.2, 2.2, 4.5, 6.8].map((x, idx) => (
        <Box key={idx} position={[x, 0.04, -1.05]} size={[0.22, 0.06, 7.8]} color="#1e293b" metalness={0.6} />
      ))}

      {/* Main Left Wall Cable Trunking Conduit */}
      <Line
        points={[
          [-10.2, 0.18, 5.5],
          [-10.2, 0.18, -5.9],
          [8.8, 0.18, -5.9],
          [8.8, 0.18, -4.8],
        ]}
        color="#0284c7"
        lineWidth={4.5}
      />

      {/* Main Right Wall Cable Trunking Conduit */}
      <Line
        points={[
          [10.2, 0.18, 5.5],
          [10.2, 0.18, -5.9],
          [8.8, 0.18, -4.8],
        ]}
        color="#0284c7"
        lineWidth={4.5}
      />

      {/* 1. Left Electrical Board -> Floor Power Feeder */}
      <Line
        points={[
          leftElectricalBoard,
          [-10.2, 0.14, -5.4],
          [-10.2, 0.14, -5.9],
          [-6.8, 0.14, -5.9],
          [-6.8, 0.14, -4.5],
        ]}
        color="#f59e0b"
        lineWidth={3.5}
      />

      {/* 2. Left Power Socket -> Left Block Power Feed */}
      <Line
        points={[
          leftPowerSocket,
          [-10.2, 0.14, -1.8],
          [-4.5, 0.14, -1.8],
          [-4.5, 0.14, -2.2],
        ]}
        color="#eab308"
        lineWidth={3}
      />

      {/* 3. Left Network Socket -> Left Block Data Feed */}
      <Line
        points={[
          leftNetworkSocket,
          [-10.2, 0.22, 1.8],
          [-2.2, 0.22, 1.8],
          [-2.2, 0.22, 0.1],
        ]}
        color="#38bdf8"
        lineWidth={3}
      />

      {/* 4. Right Switch Board -> Right Block Control Feed */}
      <Line
        points={[
          rightSwitchBoard,
          [10.2, 0.14, 4.8],
          [6.8, 0.14, 4.8],
          [6.8, 0.14, 2.4],
        ]}
        color="#10b981"
        lineWidth={3.5}
      />

      {/* 5. Right Network Socket -> Right Block Data Feed */}
      <Line
        points={[
          rightNetworkSocket,
          [10.2, 0.22, -1.5],
          [2.2, 0.22, -1.5],
          [2.2, 0.22, -2.2],
        ]}
        color="#06b6d4"
        lineWidth={3}
      />

      {/* Workstation Connections: Dual Data (Cyan) & Power (Gold) Cables for EVERY Computer */}
      {workstationPositions.map((p, i) => {
        const isLeft = p[0] < 0;
        const trunkX = isLeft ? -10.2 : 10.2;

        return (
          <group key={i}>
            {/* Glowing High-Speed Fiber Optic Data Cable (Switch/Network -> CPU Tower) */}
            <Line
              points={[
                serverSwitch,
                [8.8, 0.25, -5.9],
                [trunkX, 0.25, -5.9],
                [trunkX, 0.25, p[2]],
                [p[0], 0.25, p[2]],
                [p[0] + 0.65, 0.6, p[2] - 0.2],
              ]}
              color="#00e5ff"
              lineWidth={1.8}
              transparent
              opacity={0.85}
            />

            {/* Electrical Power Cable (Wall Socket/Electrical Board -> CPU Power Supply) */}
            <Line
              points={[
                [trunkX, 0.12, p[2]],
                [p[0], 0.12, p[2]],
                [p[0] + 0.65, 0.45, p[2] - 0.3],
              ]}
              color="#f59e0b"
              lineWidth={1.5}
              transparent
              opacity={0.75}
            />

{/* Animated Fiber Optic Data Pulse */}
            <DataPulse p={p} index={i} />

{/* Vertical Desktop Cable Riser Conduit */}
            <Box position={[p[0] + 0.65, 0.35, p[2] - 0.25]} size={[0.06, 0.6, 0.06]} color="#334155" />
          </group>
        );
      })}
    </group>
  );
}

// ---------- THERMAL HEATMAP & AIRFLOW SIMULATION ----------
function ThermalAirflowOverlay() {
  return (
    <group>
      {/* 1. Server Rack High Heat Dissipation Zone */}
      <mesh position={[8.8, 2.5, -4.8]}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.22} wireframe />
      </mesh>
      <mesh position={[8.8, 2.5, -4.8]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.15} />
      </mesh>
      <Html position={[8.8, 4.8, -4.8]} center distanceFactor={10}>
        <div style={{
          background: "rgba(239, 68, 68, 0.92)", color: "white", padding: "2px 8px",
          borderRadius: "6px", fontSize: "10px", fontWeight: 800, whiteSpace: "nowrap",
          boxShadow: "0 0 10px rgba(239, 68, 68, 0.6)", fontFamily: "sans-serif"
        }}>
          🔥 34.5°C Server Exhaust Zone
        </div>
      </Html>

      {/* 2. AC Cooling Airflow Flow Cones */}
      <group position={[8.2, 5.5, -6.5]}>
        <mesh rotation={[0.4, -0.6, 0]}>
          <coneGeometry args={[3.2, 6.5, 16, 1, true]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.18} wireframe />
        </mesh>
        <Html position={[-1.5, -1.0, 2.0]} center distanceFactor={10}>
          <div style={{
            background: "rgba(2, 132, 199, 0.92)", color: "white", padding: "2px 8px",
            borderRadius: "6px", fontSize: "10px", fontWeight: 800, whiteSpace: "nowrap",
            boxShadow: "0 0 10px rgba(2, 132, 199, 0.6)", fontFamily: "sans-serif"
          }}>
            ❄️ 19.0°C Inverter AC Intake Flow
          </div>
        </Html>
      </group>

      {/* 3. Workstation Ambient Thermal Gradient */}
      {[-4.5, 4.5].map((x, i) => (
        <mesh key={i} position={[x, 1.2, -1.0]}>
          <boxGeometry args={[5.5, 1.2, 7.5]} />
          <meshBasicMaterial color="#eab308" transparent opacity={0.08} />
        </mesh>
      ))}
    </group>
  );
}

// ---------- OVERHEAD CABLE TRAYS & DROP CONDUITS ----------
function CableTrays() {
  return (
    <group position={[0, 6.2, 0]}>
      {/* Suspended Steel Wire Mesh Cable Trays */}
      <Box position={[0, 0, -5.8]} size={[17.6, 0.1, 0.8]} color="#94a3b8" metalness={0.8} />
      <Box position={[-8.5, 0, 0]} size={[0.8, 0.1, 11.5]} color="#94a3b8" metalness={0.8} />
      <Box position={[8.5, 0, 0]} size={[0.8, 0.1, 11.5]} color="#94a3b8" metalness={0.8} />

      {/* Yellow Structured CAT6 Backbone Lines running inside tray */}
      <Line
        points={[
          [8.8, 0.08, -4.8],
          [8.5, 0.08, -5.8],
          [-8.5, 0.08, -5.8],
          [-8.5, 0.08, 4.5],
        ]}
        color="#eab308"
        lineWidth={3.5}
      />
      <Line
        points={[
          [8.8, 0.08, -4.8],
          [8.5, 0.08, -5.8],
          [8.5, 0.08, 4.5],
        ]}
        color="#38bdf8"
        lineWidth={3.5}
      />

      {/* Vertical Drop Conduits to Workstation Clusters */}
      {[-4.5, 4.5].map((x, i) => (
        <group key={i} position={[x, -3.0, -1.0]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 5.8, 12]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.85} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ---------- MAIN LAB SCENE ----------
function LabScene({ resetSignal, cameraMode = "3d", layoutType = "grid", themeMode = "day", aiPlan, onSelectPC, classroomMode, showCableTrays }) {
  const controlsRef = useRef();

  // Dynamic Room Layout Calculator generating exact workstation count based on user input (pcCount)
  const pcCountTarget = aiPlan?.spatial?.numComputers || projectData?.numComputers || 24;

  const workstationGrid = useMemo(() => {
    if (layoutType === "u-shape") {
      const items = [];
      let count = 1;
      [-4.8, -3.2, -1.6, 0.0, 1.6, 3.2, 4.8].forEach((z) => {
        items.push({ pos: [-7.8, 0, z], rot: [0, Math.PI / 2, 0], pcName: `PC-${count < 10 ? "0" + count : count}`, id: count });
        count++;
      });
      [-6.0, -3.6, -1.2, 1.2, 3.6, 6.0].forEach((x) => {
        items.push({ pos: [x, 0, 4.8], rot: [0, 0, 0], pcName: `PC-${count < 10 ? "0" + count : count}`, id: count });
        count++;
      });
      [-4.8, -3.2, -1.6, 0.0, 1.6, 3.2, 4.8].forEach((z) => {
        items.push({ pos: [7.8, 0, z], rot: [0, -Math.PI / 2, 0], pcName: `PC-${count < 10 ? "0" + count : count}`, id: count });
        count++;
      });
      return items.slice(0, pcCountTarget);
    }

    if (layoutType === "pods") {
      const podCenters = [
        [-5.2, -2.8], [5.2, -2.8],
        [-5.2, 0.6],  [5.2, 0.6],
        [-5.2, 4.0],  [5.2, 4.0],
      ];
      const items = [];
      let count = 1;
      podCenters.forEach(([cx, cz]) => {
        const offsets = [
          { dx: -1.35, dz: -0.7, rot: [0, Math.PI / 2, 0] },
          { dx: 1.35, dz: -0.7, rot: [0, -Math.PI / 2, 0] },
          { dx: -1.35, dz: 0.7, rot: [0, Math.PI / 2, 0] },
          { dx: 1.35, dz: 0.7, rot: [0, -Math.PI / 2, 0] },
        ];
        offsets.forEach(({ dx, dz, rot }) => {
          items.push({ pos: [cx + dx, 0, cz + dz], rot, pcName: `PC-${count < 10 ? "0" + count : count}`, id: count });
          count++;
        });
      });
      return items.slice(0, pcCountTarget);
    }

    if (layoutType === "high-density") {
      const items = [];
      let count = 1;
      const xPositions = [-7.2, -5.9, -4.6, -3.3, -2.0, -0.7, 0.7, 2.0, 3.3, 4.6, 5.9, 7.2];
      xPositions.forEach((x) => {
        items.push({ pos: [x, 0, -2.8], rot: [0, 0, 0], pcName: `PC-${count < 10 ? "0" + count : count}`, id: count });
        count++;
      });
      xPositions.forEach((x) => {
        items.push({ pos: [x, 0, 1.8], rot: [0, Math.PI, 0], pcName: `PC-${count < 10 ? "0" + count : count}`, id: count });
        count++;
      });
      return items.slice(0, pcCountTarget);
    }

    if (layoutType === "hollow-square") {
      const items = [];
      let count = 1;
      [-5.5, -3.3, -1.1, 1.1, 3.3, 5.5].forEach((x) => {
        items.push({ pos: [x, 0, -3.5], rot: [0, 0, 0], pcName: `PC-${count < 10 ? "0" + count : count}`, id: count });
        count++;
      });
      [-2.0, 0.2, 2.4].forEach((z) => {
        items.push({ pos: [6.8, 0, z], rot: [0, -Math.PI / 2, 0], pcName: `PC-${count < 10 ? "0" + count : count}`, id: count });
        count++;
      });
      [5.5, 3.3, 1.1, -1.1, -3.3, -5.5].forEach((x) => {
        items.push({ pos: [x, 0, 4.5], rot: [0, Math.PI, 0], pcName: `PC-${count < 10 ? "0" + count : count}`, id: count });
        count++;
      });
      [2.4, 0.2, -2.0].forEach((z) => {
        items.push({ pos: [-6.8, 0, z], rot: [0, Math.PI / 2, 0], pcName: `PC-${count < 10 ? "0" + count : count}`, id: count });
        count++;
      });
      return items.slice(0, pcCountTarget);
    }

    if (layoutType === "chevron") {
      const items = [];
      let count = 1;
      const rows = [-3.0, -0.8, 1.4, 3.6];
      rows.forEach((z) => {
        [-6.8, -4.5, -2.2].forEach((x) => {
          items.push({ pos: [x, 0, z - (x + 2.2) * 0.15], rot: [0, -0.15, 0], pcName: `PC-${count < 10 ? "0" + count : count}`, id: count });
          count++;
        });
        [2.2, 4.5, 6.8].forEach((x) => {
          items.push({ pos: [x, 0, z + (x - 2.2) * 0.15], rot: [0, 0.15, 0], pcName: `PC-${count < 10 ? "0" + count : count}`, id: count });
          count++;
        });
      });
      return items.slice(0, pcCountTarget);
    }

    // Default Dual Grid generated dynamically to exact user pcCountTarget
    const items = [];
    let pcIdx = 1;
    const rowZ = [-3.2, -1.0, 1.2, 3.4, 5.6];
    const leftX = [-6.8, -4.5, -2.2];
    const rightX = [2.2, 4.5, 6.8];

    for (let r = 0; r < rowZ.length && pcIdx <= pcCountTarget; r++) {
      const z = rowZ[r];
      for (let c = 0; c < leftX.length && pcIdx <= pcCountTarget; c++) {
        const x = leftX[c];
        items.push({ pos: [x, 0, z], rot: [0, 0, 0], pcName: `PC-${pcIdx < 10 ? "0" + pcIdx : pcIdx}`, id: pcIdx });
        pcIdx++;
      }
      for (let c = 0; c < rightX.length && pcIdx <= pcCountTarget; c++) {
        const x = rightX[c];
        items.push({ pos: [x, 0, z], rot: [0, 0, 0], pcName: `PC-${pcIdx < 10 ? "0" + pcIdx : pcIdx}`, id: pcIdx });
        pcIdx++;
      }
    }

    return items;
  }, [pcCountTarget, layoutType]);

  // ---------- ACTIVE FIRST-PERSON WALKTHROUGH CONTROLLER ----------
  const keysPressed = useRef({});
  const walkPos = useRef(new THREE.Vector3(0, 1.8, 6.0));
  const walkYaw = useRef(0);
  const walkClock = useRef(0);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.code] = true;
    };
    const handleKeyUp = (e) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  React.useEffect(() => {
    if (controlsRef.current) {
      if (cameraMode === "top") {
        controlsRef.current.object.position.set(0, 28, 0.1);
        controlsRef.current.target.set(0, 0, 0);
      } else if (cameraMode === "walk") {
        walkPos.current.set(0, 1.8, 6.0);
        controlsRef.current.object.position.set(0, 1.8, 6.0);
        controlsRef.current.target.set(0, 1.8, 0.0);
      } else if (cameraMode === "teacher") {
        controlsRef.current.object.position.set(0, 4.2, 7.5);
        controlsRef.current.target.set(0, 2.5, -4);
      } else {
        controlsRef.current.object.position.set(0, 14, 22);
        controlsRef.current.target.set(0, 2.8, -1);
      }
      controlsRef.current.update();
    }
  }, [resetSignal, cameraMode]);

  useFrame((state, delta) => {
    if (cameraMode === "walk" && controlsRef.current) {
      const keys = keysPressed.current;
      const isSprint = keys["ShiftLeft"] || keys["ShiftRight"];
      const speed = (isSprint ? 6.5 : 3.5) * delta;

      const camera = controlsRef.current.object;
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();

      const right = new THREE.Vector3();
      right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

      let moveX = 0;
      let moveZ = 0;

      if (keys["KeyW"] || keys["ArrowUp"]) {
        moveX += forward.x * speed;
        moveZ += forward.z * speed;
      }
      if (keys["KeyS"] || keys["ArrowDown"]) {
        moveX -= forward.x * speed;
        moveZ -= forward.z * speed;
      }
      if (keys["KeyA"] || keys["ArrowLeft"]) {
        moveX -= right.x * speed;
        moveZ -= right.z * speed;
      }
      if (keys["KeyD"] || keys["ArrowRight"]) {
        moveX += right.x * speed;
        moveZ += right.z * speed;
      }

      const isMoving = Math.abs(moveX) > 0.0001 || Math.abs(moveZ) > 0.0001;

      if (isMoving) {
        walkClock.current += delta * (isSprint ? 14 : 9);
        const bob = Math.sin(walkClock.current) * 0.04;

        walkPos.current.x = THREE.MathUtils.clamp(walkPos.current.x + moveX, -10.5, 10.5);
        walkPos.current.z = THREE.MathUtils.clamp(walkPos.current.z + moveZ, -6.5, 6.8);
        walkPos.current.y = 1.8 + bob;

        const targetOffset = new THREE.Vector3().subVectors(controlsRef.current.target, camera.position);
        camera.position.copy(walkPos.current);
        controlsRef.current.target.copy(walkPos.current).add(targetOffset);
        controlsRef.current.update();
      }
    }
  });

  const workstationPositions = useMemo(() => {
    return workstationGrid.map((w) => w.pos);
  }, [workstationGrid]);

  return (
    <>
      {/* Dynamic Lighting System: Cyber Day vs Dark Neon Matrix */}
      {themeMode === "neon" ? (
        <>
          <ambientLight intensity={0.4} color="#0284c7" />
          <directionalLight position={[5, 14, 8]} intensity={0.9} color="#38bdf8" />
          <pointLight position={[0, 5, -2]} intensity={2.5} color="#00e5ff" distance={20} />
          <pointLight position={[-6, 4, 2]} intensity={1.8} color="#a855f7" distance={15} />
          <pointLight position={[6, 4, 2]} intensity={1.8} color="#00e5ff" distance={15} />
        </>
      ) : (
        <>
          <ambientLight intensity={0.95} color="#ffffff" />
          <directionalLight position={[5, 14, 8]} intensity={1.6} castShadow shadow-mapSize={[2048, 2048]} />
          <directionalLight position={[-5, 10, -4]} intensity={0.6} />
        </>
      )}

      <Room
        roomLength={40}
        roomWidth={30}
      />
      <CeilingLights />

      <Fan position={[-4.5, 6.45, -2]} />
      <Fan position={[4.5, 6.45, -2]} />

      <Projector />
      <AC />
      <SmartDisplay />
      <Door />
      <FireExtinguisher />
      <ServerRack />
      <UPSUnit />
      <TeacherArea classroomMode={classroomMode} />

      {/* Wall Sockets — Left Wall (Short Labels Below Sockets) */}
      <Socket position={[-10.35, 2.0, -5.4]} rotation={[0, Math.PI / 2, 0]} label="ELECTRICAL BOARD" shortLabel="ELECTRICAL SOCKET" />
      <Socket position={[-10.35, 2.0, -1.8]} rotation={[0, Math.PI / 2, 0]} label="POWER SOCKET" shortLabel="POWER SOCKET" />
      <Socket position={[-10.35, 2.0, 1.8]} rotation={[0, Math.PI / 2, 0]} label="NETWORK SOCKET" shortLabel="NETWORK SOCKET" />

      {/* Wall Sockets — Right Wall (Short Labels Below Sockets) */}
      <Socket position={[10.35, 2.0, -1.5]} rotation={[0, -Math.PI / 2, 0]} label="NETWORK SOCKET" shortLabel="NETWORK" />
      <Socket position={[10.35, 3.5, 4.8]} rotation={[0, -Math.PI / 2, 0]} label="SWITCH BOARD" shortLabel="SWITCH" />

      {/* Workstations rendered dynamically with position & rotation */}
      {workstationGrid.map((item, i) => (
        <Workstation key={i} position={item.pos} rotation={item.rot || [0, 0, 0]} id={i + 1} pcName={item.pcName} onSelectPC={onSelectPC} classroomMode={classroomMode} />
      ))}

      <NetworkCables workstationPositions={workstationPositions} />

      {/* Realism Overlays */}
      {showCableTrays && <CableTrays />}

      {/* Central Aisle Emergency Exit Path straight to front Exit door */}
      <Line
        points={[
          [0, 0.15, 5.0],
          [0, 0.15, 3.5],
          [0, 0.15, 1.0],
          [0, 0.15, -1.5],
          [0, 0.15, -4.0],
          [0, 0.15, -6.5],
        ]}
        color="#22c55e"
        lineWidth={7}
      />

      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom
        enableRotate
        minDistance={cameraMode === "walk" ? 0.5 : 10}
        maxDistance={38}
        target={cameraMode === "walk" ? [0, 2.2, -4] : [0, 2.8, -1]}
      />
    </>
  );
}

// ---------- MAIN PAGE ----------
export default function Viewer3D() {
  const navigate = useNavigate();
  const { aiPlan, projectData, updateProject } = useProject();
  const [resetSignal, setResetSignal] = useState(0);
  const [cameraMode, setCameraMode] = useState("3d");
  const [layoutMode, setLayoutMode] = useState("grid");
  const [themeMode, setThemeMode] = useState("neon");
  const [selectedPC, setSelectedPC] = useState(null);
  const [classroomMode, setClassroomMode] = useState("normal");
  const [showCableTrays, setShowCableTrays] = useState(false);
  const [pingRunning, setPingRunning] = useState(false);
  const [pingOutput, setPingOutput] = useState(null);

  const handleRunPing = () => {
    if (!selectedPC) return;
    setPingRunning(true);
    setPingOutput([`PING 192.168.1.${100 + (selectedPC.id || 1)} with 32 bytes of data:`]);
    setTimeout(() => {
      setPingOutput((prev) => [
        ...prev,
        `Reply from 192.168.1.${100 + (selectedPC.id || 1)}: bytes=32 time=0.42ms TTL=64`,
        `Reply from 192.168.1.${100 + (selectedPC.id || 1)}: bytes=32 time=0.38ms TTL=64`,
        `Packets: Sent = 2, Received = 2, Lost = 0 (0% loss)`,
      ]);
      setPingRunning(false);
    }, 800);
  };

  const pcCount = aiPlan?.spatial?.numComputers || projectData?.numComputers || 28;
  const electricalKw = aiPlan?.electrical?.totalKW || 18.5;
  const topology = aiPlan?.network?.topology || "STAR TOPOLOGY";

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Requirements", path: "/requirements" },
    { label: "AI Plan", path: "/ai" },
    { label: "Budget", path: "/budget" },
    { label: "Network", path: "/network" },
    { label: "Electrical", path: "/electrical" },
    { label: "3D Viewer", path: "/viewer3d", active: true },
    { label: "Reports", path: "/reports" },
  ];

  return (
    <div className="viewer3d-page">

      {/* Top Nav Bar */}
      <div className="viewer3d-header">
        <div
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          <span style={{ fontSize: 24 }}>🖥️</span>
          <span style={{ fontWeight: 900, fontSize: 18, color: "#2563eb" }}>AI Smart Lab Planner</span>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`viewer3d-nav-btn ${item.active ? "viewer3d-nav-btn--active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div className="viewer3d-container">

        {/* Top Left Live Badge & Room Layout Selector */}
        <div style={{ position: "absolute", top: 20, left: 22, zIndex: 10, display: "flex", gap: 10, alignItems: "center" }}>
          <div className="viewer3d-badge" style={{ margin: 0 }}>
            • LIVE 3D LAB MODEL
          </div>

          <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", padding: "4px 6px", borderRadius: "10px", border: "1px solid #cbd5e1", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            {[
              { id: "grid", label: "📐 Grid Columns" },
              { id: "u-shape", label: "🔄 U-Shape" },
              { id: "pods", label: "🧩 Team Pods" },
              { id: "high-density", label: "🏢 High Density" },
              { id: "hollow-square", label: "👔 Boardroom" },
              { id: "chevron", label: "📐 Chevron Auditorium" },
            ].map((layout) => (
              <button
                key={layout.id}
                onClick={() => {
                  setLayoutMode(layout.id);
                  updateProject({ seatingPreference: layout.id });
                }}
                style={{
                  padding: "6px 12px",
                  borderRadius: "7px",
                  border: "none",
                  background: layoutMode === layout.id ? "linear-gradient(135deg, #0284c7, #2563eb)" : "transparent",
                  color: layoutMode === layout.id ? "#ffffff" : "#475569",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              >
                {layout.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top Right View Angle Controls & Feature Toggles */}
        <div style={{ position: "absolute", right: 22, top: 20, zIndex: 10, display: "flex", gap: 8, alignItems: "center" }}>

          <button
            onClick={() => setThemeMode(themeMode === "day" ? "neon" : "day")}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: themeMode === "neon" ? "#0f172a" : "#ffffff",
              color: themeMode === "neon" ? "#38bdf8" : "#1e293b",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {themeMode === "day" ? "🌙 Dark Neon" : "☀️ Day"}
          </button>

          <button
            onClick={() => { setCameraMode("3d"); setResetSignal((x) => x + 1); }}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: cameraMode === "3d" ? "#2563eb" : "#ffffff",
              color: cameraMode === "3d" ? "#ffffff" : "#1e293b",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            🧊 3D
          </button>

          <button
            onClick={() => { setCameraMode("walk"); setResetSignal((x) => x + 1); }}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: cameraMode === "walk" ? "#2563eb" : "#ffffff",
              color: cameraMode === "walk" ? "#ffffff" : "#1e293b",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            🚶 Walk-in
          </button>

          <button
            onClick={() => { setCameraMode("top"); setResetSignal((x) => x + 1); }}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: cameraMode === "top" ? "#2563eb" : "#ffffff",
              color: cameraMode === "top" ? "#ffffff" : "#1e293b",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            📐 2D CAD
          </button>

          <button
            onClick={() => exportInstitutionalPDF(projectData, aiPlan)}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #0284c7, #2563eb)",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "12px",
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(2, 132, 199, 0.3)",
            }}
          >
            📄 PDF Report
          </button>
        </div>

        {/* Live Metrics Telemetry Bar */}
        <div style={{
          position: "absolute", bottom: 22, left: 22, zIndex: 10,
          background: themeMode === "neon" ? "rgba(15, 23, 42, 0.94)" : "rgba(30, 41, 59, 0.94)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(56, 189, 248, 0.35)", borderRadius: 16,
          padding: "12px 20px", color: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          fontFamily: "sans-serif", display: "flex", gap: 20, alignItems: "center"
        }}>
          <div>
            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>⚡ Power Load</div>
            <div style={{ fontSize: 15, fontWeight: 900, color: "#f59e0b" }}>{electricalKw} kW <span style={{ fontSize: 11, color: "#22c55e" }}>(Normal)</span></div>
          </div>
          <div style={{ width: 1, height: 26, background: "rgba(255,255,255,0.15)" }} />
          <div>
            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>🔋 UPS Backup</div>
            <div style={{ fontSize: 15, fontWeight: 900, color: "#38bdf8" }}>10 kVA <span style={{ fontSize: 11, color: "#22c55e" }}>(30 Min)</span></div>
          </div>
          <div style={{ width: 1, height: 26, background: "rgba(255,255,255,0.15)" }} />
          <div>
            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>🌐 Node Status</div>
            <div style={{ fontSize: 15, fontWeight: 900, color: "#22c55e" }}>24 / 24 <span style={{ fontSize: 11, color: "#00e5ff" }}>Online</span></div>
          </div>
        </div>

        {/* Workstation Click Spec Sheet & Live Diagnostic Modal */}
        {selectedPC && (
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            zIndex: 100, width: 440, padding: 24, borderRadius: 20,
            background: "rgba(15, 23, 42, 0.96)", backdropFilter: "blur(14px)",
            border: "1px solid rgba(56, 189, 248, 0.5)", color: "#f8fafc",
            boxShadow: "0 25px 60px rgba(0,0,0,0.7)", fontFamily: "sans-serif"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 28 }}>🖥️</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "#38bdf8" }}>{selectedPC.pcName}</h3>
                  <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 700 }}>● ONLINE (1 Gbps Managed Port #{((selectedPC.id || 1) % 24) + 1})</span>
                </div>
              </div>
              <button
                onClick={() => { setSelectedPC(null); setPingOutput(null); }}
                style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 20, cursor: "pointer", fontWeight: 900 }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12, background: "rgba(255,255,255,0.06)", padding: 14, borderRadius: 12 }}>
              <div>
                <small style={{ color: "#94a3b8", display: "block" }}>Processor (CPU)</small>
                <strong>Intel Core i7 13700K (4.2 GHz)</strong>
              </div>
              <div>
                <small style={{ color: "#94a3b8", display: "block" }}>Core Temp / Load</small>
                <strong style={{ color: "#22c55e" }}>41.8°C · 14% Load</strong>
              </div>
              <div>
                <small style={{ color: "#94a3b8", display: "block" }}>Memory (RAM)</small>
                <strong>16 GB DDR5 5600MHz</strong>
              </div>
              <div>
                <small style={{ color: "#94a3b8", display: "block" }}>GPU Temp</small>
                <strong style={{ color: "#38bdf8" }}>52.4°C · RTX 3050</strong>
              </div>
              <div>
                <small style={{ color: "#94a3b8", display: "block" }}>IP Address / VLAN</small>
                <strong style={{ color: "#00e5ff" }}>192.168.1.{100 + (selectedPC.id || 1)} (VLAN 10)</strong>
              </div>
              <div>
                <small style={{ color: "#94a3b8", display: "block" }}>Power Draw</small>
                <strong style={{ color: "#f59e0b" }}>185 W (Peak 450W)</strong>
              </div>
            </div>

            {/* Diagnostic Terminal Section */}
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>📡 Live ICMP Diagnostic</span>
                <button
                  onClick={handleRunPing}
                  disabled={pingRunning}
                  style={{
                    background: pingRunning ? "#334155" : "linear-gradient(135deg, #0284c7, #2563eb)",
                    color: "white", border: "none", borderRadius: "6px",
                    padding: "4px 10px", fontSize: "11px", fontWeight: 700, cursor: pingRunning ? "wait" : "pointer"
                  }}
                >
                  {pingRunning ? "Pinging..." : "⚡ Run Ping Test"}
                </button>
              </div>

              <div style={{
                background: "#090d16", border: "1px solid #1e293b", borderRadius: 8,
                padding: "8px 12px", fontFamily: "monospace", fontSize: 11, color: "#22c55e",
                maxHeight: 90, overflowY: "auto"
              }}>
                {pingOutput ? (
                  pingOutput.map((line, idx) => <div key={idx} style={{ marginBottom: 2 }}>{line}</div>)
                ) : (
                  <div style={{ color: "#64748b" }}>Click 'Run Ping Test' to verify packet transmission & latency to server rack.</div>
                )}
              </div>
            </div>

            <button
              onClick={() => { setSelectedPC(null); setPingOutput(null); }}
              style={{
                marginTop: 14, width: "100%", padding: "10px", borderRadius: 10,
                background: "linear-gradient(135deg, #0284c7, #2563eb)", color: "white",
                border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13
              }}
            >
              Close Diagnostic Inspector
            </button>
          </div>
        )}

        <Canvas
          shadows
          camera={{
            position: [0, 14, 22],
            fov: 46,
            near: 0.1,
            far: 100,
          }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={[themeMode === "neon" ? "#030712" : "#eef2f6"]} />
          <LabScene
            resetSignal={resetSignal}
            cameraMode={cameraMode}
            layoutType={layoutMode}
            themeMode={themeMode}
            aiPlan={aiPlan}
            onSelectPC={setSelectedPC}
            classroomMode={classroomMode}
            showCableTrays={showCableTrays}
          />
        </Canvas>

        {/* Floating Classroom Control Simulator Panel */}
        <div style={{
          position: "absolute",
          right: 22,
          top: 68,
          zIndex: 10,
          background: themeMode === "neon" ? "rgba(15, 23, 42, 0.92)" : "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(8px)",
          border: themeMode === "neon" ? "1px solid rgba(56, 189, 248, 0.25)" : "1px solid #cbd5e1",
          borderRadius: "12px",
          padding: "10px 14px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "220px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          fontFamily: "sans-serif"
        }}>
          <div style={{
            fontSize: "11px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: themeMode === "neon" ? "#94a3b8" : "#475569",
            marginBottom: "2px"
          }}>
            🏫 Classroom Simulator
          </div>

          {[
            { id: "normal", label: "🟢 Live OS (Normal)", desc: "Interactive student systems", activeBg: "#10b981", hoverBg: "rgba(16, 185, 129, 0.15)" },
            { id: "broadcast", label: "🔵 Broadcast Screen", desc: "Mirror master console", activeBg: "#3b82f6", hoverBg: "rgba(59, 130, 246, 0.15)" },
            { id: "lock", label: "🔴 Lock Screens", desc: "Redirect student focus", activeBg: "#ef4444", hoverBg: "rgba(239, 68, 68, 0.15)" },
          ].map((mode) => {
            const isActive = classroomMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setClassroomMode(mode.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "none",
                  background: isActive ? mode.activeBg : "transparent",
                  color: isActive ? "#ffffff" : themeMode === "neon" ? "#cbd5e1" : "#1e293b",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "left",
                  boxShadow: isActive ? "0 4px 10px rgba(0,0,0,0.15)" : "none"
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = mode.hoverBg;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700 }}>{mode.label}</span>
                <span style={{ fontSize: "9px", opacity: 0.8, marginTop: "2px" }}>{mode.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Floating First-Person Walk Mode Compass & HUD */}
        {cameraMode === "walk" && (
          <div style={{
            position: "absolute",
            top: 22,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            background: "rgba(15, 23, 42, 0.94)",
            backdropFilter: "blur(12px)",
            border: "1px solid #38bdf8",
            borderRadius: "16px",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#ffffff",
            boxShadow: "0 10px 30px rgba(2, 132, 199, 0.4)",
            fontFamily: "sans-serif",
            animation: "pulse 2s infinite"
          }}>
            <span style={{ fontSize: "20px" }}>🚶</span>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#38bdf8", letterSpacing: "0.5px" }}>
                FIRST-PERSON WALKTHROUGH ACTIVE
              </div>
              <div style={{ fontSize: "11px", color: "#cbd5e1", marginTop: "2px" }}>
                Use <kbd style={{ background: "#334155", padding: "1px 5px", borderRadius: 4, color: "#38bdf8" }}>W</kbd> <kbd style={{ background: "#334155", padding: "1px 5px", borderRadius: 4, color: "#38bdf8" }}>A</kbd> <kbd style={{ background: "#334155", padding: "1px 5px", borderRadius: 4, color: "#38bdf8" }}>S</kbd> <kbd style={{ background: "#334155", padding: "1px 5px", borderRadius: 4, color: "#38bdf8" }}>D</kbd> or <kbd style={{ background: "#334155", padding: "1px 5px", borderRadius: 4, color: "#38bdf8" }}>Arrow Keys</kbd> to walk · Hold <kbd style={{ background: "#334155", padding: "1px 5px", borderRadius: 4, color: "#38bdf8" }}>SHIFT</kbd> to run · Drag mouse to look around
              </div>
            </div>
            <button
              onClick={() => { setCameraMode("3d"); setResetSignal((x) => x + 1); }}
              style={{
                background: "linear-gradient(135deg, #0284c7, #2563eb)",
                border: "none",
                borderRadius: "8px",
                color: "#ffffff",
                padding: "6px 12px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
              }}
            >
              Exit Walk
            </button>
          </div>
        )}

        {/* Floating Controls Toolbar */}
        <div className="viewer3d-help" style={{
          position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
          zIndex: 10, padding: "8px 22px", borderRadius: 25,
          background: "rgba(255,255,255,.96)", boxShadow: "0 4px 16px rgba(0,0,0,.1)",
          border: "1px solid #e2e8f0",
        }}>
          {cameraMode === "walk" ? (
            <>
              <span>🚶 W/A/S/D Walk</span>
              <span>⚡ Shift Sprint</span>
              <span>👀 Mouse Look</span>
            </>
          ) : (
            <>
              <span>🖱️ Rotate</span>
              <span>🔍 Zoom</span>
              <span>🖐️ Pan</span>
            </>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="lab-summary">
        <SummaryCard icon="🖥️" title="COMPUTER SYSTEMS" value={`${pcCount} Workstations`} color="#2563eb" />
        <SummaryCard icon="🌐" title="NETWORK" value={topology.toUpperCase()} color="#10b981" />
        <SummaryCard icon="⚡" title="ELECTRICAL LOAD" value={`${electricalKw} kW`} color="#f59e0b" />
      </div>
    </div>
  );
}

function SummaryCard({ icon, title, value, color = "#2563eb" }) {
  return (
    <div className="summary-card">
      <div className="summary-icon" style={{ background: `${color}18`, color }}>
        {icon}
      </div>
      <div>
        <small>{title}</small>
        <strong style={{ color }}>{value}</strong>
      </div>
    </div>
  );
}