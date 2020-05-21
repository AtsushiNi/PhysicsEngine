import Vector from '../services/vector'

export default class Box {
  constructor() {
    this.position = [0, 0, 0]
    this.rotation = [0, 0, 0]
    this.velocity = [0, 0, 0]
    this.rotVelocity = [0, 0, 0]
    this.quaternion = [1, 0, 0, 0]
    this.quatVelocity = [1, 0, 0, 0]
  }

  // boxと衝突しているかを調べる
  // params box: models/Box
  isClash = (box) => {
  }

  // グローバル座標においてvector方向のサポート写像を返す
  // params vector: Vector
  // return Vector
  globalSupportMapping = (vector) => {
    // 全頂点とvectorの内積が最大の頂点のベクトルを返す
    const globalVertexes = this.getGlobalVertexPositions()
    const dotProducts = globalVertexes.map((vertex) => vector.dot(Vector.new(vertex)))
    const i = dotProducts.indexOf(Math.max.apply(null, dotProducts))
    return new Vector(globalVertexes[i])
  }

  // ローカル座標においてvector方向のサポート写像を返す
  // params vector: Vector
  // return Vector
  localSupportMapping = (vector) => {
    // 全頂点とvectorの内積が最大の頂点のベクトルを返す
    const localVertexes = this.getLocalVertexPositions()
    const dotProducts = localVertexes.map((vertex) => vector.dot(Vector.new(vertex)))
    const i = dotProducts.indexOf(Math.max.apply(null, dotProducts))
    return new Vector(localVertexes[i])
  }

  // ローカル座標での頂点の座標を返す
  // TODO ちゃんと実装する
  // return Array[Array]
  getLocalVertexPositions = () => {
    return [
      [1 / 2, 1 / 2, 1 / 2],
      [1 / 2, 1 / 2, -1 / 2],
      [1 / 2, -1 / 2, 1 / 2],
      [1 / 2, -1 / 2, -1 / 2],
      [-1 / 2, 1 / 2, 1 / 2],
      [-1 / 2, 1 / 2, -1 / 2],
      [-1 / 2, -1 / 2, 1 / 2],
      [-1 / 2, -1 / 2, -1 / 2],
    ]
  }

  // グローバル座標での頂点の座標を返す
  // TODO ちゃんと実装する
  // return Array[Array]
  getGlobalVertexPositions = () => {
    const len = Math.sqrt(1 / 2)
    const sin30 = Math.sin(30 * Math.PI / 180)
    const cos30 = Math.cos(30 * Math.PI / 180)
    return [
      [len * cos30, 1 / 2, len * sin30],
      [len * sin30, 1 / 2, -len * cos30],
      [len * cos30, -1 / 2, len * sin30],
      [len * sin30, -1 / 2, -len * cos30],
      [-len * sin30, 1 / 2, len * cos30],
      [-len * cos30, 1 / 2, -len * sin30],
      [-len * sin30, -1 / 2, len * cos30],
      [-len * cos30, -1 / 2, -len * sin30],
    ]
  }
}
