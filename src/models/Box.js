export default class Box {
  constructor(
    height = 1,
    width = 1,
    depth = 1,
    initialPosX = 0,
    initialPosY = 0,
    initialPosZ = 0
  ) {
    this.height = height
    this.width = width
    this.depth = depth
    this.position = [initialPosX, initialPosY, initialPosZ]
  }
}
