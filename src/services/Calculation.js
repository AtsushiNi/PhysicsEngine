class Calculation {
  static updatevalues = (boxes, boxConfigs, g) => {
    // 重力加速度
    // g
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
    boxes.forEach((box) => {
      // 速度の更新
      box.velocity[0] += g[0]
      box.velocity[1] += g[1]
      box.velocity[2] += g[2]
      // 位置の更新
      box.position[0] += box.velocity[0]
      box.position[1] += box.velocity[1]
      box.position[2] += box.velocity[2]
      // 向きの更新
      box.lotation[0] += box.lotVelocity[0]
      box.lotation[1] += box.lotVelocity[1]
      box.lotation[2] += box.lotVelocity[2]
    })
  }
}

export default Calculation
