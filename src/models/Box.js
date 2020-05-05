export default class Box {
  constructor(
    positionX = 0,
    positionY = 0,
    positionZ = 0,
    lotationX = 0,
    lotationY = 0,
    lotationZ = 0,
    velocityX = 0,
    velocityY = 0,
    velocityZ = 0,
    lotVelocityX = 0,
    lotVelocityY = 0,
    lotVelocityZ = 0
  ) {
    this.position = [positionX, positionY, positionZ]
    this.lotation = [lotationX, lotationY, lotationZ]
    this.velocity = [velocityX, velocityY, velocityZ]
    this.lotVelocity = [lotVelocityX, lotVelocityY, lotVelocityZ]
  }
}
