import Box from '../models/Box.js'

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

  //位置ベクトルをクォータニオンに変換
  static positionVectortoQuaternion(r) {
    const positionVector = [0, r[0], r[1], r[2]]
    return positionVector
  }
  //角速度ベクトルをクォータニオンに変換
  static angularVelocityVectortoQuaternion(w){
    const absoluteW = Math.sqrt(w[0] * w[0] + w[1] * w[1] + w[2] * w[2])
    const quatVelocity = [Math.cos(absoluteW / 2),
                          w[0] * Math.sin(absoluteW / 2) / absoluteW,
                          w[1] * Math.sin(absoluteW / 2) / absoluteW, 
                          w[2] * Math.sin(absoluteW / 2) / absoluteW]
    return quatVelocity
  }

  //共役なクォータニオン
  static conjugateQuaternion(q){
    let conjugateQuaternion = [q[0], -q[1], -q[2], -q[3]]
    return conjugateQuaternion
  }

  //回転移動
  static rotationalTranslate(q, r){
    let quaternionR = this.positionVectortoQuaternion(r)
    let conjugateQuaternion = this.conjugateQuaternion(q)
    let newQuaternionR = this.quatCalcuration(this.quatCalcuration(q, quaternionR), conjugateQuaternion)
    let newR = [newQuaternionR[1], newQuaternionR[2], newQuaternionR[3]]
    return newR
  }

  //逆回転移動
  static inverseRotationalTranslate(q, r){
    let quaternionR = this.positionVectortoQuaternion(r)
    let conjugateQuaternion = this.conjugateQuaternion(q)
    let newQuaternionR = this.quatCalcuration(this.quatCalcuration(conjugateQuaternion, quaternionR), q)
    let newR = [newQuaternionR[1], newQuaternionR[2], newQuaternionR[3]]
    return newR
  }

  //各boxの頂点を求める(移動後)
  static vertexPosition(box){
    box.vertexPosition = Box.getLocalVertexPositions()
    let nVertexPosition = []
    for(let i = 0; i < 8; i++){
      let mVertexPosition = this.rotationalTranslate(box.quaternion, box.vertexPosition[i])
      let vertexTranslation = mVertexPosition.map((element, index) => {
        return box.position[index] + element
      })
      nVertexPosition.push(vertexTranslation)
    }
    return nVertexPosition
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
      box.vertexPosition = this.vertexPosition(box)      
    })
  }

  static resetValues = (boxes, boxConfigs) => {
    boxes.forEach((box, index) => {
      box.position[0] = boxConfigs[index].initialPosition[0]
      box.position[1] = boxConfigs[index].initialPosition[1]
      box.position[2] = boxConfigs[index].initialPosition[2]
      box.rotation[0] = boxConfigs[index].initialRotation[0]
      box.rotation[1] = boxConfigs[index].initialRotation[1]
      box.rotation[2] = boxConfigs[index].initialRotation[2]
      box.velocity[0] = boxConfigs[index].initialVelocity[0]
      box.velocity[1] = boxConfigs[index].initialVelocity[1]
      box.velocity[2] = boxConfigs[index].initialVelocity[2]
      box.rotVelocity[0] = boxConfigs[index].initialRotVelocity[0]
      box.rotVelocity[1] = boxConfigs[index].initialRotVelocity[1]
      box.rotVelocity[2] = boxConfigs[index].initialRotVelocity[2]
      var initialQuaternion = this.eulerToQuaternion(boxConfigs[index].initialRotation)
      box.quaternion[0] = initialQuaternion[0]
      box.quaternion[1] = initialQuaternion[1]
      box.quaternion[2] = initialQuaternion[2]
      box.quaternion[3] = initialQuaternion[3]
    })
  }
}

export default Calculation
