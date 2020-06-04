import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'

export default function Axis({ visibles }) {
  let vertices = [
    [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0)],
    [new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0)],
    [new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0)],
  ]

  const refX = useRef()
  const refY = useRef()
  const refZ = useRef()

  useFrame(() => {
    refX.current.visible = visibles.axis
    refY.current.visible = visibles.axis
    refZ.current.visible = visibles.axis
  })

  return (
    <React.Fragment>
      <line ref={refX}>
        <geometry attach="geometry" vertices={vertices[0]} />
        <lineBasicMaterial attach="material" linewidth={3} color="#00ffff" />
      </line>
      <line ref={refY}>
        <geometry attach="geometry" vertices={vertices[1]} />
        <lineBasicMaterial attach="material" linewidth={3} color="#0099ff" />
      </line>
      <line ref={refZ}>
        <geometry attach="geometry" vertices={vertices[2]} />
        <lineBasicMaterial attach="material" linewidth={30} color="#0033ff" />
      </line>
    </React.Fragment>
  )
}

Axis.propTypes = {
  visibles: PropTypes.object,
}
