function Door({ position = [0, 1.5, 5.8] }) {
  return (
    <group position={position}>

      {/* Door Frame */}
      <mesh>
        <boxGeometry args={[2.2, 3.5, 0.2]} />
        <meshStandardMaterial color="#5c4033" />
      </mesh>

      {/* Door Panel */}
      <mesh position={[0, 0, 0.15]}>
        <boxGeometry args={[1.8, 3.1, 0.15]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>

      {/* Door Handle */}
      <mesh position={[0.65, 0, 0.3]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>

    </group>
  );
}

export default Door;