class ApicalMeristem {
  constructor(isRoot, x, y, tree){
    this.x = x;
    this.y = y;
    this.tree = tree;

    this.generalDirection = (isRoot) ? 1 : -1;
    this.segment = createVector(0.0, 0.1 * this.generalDirection);
  }

  tick(){
    this.segment.y += this.generalDirection;
  }

  draw(){
    line(this.x, this.y, this.x+this.segment.x, this.y+this.segment.y);
  }
}
