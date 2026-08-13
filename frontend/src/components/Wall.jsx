import React from "react";

/**
 * Wall — A reusable 3D wall segment for the lab scene.
 * @param {Object} props
 * @param {[number,number,number]} props.position  – Center position [x, y, z]
 * @param {[number,number,number]} props.size      – Dimensions [width, height, depth]
 * @param {string}                 props.color     – Hex color string
 * @param {number}                 props.roughness – PBR roughness (0–1)
 * @param {number}                 props.metalness – PBR metalness (0–1)
 * @param {number}                 props.opacity   – Material opacity (0–1)
 */
export default function Wall({
  position = [0, 0, 0],
  size = [1, 1, 1],
  color = "#dedfe1",
  roughness = 0.7,
  metalness = 0,
  opacity = 1,
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}
