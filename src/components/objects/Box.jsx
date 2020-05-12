import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useFrame } from 'react-three-fiber'

function Box(props) {
  const mesh = useRef()

  useFrame(() => {
    // mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    mesh.current.position.x = props.position[0]
    mesh.current.position.y = props.position[1]
    mesh.current.position.z = props.position[2]
    mesh.current.quaternion.w = props.quaternion[0]
    mesh.current.quaternion.x = props.quaternion[1]
    mesh.current.quaternion.y = props.quaternion[2]
    mesh.current.quaternion.z = props.quaternion[3]
  })

  return (
    <mesh {...props} ref={mesh} scale={[1, 1, 1]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="gray" />
    </mesh>
  )
}

Box.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  quaternion: PropTypes.arrayOf(PropTypes.number),
}

export default Box
