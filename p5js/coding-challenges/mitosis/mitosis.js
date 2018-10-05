var cell;

function setup(){
  createCanvas(windowWidth, windowHeight-45);

  cell = new Cell(width/2, height/2);
}

function draw(){
  background(50);

  cell.draw();
}


class Cell {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 150;
    this.initMembrane();
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  initMembrane(){
    this.membrane = [];
    const numSegments = 30;
    let thetaStep = TWO_PI / numSegments;
    let tmpSegment;
    let tmpPoint = createVector(0, 0);

    for (var i = 0; i < numSegments; i++){
      tmpPoint.x = this.x + cos(thetaStep*i) * this.size/2;
      tmpPoint.y = this.y + sin(thetaStep*i) * this.size/2; 
      tmpSegment = new CellMembraneSegment(tmpPoint.x, tmpPoint.y);
      this.membrane.push(tmpSegment);
    }
  }

  draw(){
    fill(160, 180, 250);
    stroke(40,100,120);
    strokeWeight(5);
    beginShape();
    for (var i = 0; i < this.membrane.length; i++){
      vertex(this.membrane[i].x, this.membrane[i].y);
    }
    endShape(CLOSE);
  }
}

class CellMembraneSegment {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }
}
