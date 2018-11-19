class RootSegment {
  constructor(x, y, parent){
    this.pos = createVector(x, y);
    this.parent = parent;
    this.nutrientDectionRange = 50;
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  detectionArea(){
    return new Rect(this.x - this.nutrientDectionRange / 2, 
                    this.y - this.nutrientDectionRange / 2,
                    this.nutrientDectionRange,
                    this.nutrientDectionRange);
  }

  static setStyle(){
    stroke(230);
  }

  draw(){
    fill(50,200,50,80);
    P5JsUtils.drawRect(this.detectionArea());
    line(this.parent.x, this.parent.y, this.x, this.y);
  }
}
