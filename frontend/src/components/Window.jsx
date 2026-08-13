function Window({ position = [0, 2.5, -5.85] }) {
  return (
    <group position={position}>

      {/* Window Frame */}
      <mesh>
        <boxGeometry args={[3, 2.2, 0.15]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>

      {/* Glass */}
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[2.6, 1.8, 0.08]} />
        <meshStandardMaterial
          color="#87ceeb"
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Vertical Frame */}
      <mesh position={[0, 0, 0.2]}>
        <boxGeometry args={[0.12, 1.8, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Horizontal Frame */}
      <mesh position={[0, 0, 0.2]}>
        <boxGeometry args={[2.6, 0.12, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>

    </group>
  );
}

export default Window;