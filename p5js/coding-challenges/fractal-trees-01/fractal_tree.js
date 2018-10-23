class FractalTree {
  constructor(){
    this.x = width / 2;
    this.y = height * 0.8;
    this.maxSteps = 4;
    this.branches = 4;
    this.baseLength = 0.15 * min(width, height);
  }

  draw(step){
    if (step == this.maxSteps){
      return;
    }

    let branchLength = map(step, 0, this.maxSteps, this.baseLength, 0);
  
    push();   
    line(0, 0, 0, branchLength); 
    translate(0, branchLength);
    rotate(PI / 2);

    for (var i = 0; i < this.branches; i++){
      this.draw(step+1);
      rotate(-PI / this.branches);
    }
    pop();
  }
}