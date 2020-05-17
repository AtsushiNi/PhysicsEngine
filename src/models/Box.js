export default class Box {
  constructor() {
    this.position = [0, 0, 0]
    this.rotation = [0, 0, 0]
    this.velocity = [0, 0, 0]
    this.rotVelocity = [0, 0, 0]
    this.quaternion = [1, 0, 0, 0]
    this.quatVelocity = [1, 0, 0, 0]
  }
}
