import React from 'react'
import PropTypes from 'prop-types'
import { Canvas } from 'react-three-fiber'
import Box from './objects/Box'
import { default as BoxInfo } from '../models/Box'

function Space(props) {
  const boxes = props.boxes.map((box, i) => {
    return <Box box={box} key={i} />
  })

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {boxes}
    </Canvas>
  )
}

export default Space

Space.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.instanceOf(BoxInfo)),
}
