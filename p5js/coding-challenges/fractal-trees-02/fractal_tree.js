class FractalTree {
  constructor(){
    this.x = width / 2;
    this.y = height * 0.8;
    this.maxSteps = 8;
    this.branches = 2;
    this.baseLength = 0.25 * min(width, height);
  }

  draw(step){
    if (step == this.maxSteps){
      return;
    }

    stroke((step * branchCounter) % 255, 50, 200);
    branchCounter++;

    let branchCount = this.branches;
    let branchLength = map(step, 0, this.maxSteps, this.baseLength, 0);
    branchLength *= random(0.25, .625);

    let angleRange = PI * 2 / 3 * random(0.8, 1.2);
    let angleBetweenBranches = angleRange / (branchCount - 1);
    angleBetweenBranches += random(-PI / 8, PI / 8);

    push();   
    line(0, 0, 0, branchLength); 
    translate(0, branchLength);
    rotate(angleRange / 2);

    for (var i = 0; i < branchCount; i++){
      if (random() < 0.9){
        this.draw(step+1);  
      }
      rotate(-angleBetweenBranches);
    }
    pop();
  }
}