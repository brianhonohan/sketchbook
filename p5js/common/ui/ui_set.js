class UISet {
  constructor(){
    this.uiElements = [];
  }

  add(element){
    this.uiElements.push(element);
  }

  elementAt(idx){
    return this.uiElements[idx];
  }

  handleMousePressed(){
    let pressedButton = this.uiElements.find(el => el.pressIfHit(mouseX, mouseY));
    if (pressedButton){
      return pressedButton;
    }
    return false;
  }

  handleMouseReleased(){
    this.uiElements.forEach((el) => el.releaseButton(mouseX, mouseY));
  }

  draw(){
    this.uiElements.forEach((el) => el.draw());
  }
}
