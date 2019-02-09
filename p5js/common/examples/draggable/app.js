var system;
var rectToDrag;
var anotherRectToDrag;
var circle;
var shapes;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  shapes = [];

  rectToDrag = new Rectangle(50, 50, 200, 200);
  rectToDrag.dragEnabled = true;
  rectToDrag.fillColor = color(80);
  shapes.push(rectToDrag);

  anotherRectToDrag = new Rectangle(200, 200, 200, 200);
  anotherRectToDrag.dragEnabled = true;
  anotherRectToDrag.fillColor = color(120);
  shapes.push(anotherRectToDrag);

  circle = new Circle(100, 300, 50);
  circle.dragEnabled = true;
  circle.fillColor = color(150);
  shapes.push(circle);
}

function draw(){
  background(50);

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
