/**
 * Window — A realistic 3D window with transparent glass panes,
 * white frame dividers, outer trim, and a sill.
 */
function Window({ position = [0, 2.5, -5.85] }) {
  return (
    <group position={position}>
      {/* Outer trim / reveal */}
      <mesh>
        <boxGeometry args={[4.1, 2.7, 0.14]} />
        <meshStandardMaterial color="#b0b8c4" roughness={0.6} />
      </mesh>

      {/* White frame base */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[3.8, 2.4, 0.12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* Vertical divider */}
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[0.1, 2.4, 0.06]} />
        <meshStandardMaterial color="#ffffff" roughness={0.35} />
      </mesh>

      {/* Horizontal divider */}
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[3.8, 0.1, 0.06]} />
        <meshStandardMaterial color="#ffffff" roughness={0.35} />
      </mesh>

      {/* 4 Glass panes — transparent with sky-blue tint */}
      {[
        [-0.9, 0.55],
        [0.9, 0.55],
        [-0.9, -0.55],
        [0.9, -0.55],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.1]}>
          <boxGeometry args={[1.6, 0.95, 0.03]} />
          <meshStandardMaterial
            color="#a0d8ef"
            transparent
            opacity={0.45}
            roughness={0.08}
            metalness={0.15}
          />
        </mesh>
      ))}

      {/* Window sill */}
      <mesh position={[0, -1.3, 0.22]}>
        <boxGeometry args={[4.2, 0.12, 0.35]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.5} />
      </mesh>
    </group>
  );
}

export default Window;