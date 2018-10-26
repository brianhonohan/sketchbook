class FractalTree {
  constructor(config){
    this.x = width / 2;
    this.y = height * 0.8;
    this.config = config;
  }

  get maxSteps() { return this.config.maxSteps; }
  get branches() { return this.config.branches; }
  get baseLength() { return this.config.baseLengthFactor * min(width, height); }
  get likelihoodOfBranch() { return this.config.likelihoodOfBranch; }
  get branchAngleRange() { return this.config.branchAngleRange; }
  get angleVariance() { return this.config.angleVariance; }



  draw(step){
    if (step == this.maxSteps){
      return;
    }

    stroke((step * branchCounter) % 255, 50, 200);
    branchCounter++;

    let branchCount = this.branches;
    let branchLength = map(step, 0, this.maxSteps, this.baseLength, 0);
    branchLength *= random(0.25, .625);

    let angleRange = this.branchAngleRange * random(0.8, 1.2);
    let angleBetweenBranches = angleRange / (branchCount - 1);
    angleBetweenBranches += randomGaussian() * this.angleVariance;

    push();   
    line(0, 0, 0, branchLength); 
    translate(0, branchLength);
    rotate(angleRange / 2);

    for (var i = 0; i < branchCount; i++){
      if (random() < this.likelihoodOfBranch){
        this.draw(step+1);  
      }
      rotate(-angleBetweenBranches);
    }
    pop();
  }
}