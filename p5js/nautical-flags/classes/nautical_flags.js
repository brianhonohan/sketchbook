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
      case 'c': this.drawC(); break;
      case 'd': this.drawD(); break;
      case 'e': this.drawE(); break;
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

  drawC(){
    const barHeight = this.flagWidth * 0.2;
    fill(this.colors.blue);
    rect(0, 0, this.flagWidth, barHeight);
    rect(0, barHeight * 4, this.flagWidth, barHeight);

    fill(this.colors.white);
    rect(0, barHeight, this.flagWidth, barHeight);
    rect(0, barHeight * 3, this.flagWidth, barHeight);

    fill(this.colors.red);
    rect(0, barHeight * 2, this.flagWidth, barHeight);
  }

  drawD(){
    const barHeight = this.flagWidth * 0.25;
    fill(this.colors.yellow);
    rect(0, 0, this.flagWidth, barHeight);
    rect(0, barHeight * 3, this.flagWidth, barHeight);

    fill(this.colors.blue);
    rect(0, barHeight, this.flagWidth, barHeight * 2);
  }

  drawE(){
    const barHeight = this.flagWidth * 0.5;
    fill(this.colors.blue);
    rect(0, 0, this.flagWidth, barHeight);

    fill(this.colors.red);
    rect(0, barHeight, this.flagWidth, barHeight);
  }
}