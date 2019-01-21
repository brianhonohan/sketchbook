class Button{
  constructor(id, label, x, y, width){
    this.id = id;
    this.label = label;
    this.sizeAndPos = new Rect(x, y, width, 24);
    this.state = Button.STATE_UNPRESSED;

    this.margin = 5;
    this._color = color(120);
  }

  get x() { return this.sizeAndPos.x; }
  get y() { return this.sizeAndPos.y; }
  get width() { return this.sizeAndPos.width; }
  get height() { return this.sizeAndPos.height; }
  
  static get STATE_PRESSED() { return 0; }
  static get STATE_UNPRESSED() { return 1; }

  // setWidth(float p_nWidth){
  //   textSize(16);
  //   this._width = min(p_nWidth, margin*2 + textWidth(this.label));
  // }
  
  backgroundColor(){
    if (this.state == Button.STATE_PRESSED) {
      return color(100,200,100);
    }
    return this._color;
  }

  labelColor(){
    if (this.state == Button.STATE_PRESSED) {
      return color(150,240,150);
    }
    return color(250);
  }

  draw(){
    push();
    translate(this.x, this.y);
    fill(this.backgroundColor());
    rect(0,0, this.width, this.height, 5);
    fill(this.labelColor());
    textSize(16);
    text(this.label, this.margin, this.margin + 12);
    pop();
  }
  
  releaseButton(){
    this.state = Button.STATE_UNPRESSED;
  }
  
  isHit(x, y){
    return this.sizeAndPos.containsXY(x, y);
  }

  pressIfHit(x, y){
    if (!this.isHit(x, y)){
      return false;
    }
    this.state = Button.STATE_PRESSED;
    return true;
  }
}
