import Quaternion from "./quaternion"
import Box from "../models/Box"

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

  //回転移動
  rotationalTranslate = (q, r) => {
    let quaternionR = Quaternion.positionVectortoQuaternion(r)
    let conjugateQuaternion = q.conjugateQuaternion(q)
    let newQuaternionR = q.dot(quaternionR).dot(conjugateQuaternion)
    let newR = newQuaternionR.quaterniontoPositionVector()
    return newR
  }

  //逆回転移動
  inverseRotationalTranslate = (q, r) => {
    let quaternionR = Quaternion.positionVectortoQuaternion(r)
    let conjugateQuaternion = q.conjugateQuaternion()
    let newQuaternionR = conjugateQuaternion.dot(quaternionR).dot(q)
    let newR = newQuaternionR.quaterniontoPositionVector()
    return newR    
  }

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
        box.velocity[0] += gravity[0]
        box.velocity[1] += gravity[1]
        box.velocity[2] += gravity[2]
      }

      // 位置の更新
      box.position[0] += box.velocity[0]
      box.position[1] += box.velocity[1]
      box.position[2] += box.velocity[2]

      // クォータイオンの更新
      box.quaternion = box.quaternion.dot(box.quatVelocity)
      box.quaternion.standardization()

      //頂点の更新
      box.updateVertexPositions()      
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
