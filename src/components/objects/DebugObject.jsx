import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useFrame } from 'react-three-fiber'
import Box from '../../models/Box'

export default function DebugObject(props) {
  const mesh = useRef()

  useFrame(() => {
    console.log(mesh.current)
  })

  return (
    <mesh {...props} ref={mesh}>
      <lineSegments />
      <lineBasicMaterial attach="material" color="red" />
    </mesh>
  )
}

DebugObject.propTypes = {
  box: PropTypes.instanceOf(Box)
}
