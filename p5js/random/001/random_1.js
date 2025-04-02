var canvas;
var currentShape;
var shapes;
var drawModeMgr;

function setup(){
  // canvas = createCanvas(500, 500);
  canvas = createCanvas(windowWidth, windowHeight - determineVerticalMargin());

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
    case 's':
      drawModeMgr.toggleStroke();
      break;
    default:
      // do nothing
  }
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
}

function mousePressed(){
  // currentShape = new Circle(mouseX, mouseY);
  // shapes.push(currentShape);
}

function mouseDragged(){
  // currentShape.size = dist(currentShape.x, currentShape.y, mouseX, mouseY);

  let avgX = (mouseX + pmouseX) / 2;
  let avgY = (mouseY + pmouseY) / 2;

  let newCircle = new Circle(avgX, avgY);
  newCircle.size = sqrt( sq(mouseX - pmouseX) + sq(mouseY - pmouseY));

  let hue =  newCircle.size / (200) * 255;
  let brightness =  mouseX / width * 255;
  newCircle.color = color(hue, 200,brightness, 24);
  shapes.push(newCircle);
}

function mouseRelease(){
  currentShape = null;
}

class Circle {
  constructor(x, y){
    this.pos = createVector(x, y);
    this.size = 1;
    this.color = color(50, 100, 100, 50);
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  draw(){
    fill(this.color);
    ellipse(this.x, this.y, this.size*2, this.size*2);
  }
}
