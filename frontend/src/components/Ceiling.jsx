import React from "react";

function CeilingLight({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      
      {/* Light body */}
      <mesh>
        <boxGeometry args={[1.5, 0.08, 0.35]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Actual light */}
      <pointLight
        position={[0, -0.3, 0]}
        intensity={1.2}
        distance={8}
      />

    </group>
  );
}

export default CeilingLight;