class Calculation {
  static updateValues = (boxes, boxConfigs, gravity) => {
    // 重力加速度
    // g
    //
    // 大きさ(不変)
    // boxConfigs[index].size
    //
    // 位置[x, y, z]
    // boxes[index].position
    // 向き[x, y, z]
    // boxes[index].lotation
    // 速度[x, y, z]
    // boxes[index].velocity
    // 角速度[x, y, z]
    // boxes[index].lotVelocity
    //
    boxes.forEach((box, index) => {
      // 速度の更新
      if (boxConfigs[index].fixed === false) {
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
    boxes.forEach((box, index) => {
      box.position[0] = boxConfigs[index].initialPosition[0]
      box.position[1] = boxConfigs[index].initialPosition[1]
      box.position[2] = boxConfigs[index].initialPosition[2]
      box.lotation[0] = boxConfigs[index].initialLotation[0]
      box.lotation[1] = boxConfigs[index].initialLotation[1]
      box.lotation[2] = boxConfigs[index].initialLotation[2]
      box.velocity[0] = boxConfigs[index].initialVelocity[0]
      box.velocity[1] = boxConfigs[index].initialVelocity[1]
      box.velocity[2] = boxConfigs[index].initialVelocity[2]
      box.lotVelocity[0] = boxConfigs[index].initialLotVelocity[0]
      box.lotVelocity[1] = boxConfigs[index].initialLotVelocity[1]
      box.lotVelocity[2] = boxConfigs[index].initialLotVelocity[2]
    })
  }
}

export default Calculation
