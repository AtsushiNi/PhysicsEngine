class Calculation {
  static updatevalues = (boxes, boxConfigs) => {
    //
    // 大きさ(不変)
    // boxConfigs[i].height, boxConfigs[i].width, boxConfigs[i].depth
    //
    // 位置[x, y, z]
    // boxes[i].location
    // 向き[x, y, z]
    // boxes[i].lotation
    // 速度[x, y, z]
    // boxes[i].velocity
    // 角速度[x, y, z]
    // boxes[i].lotVelocity
    //
    boxes[0].lotation[0] += 0.01
  }
}

export default Calculation
