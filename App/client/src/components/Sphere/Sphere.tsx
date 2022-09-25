import React from "react";
import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { useFrame, ThreeElements, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import colorMapImg from "../../mat/Lava_004_SD/Lava_004_COLOR.jpg";
import normalMapImg from "../../mat/Lava_004_SD/Lava_004_NORM.jpg";
import displacementMapImg from  "../../mat/Lava_004_SD/Lava_004_DISP.png";
import ambientOccMapImg from  "../../mat/Lava_004_SD/Lava_004_OCC.jpg";
import roughMapImg from  "../../mat/Lava_004_SD/Lava_004_ROUGH.jpg";

function Box(props: ThreeElements['mesh']) {
  
  const colorMap = useLoader(TextureLoader, colorMapImg)
  const normalMap = useLoader(TextureLoader, normalMapImg)
  const displacementMap = useLoader(TextureLoader, displacementMapImg)
  const ambientOccMap = useLoader(TextureLoader, ambientOccMapImg)
  const roughMap = useLoader(TextureLoader, roughMapImg)
  
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [material, setMaterial] = useState(new THREE.MeshStandardMaterial())
  useFrame((state, delta) => {
    ref.current.rotation.y += 0.15 * delta
  })

  useEffect(() => {
    material.roughness = 0.8
    material.metalness = 0.7
    material.map = colorMap
    material.normalMap = normalMap
    material.displacementMap = displacementMap
    material.roughnessMap = roughMap
    material.aoMap = ambientOccMap
    setMaterial(material);
  }, [])

  useEffect(() => {
    material.color = new THREE.Color(hovered ? 0xffffff : 0xeeeeff)
    setMaterial(material);
    console.log(material.color);
  }, [hovered, setHovered, material, setMaterial])

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