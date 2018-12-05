class SnowflakePen {
  constructor(){
    this.prevX = null;
    this.prevY = null;
  }

  draw(){
    if (mouseIsPressed){
      if (this.prevX){
        line(this.prevX, this.prevY, mouseX, mouseY);
      }
      this.prevX = mouseX;
      this.prevY = mouseY;

    }else{
      this.prevX = null;
      this.prevY = null;
    }
  }
}
