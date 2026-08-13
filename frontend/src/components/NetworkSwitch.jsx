function NetworkSwitch({ position = [0, 0, 0] }) {
  return (
    <group position={position}>

      {/* Switch body */}
      <mesh>
        <boxGeometry args={[1.8, 0.35, 0.8]} />
        <meshStandardMaterial color="#20242a" />
      </mesh>

      {/* Network ports */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[-0.65 + i * 0.18, 0, 0.41]}
        >
          <boxGeometry args={[0.1, 0.08, 0.03]} />
          <meshStandardMaterial color="#00ff66" />
        </mesh>
      ))}

      {/* Switch indicator */}
      <mesh position={[0.75, 0.08, 0.41]}>
        <boxGeometry args={[0.08, 0.08, 0.03]} />
        <meshStandardMaterial color="#00ff00" />
      </mesh>

    </group>
  );
}

export default NetworkSwitch;