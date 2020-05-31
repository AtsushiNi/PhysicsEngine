import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, useThree, useFrame, extend } from 'react-three-fiber'
import Box from './objects/Box'
import DebugObject from './objects/DebugObject'
import { default as BoxInfo } from '../models/Box'
extend({ OrbitControls })

function Space(props) {
  const boxes = props.boxes.map((box, i) => {
    return <Box box={box} key={i} />
  })

  // box[1]の周りにbox[0]をくっつけたミンコフスキ差の辺を描画する
  // [box[1]の頂点のインデックス, box[0]の頂点のインデックス]で、ミンコフスキ差の一つの頂点を指定する
  // これらの指定された頂点からなる図形を表示する
  const debugVertexPairs = [
   [[0, 0], [1, 1]], // 辺1
   [[0, 0], [1, 2]], // 辺2
  ]

  let vertexPairs = new Array(debugVertexPairs.length).fill([[0, 0], [0, 0]])

  const updateDebugVertex = () => {
    // ミンコフスキ差の各辺
    for (let i = 0; i < debugVertexPairs.length; i++) {
      const startVertex = [
        props.boxes[0].vertexPositions[debugVertexPairs[i][0][0]][0] - props.boxes[1].vertexPositions[debugVertexPairs[i][0][1]][0],
        props.boxes[0].vertexPositions[debugVertexPairs[i][0][0]][1] - props.boxes[1].vertexPositions[debugVertexPairs[i][0][1]][1],
        props.boxes[0].vertexPositions[debugVertexPairs[i][0][0]][2] - props.boxes[1].vertexPositions[debugVertexPairs[i][0][1]][2],
      ]
      const endVertex = [
        props.boxes[0].vertexPositions[debugVertexPairs[i][1][0]][0] - props.boxes[1].vertexPositions[debugVertexPairs[i][1][1]][0],
        props.boxes[0].vertexPositions[debugVertexPairs[i][1][0]][1] - props.boxes[1].vertexPositions[debugVertexPairs[i][1][1]][1],
        props.boxes[0].vertexPositions[debugVertexPairs[i][1][0]][2] - props.boxes[1].vertexPositions[debugVertexPairs[i][1][1]][2],
      ]

      vertexPairs[i][0] = startVertex
      vertexPairs[i][1] = endVertex
    }
  }
  if (props.boxes.length > 1) {
    updateDebugVertex()
  }

  return (
    <Canvas>
      <spotLight intensity={0.4} position={[30, 30, 50]} angle={0.2} penumbra={1} />
      <spotLight intensity={0.4} position={[-30, 30, 50]} angle={0.2} penumbra={1} />
      <ambientLight intensity={0.5} />
      {boxes}
      {props.boxes.length > 1 &&
        vertexPairs.map((side, i) => <DebugObject side={side} updatePoints={updateDebugVertex} key={i}/>)
      }
      <Controls />
    </Canvas>
  )
}

export default Space

Space.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.instanceOf(BoxInfo)),
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
