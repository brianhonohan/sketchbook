class NauticalFlags {
  constructor(){
    this.flagWidth = 300;
    this.initColors();
    this.initPennantCoords();
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
    let renderMethodName = this.renderMethodFor(flag);
    if (renderMethodName == undefined){
      console.warn('Unsupported flag requested: ' + flag);
      return;
    }

    background(50);
    noStroke();
    push();
    translate(width / 2 - this.flagWidth / 2, height / 2 - this.flagWidth / 2);

    this[renderMethodName]();
    pop();
  }

  renderMethodFor(key){
    const supportedFlags = /[a-z0-9]/i;
    if (supportedFlags.test(key)) {
      return 'draw' + key.toUpperCase();
    }

    let pennantNumber = this.pennantNumberFromKey(key);
    if (pennantNumber >= 0){
      return 'drawPennant' + pennantNumber; 
    }
    return undefined;
  }

  pennantNumberFromKey(key){
    return ')!@#$%^&*('.indexOf(key);
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

  drawF(){
    const barHeight = this.flagWidth * 0.5;
    fill(this.colors.white);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.red);
    beginShape();
    vertex(this.flagWidth / 2, 0);
    vertex(this.flagWidth, this.flagWidth / 2);
    vertex(this.flagWidth / 2, this.flagWidth);
    vertex(0, this.flagWidth / 2);
    endShape();
  }

  drawG(){
    const barWidth = this.flagWidth / 6;

    fill(this.colors.yellow);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.blue);
    rect(barWidth, 0, barWidth, this.flagWidth);
    rect(barWidth * 3, 0, barWidth, this.flagWidth);
    rect(barWidth * 5, 0, barWidth, this.flagWidth);
  }

  drawH(){
    fill(this.colors.white);
    rect(0, 0, this.flagWidth, this.flagWidth);
    fill(this.colors.red);
    rect(this.flagWidth / 2, 0, this.flagWidth / 2, this.flagWidth);
  }

  drawI(){
    fill(this.colors.yellow);
    rect(0, 0, this.flagWidth, this.flagWidth);

    const dotDiameter = this.flagWidth / 2;
    fill(this.colors.black);
    ellipse(dotDiameter, dotDiameter, dotDiameter, dotDiameter);
  }

  drawJ(){
    fill(this.colors.blue);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.white);
    rect(0, 0.333 * this.flagWidth, this.flagWidth, 0.333 * this.flagWidth);
  }

  drawK(){
    fill(this.colors.yellow);
    rect(0, 0, this.flagWidth, this.flagWidth);
    fill(this.colors.blue);
    rect(this.flagWidth / 2, 0, this.flagWidth / 2, this.flagWidth);
  }

  drawL(){
    fill(this.colors.yellow);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.black);
    rect(this.flagWidth / 2, 0, this.flagWidth / 2, this.flagWidth / 2);
    rect(0, this.flagWidth / 2, this.flagWidth / 2, this.flagWidth / 2);
  }

  drawM(){
    fill(this.colors.white);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.blue);
    const triangleOffset = this.flagWidth * 0.15;
    const triangleHeight = (this.flagWidth - 2 * triangleOffset) / 2;
    triangle(triangleOffset, 0, 
             this.flagWidth - triangleOffset, 0,
             this.flagWidth / 2, triangleHeight);

    triangle(this.flagWidth, triangleOffset, 
             this.flagWidth, this.flagWidth - triangleOffset,
             this.flagWidth - triangleHeight, this.flagWidth / 2);

    triangle(triangleOffset, this.flagWidth, 
             this.flagWidth - triangleOffset, this.flagWidth,
             this.flagWidth / 2, this.flagWidth - triangleHeight);

    triangle(0, triangleOffset, 
             0, this.flagWidth - triangleOffset,
             triangleHeight, this.flagWidth / 2);
  }

  drawN(){
    fill(this.colors.white);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.blue);
    const sqWidth = this.flagWidth * 0.25;
    const numCols = 4
    const numRows = 4;
    for (var i = 0; i < numRows; i++){
      for (var j = 0; j < numCols; j++){
        if ((i*numCols + j + (i % 2)) % 2 == 0) {
          rect(j * sqWidth, i * sqWidth, sqWidth, sqWidth);
        }
      }
    }
  }

  drawO(){
    fill(this.colors.yellow);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.red);
    triangle(0, 0,
             this.flagWidth, 0,
             this.flagWidth, this.flagWidth);
  }

  drawP(){
    fill(this.colors.blue);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.white);
    const margin = 0.25 * this.flagWidth;
    rect(margin, margin, this.flagWidth - margin * 2, this.flagWidth - margin * 2);
  }

  drawQ(){
    fill(this.colors.yellow);
    rect(0, 0, this.flagWidth, this.flagWidth);
  }

  drawR(){
    fill(this.colors.red);
    rect(0, 0, this.flagWidth, this.flagWidth);
    
    fill(this.colors.yellow);
    const barWidth = 0.2 * this.flagWidth;
    rect((this.flagWidth - barWidth) / 2, 0, barWidth, this.flagWidth);
    rect(0, (this.flagWidth - barWidth) / 2, this.flagWidth, barWidth);
  }

  drawS(){
    fill(this.colors.white);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.blue);
    const margin = 0.25 * this.flagWidth;
    rect(margin, margin, this.flagWidth - margin * 2, this.flagWidth - margin * 2);
  }

  drawT(){
    fill(this.colors.white);
    rect(0, 0, this.flagWidth, this.flagWidth);

    const barWidth = 0.3333 * this.flagWidth;

    fill(this.colors.red);
    rect(0, 0, barWidth, this.flagWidth);

    fill(this.colors.blue);
    rect(this.flagWidth - barWidth, 0, barWidth, this.flagWidth);
  }

  drawU(){
    fill(this.colors.red);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.white);
    rect(this.flagWidth / 2, 0, this.flagWidth / 2, this.flagWidth / 2);
    rect(0, this.flagWidth / 2, this.flagWidth / 2, this.flagWidth / 2);
  }

  drawV(){
    fill(this.colors.red);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.white);
    const triangleOffset = this.flagWidth * 0.15;
    const triangleHeight = (this.flagWidth - 2 * triangleOffset) / 2;
    triangle(triangleOffset, 0, 
             this.flagWidth - triangleOffset, 0,
             this.flagWidth / 2, triangleHeight);

    triangle(this.flagWidth, triangleOffset, 
             this.flagWidth, this.flagWidth - triangleOffset,
             this.flagWidth - triangleHeight, this.flagWidth / 2);

    triangle(triangleOffset, this.flagWidth, 
             this.flagWidth - triangleOffset, this.flagWidth,
             this.flagWidth / 2, this.flagWidth - triangleHeight);

    triangle(0, triangleOffset, 
             0, this.flagWidth - triangleOffset,
             triangleHeight, this.flagWidth / 2);
  }

  drawW(){
    fill(this.colors.blue);
    rect(0, 0, this.flagWidth, this.flagWidth);

    const margin = this.flagWidth / 6;

    fill(this.colors.white);
    rect(margin, margin, this.flagWidth - margin * 2, this.flagWidth - margin * 2);

    fill(this.colors.red);
    rect(margin * 2, margin * 2, margin * 2, margin * 2);
  }

  drawX(){
    fill(this.colors.white);
    rect(0, 0, this.flagWidth, this.flagWidth);
    
    fill(this.colors.blue);
    const barWidth = 0.2 * this.flagWidth;
    rect((this.flagWidth - barWidth) / 2, 0, barWidth, this.flagWidth);
    rect(0, (this.flagWidth - barWidth) / 2, this.flagWidth, barWidth);
  }

  drawY(){
    fill(this.colors.red);
    rect(0, 0, this.flagWidth, this.flagWidth);
    
    fill(this.colors.yellow);
    const barWidth = this.flagWidth / 11 * 2;

    // diagonal stripes, down to the left, at 45˚ angle
    beginShape();
    vertex(0, 0);
    vertex(barWidth, 0);
    vertex(0, barWidth);
    endShape();

    beginShape();
    vertex(barWidth * 2, 0);
    vertex(barWidth * 3, 0);
    vertex(0, barWidth * 3);
    vertex(0, barWidth * 2);
    endShape();

    beginShape();
    vertex(barWidth * 4, 0);
    vertex(barWidth * 5, 0);
    vertex(0, barWidth * 5);
    vertex(0, barWidth * 4);
    endShape();

    beginShape();
    vertex(this.flagWidth, 0.5 * barWidth);
    vertex(this.flagWidth, 1.5 * barWidth);
    vertex(1.5 * barWidth, this.flagWidth);
    vertex(0.5 * barWidth, this.flagWidth);
    endShape();

    beginShape();
    vertex(this.flagWidth, 2.5 * barWidth);
    vertex(this.flagWidth, 3.5 * barWidth);
    vertex(3.5 * barWidth, this.flagWidth);
    vertex(2.5 * barWidth, this.flagWidth);
    endShape();

    beginShape();
    vertex(this.flagWidth, 4.5 * barWidth);
    vertex(this.flagWidth, this.flagWidth);
    vertex(4.5 * barWidth, this.flagWidth);
    endShape();
  }

  drawZ(){
    fill(this.colors.yellow);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.black);
    triangle(0, 0,
             this.flagWidth / 2, this.flagWidth / 2,
             0, this.flagWidth);

    fill(this.colors.red);
    triangle(0, this.flagWidth,
             this.flagWidth / 2, this.flagWidth / 2,
             this.flagWidth, this.flagWidth);

    fill(this.colors.blue);
    triangle(this.flagWidth, 0,
             this.flagWidth / 2, this.flagWidth / 2,
             this.flagWidth, this.flagWidth);
  }

  draw0(){
    fill(this.colors.white);
    rect(0, 0, this.flagWidth, this.flagWidth);

    // draw crosses
    const barWidth = this.flagWidth / 15;
    fill(this.colors.blue);

    rect(2 * barWidth, barWidth, barWidth, 3 * barWidth);
    rect(barWidth, 2 * barWidth, 3 * barWidth, barWidth);

    rect(12 * barWidth, barWidth, barWidth, 3 * barWidth);
    rect(11 * barWidth, 2 * barWidth, 3 * barWidth, barWidth);

    rect(7 * barWidth, 6 * barWidth, barWidth, 3 * barWidth);
    rect(6 * barWidth, 7 * barWidth, 3 * barWidth, barWidth);

    rect(12 * barWidth, 11 * barWidth, barWidth, 3 * barWidth);
    rect(11 * barWidth, 12 * barWidth, 3 * barWidth, barWidth);

    rect(2 * barWidth, 11 * barWidth, barWidth, 3 * barWidth);
    rect(barWidth,     12 * barWidth, 3 * barWidth, barWidth);
  }

  draw1(){
    fill(this.colors.red);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.yellow);
    rect(0, 0.333 * this.flagWidth, this.flagWidth, 0.333 * this.flagWidth);
  }

  draw2(){
    fill(this.colors.yellow);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.red);
    rect(0, 0.333 * this.flagWidth, this.flagWidth, 0.333 * this.flagWidth);
  }

  draw3(){
    fill(this.colors.blue);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.red);
    rect(0, 0.333 * this.flagWidth, this.flagWidth, 0.333 * this.flagWidth);
  }

  draw4(){
    fill(this.colors.white);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.red);
    const triangleOffset = this.flagWidth * 0.15;
    const triangleHeight = (this.flagWidth - 2 * triangleOffset) / 2;
    triangle(triangleOffset, 0, 
             this.flagWidth - triangleOffset, 0,
             this.flagWidth / 2, triangleHeight);

    triangle(this.flagWidth, triangleOffset, 
             this.flagWidth, this.flagWidth - triangleOffset,
             this.flagWidth - triangleHeight, this.flagWidth / 2);

    triangle(triangleOffset, this.flagWidth, 
             this.flagWidth - triangleOffset, this.flagWidth,
             this.flagWidth / 2, this.flagWidth - triangleHeight);

    triangle(0, triangleOffset, 
             0, this.flagWidth - triangleOffset,
             triangleHeight, this.flagWidth / 2);
  }

  draw5(){
    fill(this.colors.blue);
    rect(0, 0, this.flagWidth, this.flagWidth);

    fill(this.colors.yellow);
    const triangleOffset = this.flagWidth * 0.15;
    const triangleHeight = (this.flagWidth - 2 * triangleOffset) / 2;
    triangle(triangleOffset, 0, 
             this.flagWidth - triangleOffset, 0,
             this.flagWidth / 2, triangleHeight);

    triangle(this.flagWidth, triangleOffset, 
             this.flagWidth, this.flagWidth - triangleOffset,
             this.flagWidth - triangleHeight, this.flagWidth / 2);

    triangle(triangleOffset, this.flagWidth, 
             this.flagWidth - triangleOffset, this.flagWidth,
             this.flagWidth / 2, this.flagWidth - triangleHeight);

    triangle(0, triangleOffset, 
             0, this.flagWidth - triangleOffset,
             triangleHeight, this.flagWidth / 2);
  }

  draw6(){
    fill(this.colors.blue);
    rect(0, 0, this.flagWidth, this.flagWidth);
    
    fill(this.colors.white);
    const barWidth = this.flagWidth / 7 * 2;

    // diagonal stripes, down to the left, at 45˚ angle
    beginShape();
    vertex(0, 0);
    vertex(barWidth, 0);
    vertex(0, barWidth);
    endShape();

    beginShape();
    vertex(barWidth * 2, 0);
    vertex(barWidth * 3, 0);
    vertex(0, barWidth * 3);
    vertex(0, barWidth * 2);
    endShape();

    beginShape();
    vertex(this.flagWidth, 0.5 * barWidth);
    vertex(this.flagWidth, 1.5 * barWidth);
    vertex(1.5 * barWidth, this.flagWidth);
    vertex(0.5 * barWidth, this.flagWidth);
    endShape();

    beginShape();
    vertex(this.flagWidth, 2.5 * barWidth);
    vertex(this.flagWidth, 3.5 * barWidth);
    vertex(3.5 * barWidth, this.flagWidth);
    vertex(2.5 * barWidth, this.flagWidth);
    endShape();
  }

  draw7(){
    fill(this.colors.red);
    rect(0, 0, this.flagWidth, this.flagWidth);

    const barWidth = 0.3333 * this.flagWidth;
    fill(this.colors.white);
    rect(barWidth, 0, barWidth, this.flagWidth);
  }

  draw8(){
    fill(this.colors.yellow);
    rect(0, 0, this.flagWidth, this.flagWidth);

    const barWidth = 0.3333 * this.flagWidth;
    fill(this.colors.blue);
    rect(barWidth, 0, barWidth, this.flagWidth);
  }

  draw9(){
    fill(this.colors.blue);
    rect(0, 0, this.flagWidth, this.flagWidth);

    const barWidth = 0.3333 * this.flagWidth;
    fill(this.colors.white);
    rect(barWidth, 0, barWidth, this.flagWidth);
  }

  drawPennantBase(){
    beginShape();
    vertex(this.pennant.topLeftX, this.pennant.topLeftY);
    vertex(this.pennant.topRightX, this.pennant.topRightY);
    vertex(this.pennant.bottomRightX, this.pennant.bottomRightY);
    vertex(this.pennant.bottomLeftX,  this.pennant.bottomLeftY);
    endShape();
  }

  drawBarInPennant(x, barWidth){
    beginShape();
    let yVal = (this.pennant.topLeftY + this.pennant.slope * x);
    vertex(x, yVal);

    yVal += this.pennant.slope * barWidth;
    vertex(x + barWidth, yVal);

    yVal = (this.pennant.bottomLeftY + this.pennant.slope * (x + barWidth) * -1);
    vertex(x + barWidth, yVal);

    yVal += this.pennant.slope * barWidth; // (leaving out two negative signs)
    vertex(x, yVal);
    endShape();
  }

  drawPennant0(){
    fill(this.colors.yellow);
    this.drawPennantBase();

    fill(this.colors.red);
    const barWidth = this.flagWidth / 3;
    this.drawBarInPennant(barWidth, barWidth);
  }

  drawPennant1(){
    fill(this.colors.white);
    this.drawPennantBase();

    fill(this.colors.red);
    let dotDiameter = 0.20 * this.flagWidth;
    ellipse(dotDiameter, this.flagWidth / 2, dotDiameter, dotDiameter);
  }

  drawPennant2(){
    fill(this.colors.blue);
    this.drawPennantBase();

    fill(this.colors.white);
    let dotDiameter = 0.20 * this.flagWidth;
    ellipse(dotDiameter, this.flagWidth / 2, dotDiameter, dotDiameter);
  }

  drawPennant3(){
    fill(this.colors.red);
    this.drawPennantBase();

    const barWidth = this.flagWidth / 3;
    fill(this.colors.white);
    this.drawBarInPennant(barWidth, barWidth);

    fill(this.colors.blue);
    this.drawBarInPennant(2 * barWidth, barWidth);
  }

  drawPennant5(){
    fill(this.colors.yellow);
    this.drawPennantBase();

    fill(this.colors.blue);
    const barWidth = this.flagWidth / 2;
    this.drawBarInPennant(barWidth, barWidth);
  }

  initPennantCoords(){
    this.pennant = {};
    const baseHeightPct = 0.5;
    const tipHeightPct = 0.15;

    this.pennant.topLeftX = 0;
    this.pennant.topLeftY = baseHeightPct * 0.5 * this.flagWidth;

    this.pennant.topRightX = this.flagWidth;
    this.pennant.topRightY = this.flagWidth / 2 - tipHeightPct / 2 * this.flagWidth;

    this.pennant.bottomRightX = this.flagWidth;
    this.pennant.bottomRightY = this.flagWidth / 2 + tipHeightPct / 2 * this.flagWidth;

    this.pennant.bottomLeftX = 0;
    this.pennant.bottomLeftY = baseHeightPct * 1.5 * this.flagWidth;

    this.pennant.slope = (this.pennant.topRightY - this.pennant.topLeftY) / 
                          (this.pennant.topRightX - this.pennant.topLeftX);
  }
}