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
    lotVelocityZ = 0,
    quaternionW =0,
    quaternionX =0,
    quaternionY =0,
    quaternionZ =0,
    quatVelocityW = 0,
    quatVelocityX = 0,
    quatVelocityY = 0,
    quatVelocityZ = 0,
    
  ) {
    this.position = [positionX, positionY, positionZ]
    this.lotation = [lotationX, lotationY, lotationZ]
    this.velocity = [velocityX, velocityY, velocityZ]
    this.lotVelocity = [lotVelocityX, lotVelocityY, lotVelocityZ]
    this.quaternion = [quaternionW, quaternionX, quaternionY, quaternionZ]
    this.quatVelocity = [quatVelocityW, quatVelocityX, quatVelocityY, quatVelocityZ]
  }
}
