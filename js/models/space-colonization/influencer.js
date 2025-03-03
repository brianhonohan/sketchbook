class Influencer {
  constructor(pos) {
    this.pos = pos;
    this.width = 5;
    this.height = 5;
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  static setStyles() {
    noStroke();
    fill(50, 230, 50);
  }

  draw(){
    P5JsUtils.drawRect(this);
  }
}