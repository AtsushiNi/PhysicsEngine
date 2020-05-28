import React, { useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'
import Box from '../../models/Box'

export default function DebugObject(props) {
  const mesh = useRef()

  useFrame(() => {
    console.log(mesh.current)
  })

  const start = [1, 1, 1]
  const end = [2, 2, 2]
  const vertices = useMemo(() => [start, end].map((v) => new THREE.Vector3(...v)), [start, end])

  return (
    <line>
      <geometry attach="geometry" vertices={vertices} />
      <lineBasicMaterial attach="material" color="white" />
    </line>
  )
}

DebugObject.propTypes = {
  box: PropTypes.instanceOf(Box)
}
