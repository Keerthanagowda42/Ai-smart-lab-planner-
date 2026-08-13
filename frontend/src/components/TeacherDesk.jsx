function TeacherDesk({ position = [0, 0, 0] }) {
  return (
    <group position={position}>

      {/* Table Top */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.15, 1.2]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>

      {/* Legs */}

      <mesh position={[-1.3, -0.4, -0.5]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      <mesh position={[1.3, -0.4, -0.5]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      <mesh position={[-1.3, -0.4, 0.5]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      <mesh position={[1.3, -0.4, 0.5]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#555" />
      </mesh>

    </group>
  );
}

export default TeacherDesk;