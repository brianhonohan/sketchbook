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
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  draw(){
    fill(160, 180, 250);
    stroke(40,100,120);
    strokeWeight(5);
    ellipse(this.x, this.y, this.size, this.size)
  }
}
