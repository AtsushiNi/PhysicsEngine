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
    quaternionW = 1,
    quaternionX = 0,
    quaternionY = 0,
    quaternionZ = 0,
    quatVelocityW = 0,
    quatVelocityX = 0,
    quatVelocityY = 0,
    quatVelocityZ = 0,
    vertexPosition1 = [0, 0, 0],
    vertexPosition2 = [0, 0, 0],
    vertexPosition3 = [0, 0, 0],
    vertexPosition4 = [0, 0, 0],
    vertexPosition5 = [0, 0, 0],
    vertexPosition6 = [0, 0, 0],
    vertexPosition7 = [0, 0, 0],
    vertexPosition8 = [0, 0, 0]
    
  ) {
    this.position = [positionX, positionY, positionZ]
    this.lotation = [lotationX, lotationY, lotationZ]
    this.velocity = [velocityX, velocityY, velocityZ]
    this.lotVelocity = [lotVelocityX, lotVelocityY, lotVelocityZ]
    this.quaternion = [quaternionW, quaternionX, quaternionY, quaternionZ]
    this.quatVelocity = [quatVelocityW, quatVelocityX, quatVelocityY, quatVelocityZ]
    this.vertexPosition = [vertexPosition1, vertexPosition2, vertexPosition3, vertexPosition4, vertexPosition5, vertexPosition6, vertexPosition7, vertexPosition8]
  }
}
