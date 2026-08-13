function Projector({ position = [0, 0, 0] }) {
  return (
    <group position={position}>

      <mesh>
        <boxGeometry args={[0.45, 0.18, 0.3]} />
        <meshStandardMaterial color="#d9d9d9" />
      </mesh>

      <mesh position={[0.23, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.08, 20]} />
        <meshStandardMaterial color="#111" />
      </mesh>

    </group>
  );
}

export default Projector;