class AnchorPoint {
  constructor(x, y, height){
    this.pos = createVector(x, y);
    this.height = height;
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }

  draw(){
    const tan30 = 0.57735026919;
    const xDelta = this.height * tan30;
    triangle(this.x - xDelta,   this.y + this.height,
              this.x, this.y,
              this.x + xDelta, this.y + this.height);
  }
}
