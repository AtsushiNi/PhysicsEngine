class Calculation {

  matrix_cl(mat_A, mat_B){
    const n_mat = [[0,0,0],
                 [0,0,0],
                 [0,0,0]];
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        for(let k=0; k<3; k++){
          n_mat[i][j] = mat_A[i][k] * mat_B[k][j];
        }
      }
    }
   return n_mat; 
  }

  //内因性オイラー角(x→y→z)から回転行列への変換
  rot_mat_cnv(θx,θy,θz){
    const rot_mat = [[Math.cos(θy)*Math.cos(θz), Math.sin(θx)*Math.sin(θy)*Math.cos(θz)-Math.cos(θx)*Math.sin(θz), Math.cos(θx)*Math.sin(θy)*Math.cos(θz)+Math.sin(θx)*Math.sin(θz)],
                     [Math.cos(θy)*Math.sin(θz), Math.sin(θx)*Math.sin(θy)*Math.sin(θz)+Math.cos(θx)*Math.cos(θz), Math.cos(θx)*Math.sin(θy)*Math.sin(θz)-Math.sin(θx)*Math.cos(θz)],
                     [-Math.sin(θy), Math.sin(θx)*Math.cos(θy), Math.cos(θx)*Math.cos(θy)]];
    return rot_mat;
  }

  //回転行列からクォータニオンへの変換
  quat_cnv(rot_mat){
    const quat_vct = [0, 0, 0, 0]; 
    let w = Math.sqrt(rot_mat[1][1]+rot_mat[2][2]+rot_mat[3][3]+1)/2;
    let x = Math.sqrt(rot_mat[1][1]-rot_mat[2][2]-rot_mat[3][3]+1)/2;
    let y = Math.sqrt(-rot_mat[1][1]+rot_mat[2][2]-rot_mat[3][3]+1)/2;
    let z = Math.sqrt(-rot_mat[1][1]-rot_mat[2][2]+rot_mat[3][3]+1)/2;
    const max_quat = Math.max(w, x, y, z);

    if(max_quat === x){
      y = (rot_mat[1][2]+rot_mat[2][1])/(4 * x);
      z = (rot_mat[3][1]+rot_mat[1][3])/(4 * x);
    }else if(max_quat === y){
      z = (rot_mat[2][3]+rot_mat[3][2])/(4 * y);
      x = (rot_mat[1][2]+rot_mat[2][1])/(4 * y);
    }else if(max_quat === z){
      x = (rot_mat[3][1]+rot_mat[1][3])/(4 * z);
      y = (rot_mat[2][3]+rot_mat[3][2])/(4 * z);
    }
    
    quat_vct[0] = w;
    quat_vct[1] = x; 
    quat_vct[2] = y;
    quat_vct[3] = z;

    return quat_vct;
  }

  //クォータニオンの計算:q=[w,x,y,z]
  quat_cl(q, p){
    const n_quat_vct = [0,0,0,0];
    n_quat_vct[0] = q[0]*p[0] - q[1]*p[1] - q[2]*p[2] - q[3]*p[3];
    n_quat_vct[1] = q[1]*p[0] + q[0]*p[1] - q[3]*p[2] + q[2]*p[3];
    n_quat_vct[2] = q[2]*p[0] + q[3]*p[1] - q[0]*p[2] - q[1]*p[3];
    n_quat_vct[3] = q[3]*p[0] - q[2]*p[1] + q[1]*p[2] - q[0]*p[3];
    return n_quat_vct;
  }

  //位置ベクトルをクォータニオンに変換
  quat_r(r){
    const r_quat = [0, r[0], r[1], r[2]];
    return r_quat;
  }
  //各速度ベクトルをクォータニオンに変換
  quat_w(w){
    const w_quat = [1, w[0], w[1], w[2]];
    return w_quat;
  }
  //各速度ベクトルω=[ω1,ω2,ω3]のときのクォータニオンの更新
  quat_update(q, w){
    q += this.quat_cl(q, w) - q;
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
