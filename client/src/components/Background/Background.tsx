import { Canvas } from '@react-three/fiber'
import { Segment } from 'semantic-ui-react';
import Box from '../Box/Box';
import './Background.scss'

function Background() {
  return (
    <Segment  className='background'>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </Segment>
  )
}

export default Background;