class Button{
  constructor(id, label, x, y, width, callback, callbackObj){
    this.id = id;
    this.label = label;
    this.sizeAndPos = new Rect(x, y, width, 24);
    this.state = Button.STATE_UNPRESSED;
    this.callback = callback;
    this.callbackObj = callbackObj;

    this.margin = 5;
    this._color = color(120);
    this.fontSize = 16;

    this.textAlignHorizMode = CENTER;
    this.textAlignVertMode = CENTER;
  }

  get x() { return this.sizeAndPos.x; }
  get y() { return this.sizeAndPos.y; }
  get width() { return this.sizeAndPos.width; }
  get height() { return this.sizeAndPos.height; }

  set x(value) { this.sizeAndPos.x = value; }
  set y(value) { this.sizeAndPos.y = value; }
  set width(value) { this.sizeAndPos.width = value; }
  set height(value) { this.sizeAndPos.height = value; }
  
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
    textSize(this.fontSize);

    let textX;
    if (this.textAlignHorizMode == CENTER) {
      textX = this.width / 2;
    } else if (this.textAlignHorizMode == RIGHT) {
      textX = this.width - this.margin;
    } else {
      // ALIGN LEFT
      textX = this.margin;
    }
    let textY;
    if (this.textAlignVertMode == CENTER) {
      textY = this.height / 2;
    } else if (this.textAlignVertMode == TOP) {
      textY = this.margin;
    } else {
      // ALIGN BOTTOM or BASELINE
      textY = this.height - this.margin;
    }

    textAlign(this.textAlignHorizMode, this.textAlignVertMode);
    text(this.label, textX, textY);
    pop();
  }
  
  releaseButton(x, y){
    if (this.isHit(x, y) && this.callback && this.callbackObj){
      this.callback.call(this.callbackObj, {button: this});
    }

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
