import React from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Box from './objects/Box'

function Space(props) {
  const boxes = props.boxes.map((box) => {
    return (
      <Box lotation={box.lotation} position={box.position}/>
    )
  })

  return(
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {boxes}
    </Canvas>
  )
}

export default Space
