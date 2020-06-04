import React, { useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, useThree, useFrame, extend } from 'react-three-fiber'
import Box from './objects/Box'
import DebugObject from './objects/DebugObject'
import Axis from './objects/Axis'
import { default as BoxInfo } from '../models/Box'
extend({ OrbitControls })

export default function Space(props) {
  const boxes = props.boxes.map((box, i) => {
    return <Box box={box} key={i} visibles={props.visibles} />
  })

  const debugBoxes = useMemo(() => {
    return props.boxes[1]
      ? [...new Array(8)].map((_, i) => (
          <DebugObject
            thisBox={props.boxes[0]}
            targetBox={props.boxes[1]}
            index={i}
            key={i}
            visibles={props.visibles}
          />
        ))
      : null
  }, [props.boxes.length])

  return (
    <Canvas>
      <spotLight
        intensity={0.4}
        position={[30, 30, 50]}
        angle={0.2}
        penumbra={1}
      />
      <spotLight
        intensity={0.4}
        position={[-30, 30, 50]}
        angle={0.2}
        penumbra={1}
      />
      <ambientLight intensity={0.5} />
      <Axis visibles={props.visibles} />
      {boxes}
      {debugBoxes}
      <Controls />
    </Canvas>
  )
}

Space.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.instanceOf(BoxInfo)),
  visibles: PropTypes.object,
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
