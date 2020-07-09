export default class Vector {
  constructor(value) {
    this.value = value
  }

  // メソッド名はthree.jsのvector3に参考にしている

  // このベクトルを返す
  // return Array[3]
  getValue = () => this.value

  // 同じベクトルかどうかを返す
  // params vector: Vector
  // return boolean
  equal = vector => {
    return (
      this.value[0] === vector.value[0] &&
      this.value[1] === vector.value[1] &&
      this.value[2] === vector.value[2]
    )
  }

  // このベクトルがゼロベクトルかどうかを返す
  // return boolean
  isZero = () => {
    return this.value[0] === 0 && this.value[1] === 0 && this.value[2] === 0
  }

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
    const callback = (sum, component, i) =>
      sum + component * vector.getValue()[i]
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
  // vectorA, vectorBとの内積が共に負の方向のベクトルを返す
  // 大きさは1とは限らない
  // params vectorA: Vector
  // params vectorB: Vector
  // return Vector
  static verticalVector2 = (vectorA, vectorB) => {
    // vectorA = vectorBのときは、vectorAの逆ベクトルを返す
    if (vectorA.equal(vectorB)) {
      return vectorA.negate()
    }

    // vectorA, vectorBを1-s:sで内分した点から0ベクトルへむかうベクトルを計算する
    const s =
      vectorB.sub(vectorA).dot(vectorB) / vectorB.sub(vectorA).squaredLength()
    const vertical = vectorA
      .multiplyScalar(-s)
      .add(vectorB.multiplyScalar(s - 1))

    return vertical
  }

  // vectorA, vectorB, vectorCの作る面に垂直で0ベクトルを通るベクトルを返す
  // vectorA, vectorB, vectorCとの内積が全て負の方向のベクトルを返す
  // 大きさは1とは限らない
  // params vectorA: Vector
  // params vectorB: Vector
  // params vectorC: Vector
  // return Vector
  static verticalVector3 = (vectorA, vectorB, vectorC) => {
    // vectorA, vectorB, vectorCのうち、等しいものがあった時の処理
    if (vectorA.equal(vectorB)) {
      return Vector.verticalVector2(vectorB, vectorC)
    } else if (vectorB.equal(vectorC)) {
      return Vector.verticalVector2(vectorC, vectorA)
    } else if (vectorC.equal(vectorA)) {
      return Vector.verticalVector2(vectorA, vectorB)
    }

    let vertical = vectorB.sub(vectorA).cross(vectorC.sub(vectorA))
    if (vertical.dot(vectorA) > 0) {
      vertical = vertical.negate()
    }

    return vertical
  }
}
