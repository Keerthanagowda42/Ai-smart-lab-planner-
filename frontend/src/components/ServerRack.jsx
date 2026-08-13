import React from "react";

function ServerRack({ position, scale = [1, 1, 1] }) {
  return (
    <group position={position} scale={scale}>

      {/* MAIN RACK */}
      <mesh>
        <boxGeometry args={[1.5, 3.2, 0.8]} />
        <meshStandardMaterial color="#171b22" />
      </mesh>

      {/* SERVER UNITS */}

      <mesh position={[0, 1.05, -0.42]}>
        <boxGeometry args={[1.15, 0.35, 0.06]} />
        <meshStandardMaterial color="#303640" />
      </mesh>

      <mesh position={[0, 0.55, -0.42]}>
        <boxGeometry args={[1.15, 0.35, 0.06]} />
        <meshStandardMaterial color="#080a0d" />
      </mesh>

      <mesh position={[0, 0.05, -0.42]}>
        <boxGeometry args={[1.15, 0.35, 0.06]} />
        <meshStandardMaterial color="#080a0d" />
      </mesh>

      <mesh position={[0, -0.45, -0.42]}>
        <boxGeometry args={[1.15, 0.35, 0.06]} />
        <meshStandardMaterial color="#080a0d" />
      </mesh>

      <mesh position={[0, -0.95, -0.42]}>
        <boxGeometry args={[1.15, 0.35, 0.06]} />
        <meshStandardMaterial color="#080a0d" />
      </mesh>

      {/* STATUS LIGHTS */}

      <mesh position={[-0.4, 1.05, -0.47]}>
        <boxGeometry args={[0.08, 0.08, 0.03]} />
        <meshStandardMaterial
          color="#7cff5b"
          emissive="#7cff5b"
          emissiveIntensity={1}
        />
      </mesh>

      <mesh position={[-0.4, 0.55, -0.47]}>
        <boxGeometry args={[0.08, 0.08, 0.03]} />
        <meshStandardMaterial
          color="#7cff5b"
          emissive="#7cff5b"
          emissiveIntensity={1}
        />
      </mesh>

      <mesh position={[-0.4, 0.05, -0.47]}>
        <boxGeometry args={[0.08, 0.08, 0.03]} />
        <meshStandardMaterial
          color="#ffd84d"
          emissive="#ffd84d"
          emissiveIntensity={1}
        />
      </mesh>

      <mesh position={[-0.4, -0.45, -0.47]}>
        <boxGeometry args={[0.08, 0.08, 0.03]} />
        <meshStandardMaterial
          color="#6ee7ff"
          emissive="#6ee7ff"
          emissiveIntensity={1}
        />
      </mesh>

    </group>
  );
}

export default ServerRack;