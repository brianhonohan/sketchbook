class HomingPoint extends Point {
  setTarget(targetPoint){
    this.targetPoint = targetPoint;
  }

  update(){
    if (this.targetPoint == undefined) {
      return;
    }

    let vecToTarget = createVector(this.targetPoint.x - this.x, this.targetPoint.y - this.y);
    let distToTarget = vecToTarget.mag();
    
    if (distToTarget < 0.1) {
      this.set(this.targetPoint.x, this.targetPoint.y);
      this.targetPoint = undefined;
      return;
    }
    
    vecToTarget.mult(0.1);
    this.add(vecToTarget);
  }
}