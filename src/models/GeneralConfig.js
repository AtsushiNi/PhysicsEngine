export default class GeneralConfig {
  constructor(gravityX, gravityY, gravityZ, standardGravity) {
    this.standardGravity = standardGravity
    this.gravity = [gravityX, gravityY, gravityZ]
  }
}
