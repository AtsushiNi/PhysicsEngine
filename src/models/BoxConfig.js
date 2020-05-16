export default class BoxConfig {
  constructor(sizeX = 1, sizeY = 1, sizeZ = 1) {
    this.size = [sizeX, sizeY, sizeZ]
    this.initialPosition = [0, 0, 0]
    this.initialRotation = [0, 0, 0]
    this.initialVelocity = [0, 0, 0]
    this.standardLotVelocity = 0.03
    this.initialLotVelocity = [0, 0, 0]
    this.standardVelocity = 0.03
    this.fixed = false
  }
}
