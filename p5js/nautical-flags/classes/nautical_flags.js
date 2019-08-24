class NauticalFlags {
  constructor(){
    this.flagWidth = 100;
    this.initColors();
  }

  initColors(){
    this.colors = {
      white: color(255),
      blue: color(50, 50, 240),
      red: color(240, 50, 50),
      yellow: color(230, 230, 50),
      black: color(10)
    };
  }

  drawKey(key){
    background(50);
    push();
    translate(width / 2 - this.flagWidth / 2, height / 2 - this.flagWidth / 2);
    switch (key){
      case 'a': this.drawA(); break;
      case 'b': this.drawB(); break;
      default: break;
    }
    pop();
  }

  drawA(){
    const flagWidth = this.flagWidth;
    noStroke();
    fill(this.colors.white);
    rect(0, 0, flagWidth / 2, flagWidth);
    
    fill(this.colors.blue);
    beginShape();
    vertex(flagWidth / 2, 0);
    vertex(flagWidth, 0);
    vertex(flagWidth * 0.66, flagWidth/2);
    vertex(flagWidth, flagWidth);
    vertex(flagWidth / 2, flagWidth);
    endShape();
  }

  drawB(){
    const flagWidth = this.flagWidth;
    noStroke();
    fill(this.colors.red);

    beginShape();
    vertex(0, 0);
    vertex(flagWidth, 0);
    vertex(flagWidth * 0.66, flagWidth/2);
    vertex(flagWidth, flagWidth);
    vertex(0, flagWidth);
    endShape();
  }
}