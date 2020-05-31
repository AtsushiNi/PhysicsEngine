import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'

export default function DebugObject({ side, updatePoints }) {
  let vertices = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 0)
  ]

  const updateVertices = () => {
    vertices = [side[0], [0, 0, 0]].map(v => new THREE.Vector3(...v))
  }

  const update = useCallback((self) => ((self.verticesNeedUpdate = true), (self.verticesNeedUpdate = true), self.computeBoundingSphere()), [])

  const ref = useRef()

  useFrame(() => {
    updatePoints()
    ref.current.vertices[0] = new THREE.Vector3(...side[0])
    updateVertices()
  })

  return (
    <line>
      <geometry attach="geometry" vertices={vertices} onUpdate={update} ref={ref}/>
      <lineBasicMaterial attach="material" color="red" />
    </line>
  )
}

DebugObject.propTypes = {
  side: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  updatePoints: PropTypes.func,
}
