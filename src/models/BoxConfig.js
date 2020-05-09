export default class BoxConfig {
  constructor(
    height = 1,
    width = 1,
    depth = 1,
    initialPositionX = 0,
    initialPositionY = 0,
    initialPositionZ = 0,
    initialLotationX = 0,
    initialLotationY = 0,
    initialLotationZ = 0,
    fixed = false,
  ) {
    this.height = height
    this.width = width
    this.depth = depth
    this.initialPosition = [initialPositionX, initialPositionY, initialPositionZ]
    this.initialLotation = [initialLotationX, initialLotationY, initialLotationZ]
    this.fixed = fixed
  }
}
