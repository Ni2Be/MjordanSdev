import React, { useMemo } from "react";
import * as THREE from "three"
import { useRef, useState } from "react"
import { useFrame, ThreeElements } from "@react-three/fiber"
import { useTexture } from "@react-three/drei";

function Box(props: ThreeElements['mesh']) {

  const [colorMap, normalMap, displacementMap, ambientOccMap, roughMap] = useTexture (
                                ["assets/mat/Lava_004_SD/Lava_004_COLOR.jpg",
                                "assets/mat/Lava_004_SD/Lava_004_NORM.jpg",
                                "assets/mat/Lava_004_SD/Lava_004_DISP.png",
                                "assets/mat/Lava_004_SD/Lava_004_OCC.jpg",
                                "assets/mat/Lava_004_SD/Lava_004_ROUGH.jpg"]
                                );

  const ref = useRef<THREE.Mesh>(null!);
  const [material, setMaterial] = useState(new THREE.MeshStandardMaterial({ precision: 'highp' }));
  useFrame((_, delta) => {
    ref.current.rotation.y += 0.02 * delta;
  })

  useMemo(() => {
    material.roughness = 1.0;
    material.metalness = 1.0;
    material.map = colorMap;
    material.normalMap = normalMap;
    material.displacementMap = displacementMap;
    material.roughnessMap = roughMap;
    material.aoMap = ambientOccMap;
    material.displacementMap.wrapS = THREE.RepeatWrapping;
    material.displacementScale = 0.5;
    setMaterial(material);
  }, [ambientOccMap, colorMap, displacementMap, material, normalMap, roughMap])

  return (
    <mesh
      {...props}
      geometry={new THREE.SphereGeometry(1, 200, 200)}
      material={material}
      ref={ref}>
    </mesh>
  )
}

export default Box;