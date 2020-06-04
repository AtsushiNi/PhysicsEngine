import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useFrame } from 'react-three-fiber'
import { default as BoxInfo } from '../../models/Box'

// ミンコフスキ差を表示するデバッグ用のコンポーネント
// thisBoxは原点にあり、tartgetBoxの周りにthisBoxの反転したものをくっつけるとミンコフスキ差になる
// targetBoxの各頂点(index番目の頂点)を中心として、自身の回転を加えたthisBoxを書く
export default function DebugObject({ thisBox, targetBox, index, visibles }) {
  const mesh = useRef()

  useFrame(() => {
    const euler = thisBox.quaternion.toEuler()
    const position = targetBox.vertexPosition[index]
    mesh.current.visible = visibles.debugObjects
    mesh.current.rotation.x = euler[0]
    mesh.current.rotation.y = euler[1]
    mesh.current.rotation.z = euler[2]
    mesh.current.position.x = position[0]
    mesh.current.position.y = position[1]
    mesh.current.position.z = position[2]
  })

  return (
    <mesh {...{thisBox, targetBox, index}} ref={mesh} scale={[1, 1, 1]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  )
}

DebugObject.propTypes = {
  thisBox: PropTypes.instanceOf(BoxInfo),
  targetBox: PropTypes.instanceOf(BoxInfo),
  index: PropTypes.number,
  visibles: PropTypes.object,
}
