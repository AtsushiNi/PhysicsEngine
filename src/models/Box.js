import Vector from '../services/vector'
import Calculation from '../services/Calculation.js'
import Quaternion from '../services/quaternion'

export default class Box {
  constructor(sizeX = 1, sizeY = 1, sizeZ = 1) {
    this.size = [sizeX, sizeY, sizeZ]
    this.position = [0, 0, 0]
    this.rotation = [0, 0, 0]
    this.velocity = [0, 0, 0]
    this.rotVelocity = [0, 0, 0]
    this.quaternion = new Quaternion([1, 0, 0, 0])
    this.quatVelocity = new Quaternion([1, 0, 0, 0])
  }

  // boxと衝突しているかを調べる
  // params box: models/Box
  isClash = box => {
    // https://trap.jp/post/198/ GJKアルゴリズム 3次元の場合を参照
    const p0 = new Vector(box.position) // p0はboxの重心を使うことにする
    const v1 = p0.negate()
    const p1 = this.localSupportMapping(v1).sub(box.relativeSupportMapping(p0)) // v1方向の、ミンコフスキー差のサポート写像
    if (v1.dot(p1) < 0) {
      return false
    }
    const v2 = Vector.verticalVector2(p0, p1)
    const p2 = this.localSupportMapping(v2).sub(
      box.relativeSupportMapping(v2.negate())
    )
    if (v2.dot(p2) < 0) {
      return false
    }

    let vectors = [p0, p1, p2]
    let clash = false
    while (true) {
      const vertical = Vector.verticalVector3(...vectors)
      const newP = this.localSupportMapping(vertical).sub(
        box.relativeSupportMapping(vertical.negate())
      )
      if (vertical.dot(newP) < 0) {
        clash = false
        break
      }
      vectors.push(newP)
      vectors = vectors.filter((v, i, array) => {
        // vが他の3ベクトルの平面の向こう側かどうかを調べる
        // 全て手前なら原点は四面体の内部なので衝突
        // vが原点と平面に存在することはない(もしあれば5行上でreturn falseしている)
        const triangle = array.filter((item, index) => index !== i)
        const vertical3 = Vector.verticalVector3(...triangle)

        return vertical3.dot(v) > 0
      })

      if (vectors.length == 4) {
        clash = true
        break
      }
    }

    return clash
  }

  // グローバル座標においてvector方向のサポート写像を返す
  // params vector: Vector
  // return Vector
  relativeSupportMapping = vector => {
    // 全頂点とvectorの内積が最大の頂点のベクトルを返す
    const relativeVertex = this.getRelativeVertexPositions()
    const dotProducts = relativeVertex.map(vertex =>
      vector.dot(new Vector(vertex))
    )
    const i = dotProducts.indexOf(Math.max(...dotProducts))
    return new Vector(relativeVertex[i])
  }

  // ローカル座標においてvector方向のサポート写像を返す
  // params vector: Vector
  // return Vector
  localSupportMapping = vector => {
    // 全頂点とvectorの内積が最大の頂点のベクトルを返す
    const localVertexes = this.getLocalVertexPositions()
    const dotProducts = localVertexes.map(vertex =>
      vector.dot(new Vector(vertex))
    )
    const i = dotProducts.indexOf(Math.max(...dotProducts))
    return new Vector(localVertexes[i])
  }

  // ローカル座標での頂点の座標を返す
  // TODO ちゃんと実装する
  // return Array[Array]
  getLocalVertexPositions = () => {
    return [

      [this.size[0] / 2, this.size[1] / 2, this.size[2] / 2],
      [this.size[0] / 2, this.size[1] / 2, -this.size[2] / 2],
      [this.size[0] / 2, -this.size[1] / 2, this.size[2] / 2],
      [this.size[0] / 2, -this.size[1] / 2, -this.size[2] / 2],
      [-this.size[0] / 2, this.size[1] / 2, this.size[2] / 2],
      [-this.size[0] / 2, this.size[1] / 2, -this.size[2] / 2],
      [-this.size[0] / 2, -this.size[1] / 2, this.size[2] / 2],
      [-this.size[0] / 2, -this.size[1] / 2, -this.size[2] / 2],
    ]
  }

  // グローバル座標での頂点の座標を返す
  // TODO ちゃんと実装する
  // return Array[Array]
  getRelativeVertexPositions = box => {
    let nVertexPosition = []
    for(let i = 0; i < 8; i++){
      let vertexTranslation = box.vertexPosition[i].map((element, index) => {
        return element - this.position[index]
      })
      let mVertexPosition = Calculation.inverseRotationalTranslate(this.quaternion, vertexTranslation)
      nVertexPosition.push(mVertexPosition)
    }
    return nVertexPosition
  }
}
