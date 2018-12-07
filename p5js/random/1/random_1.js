var canvas;
var currentShape;
var shapes;
var drawModeMgr;

function setup(){
  canvas = createCanvas(500, 500);
  drawModeMgr = new DrawModeManager();
  colorMode(HSB);

  ellipseMode(CENTER);
  shapes = [];
}

function draw(){
  background(47, 10, 10, 100);

  shapes.forEach(s => s.draw());
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    case 'f':
      drawModeMgr.toggleFill();
      break;
    default:
      // do nothing
  }
}

class DrawModeManager {
  constructor(){
    this.defaultFill = color(50, 100, 100, 100);
    this.fill(this.defaultFill);
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
}

function mousePressed(){
  currentShape = new Circle(mouseX, mouseY);
  shapes.push(currentShape);
}

function mouseDragged(){
  currentShape.size = dist(currentShape.x, currentShape.y, mouseX, mouseY);
}

function mouseRelease(){
  currentShape = null;
}

class Circle {
  constructor(x, y){
    this.pos = createVector(x, y);
    this.size = 1;
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  draw(){
    ellipse(this.x, this.y, this.size*2, this.size*2);
  }
}
