class Calculation {
  static updateValues = (boxes, boxConfigs, gravity) => {
    // 重力加速度
    // g
    //
    // 大きさ(不変)
    // boxConfigs[i].height, boxConfigs[i].width, boxConfigs[i].depth
    //
    // 位置[x, y, z]
    // boxes[i].position
    // 向き[x, y, z]
    // boxes[i].lotation
    // 速度[x, y, z]
    // boxes[i].velocity
    // 角速度[x, y, z]
    // boxes[i].lotVelocity
    //
    boxes.forEach((box, i) => {
      // 速度の更新
      if (boxConfigs[i].fixed === false) {
        box.velocity[0] += gravity[0]
        box.velocity[1] += gravity[1]
        box.velocity[2] += gravity[2]
      }
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

  static resetValues = (boxes, boxConfigs) => {
    boxes.forEach((box, i) => {
      box.position[0] = boxConfigs[i].initialPosition[0]
      box.position[1] = boxConfigs[i].initialPosition[1]
      box.position[2] = boxConfigs[i].initialPosition[2]
      box.lotation[0] = boxConfigs[i].initialLotation[0]
      box.lotation[1] = boxConfigs[i].initialLotation[1]
      box.lotation[2] = boxConfigs[i].initialLotation[2]
      box.velocity[0] = 0
      box.velocity[1] = 0
      box.velocity[2] = 0
      box.lotVelocity[0] = 0
      box.lotVelocity[1] = 0
      box.lotVelocity[2] = 0
    })
  }
}

export default Calculation
