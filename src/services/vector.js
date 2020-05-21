export default class Vector {
  constructor(value) {
    this.value = value
  }

  // このベクトルを返す
  getValue = () => {
    this.value
  }

  // vectorとの内積を返す
  dot = (vector) => {
    const callback = (sum, component, i) => component * vector[i]
    this.value.reduce(callback)
  }

}
