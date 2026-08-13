import React from "react";

function PowerSocket({ position = [0, 0, 0] }) {
  return (
    <group position={position}>

      {/* Socket body */}
      <mesh>
        <boxGeometry args={[0.35, 0.45, 0.12]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>

      {/* Socket plate */}
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[0.28, 0.36, 0.03]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Top socket */}
      <mesh position={[0, 0.09, 0.095]}>
        <cylinderGeometry args={[0.035, 0.035, 0.025, 16]} />
        <meshStandardMaterial color="#222222" />
      </mesh>

      {/* Bottom socket */}
      <mesh position={[0, -0.09, 0.095]}>
        <cylinderGeometry args={[0.035, 0.035, 0.025, 16]} />
        <meshStandardMaterial color="#222222" />
      </mesh>

      {/* Power indicator */}
      <mesh position={[0.1, 0, 0.1]}>
        <boxGeometry args={[0.025, 0.05, 0.01]} />
        <meshStandardMaterial
          color="#00ff66"
          emissive="#00aa44"
          emissiveIntensity={1}
        />
      </mesh>

    </group>
  );
}

export default PowerSocket;