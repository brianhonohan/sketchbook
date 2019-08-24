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

  drawFlag(flag){
    background(50);
    noStroke();
    push();
    translate(width / 2 - this.flagWidth / 2, height / 2 - this.flagWidth / 2);
    switch (flag){
      case 'a': this.drawA(); break;
      case 'b': this.drawB(); break;
      default: break;
    }
    pop();
  }

  drawA(){
    fill(this.colors.white);
    rect(0, 0, this.flagWidth / 2, this.flagWidth);
    
    fill(this.colors.blue);
    beginShape();
    vertex(this.flagWidth / 2, 0);
    vertex(this.flagWidth, 0);
    vertex(this.flagWidth * 0.66, this.flagWidth/2);
    vertex(this.flagWidth, this.flagWidth);
    vertex(this.flagWidth / 2, this.flagWidth);
    endShape();
  }

  drawB(){
    fill(this.colors.red);

    beginShape();
    vertex(0, 0);
    vertex(this.flagWidth, 0);
    vertex(this.flagWidth * 0.66, this.flagWidth/2);
    vertex(this.flagWidth, this.flagWidth);
    vertex(0, this.flagWidth);
    endShape();
  }
}