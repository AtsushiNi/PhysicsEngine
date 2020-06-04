import React from 'react'
import * as THREE from 'three'

export default function Axis() {
  let vertices = [
    [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 0, 0)
    ],
    [
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 0)
    ],
    [
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 0)
    ],
  ]

  return (
    <React.Fragment>
      <line>
        <geometry attach="geometry" vertices={vertices[0]} />
        <lineBasicMaterial attach="material" linewidth={3} color="#00ffff" />
      </line>
      <line>
        <geometry attach="geometry" vertices={vertices[1]} />
        <lineBasicMaterial attach="material" linewidth={3} color="#0099ff" />
      </line>
      <line>
        <geometry attach="geometry" vertices={vertices[2]} />
        <lineBasicMaterial attach="material" linewidth={30} color="#0033ff" />
      </line>
    </React.Fragment>
  )
}
