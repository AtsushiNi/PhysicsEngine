import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useFrame } from 'react-three-fiber'
import { default as BoxInfo } from '../../models/Box'

export default function Box(props) {
  const mesh = useRef()

  useFrame(() => {
    const euler = props.box.quaternion.toEuler()
    const position = props.box.position
    mesh.current.visible = props.visibles.boxes
    mesh.current.rotation.x = euler[0]
    mesh.current.rotation.y = euler[1]
    mesh.current.rotation.z = euler[2]
    mesh.current.position.x = position[0]
    mesh.current.position.y = position[1]
    mesh.current.position.z = position[2]
  })

  return (
    <mesh {...props} ref={mesh} scale={[1, 1, 1]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  )
}

Box.propTypes = {
  box: PropTypes.instanceOf(BoxInfo),
  visibles: PropTypes.object,
}
