export default class Quaternion {
  constructor(value) {
    this.value = value
  }

  // クォータニオンのクラス
  // this.valueは配列[w, x, y, z]を格納している

  // このクォータニオンを返す
  // return Quaternion
  getValue = () => this.value

  // quaternionを右から掛ける
  // params quaternion: Quaternion
  // return Quaternion
  dot = quaternion => {
    let newQuaternion = [0, 0, 0, 0]
    const q = this.getValue()
    const p = quaternion.getValue()

    newQuaternion[0] = q[0] * p[0] - q[1] * p[1] - q[2] * p[2] - q[3] * p[3]
    newQuaternion[1] = q[1] * p[0] + q[0] * p[1] - q[3] * p[2] + q[2] * p[3]
    newQuaternion[2] = q[2] * p[0] + q[3] * p[1] - q[0] * p[2] - q[1] * p[3]
    newQuaternion[3] = q[3] * p[0] - q[2] * p[1] + q[1] * p[2] - q[0] * p[3]

    return new Quaternion(newQuaternion)
  }

  // 正規化
  standardization = () => {
    const absolute = Math.sqrt(Math.pow(this.value[0], 2) + Math.pow(this.value[1], 2) + Math.pow(this.value[2], 2) + Math.pow(this.value[3], 2))

    this.value = this.value.map(element => element / absolute)
  }

  // 共役なクォータニオン
  // return Quaternion
  conjugateQuaternion = () => {
    let conjugateQuaternion = [this.value[0], -this.value[1], -this.value[2], -this.value[3]]
    return new Quaternion(conjugateQuaternion)
  }

  // 位置ベクトルをクォータニオンに変換
  // params r: 位置ベクトル[x, y, z]
  // return Quaternion
  static positionVectortoQuaternion = r => {
    const positionVector = [0, r[0], r[1], r[2]]
    return new Quaternion(positionVector)
  }

  // クォータニオンから位置ベクトルの配列に変換
  // return Array[number]
  quaterniontoPositionVector = () =>{
    const r = [this.value[1], this.value[2], this.value[3]]
    return r
  }

  // 今のところ使っていないのでコメントアウト
  // 角速度ベクトルをクォータニオンに変換
//angularVelocityVectortoQuaternion = w =>{
//  const absoluteW = Math.sqrt(w[0] * w[0] + w[1] * w[1] + w[2] * w[2])
//  const quatVelocity = [Math.cos(absoluteW / 2),
//                        w[0] * Math.sin(absoluteW / 2) / absoluteW,
//                        w[1] * Math.sin(absoluteW / 2) / absoluteW,
//                        w[2] * Math.sin(absoluteW / 2) / absoluteW]
//  return new Quaternion(quatVelocity)
//}

  // オイラー角を返す
  // https://www.kazetest.com/vcmemo/quaternion/quaternion.htm
  // return Array[x, y, z]
  toEuler = () => {
    const q = this.getValue()

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

  // 今のところ使っていないのでコメントアウト
  // 回転行列からクォータニオンを作る
  // params matrix: 回転行列(3x3配列)
  // return Quaternion
  // static fromRotationMatrix = matrix => {
  //   let w =
  //     Math.sqrt(matrix[0][0] + matrix[1][1] + matrix[2][2] + 1) / 2
  //   let x =
  //     Math.sqrt(matrix[0][0] - matrix[1][1] - matrix[2][2] + 1) / 2
  //   let y =
  //     Math.sqrt(-matrix[0][0] + matrix[1][1] - matrix[2][2] + 1) / 2
  //   let z =
  //     Math.sqrt(-matrix[0][0] - matrix[1][1] + matrix[2][2] + 1) / 2
  //   const maxComponent = Math.max(w, x, y, z)

  //   if (maxComponent === x) {
  //     y = (matrix[0][1] + matrix[1][0]) / (4 * x)
  //     z = (matrix[2][0] + matrix[0][2]) / (4 * x)
  //     w = (matrix[1][2] - matrix[2][1]) / (4 * x)
  //   } else if (maxComponent === y) {
  //     z = (matrix[1][2] + matrix[2][1]) / (4 * y)
  //     x = (matrix[0][1] + matrix[1][0]) / (4 * y)
  //     w = (matrix[2][0] - matrix[0][2]) / (4 * y)
  //   } else if (maxComponent === z) {
  //     x = (matrix[2][0] + matrix[0][2]) / (4 * z)
  //     y = (matrix[1][2] + matrix[2][1]) / (4 * z)
  //     w = (matrix[0][1] - matrix[1][0]) / (4 * z)
  //   } else {
  //     x = (matrix[1][2] - matrix[2][1]) / (4 * w)
  //     y = (matrix[2][0] - matrix[0][2]) / (4 * w)
  //     z = (matrix[0][1] - matrix[1][0]) / (4 * w)
  //   }

  //   return new Quaternion([w, x, y, z])
  // }

  // オイラー角からクォータニオンを得る
  // https://www.kazetest.com/vcmemo/quaternion/quaternion.htm
  // params euler: オイラー角[x, y, z]
  // return Quaternion
  static fromEuler = euler => {
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

    const quaternion = new Quaternion([
      cos[0] * cos[1] * cos[2] + sin[0] * sin[1] * sin[2],
      sin[0] * cos[1] * cos[2] - cos[0] * sin[1] * sin[2],
      cos[0] * sin[1] * cos[2] + sin[0] * cos[1] * sin[2],
      cos[0] * cos[1] * sin[2] - sin[0] * sin[1] * cos[2],
    ])

    return quaternion
  }
}
