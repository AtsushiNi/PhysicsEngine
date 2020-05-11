class Calculation {

  matrix_cl(matrixA, matrixB){
    const n_matrix = [[0,0,0],
                 [0,0,0],
                 [0,0,0]]
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        for(let k=0; k<3; k++){
          n_matrix[i][j] = matrixA[i][k] * matrixB[k][j]
        }
      }
    }
   return n_matrix 
  }

  //内因性オイラー角(x→y→z)から回転行列への変換
  rot_mat_cnv(lotx,loty,lotz){
    const rot_matrix = [[Math.cos(loty)*Math.cos(lotz), Math.sin(lotx)*Math.sin(loty)*Math.cos(lotz)-Math.cos(lotx)*Math.sin(lotz), Math.cos(lotx)*Math.sin(loty)*Math.cos(lotz)+Math.sin(lotx)*Math.sin(lotz)],
                     [Math.cos(loty)*Math.sin(lotz), Math.sin(lotx)*Math.sin(loty)*Math.sin(lotz)+Math.cos(lotx)*Math.cos(lotz), Math.cos(lotx)*Math.sin(loty)*Math.sin(lotz)-Math.sin(lotx)*Math.cos(lotz)],
                     [-Math.sin(loty), Math.sin(lotx)*Math.cos(loty), Math.cos(lotx)*Math.cos(loty)]]
    return rot_matrix
  }

  //回転行列からクォータニオンへの変換
  quat_cnv(rot_matrix){
    const quat_vector = [0, 0, 0, 0]
    let w = Math.sqrt(rot_matrix[0][0]+rot_matrix[1][1]+rot_matrix[2][2]+1)/2
    let x = Math.sqrt(rot_matrix[0][0]-rot_matrix[1][1]-rot_matrix[2][2]+1)/2
    let y = Math.sqrt(-rot_matrix[0][0]+rot_matrix[1][1]-rot_matrix[2][2]+1)/2
    let z = Math.sqrt(-rot_matrix[0][0]-rot_matrix[1][1]+rot_matrix[2][2]+1)/2
    const max_quat = Math.max(w, x, y, z)

    if(max_quat === x){
      y = (rot_matrix[0][1]+rot_matrix[1][0])/(4 * x)
      z = (rot_matrix[2][0]+rot_matrix[0][2])/(4 * x)
      w = (rot_matrix[1][2]-rot_matrix[2][1])/(4 * x)
    }else if(max_quat === y){
      z = (rot_matrix[1][2]+rot_matrix[2][1])/(4 * y)
      x = (rot_matrix[0][1]+rot_matrix[1][0])/(4 * y)
      w = (rot_matrix[2][0]-rot_matrix[0][2])/(4 * y)
    }else if(max_quat === z){
      x = (rot_matrix[2][0]+rot_matrix[0][2])/(4 * z)
      y = (rot_matrix[1][2]+rot_matrix[2][1])/(4 * z)
      w = (rot_matrix[0][1]-rot_matrix[1][0])/(4 * z)
    }else{
      x = (rot_matrix[1][2]-rot_matrix[2][1])/(4 * w)
      y = (rot_matrix[2][0]-rot_matrix[0][2])/(4 * w)
      z = (rot_matrix[0][1]-rot_matrix[1][0])/(4 * w)
    }
    
    quat_vector[0] = w
    quat_vector[1] = x 
    quat_vector[2] = y
    quat_vector[3] = z

    return quat_vector
  }

  //クォータニオンの計算:q=[w,x,y,z]
  quat_cl(q, p){
    const n_quat_vector = [0,0,0,0]
    n_quat_vector[0] = q[0]*p[0] - q[1]*p[1] - q[2]*p[2] - q[3]*p[3]
    n_quat_vector[1] = q[1]*p[0] + q[0]*p[1] - q[3]*p[2] + q[2]*p[3]
    n_quat_vector[2] = q[2]*p[0] + q[3]*p[1] - q[0]*p[2] - q[1]*p[3]
    n_quat_vector[3] = q[3]*p[0] - q[2]*p[1] + q[1]*p[2] - q[0]*p[3]
    return n_quat_vector
  }

  //位置ベクトルをクォータニオンに変換
  quat_r(r){
    const r_quat = [0, r[0], r[1], r[2]]
    return r_quat
  }
  //各速度ベクトルをクォータニオンに変換
  quat_w(w){
    const quatVelocity = [1, w[0], w[1], w[2]]
    return quatVelocity
  }
  //各速度ベクトルω=[ω1,ω2,ω3]のときのクォータニオンの更新
  quat_update(quaternion, w){
    for(let i=0; i<4; i++)
      quaternion[i] += this.quat_cl(quaternion, w)[i] - quaternion[i]
    return quaternion
  }


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
      //クォータニオンの更新
      box.quaternion.quat_update(box.quaternion, box.quatVelocity)
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
