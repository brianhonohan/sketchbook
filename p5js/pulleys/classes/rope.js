class Rope {
  constructor(){
    this.startObj = null;
    this.endObj   = null;
  }

  tieTo(object){
    if (this.startObj == null){
      this.startObj = object;
    } else if (this.endObj == null){
      this.endObj = object;
    } else {
      console.log(`ERROR: Rope was tied off 3 or more times`);
      return;
    }
  }

  containsXY(x, y){
    return false;
  }

  draw(){
    stroke(colorScheme.rope);
    strokeWeight(1);

    let mouseLoc = {x: system.mouseX, y: system.mouseY};
    let nextPoint;

    if (this.endObj) {
      nextPoint = this.endObj.ropeTieOffPoint(this.startObj);
    } else {
      nextPoint = mouseLoc;
    }
    let startTieOff = this.startObj.ropeTieOffPoint(nextPoint);

    line(startTieOff.x, startTieOff.y, nextPoint.x, nextPoint.y);
  }
}
