export default class Vector {
  constructor(value) {
    this.value = value
  }

  // メソッド名はthree.jsのvector3に参考にしている

  // このベクトルを返す
  // return Array[3]
  getValue = () => {
    this.value
  }

  // 逆向きのベクトルを返す
  // return Vector
  negate = () => {
    new Vector([-this.value[0], -this.value[1], -this.value[2]])
  }

  // n倍したベクトルを返す
  // params n: Number
  // return Vector
  multiplyScalar = n => {
    new Vector([this.value[0] * n, this.value[1] * n, this.value[2] * n])
  }

  // vectorとの内積を返す
  // params vector: Vector
  // return Number
  dot = vector => {
    const callback = (sum, component, i) => sum += component * vector[i]
    this.value.reduce(callback)
  }

  // 絶対値の二乗を返す
  // return Number
  squaredLength = () => {
    this.value[0] * this.value[0] +
      this.value[1] * this.value[1] +
      this.value[2] * this.value[2]
  }

  // vectorA-vectorBに垂直で0ベクトルを通るベクトルを返す
  // params vectorA: Vector
  // params vectorB: Vector
  // return Vector
  static verticalVector2 = (vectorA, vectorB) => {
    // vectorA, vectorBを1-s:sで内分した点から0ベクトルへむかうベクトルを計算する
    const s =
      vectorB.sub(vectorA).dot(vectorB) / vectorB.sub(vectorA).squaredLength()
    const vertical = vectorA
      .multiplyScalar(-s)
      .add(vectorB.multiplyScalar(s - 1))

    return vertical
  }

  // vectorA, vectorB, vectorCに垂直で0ベクトルを通るベクトルを返す
  // params vectorA: Vector
  // params vectorB: Vector
  // params vectorC: Vector
  // return Vector
  static verticalVector3 = (vectorA, vectorB, vectorC) => {
    let vertical = vectorB.nimus(vectorA).cross(vectorC.minus(vectorA))
    if (vertical.dot(vectorA) > 0) {
      vertical = vertical.negate
    }

    return vertical
  }
}
