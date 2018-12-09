class DrawModeManager {
  constructor(){
    this.defaultFill = color(50, 100, 100, 100);
    this.fill(this.defaultFill);

    this.strokeColor = null;
    this.defaultStroke = color(150, 30, 30, 100);
    this.strokeEnabled = false;
    this.stroke(this.defaultStroke)
  }

  toggleFill(){
    if (this.fillMode) {
      this.noFill();
    } else {
      this.fill(this.fillColor);
    };
  }

  fill(colorVal){
    this.fillMode = true;
    this.fillColor = colorVal;
    fill(colorVal);
  }

  noFill(){
    this.fillMode = false;
    noFill();
  }

  toggleStroke(){
    this.strokeEnabled ? this.noStroke() : this.stroke(this.strokeColor);
  }

  stroke(colorVal){
    this.strokeEnabled = true;
    this.strokeColor = colorVal;
    stroke(colorVal);
  }

  noStroke(){
    this.strokeEnabled = false;
    noStroke();
  }
}