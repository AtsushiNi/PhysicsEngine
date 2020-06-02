class Calculation {
  // 今のところ使っていないのでコメントアウト
  //static innerProductMatrix(matrixA, matrixB) {
  //  const newMatrix = [
  //    [0, 0, 0],
  //    [0, 0, 0],
  //    [0, 0, 0],
  //  ]
  //  for (let i = 0; i < 3; i++) {
  //    for (let j = 0; j < 3; j++) {
  //      for (let k = 0; k < 3; k++) {
  //        newMatrix[i][j] = matrixA[i][k] * matrixB[k][j]
  //      }
  //    }
  //  }
  //  return newMatrix
  //}

  // 今のところ使っていないのでコメントアウト
  ////内因性オイラー角(x→y→z)から回転行列への変換
  //static eulerAngletoRotMatrix(lotx, loty, lotz) {
  //  const rotMatrix = [
  //    [
  //      Math.cos(loty) * Math.cos(lotz),
  //      Math.sin(lotx) * Math.sin(loty) * Math.cos(lotz) -
  //        Math.cos(lotx) * Math.sin(lotz),
  //      Math.cos(lotx) * Math.sin(loty) * Math.cos(lotz) +
  //        Math.sin(lotx) * Math.sin(lotz),
  //    ],
  //    [
  //      Math.cos(loty) * Math.sin(lotz),
  //      Math.sin(lotx) * Math.sin(loty) * Math.sin(lotz) +
  //        Math.cos(lotx) * Math.cos(lotz),
  //      Math.cos(lotx) * Math.sin(loty) * Math.sin(lotz) -
  //        Math.sin(lotx) * Math.cos(lotz),
  //    ],
  //    [
  //      -Math.sin(loty),
  //      Math.sin(lotx) * Math.cos(loty),
  //      Math.cos(lotx) * Math.cos(loty),
  //    ],
  //  ]
  //  return rotMatrix
  //}

  static updateValues = (boxes, boxConfigs, gravity) => {
    if (boxes.length > 1) {
      boxes.forEach((boxA, index) => {
        for (var i = index + 1; i < boxes.length; i++) {
          const boxB = boxes[i]
          // boxAとboxBの衝突を調べる
          boxA.isClash(boxB)
        }
      })
    }

    boxes.forEach((box, index) => {
      // 速度の更新
      if (boxConfigs[index].fixed === false) {
        box.velocity += gravity
      }

      // 位置の更新
      box.position += box.velocity

      // クォータイオンの更新
      box.quaternion = box.quaternion.dot(box.quatVelocity)
      box.quaternion.standardization()

      //頂点の更新
      box.vertexPosition = this.currentVertexPosition(box)      
    })
  }

  static resetValues = (boxes, boxConfigs) => {
    boxes.forEach((box, index) => {
      box.position = boxConfigs[index].initialPosition
      box.rotation = boxConfigs[index].initialRotation
      box.velocity = boxConfigs[index].initialVelocity
      box.rotVelocity = boxConfigs[index].initialRotVelocity
      box.quaternion = this.eulerToQuaternion(boxConfigs[index].initialRotation)
    })
  }
}

export default Calculation
