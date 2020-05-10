export default class BoxConfig {
  constructor(
    sizeX = 1,
    sizeY = 1,
    sizeZ = 1,
    initialPositionX = 0,
    initialPositionY = 0,
    initialPositionZ = 0,
    initialLotationX = 0,
    initialLotationY = 0,
    initialLotationZ = 0,
    fixed = false,
  ) {
    this.size = [sizeX, sizeY, sizeZ]
    this.initialPosition = [initialPositionX, initialPositionY, initialPositionZ]
    this.initialLotation = [initialLotationX, initialLotationY, initialLotationZ]
    this.initialVelocity = [0, 0, 0]
    this.standardLotVelocity = 0.03
    this.initialLotVelocity = [0, 0, 0]
    this.standardVelocity = 0.03
    this.fixed = fixed
  }
}
