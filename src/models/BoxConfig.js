export default class BoxConfig {
  constructor(sizeX = 1, sizeY = 1, sizeZ = 1) {
    this.size = [sizeX, sizeY, sizeZ]
    this.initialPosition = [0, 0, 0]
    this.initialRotation = [0, 0, 0]
    this.initialVelocity = [0, 0, 0]
    this.standardRotVelocity = 0.03
    this.initialRotVelocity = [0, 0, 0]
    this.standardVelocity = 0.03
    this.fixed = false
  }
}
