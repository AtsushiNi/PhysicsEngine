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
    this.vertexPositions = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
  }

  // boxと衝突しているかを調べる
  // params box: models/Box
  isClash = box => {
    // https://trap.jp/post/198/ GJKアルゴリズム 3次元の場合を参照
    let p0 = new Vector(box.position) // p0はboxの重心を使うことにする
    if (p0.isZero()) {
      p0 = new Vector(box.vertexPositions[0])
    }

    const v1 = p0.negate()
    const p1 = this.supportMapping(v1).sub(box.supportMapping(p0)) // v1方向の、ミンコフスキー差のサポート写像
    if (v1.dot(p1) < 0) {
      return false
    }
    const v2 = Vector.verticalVector2(p0, p1)
    const p2 = this.supportMapping(v2).sub(box.supportMapping(v2.negate()))
    if (v2.dot(p2) < 0) {
      return false
    }

    let vectors = [p0, p1, p2]
    let clash = false
    while (true) {
      // vectorsに0ベクトルが含まれているとバグる可能性があるので即trueを返す
      if (vectors.some(vector => vector.isZero())) {
        clash = true
        break
      }

      const vertical = Vector.verticalVector3(...vectors)
      const newP = this.supportMapping(vertical).sub(
        box.supportMapping(vertical.negate())
      )

      if (newP.isZero()) {
        clash = true
        break
      }

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

        return vertical3.dot(v) >= 0
      })

      if (vectors.length === 4) {
        clash = true
        break
      }
    }

    return clash
  }

  // thisに関して、vector方向のサポート座標(vector方向に一番遠い頂点の座標)を返す
  // params vector: Vector
  // return Vector
  supportMapping = vector => {
    // 全頂点とvectorの内積が最大の頂点のベクトルを返す
    const dotProducts = this.vertexPositions.map(vertexPosition =>
      vector.dot(new Vector(vertexPosition))
    )
    const i = dotProducts.indexOf(Math.max(...dotProducts))
    return new Vector(this.vertexPositions[i])
  }

  // ローカル座標での頂点の座標を返す
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

  // vertexPositionsを更新する
  updateVertexPositions = () => {
    let localVertexPositions = this.getLocalVertexPositions()

    let nVertexPositions = []
    for (let i = 0; i < 8; i++) {
      let vertexTranslation = Calculation.rotationalTranslate(
        this.quaternion,
        localVertexPositions[i]
      ).map((element, index) => this.position[index] + element)
      nVertexPositions.push(vertexTranslation)
    }

    this.vertexPositions = nVertexPositions
  }
}
