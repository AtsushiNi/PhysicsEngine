import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, useThree, useFrame, extend } from 'react-three-fiber'
import Box from './objects/Box'
import DebugObject from './objects/DebugObject'
import { default as BoxInfo } from '../models/Box'
extend({ OrbitControls })

function Space(props) {
  const boxes = props.boxes.map((box, i) => {
    return <Box box={box} key={i} />
  })

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {boxes}
      {props.boxes.length > 1 && <DebugObject boxes={props.boxes} />}
      <Controls />
    </Canvas>
  )
}

export default Space

Space.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.instanceOf(BoxInfo)),
}

function Controls() {
  const ref = useRef()
  const { camera, gl } = useThree()
  useFrame(() => ref.current.update())
  return (
    <orbitControls
      ref={ref}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.5}
    />
  )
}
