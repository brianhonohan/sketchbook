class AnchorPoint {
  constructor(x, y, height, direction = P5JsUtils.DOWN){
    this.pos = createVector(x, y);
    this.height = height;
    this.direction = direction;
    this.computePoints();
  }

  computePoints(){
    this.firstX = 0;
    this.firstY = 0;
    this.lastX = 0;
    this.lastY = 0;

    const tan30 = 0.57735026919;
    const halfBase = this.height * tan30;

    switch (this.direction) {
      case P5JsUtils.UP:
        this.firstX = this.x - halfBase;
        this.lastX  = this.x + halfBase;
        this.firstY = this.y - this.height;
        this.lastY  = this.y - this.height;
        break;
      case P5JsUtils.DOWN: 
        this.firstX = this.x - halfBase;
        this.lastX  = this.x + halfBase;
        this.firstY = this.y + this.height;
        this.lastY  = this.y + this.height;
        break;
      case P5JsUtils.RIGHT:
        this.firstX = this.x + this.height;
        this.lastX  = this.x + this.height;
        this.firstY = this.y - halfBase;
        this.lastY  = this.y + halfBase;
        break;
      case P5JsUtils.LEFT:
        this.firstX = this.x - this.height;
        this.lastX  = this.x - this.height;
        this.firstY = this.y - halfBase;
        this.lastY  = this.y + halfBase;
        break;
    }
  }

  get x() { return this.pos.x; }
  get y() { return this.pos.y; }

  draw(){
    triangle(this.firstX, this.firstY,
              this.x, this.y,
              this.lastX, this.lastY);
  }
}
