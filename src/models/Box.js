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
    this.vertexPosition = [
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
    const p0 = {value : new Vector(box.position),vertexIndexes : [0, 0]} // p0はboxの重心を使うことにする
    const v1 = p0.value.negate()
    const supportA1 = this.localSupportMapping(v1)
    const supportB1 = box.relativeSupportMapping(this.position, this.quaternion, p0)
    const p1 = {value : supportA1.value.sub(supportB1.value),
       vertexIndexes : [supportA1.index, supportB1.index]
      }

    if (v1.dot(p1.value) < 0) {
      return {value : false, vertexIndexes : null}
    }
    const v2 = Vector.verticalVector2(p0, p1)
    const supportA2 = this.localSupportMapping(v2)
    const supportB2 = box.relativeSupportMapping(this.position, this.quaternion, v2.negate())
    const p2 = {value : supportA2.value.sub(supportB2.value),
       vertexIndexes : [supportA2.index, supportB2.index]
      }

    if (v2.dot(p2.value) < 0) {
      return {value : false, vertexIndexes : null}
    }
    let vectors = [p0, p1, p2]
    let clash = {}
    while (true) {
      const vertical = Vector.verticalVector3(
        vectors[0].value,
        vectors[1].value,
        vectors[2].value)
      const supportAN = this.localSupportMapping(vertical)
      const supportBN = box.relativeSupportMapping(this.position,this.quaternion,vertical.negate())
      const newP = {value : supportAN.value.sub(supportBN.value),
         vertexIndexes : [supportAN.index, supportBN.index]
        }

      if (vertical.dot(newP.value) < 0) {
        clash.value = false
        clash.vertexIndexes = null
        break
      }
      vectors.push(newP)
      vectors = vectors.filter((v, i, array) => {
        // vが他の3ベクトルの平面の向こう側かどうかを調べる
        // 全て手前なら原点は四面体の内部なので衝突
        // vが原点と平面に存在することはない(もしあれば5行上でreturn falseしている)
        const triangle = array.filter((item, index) => index !== i)
        const vertical3 = Vector.verticalVector3(
          triangle[0].value, 
          triangle[1].value, 
          triangle[2].value
          )
        if(vertical3.dot(v.value) > 0) return v
      })

      if (vectors.length === 4) {
        clash.value = true
        clash.vertexIndexes = [
          vectors[0].vertexIndexes,
          vectors[1].vertexIndexes,
          vectors[2].vertexIndexes,
          vectors[3].vertexIndexes]
        break
      }
    }

    return clash
  }

  // position, quaternionの位置・姿勢から見た相対座標においてvector方向のthisのサポート写像を返す
  // params position: Array[x, y, z]
  // params quaternion: Quaternion
  // params vector: Vector
  // return Vector
  relativeSupportMapping = (position, quaternion, vector) => {
    // 全頂点とvectorの内積が最大の頂点のベクトルを返す
    const relativeVertex = this.getRelativeVertexPositions(position, quaternion)
    const dotProducts = relativeVertex.map(vertex =>
      vector.dot(new Vector(vertex))
    )
    const i = dotProducts.indexOf(Math.max(...dotProducts))
    return {value : new Vector(relativeVertex[i]), index : i}
  }

  // ローカル座標においてvector方向のthisのサポート写像を返す
  // params vector: Vector
  // return Vector
  localSupportMapping = vector => {
    // 全頂点とvectorの内積が最大の頂点のベクトルを返す
    const localVertexes = this.getLocalVertexPositions()
    const dotProducts = localVertexes.map(vertex =>
      vector.dot(new Vector(vertex))
    )
    const i = dotProducts.indexOf(Math.max(...dotProducts))
    return {value : new Vector(localVertexes[i]), index : i}
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

  // position, quaternionの位置・姿勢から見たthisの頂点の相対座標を返す
  // params box: models/Box
  // return Array[Array]
  getRelativeVertexPositions = (position, quaternion) => {
    let nVertexPosition = []
    for (let i = 0; i < 8; i++) {
      let vertexTranslation = this.vertexPosition[i].map((element, index) => {
        return element - position[index]
      })
      let mVertexPosition = Calculation.inverseRotationalTranslate(
        quaternion,
        vertexTranslation
      )
      nVertexPosition.push(mVertexPosition)
    }
    return nVertexPosition
  }

  // vertexPositionを更新する
  updateVertexPositions = () => {
    let localVertexPosition = this.getLocalVertexPositions()

    let nVertexPosition = []
    for (let i = 0; i < 8; i++) {
      let vertexTranslation = Calculation.rotationalTranslate(
        this.quaternion,
        localVertexPosition[i]
      ).map((element, index) => this.position[index] + element)
      nVertexPosition.push(vertexTranslation)
    }

    this.vertexPosition = nVertexPosition
  }
}
