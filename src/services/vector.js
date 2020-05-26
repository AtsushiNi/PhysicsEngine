export default class Vector {
  constructor(value) {
    this.value = value
  }

  // メソッド名はthree.jsのvector3に参考にしている

  // このベクトルを返す
  // return Array[3]
  getValue = () => this.value

  // 逆向きのベクトルを返す
  // return Vector
  negate = () => new Vector([-this.value[0], -this.value[1], -this.value[2]])

  // vectorを足したものを返す
  // params vector: Vector
  // return Vector
  add = vector => {
    return new Vector([
      this.value[0] + vector.getValue()[0],
      this.value[1] + vector.getValue()[1],
      this.value[2] + vector.getValue()[2],
    ])
  }

  // vectorを引いたものを返す
  // params vector: Vector
  // return Vector
  sub = vector => {
    return new Vector([
      this.value[0] - vector.getValue()[0],
      this.value[1] - vector.getValue()[1],
      this.value[2] - vector.getValue()[2],
    ])
  }
  // n倍したベクトルを返す
  // params n: Number
  // return Vector
  multiplyScalar = n => {
    return new Vector([this.value[0] * n, this.value[1] * n, this.value[2] * n])
  }

  // vectorとの内積を返す
  // params vector: Vector
  // return Number
  dot = vector => {
    const callback = (sum, component, i) => (sum + component * vector.getValue()[i])
    return this.value.reduce(callback, 0)
  }

  // vectorとの外積を返す
  // params vector: Vector
  // return Vector
  cross = vector => {
    const vectorValue = vector.getValue()
    return new Vector([
      this.value[1] * vectorValue[2] - this.value[2] * vectorValue[1],
      this.value[2] * vectorValue[0] - this.value[0] * vectorValue[2],
      this.value[0] * vectorValue[1] - this.value[1] * vectorValue[0],
    ])
  }

  // 絶対値の二乗を返す
  // return Number
  squaredLength = () => {
    return (
      this.value[0] * this.value[0] +
      this.value[1] * this.value[1] +
      this.value[2] * this.value[2]
    )
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
    let vertical = vectorB.sub(vectorA).cross(vectorC.sub(vectorA))
    if (vertical.dot(vectorA) > 0) {
      vertical = vertical.negate()
    }

    return vertical
  }
}
