import React from "react";
import { Canvas } from "@react-three/fiber"
import Planet from "../Sphere/Sphere";
import styles from "../../styles/AnimatedBackground.module.scss"
import { ResizeObserver } from '@juggle/resize-observer';

function AnimatedBackground() {

  return (
    <div className={styles.animatedBackground}>
      <Canvas resize={{ polyfill: ResizeObserver }} >
        <ambientLight />
        <pointLight color={0xff0f00} position={[10, 10, 10]} />
        <Planet position={[0, 0, 3]} />
      </Canvas>
    </div>
  )
}

export default AnimatedBackground;