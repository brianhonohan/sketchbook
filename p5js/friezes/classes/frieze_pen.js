class FriezePen {
  constructor(sizeAndPos){
    this.area = sizeAndPos;
  }

  drawRepeatedly(){
    line(pmouseX, pmouseY, mouseX, mouseY);
  } 

  draw(){
    if (mouseIsPressed && this.area.containsXY(mouseX, mouseY)){
      if (this.penWasDown){
        stroke(230);
        this.drawRepeatedly();
      }
      this.penWasDown = true;
    } else{
      this.penWasDown = false;
    }
  }
}