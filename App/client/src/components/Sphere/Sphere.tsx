import React from "react";
import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { useFrame, ThreeElements, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

function Box(props: ThreeElements['mesh']) {

  const colorMap = useLoader(TextureLoader, "assets/mat/Lava_004_SD/Lava_004_COLOR.jpg")
  const normalMap = useLoader(TextureLoader, "assets/mat/Lava_004_SD/Lava_004_NORM.jpg")
  const displacementMap = useLoader(TextureLoader, "assets/mat/Lava_004_SD/Lava_004_DISP.png")
  const ambientOccMap = useLoader(TextureLoader, "assets/mat/Lava_004_SD/Lava_004_OCC.jpg")
  const roughMap = useLoader(TextureLoader, "assets/mat/Lava_004_SD/Lava_004_ROUGH.jpg")

  const ref = useRef<THREE.Mesh>(null!)
  const [rotation, setRotation] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [material, setMaterial] = useState(new THREE.MeshStandardMaterial())
  useFrame((state, delta) => {
    const updated = rotation + 0.15 * delta;
    setRotation(updated);

    ref.current.rotation.y = updated;
  })
  
  useEffect(() => {
    material.roughness = 0.8;
    material.metalness = 0.7;
    material.map = colorMap;
    material.normalMap = normalMap;
    material.displacementMap = displacementMap;
    material.roughnessMap = roughMap;
    material.aoMap = ambientOccMap;
    material.displacementMap.wrapS = THREE.RepeatWrapping;
    material.displacementScale = 0.5;
    setMaterial(material);
  }, [ambientOccMap, colorMap, displacementMap, material, normalMap, roughMap])

  useEffect(() => {
    material.color = new THREE.Color(hovered ? 0xffffff : 0xeeeeff)
    setMaterial(material);
  }, [hovered, material])

  return (
    <mesh material={material}
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(_) => setClicked(!clicked)}
      onPointerOver={(_) => setHovered(true)}
      onPointerOut={(_) => setHovered(false)}>
      <sphereGeometry args={[1, 30, 30]} />
      <mesh material={material} />
    </mesh>
  )
}

export default Box;