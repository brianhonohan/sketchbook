var system;
var rectToDrag;
var anotherRectToDrag;
var shapes;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  shapes = [];

  rectToDrag = new Rectangle(50, 50, 200, 200);
  rectToDrag.dragEnabled = true;
  shapes.push(rectToDrag);

  anotherRectToDrag = new Rectangle(200, 200, 200, 200);
  anotherRectToDrag.dragEnabled = true;
  shapes.push(anotherRectToDrag);
}

function draw(){
  background(50);

  fill(80);
  noStroke();

  shapes.forEach(s => s.draw());
}

function mousePressed(){
  shapes.filter(s => s.dragEnabled)
        .find(s => s.handleMousePressed());
}

function mouseDragged(){
  shapes.filter(s => s.isDragged)
        .forEach(s => s.handleMouseDragged());
}

function mouseReleased(){
  shapes.filter(s => s.dragEnabled)
        .forEach(s => s.handleMouseReleased());
}
