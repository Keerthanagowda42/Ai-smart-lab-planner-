function Computer({ position = [0, 0, 0] }) {
  return (
    <group position={position}>

      {/* Table */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.15, 1]} />
        <meshStandardMaterial color="#64b5f6" />
      </mesh>

      {/* Monitor */}
      <mesh position={[0, 0.35, -0.15]}>
        <boxGeometry args={[0.45, 0.3, 0.05]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Stand */}
      <mesh position={[0, 0.18, -0.15]}>
        <boxGeometry args={[0.03, 0.18, 0.03]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* CPU */}
      <mesh position={[0.75, -0.2, -0.15]}>
        <boxGeometry args={[0.2, 0.4, 0.3]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Chair */}
      <mesh position={[0, -0.45, 0.7]}>
        <boxGeometry args={[0.45, 0.45, 0.45]} />
        <meshStandardMaterial color="#1565c0" />
      </mesh>

    </group>
  );
}

export default Computer;