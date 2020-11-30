var system;
var halfCircleTD;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  shapes = [];

  halfCircleTD = new HalfCircleTeardrop(10, 10, 100, 100);
  // halfCircleTD.dragEnabled = true;
  halfCircleTD.fillColor = color(80);
  halfCircleTD.move(150, 180);
  shapes.push(halfCircleTD);
}

function draw(){
  background(50);

  noStroke();

  shapes.forEach(s => s.draw());
}

function mousePressed(){
  shapes.filter(s => s.dragEnabled == true)
        .find(s => s.handleMousePressed());
}

function mouseDragged(){
  shapes.filter(s => s.isDragged == true)
        .forEach(s => s.handleMouseDragged());
}

function mouseReleased(){
  shapes.filter(s => s.dragEnabled == true)
        .forEach(s => s.handleMouseReleased());
}
