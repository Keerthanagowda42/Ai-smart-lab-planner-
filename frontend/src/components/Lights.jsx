function Light({ position = [0, 0, 0] }) {
  return (
    <group position={position}>

      <mesh>
        <boxGeometry args={[1.2, 0.08, 0.4]} />
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveIntensity={1}
        />
      </mesh>

      <pointLight intensity={1} distance={8} />

    </group>
  );
}

export default Light;