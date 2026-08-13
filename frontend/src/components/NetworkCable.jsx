import React from "react";
import * as THREE from "three";

/* =========================================================
   ONE STRAIGHT CABLE SECTION
========================================================= */

function CablePart({ start, end }) {
  const startPoint = new THREE.Vector3(...start);
  const endPoint = new THREE.Vector3(...end);

  const direction = new THREE.Vector3()
    .subVectors(endPoint, startPoint);

  const length = direction.length();

  const midpoint = new THREE.Vector3()
    .addVectors(startPoint, endPoint)
    .multiplyScalar(0.5);

  const quaternion = new THREE.Quaternion();

  quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize()
  );

  return (
    <mesh
      position={[
        midpoint.x,
        midpoint.y,
        midpoint.z
      ]}
      quaternion={quaternion}
    >
      <cylinderGeometry
        args={[0.018, 0.018, length, 8]}
      />

      <meshStandardMaterial
        color="#00aeea"
        emissive="#006080"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}


/* =========================================================
   NETWORK CABLE

   ROUTE:

        SERVER / SWITCH
              |
              |
              +------ MAIN CABLE TRUNK
              |
              +---------------- COMPUTER
========================================================= */

function NetworkCable({ start, end }) {

  const floorHeight = 0.08;

  /*
    Main cable trunk.

    The switch is around x = 7.
    We move the cable to x = 5.8 first.
  */

  const trunkX = 5.8;

  /* Switch → Floor */

  const floorStart = [
    start[0],
    floorHeight,
    start[2]
  ];

  /* Move from switch to main cable trunk */

  const trunkStart = [
    trunkX,
    floorHeight,
    start[2]
  ];

  /* Move along the trunk toward computer row */

  const trunkEnd = [
    trunkX,
    floorHeight,
    end[2]
  ];

  /* Final branch toward computer */

  const floorEnd = [
    end[0],
    floorHeight,
    end[2]
  ];

  return (
    <group>

      {/* ==============================================
          1. SWITCH DOWN TO FLOOR
      ============================================== */}

      <CablePart
        start={start}
        end={floorStart}
      />


      {/* ==============================================
          2. SWITCH TO MAIN CABLE TRUNK
      ============================================== */}

      <CablePart
        start={floorStart}
        end={trunkStart}
      />


      {/* ==============================================
          3. MAIN TRUNK RUNS ALONG THE LAB
      ============================================== */}

      <CablePart
        start={trunkStart}
        end={trunkEnd}
      />


      {/* ==============================================
          4. BRANCH FROM TRUNK TO COMPUTER
      ============================================== */}

      <CablePart
        start={trunkEnd}
        end={floorEnd}
      />


      {/* ==============================================
          5. CABLE UP TO COMPUTER
      ============================================== */}

      <CablePart
        start={floorEnd}
        end={end}
      />

    </group>
  );
}

export default NetworkCable;