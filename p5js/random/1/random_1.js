var canvas;
var currentShape;
var shapes;

function setup(){
  canvas = createCanvas(500, 500);
  colorMode(HSB);

  ellipseMode(CENTER);
  shapes = [];
}

function draw(){
  background(47, 10, 10, 100);

  shapes.forEach(s => s.draw());
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
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
