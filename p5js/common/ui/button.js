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

    this.initButtonStyles();
  }

  get x() { return this.sizeAndPos.x; }
  get y() { return this.sizeAndPos.y; }
  get width() { return this.sizeAndPos.width; }
  get height() { return this.sizeAndPos.height; }

  set x(value) { this.sizeAndPos.x = value; }
  set y(value) { this.sizeAndPos.y = value; }
  set width(value) { this.sizeAndPos.width = value; }
  set height(value) { this.sizeAndPos.height = value; }
  
  static get STATE_UNPRESSED() { return 0; }
  static get STATE_PRESSED() { return 1; }
  static get STATE_DISABLED() { return 2; }

  // setWidth(float p_nWidth){
  //   textSize(16);
  //   this._width = min(p_nWidth, margin*2 + textWidth(this.label));
  // }

  initButtonStyles(){
    this.styles = [];

    this.styles[Button.STATE_UNPRESSED] = {
      backgroundColor: color(120),
      labelColor: color(250)
    };

    this.styles[Button.STATE_PRESSED] = {
      backgroundColor: color(100, 200, 100),
      labelColor: color(150, 240, 150)
    };

    this.styles[Button.STATE_DISABLED] = {
      backgroundColor: color(200, 200, 200),
      labelColor: color(150, 150, 150)
    };
  }

  setStyle(state, style){
    if (state < 0 || state >= this.styles.length){
      console.error("Invalid button state: " + state);
      return;
    }
    this.styles[state] = style;
  }

  
  backgroundColor(){
    return this.styles[this.state].backgroundColor || this._color;
  }

  labelColor(){
    return this.styles[this.state].labelColor || color(250);
  }

  disable(){
    this.state = Button.STATE_DISABLED;
  }

  enable(){
    this.state = Button.STATE_UNPRESSED;
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

  handleRelease(x, y){
    if (this.state == Button.STATE_DISABLED){
      return false;
    }

    if (this.isHit(x, y) && this.callback && this.callbackObj){
      this.callback.call(this.callbackObj, {button: this});
      return true;
    }
    return false;
  }
  
  releaseButton(x, y){
    if (this.state == Button.STATE_DISABLED){
      return;
    }
    this.state = Button.STATE_UNPRESSED;
  }
  
  isHit(x, y){
    if (this.state == Button.STATE_DISABLED){
      return false;
    }
    return this.sizeAndPos.containsXY(x, y);
  }

  pressIfHit(x, y){
    if (this.state == Button.STATE_DISABLED){
      return false;
    }

    if (!this.isHit(x, y)){
      return false;
    }
    this.state = Button.STATE_PRESSED;
    return true;
  }
}
