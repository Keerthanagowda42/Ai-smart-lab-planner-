import React from "react";

function ACUnit({ position, scale = [1, 1, 1] }) {
  return (
    <group position={position} scale={scale}>

      {/* AC BODY */}
      <mesh>
        <boxGeometry args={[2.5, 0.7, 0.45]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* FRONT VENT */}
      <mesh position={[0, -0.12, -0.24]}>
        <boxGeometry args={[2, 0.12, 0.04]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* DISPLAY */}
      <mesh position={[0.75, 0.15, -0.25]}>
        <boxGeometry args={[0.25, 0.12, 0.03]} />
        <meshStandardMaterial
          color="#b6ff6a"
          emissive="#b6ff6a"
          emissiveIntensity={1}
        />
      </mesh>

    </group>
  );
}

export default ACUnit;