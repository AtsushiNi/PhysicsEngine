export default class Vector {
  constructor(value) {
    this.value = value
  }

  // このベクトルを返す
  // return Array[3]
  getValue = () => {
    this.value
  }

  // vectorとの内積を返す
  // params vector: Vector
  // return Number
  dot = (vector) => {
    const callback = (sum, component, i) => component * vector[i]
    this.value.reduce(callback)
  }

}
