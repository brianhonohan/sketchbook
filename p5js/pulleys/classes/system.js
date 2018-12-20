class System {
  constructor(p_xSizeAndPos){
    this.area = p_xSizeAndPos;
    this.pulley = new Pulley(this.area.width/2, 20);
    this.mass = new MassiveObject(this.area.width/2+ 10, 
                                  this.area.height - 10,
                                  100);
    this.winch = new Winch(this.area.width * 0.1, this.area.height - 30);
  }

  get x() { return this.area.x; }
  get y() { return this.area.y; }

  get mouseX() { return mouseX - this.x; }
  get mouseY() { return mouseY - this.y; }

  optionsMetadata(){
    return [
    ];
  }

  tick(){
    // console.log("tock");
  }

  debugArea(){
    noStroke();
    fill(150, 150, 30, 50);
    rectMode(CORNER);
    P5JsUtils.drawRect(this.area);
  }

  draw(){
    // this.debugArea();

    push();
    translate(this.x, this.y);
    this.pulley.draw();
    this.mass.draw();
    this.winch.draw();

    // draw rope, tangent to the pulley
    stroke(0, 255, 0);
    strokeWeight(1);
    let mouseLoc = {x: system.mouseX, y: system.mouseY};
    let clockwiseWrap = mouseIsPressed;
    let tangPt = this.pulley.tangentPoint(mouseLoc, clockwiseWrap);
    line(mouseLoc.x, mouseLoc.y, tangPt.x, tangPt.y);

    pop();
  }
}
