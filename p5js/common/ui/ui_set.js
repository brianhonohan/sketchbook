class UISet {
  constructor(){
    this.uiElements = [];
    
    this.sizeAndPos = new Rect(0, 0, 0, 0);
  }

  get x() { return this.sizeAndPos.x; }
  get y() { return this.sizeAndPos.y; }
  get width() { return this.sizeAndPos.width; }
  get height() { return this.sizeAndPos.height; }

  set x(value) {
    this.sizeAndPos.x = value;
  }
  set y(value) {
    this.sizeAndPos.y = value;
  }

  moveTo(x, y){
    this.sizeAndPos.x = x;
    this.sizeAndPos.y = y;
  }

  add(element){
    this.uiElements.push(element);
  }

  elementAt(idx){
    return this.uiElements[idx];
  }

  handleMousePressed(x, y){
    let relativeX = (x || mouseX) - this.x;
    let relativeY = (y || mouseY) - this.y;
    let pressedButton = this.uiElements.find(el => el.pressIfHit(relativeX, relativeY));
    if (pressedButton){
      return pressedButton;
    }
    return false;
  }

  handleMouseReleased(x, y){
    let relativeX = (x || mouseX) - this.x;
    let relativeY = (y || mouseY) - this.y;
    this.uiElements.forEach((el) => el.releaseButton(relativeX, relativeY));
  }

  draw(){
    push();
    translate(this.x, this.y);
    this.uiElements.forEach((el) => el.draw());
    pop();
  }

  render(){ 
    this.draw();
  }
}
