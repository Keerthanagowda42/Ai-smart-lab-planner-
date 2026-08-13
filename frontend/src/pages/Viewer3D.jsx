import React, { useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import * as THREE from "three";

const PC_COUNT = 28;

// ---------- COMMON ----------
function Label({ children, position, color = "#0b4fd7", size = 0.18 }) {
  return (
    <Html position={position} center distanceFactor={12} style={{ pointerEvents: "none" }}>
      <div
        style={{
          background: "rgba(255,255,255,.92)",
          border: `1px solid ${color}`,
          color,
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: `${size * 55}px`,
          fontWeight: 800,
          whiteSpace: "nowrap",
          boxShadow: "0 2px 6px rgba(0,0,0,.2)",
        }}
      >
        {children}
      </div>
    </Html>
  );
}

function Box({ position, size, color, roughness = 0.55, metalness = 0 }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
      />
    </mesh>
  );
}

// ---------- ROOM ----------
function Room() {
  const width = 22;
  const depth = 15;
  const height = 7;

  return (
    <group>
      {/* floor */}
      <Box position={[0, -0.25, 0]} size={[22, 0.5, 15]} color="#d8dce1" />

      {/* floor tile lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Line
          key={`f1-${i}`}
          points={[
            [-11 + i * 2, 0.01, -7.5],
            [-11 + i * 2, 0.01, 7.5],
          ]}
          color="#b9c0c7"
          lineWidth={0.7}
        />
      ))}

      {Array.from({ length: 8 }).map((_, i) => (
        <Line
          key={`f2-${i}`}
          points={[
            [-11, 0.02, -7.5 + i * 2],
            [11, 0.02, -7.5 + i * 2],
          ]}
          color="#b9c0c7"
          lineWidth={0.7}
        />
      ))}

      {/* back wall */}
      <Box
        position={[0, height / 2, -7.35]}
        size={[22, height, 0.35]}
        color="#e7e7e7"
      />

      {/* left wall */}
      <Box
        position={[-10.85, height / 2, 0]}
        size={[0.35, height, 14.7]}
        color="#dedfe1"
      />

      {/* right wall */}
      <Box
        position={[10.85, height / 2, 0]}
        size={[0.35, height, 14.7]}
        color="#dedfe1"
      />

      {/* ceiling */}
      <Box
        position={[0, height + 0.2, 0]}
        size={[22, 0.35, 15]}
        color="#eeeeee"
      />

      {/* decorative ceiling border */}
      <Line
        points={[
          [-10.5, 6.92, -7],
          [10.5, 6.92, -7],
          [10.5, 6.92, 7],
          [-10.5, 6.92, 7],
          [-10.5, 6.92, -7],
        ]}
        color="#8fa4bd"
        lineWidth={3}
      />

      {/* windows */}
      <Window position={[-4.8, 4.4, -7.15]} />
      <Window position={[4.8, 4.4, -7.15]} />

      {/* side posters */}
      <Poster position={[-10.55, 3.6, -2.5]} rotation={[0, Math.PI / 2, 0]} text="THINK\nPLAN\nEXECUTE" />
      <Poster position={[-10.55, 3.6, 0]} rotation={[0, Math.PI / 2, 0]} text="CODE\nBUILD\nTEST" />
      <Poster position={[-10.55, 3.6, 2.5]} rotation={[0, Math.PI / 2, 0]} text="DESIGN\nDEPLOY\nSUCCESS" />

      {/* plants */}
      <Plant position={[-9.4, 0, -5.5]} />
      <Plant position={[9.4, 0, -5.5]} />
    </group>
  );
}

function Window({ position }) {
  return (
    <group position={position}>
      <Box position={[0, 0, 0]} size={[3.6, 2.1, 0.12]} color="#9fc1dc" />
      <Box position={[0, 0, 0.08]} size={[0.12, 2.1, 0.05]} color="#5e7182" />
      <Box position={[0, 0, 0.08]} size={[3.6, 0.12, 0.05]} color="#5e7182" />
      <Box position={[0, 1.05, 0.08]} size={[3.8, 0.15, 0.1]} color="#f5f5f5" />
      <Box position={[0, -1.05, 0.08]} size={[3.8, 0.15, 0.1]} color="#f5f5f5" />
    </group>
  );
}

function Poster({ position, rotation, text }) {
  return (
    <group position={position} rotation={rotation}>
      <Box position={[0, 0, 0]} size={[1.8, 2.4, 0.08]} color="#20242b" />
      <Html center distanceFactor={12}>
        <div
          style={{
            width: 65,
            textAlign: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: 10,
            lineHeight: 1.5,
          }}
        >
          {text.split("\n").map((x) => (
            <div key={x}>{x}</div>
          ))}
        </div>
      </Html>
    </group>
  );
}

function Plant({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.55, 0.7, 0.9, 20]} />
        <meshStandardMaterial color="#8a542c" />
      </mesh>
      {[...Array(7)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i) * 0.45,
            1.3 + (i % 2) * 0.2,
            Math.cos(i) * 0.35,
          ]}
          rotation={[0.3, i, 0.5]}
        >
          <sphereGeometry args={[0.45, 12, 12]} />
          <meshStandardMaterial color="#31864b" />
        </mesh>
      ))}
    </group>
  );
}

// ---------- CEILING ----------
function CeilingLights() {
  const lights = [];
  for (let x = -7.5; x <= 7.5; x += 5) {
    for (let z = -4.5; z <= 4.5; z += 4.5) {
      lights.push([x, 6.72, z]);
    }
  }

  return (
    <group>
      {lights.map((p, i) => (
        <group key={i} position={p}>
          <Box size={[2.2, 0.12, 0.65]} color="#ffffff" />
          <pointLight intensity={1.2} distance={5} position={[0, -0.3, 0]} />
        </group>
      ))}
    </group>
  );
}

function Fan({ position }) {
  return (
    <group position={position}>
      <cylinderGeometry />
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          rotation={[0, (Math.PI / 2) * i, 0]}
          position={[0, -0.1, 0]}
        >
          <boxGeometry args={[0.15, 0.08, 2.6]} />
          <meshStandardMaterial color="#151a20" />
        </mesh>
      ))}

      <Label position={[0, 0.55, 0]}>FAN</Label>
    </group>
  );
}

function Projector() {
  return (
    <group position={[0, 5.95, -1]}>
      <Box size={[1.5, 0.5, 1]} color="#f4f4f4" />
      <Box position={[0, 0, 0.52]} size={[0.38, 0.25, 0.08]} color="#1597e5" />
      <Label position={[0, 0.7, 0]}>PROJECTOR</Label>
    </group>
  );
}

function AC() {
  return (
    <group position={[5.5, 5.35, -7.05]}>
      <Box size={[3.2, 0.65, 0.3]} color="#f5f5f5" />
      <Box position={[0, -0.15, 0.17]} size={[2.2, 0.08, 0.08]} color="#aeb7c2" />
      <Label position={[0, 0.65, 0]}>AIR CONDITIONER</Label>
    </group>
  );
}

// ---------- DISPLAY / DOOR ----------
function SmartDisplay() {
  return (
    <group position={[0, 4.35, -7.02]}>
      <Box size={[5.2, 2.35, 0.18]} color="#080d18" />
      <Box position={[0, -1.3, 0]} size={[0.2, 0.7, 0.2]} color="#555" />
      <Label position={[0, 1.45, 0]}>SMART DISPLAY</Label>
      <Html center distanceFactor={11}>
        <div
          style={{
            color: "#00e5ff",
            fontWeight: 900,
            fontSize: 17,
            textAlign: "center",
            width: 250,
            textShadow: "0 0 8px #00aaff",
          }}
        >
          SMART COMPUTER LAB
          <div style={{ fontSize: 8, color: "#fff", marginTop: 5 }}>
            INNOVATE • LEARN • EXCEL
          </div>
        </div>
      </Html>
    </group>
  );
}

function Door() {
  return (
    <group position={[0, 2.05, -7.0]}>
      {/* frame */}
      <Box size={[3.2, 4.2, 0.25]} color="#6d4226" />
      {/* actual door */}
      <Box position={[0, 0, 0.2]} size={[2.65, 3.9, 0.18]} color="#9b602f" />
      {/* glass */}
      <Box position={[0, 0.8, 0.33]} size={[1.5, 1.1, 0.06]} color="#78a9c7" />
      {/* handle */}
      <mesh position={[0.95, 0, 0.4]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#d7b43b" metalness={0.8} />
      </mesh>

      <Label position={[0, 2.5, 0]}>EXIT</Label>
    </group>
  );
}

// ---------- DESK / PC ----------
function Chair({ position }) {
  return (
    <group position={position}>
      <Box position={[0, 1.05, 0]} size={[1.05, 1.45, 0.22]} color="#173e91" />
      <Box position={[0, 0.45, 0]} size={[1.15, 0.18, 1]} color="#1d4fa8" />
      <cylinderGeometry />
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.75, 16]} />
        <meshStandardMaterial color="#151b26" />
      </mesh>
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 20]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
    </group>
  );
}

function Workstation({ position, id }) {
  return (
    <group position={position}>
      {/* desk */}
      <Box position={[0, 1.15, 0]} size={[2.7, 0.18, 1.45]} color="#9b632e" />
      <Box position={[-1.15, 0.55, 0]} size={[0.13, 1.2, 1.3]} color="#71421f" />
      <Box position={[1.15, 0.55, 0]} size={[0.13, 1.2, 1.3]} color="#71421f" />

      {/* monitor */}
      <Box position={[0, 1.82, -0.35]} size={[1.45, 0.85, 0.1]} color="#10151c" />
      <Box position={[0, 1.38, -0.35]} size={[0.12, 0.45, 0.12]} color="#1d2630" />
      <Box position={[0, 1.32, -0.35]} size={[0.55, 0.08, 0.35]} color="#202832" />

      {/* CPU */}
      <Box position={[-0.92, 1.55, 0.05]} size={[0.38, 0.82, 0.58]} color="#202833" />
      <mesh position={[-0.92, 1.55, 0.35]}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>

      {/* keyboard */}
      <Box position={[0, 1.27, 0.35]} size={[0.85, 0.05, 0.3]} color="#111827" />

      {/* mouse */}
      <mesh position={[0.62, 1.31, 0.35]}>
        <sphereGeometry args={[0.1, 16, 10]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* chair */}
      <Chair position={[0, 0, 1.35]} />

      <Label position={[0, 2.45, 0]} size={0.14}>
        PC-{id}
      </Label>
    </group>
  );
}

// ---------- TEACHER ----------
function TeacherArea() {
  return (
    <group position={[0, 0, 5.3]}>
      <Box position={[0, 1.15, 0]} size={[3.2, 0.2, 1.8]} color="#8f5b2b" />
      <Box position={[-1.35, 0.55, 0]} size={[0.15, 1.1, 1.6]} color="#68401f" />
      <Box position={[1.35, 0.55, 0]} size={[0.15, 1.1, 1.6]} color="#68401f" />

      {/* laptop */}
      <Box position={[0, 1.35, -0.15]} size={[1.1, 0.08, 0.75]} color="#161b22" />
      <Box position={[0, 1.7, -0.35]} size={[1.0, 0.65, 0.06]} color="#0d1117" />

      <Chair position={[0, 0, 1.45]} />
      <Label position={[0, 2.3, 0]}>TEACHER DESK</Label>
      <Label position={[0, 2.0, 1.4]}>TEACHER CHAIR</Label>
    </group>
  );
}

// ---------- SERVER ----------
function ServerRack() {
  return (
    <group position={[8.8, 2.25, -4.8]}>
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
      <Label position={[0, -2.65, 0]}>SERVER</Label>

      {/* UPS */}
      <Box position={[0, -2.2, 0]} size={[1.6, 0.8, 1.05]} color="#20262e" />
      <Label position={[0, -1.55, 0]}>UPS (BACKUP)</Label>
    </group>
  );
}

// ---------- SOCKETS ----------
function Socket({ position, label = "POWER SOCKET" }) {
  return (
    <group position={position}>
      <Box size={[0.8, 1.05, 0.08]} color="#ffffff" />
      <Box position={[-0.18, 0, 0.06]} size={[0.12, 0.25, 0.04]} color="#374151" />
      <Box position={[0.18, 0, 0.06]} size={[0.12, 0.25, 0.04]} color="#374151" />
      <Box position={[0, -0.28, 0.06]} size={[0.18, 0.15, 0.04]} color="#111827" />
      <Label position={[0, 0.72, 0]} size={0.12}>{label}</Label>
    </group>
  );
}

// ---------- CABLES ----------
function NetworkCables({ workstationPositions }) {
  const rack = [8.8, 2.1, -4.8];

  return (
    <group>
      {/* clean perimeter trunking */}
      <Line
        points={[
          [-9.7, 0.18, 6.8],
          [-9.7, 0.18, -5.9],
          [8.8, 0.18, -5.9],
          [8.8, 0.18, -4.8],
        ]}
        color="#159bd7"
        lineWidth={5}
      />

      <Line
        points={[
          [9.7, 0.18, 6.8],
          [9.7, 0.18, -5.9],
          [8.8, 0.18, -4.8],
        ]}
        color="#159bd7"
        lineWidth={5}
      />

      {workstationPositions.map((p, i) => {
        const side = p[0] < 0 ? -1 : 1;
        const routeX = side * 8.9;

        return (
          <Line
            key={i}
            points={[
              [p[0], 0.23, p[2]],
              [routeX, 0.23, p[2]],
              [routeX, 0.23, -5.9],
              [8.8, 0.23, -5.9],
              rack,
            ]}
            color="#27b7ee"
            lineWidth={1.6}
            transparent
            opacity={0.72}
          />
        );
      })}

      {/* power trunking */}
      <Line
        points={[
          [-9.7, 0.12, 6.8],
          [-9.7, 0.12, -5.9],
          [9.7, 0.12, -5.9],
          [9.7, 0.12, 6.8],
        ]}
        color="#f3b51b"
        lineWidth={3}
      />
    </group>
  );
}

// ---------- MAIN SCENE ----------
function LabScene({ resetSignal }) {
  const controlsRef = useRef();

  const workstationPositions = useMemo(() => {
    const positions = [];

    // 4 rows x 4 on left
    const leftX = [-6.7, -4.5, -2.3, -0.1];
    const rightX = [2.5, 4.7, 6.9, 9.1];

    for (let row = 0; row < 4; row++) {
      const z = -3.8 + row * 2.1;

      leftX.forEach((x) => positions.push([x, 0, z]));
      rightX.forEach((x) => positions.push([x, 0, z]));
    }

    // Last 4 are positioned in front/teacher-side area
    return positions.slice(0, 28);
  }, []);

  React.useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [resetSignal]);

  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight
        position={[4, 12, 8]}
        intensity={3}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      <Room />
      <CeilingLights />

      <Fan position={[-5.5, 6.45, -2]} />
      <Fan position={[5.5, 6.45, -2]} />
      <Fan position={[0, 6.45, 4]} />

      <Projector />
      <AC />
      <SmartDisplay />
      <Door />
      <ServerRack />
      <TeacherArea />

      {/* sockets */}
      <Socket position={[-10.55, 2.0, 1.8]} label="POWER SOCKET" />
      <Socket position={[-10.55, 3.5, 4.8]} label="ELECTRICAL BOARD" />
      <Socket position={[10.55, 2.0, 1.8]} label="NETWORK SOCKET" />
      <Socket position={[10.55, 3.5, 4.8]} label="SWITCH BOARD" />

      {/* workstations */}
      {workstationPositions.map((p, i) => (
        <Workstation key={i} position={p} id={i + 1} />
      ))}

      <NetworkCables workstationPositions={workstationPositions} />

      {/* emergency path */}
      <Line
        points={[
          [0, 0.3, 5.9],
          [0, 0.3, 4],
          [0, 0.3, 2],
          [0, 0.3, -1],
          [0, 0.3, -4],
          [0, 0.3, -6],
        ]}
        color="#35ef72"
        lineWidth={5}
      />

      <Label position={[0, 0.7, 2.8]} color="#16a34a">
        EXIT / EMERGENCY PATH
      </Label>

      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom
        enableRotate
        minDistance={13}
        maxDistance={38}
        target={[0, 2.5, -1]}
      />
    </>
  );
}

// ---------- PAGE ----------
export default function Viewer3D() {
  const [resetSignal, setResetSignal] = useState(0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#eef4ff,#ffffff 50%,#edf3ff)",
        padding: "18px 30px 35px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
        color: "#14213d",
      }}
    >
      {/* header */}
      <div
        style={{
          maxWidth: 1550,
          margin: "0 auto 18px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: "0 0 5px",
            color: "#173b8f",
            fontSize: 38,
            fontWeight: 900,
          }}
        >
          3D Smart Computer Laboratory
        </h1>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: 15,
          }}
        >
          Interactive laboratory planning, network visualization & infrastructure design
        </p>
      </div>

      {/* viewer */}
      <div
        style={{
          maxWidth: 1550,
          height: 720,
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
          borderRadius: 24,
          border: "1px solid #cbd5e1",
          background: "#f5f8fc",
          boxShadow: "0 20px 55px rgba(20,45,90,.18)",
        }}
      >
        {/* badge */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 22,
            zIndex: 10,
            padding: "12px 20px",
            borderRadius: 30,
            background: "rgba(255,255,255,.95)",
            color: "#234bb5",
            fontWeight: 900,
            letterSpacing: 1,
            boxShadow: "0 5px 18px rgba(0,0,0,.12)",
          }}
        >
          • LIVE 3D LAB MODEL
        </div>

        {/* reset */}
        <button
          onClick={() => setResetSignal((x) => x + 1)}
          style={{
            position: "absolute",
            top: 20,
            right: 22,
            zIndex: 10,
            border: "none",
            borderRadius: 13,
            padding: "14px 22px",
            background: "linear-gradient(135deg,#173b8f,#3569d4)",
            color: "#fff",
            fontWeight: 800,
            fontSize: 14,
            cursor: "pointer",
            boxShadow: "0 9px 24px rgba(23,59,143,.3)",
          }}
        >
          ↻ Reset Camera
        </button>

        <Canvas
          shadows
          camera={{
            position: [0, 11, 25],
            fov: 45,
            near: 0.1,
            far: 100,
          }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={["#f4f7fb"]} />
          <LabScene resetSignal={resetSignal} />
        </Canvas>

        {/* controls hint */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            padding: "9px 18px",
            borderRadius: 25,
            background: "rgba(255,255,255,.94)",
            color: "#64748b",
            fontWeight: 700,
            boxShadow: "0 4px 14px rgba(0,0,0,.12)",
          }}
        >
          🖱️ Rotate &nbsp; 🔍 Zoom &nbsp; ✋ Pan
        </div>
      </div>

      {/* summary */}
      <div
        style={{
          maxWidth: 1200,
          margin: "18px auto 0",
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 18,
        }}
      >
        <Summary icon="🖥️" title="COMPUTER SYSTEMS" value="28 Workstations" />
        <Summary icon="🌐" title="NETWORK" value="STAR TOPOLOGY" />
        <Summary icon="⚡" title="ELECTRICAL LOAD" value="18.5 kW" />
      </div>
    </div>
  );
}

function Summary({ icon, title, value }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.97)",
        border: "1px solid #dbe4f0",
        borderRadius: 17,
        padding: "18px 24px",
        display: "flex",
        alignItems: "center",
        gap: 15,
        boxShadow: "0 8px 25px rgba(20,45,90,.08)",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 13,
          background: "#edf3ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontSize: 11,
            color: "#718096",
            fontWeight: 800,
            letterSpacing: 0.8,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 4,
            fontSize: 18,
            color: "#173b8f",
            fontWeight: 900,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}