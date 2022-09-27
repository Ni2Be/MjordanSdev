import React from "react";
import { Canvas } from "@react-three/fiber"
import Box from "../Sphere/Sphere";
import "./AnimatedBackground.scss"
import { ResizeObserver } from '@juggle/resize-observer';

function AnimatedBackground() {


  return (
    <div className='animatedBackground'>
      <Canvas resize={{ polyfill: ResizeObserver }} >
        <ambientLight />
        <pointLight color={0xff0f00} position={[10, 10, 10]} />
        <pointLight color={0xff0000} position={[-10, 10, -10]} />
        <pointLight color={0x00ffff} position={[-10, -10, 10]} />
        <Box position={[0, 0, 0]} />
      </Canvas>
    </div>
  )
}

export default AnimatedBackground;