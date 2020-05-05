export default class Box {
  constructor(
    positionX = 0,
    positionY = 0,
    positionZ = 0,
    lotationX = 0,
    lotationY = 0,
    lotationZ = 0,
  ) {
    this.position = [positionX, positionY, positionZ]
    this.lotation = [lotationX, lotationY, lotationZ]
  }
}
