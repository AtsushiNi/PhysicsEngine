import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'

function Box(props) {
  const mesh = useRef()

  useFrame(() => {
    // mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    mesh.current.rotation.x = props.lotation[0]
    mesh.current.rotation.y = props.lotation[1]
    mesh.current.rotation.z = props.lotation[2]
    mesh.current.position.x = props.position[0]
    mesh.current.position.y = props.position[1]
    mesh.current.position.z = props.position[2]
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1, 1, 1]}
    >
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial attach='material' color='gray' />
    </mesh>
  )
}

export default Box
