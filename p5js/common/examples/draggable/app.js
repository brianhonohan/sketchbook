var system;
var rectToDrag;
var anotherRectToDrag;
var circle;
var triangleToDrag;
var lineSeg;
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

  triangleToDrag = new Triangle(300, 50,  400, 50, 350, 100);
  triangleToDrag.dragEnabled = true;
  triangleToDrag.fillColor = color(180);
  shapes.push(triangleToDrag);

  lineSeg = new LineSegment(50, 450, 150, 350);
  lineSeg.dragEnabled = true;
  lineSeg.strokeColor = color(230);
  shapes.push(lineSeg);
}

function draw(){
  background(50);

  noStroke();

  shapes.forEach(s => s.draw());
  lineSeg.drawDraggablePoints();
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
  shapes.filter(s => s.isDragged)
        .forEach(s => s.handleMouseReleased());
}
