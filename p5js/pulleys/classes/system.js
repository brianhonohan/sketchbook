class System {
  constructor(p_xSizeAndPos){
    this.area = p_xSizeAndPos;
    this.pulley = new Pulley(this.area.centerX, 20);
  }

  get x() { return this.area.x; }
  get y() { return this.area.y; }

  optionsMetadata(){
    return [
    ];
  }

  tick(){
    // console.log("tock");
  }

  draw(){
    push();
    translate(this.x, this.y);
    this.pulley.draw();

    // draw rope, tangent to the pulley
    stroke(0, 255, 0);
    strokeWeight(1);
    let mouseLoc = {x: mouseX - 0.1 * width, y: mouseY - 0.1 * height};
    let clockwiseWrap = mouseIsPressed;
    let tangPt = this.pulley.tangentPoint(mouseLoc, clockwiseWrap);
    line(mouseLoc.x, mouseLoc.y, tangPt.x, tangPt.y);

    pop();
  }
}
