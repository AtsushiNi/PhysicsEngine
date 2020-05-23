class Calculation {
  static innerProductMatrix(matrixA, matrixB) {
    const newMatrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          newMatrix[i][j] = matrixA[i][k] * matrixB[k][j]
        }
      }
    }
    return newMatrix
  }

  //内因性オイラー角(x→y→z)から回転行列への変換
  static eulerAngletoRotMatrix(lotx, loty, lotz) {
    const rotMatrix = [
      [
        Math.cos(loty) * Math.cos(lotz),
        Math.sin(lotx) * Math.sin(loty) * Math.cos(lotz) -
          Math.cos(lotx) * Math.sin(lotz),
        Math.cos(lotx) * Math.sin(loty) * Math.cos(lotz) +
          Math.sin(lotx) * Math.sin(lotz),
      ],
      [
        Math.cos(loty) * Math.sin(lotz),
        Math.sin(lotx) * Math.sin(loty) * Math.sin(lotz) +
          Math.cos(lotx) * Math.cos(lotz),
        Math.cos(lotx) * Math.sin(loty) * Math.sin(lotz) -
          Math.sin(lotx) * Math.cos(lotz),
      ],
      [
        -Math.sin(loty),
        Math.sin(lotx) * Math.cos(loty),
        Math.cos(lotx) * Math.cos(loty),
      ],
    ]
    return rotMatrix
  }

  //回転行列からクォータニオンへの変換
  static rotMatrixtoQuaternion(rotMatrix) {
    const quaternion = [0, 0, 0, 0]
    let w =
      Math.sqrt(rotMatrix[0][0] + rotMatrix[1][1] + rotMatrix[2][2] + 1) / 2
    let x =
      Math.sqrt(rotMatrix[0][0] - rotMatrix[1][1] - rotMatrix[2][2] + 1) / 2
    let y =
      Math.sqrt(-rotMatrix[0][0] + rotMatrix[1][1] - rotMatrix[2][2] + 1) / 2
    let z =
      Math.sqrt(-rotMatrix[0][0] - rotMatrix[1][1] + rotMatrix[2][2] + 1) / 2
    const maxComponent = Math.max(w, x, y, z)

    if (maxComponent === x) {
      y = (rotMatrix[0][1] + rotMatrix[1][0]) / (4 * x)
      z = (rotMatrix[2][0] + rotMatrix[0][2]) / (4 * x)
      w = (rotMatrix[1][2] - rotMatrix[2][1]) / (4 * x)
    } else if (maxComponent === y) {
      z = (rotMatrix[1][2] + rotMatrix[2][1]) / (4 * y)
      x = (rotMatrix[0][1] + rotMatrix[1][0]) / (4 * y)
      w = (rotMatrix[2][0] - rotMatrix[0][2]) / (4 * y)
    } else if (maxComponent === z) {
      x = (rotMatrix[2][0] + rotMatrix[0][2]) / (4 * z)
      y = (rotMatrix[1][2] + rotMatrix[2][1]) / (4 * z)
      w = (rotMatrix[0][1] - rotMatrix[1][0]) / (4 * z)
    } else {
      x = (rotMatrix[1][2] - rotMatrix[2][1]) / (4 * w)
      y = (rotMatrix[2][0] - rotMatrix[0][2]) / (4 * w)
      z = (rotMatrix[0][1] - rotMatrix[1][0]) / (4 * w)
    }

    quaternion[0] = w
    quaternion[1] = x
    quaternion[2] = y
    quaternion[3] = z

    return quaternion
  }

  // オイラー角[x, y, z]からクォータニオン[w, x, y, z]を得る
  // https://www.kazetest.com/vcmemo/quaternion/quaternion.htm
  static eulerToQuaternion(euler) {
    const sin = [
      Math.sin(euler[0] / 2),
      Math.sin(euler[1] / 2),
      Math.sin(euler[2] / 2),
    ]
    const cos = [
      Math.cos(euler[0] / 2),
      Math.cos(euler[1] / 2),
      Math.cos(euler[2] / 2),
    ]

    const quaternion = [
      cos[0] * cos[1] * cos[2] + sin[0] * sin[1] * sin[2],
      sin[0] * cos[1] * cos[2] - cos[0] * sin[1] * sin[2],
      cos[0] * sin[1] * cos[2] + sin[0] * cos[1] * sin[2],
      cos[0] * cos[1] * sin[2] - sin[0] * sin[1] * cos[2],
    ]

    return quaternion
  }

  // クォータニオン[w, x, y, z]からオイラー角[x, y, z]を得る
  // https://www.kazetest.com/vcmemo/quaternion/quaternion.htm
  static quaternionToEuler(q) {
    const euler = [
      Math.atan2(
        2 * q[2] * q[3] + q[0] * q[1],
        q[0] * q[0] - q[1] * q[1] + q[2] * q[2] + q[3] * q[3]
      ),
      Math.asin(2 * (q[0] * q[2] - q[1] * q[3])),
      Math.atan2(
        2 * q[1] * q[2] + q[0] * q[3],
        q[0] * q[0] + q[1] * q[1] - q[2] * q[2] - q[3] * q[3]
      ),
    ]

    return euler
  }

  //クォータニオンの計算:q=[w,x,y,z]
  static quatCalcuration(q, p) {
    const newQuaternion = [0, 0, 0, 0]
    newQuaternion[0] = q[0] * p[0] - q[1] * p[1] - q[2] * p[2] - q[3] * p[3]
    newQuaternion[1] = q[0] * p[1] + q[1] * p[0] + q[2] * p[3] - q[3] * p[2]
    newQuaternion[2] = q[0] * p[2] - q[1] * p[3] + q[2] * p[0] + q[3] * p[1]
    newQuaternion[3] = q[0] * p[3] + q[1] * p[2] - q[2] * p[1] + q[3] * p[0]
    return newQuaternion
  }

  //位置ベクトルをクォータニオンに変換
  static positionVectortoQuaternion(r) {
    const positionVector = [0, r[0], r[1], r[2]]
    return positionVector
  }
  //各速度ベクトルをクォータニオンに変換
  static angularVelocityVectortoQuaternion(w){
    const absoluteW = Math.sqrt(w[0] * w[0] + w[1] * w[1] + w[2] * w[2])
    const quatVelocity = [Math.cos(absoluteW / 2),
                          w[0] * Math.sin(absoluteW / 2) / absoluteW,
                          w[1] * Math.sin(absoluteW / 2) / absoluteW, 
                          w[2] * Math.sin(absoluteW / 2) / absoluteW]
    return quatVelocity
  }
  //各速度ベクトルω=[ω1,ω2,ω3]のときのクォータニオンの更新
  static reminderQuaternion(quaternion, quatVelocity) {
    let newQuaternion = this.quatCalcuration(quaternion, quatVelocity)
    let deltaQuaternion = [0, 0, 0, 0]
    for (let i = 0; i < 4; i++) {
      deltaQuaternion[i] = newQuaternion[i] - quaternion[i]
    }
    return deltaQuaternion
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

  //各boxの頂点を求める(初期状態)＊＊更新前に使う(辺は±１と奇数は＋３、偶数は－３：インデックスで言うと奇数は－３、偶数は＋３)
  static initialVertexPosition(boxes, boxConfigs){
    boxes.forEach((box, index) => {
      box.vertexPosition[0][0] =  boxConfigs[index].size[0] / 2
      box.vertexPosition[0][1] =  boxConfigs[index].size[1] / 2
      box.vertexPosition[0][2] =  boxConfigs[index].size[2] / 2
      box.vertexPosition[1][0] =  boxConfigs[index].size[0] / 2
      box.vertexPosition[1][1] =  boxConfigs[index].size[1] / 2
      box.vertexPosition[1][2] = -boxConfigs[index].size[2] / 2
      box.vertexPosition[2][0] =  boxConfigs[index].size[0] / 2
      box.vertexPosition[2][1] = -boxConfigs[index].size[1] / 2
      box.vertexPosition[2][2] =  boxConfigs[index].size[2] / 2
      box.vertexPosition[3][0] =  boxConfigs[index].size[0] / 2
      box.vertexPosition[3][1] = -boxConfigs[index].size[1] / 2
      box.vertexPosition[3][2] = -boxConfigs[index].size[2] / 2
      box.vertexPosition[4][0] = -boxConfigs[index].size[0] / 2
      box.vertexPosition[4][1] = -boxConfigs[index].size[1] / 2
      box.vertexPosition[4][2] =  boxConfigs[index].size[2] / 2
      box.vertexPosition[5][0] = -boxConfigs[index].size[0] / 2
      box.vertexPosition[5][1] =  boxConfigs[index].size[1] / 2
      box.vertexPosition[5][2] = -boxConfigs[index].size[2] / 2
      box.vertexPosition[6][0] = -boxConfigs[index].size[0] / 2
      box.vertexPosition[6][1] = -boxConfigs[index].size[1] / 2
      box.vertexPosition[6][2] =  boxConfigs[index].size[2] / 2
      box.vertexPosition[7][0] = -boxConfigs[index].size[0] / 2
      box.vertexPosition[7][1] = -boxConfigs[index].size[1] / 2
      box.vertexPosition[7][2] = -boxConfigs[index].size[2] / 2

    })
  }

  //各boxの頂点を求める(移動後)
  static vertexPosition(box){
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
    boxes.forEach((boxA, index) => {
      for (var i = index + 1; boxes.length; i++) {
        const boxB = boxes[i]
        // boxAとboxBの衝突を調べる
        boxA.isClash(boxB)
      }
    })

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
      //クォータニオンの更新
      var deltaQuaternion = Calculation.reminderQuaternion(
        box.quaternion,
        box.quatVelocity
      )
      box.quaternion[0] += deltaQuaternion[0]
      box.quaternion[1] += deltaQuaternion[1]
      box.quaternion[2] += deltaQuaternion[2]
      box.quaternion[3] += deltaQuaternion[3]

      var vertexPosition = this.vertexPosition(box)
      
      console.log(`quaternion:${box.quaternion[0]},${box.quaternion[1]},${box.quaternion[2]},${box.quaternion[3]}`)
      console.log(`quatVelocity:${box.quatVelocity[0]},${box.quatVelocity[1]},${box.quatVelocity[2]}`)
      console.log(`1:${vertexPosition[0][0]},${vertexPosition[0][1]},${vertexPosition[0][2]}`)
      console.log(`6:${vertexPosition[5][0]},${vertexPosition[5][1]},${vertexPosition[5][2]}`)
      console.log(`position:${box.position[0]},${box.position[1]},${box.position[2]}`)
      console.log("**********************************")

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
