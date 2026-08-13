function Room() {
  return (
    <group>

      {/* FLOOR */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[14, 0.2, 12]} />
        <meshStandardMaterial color="#d9d9d9" />
      </mesh>

      {/* BACK WALL */}
      <mesh position={[0, 2, -6]}>
        <boxGeometry args={[14, 6, 0.2]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>

      {/* LEFT WALL */}
      <mesh position={[-7, 2, 0]}>
        <boxGeometry args={[0.2, 6, 12]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>

      {/* RIGHT WALL */}
      <mesh position={[7, 2, 0]}>
        <boxGeometry args={[0.2, 6, 12]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>

    </group>
  );
}

export default Room;