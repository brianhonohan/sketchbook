var canvas;
var circle;
var lineSegment;
var geomCircleLine;

function setup(){
  canvas = createCanvas(500, 500);

  circle = new Circle(300, height/2,  100);
  lineSeg = new LineSegment(150, 350, 400, 100);

  let line = lineSeg.getLine();
  geomCircleLine = new CircleLineIntersection(circle, line);
}

function draw(){
  background(50);

  noFill();
  stroke(230);
  strokeWeight(2);
  circle.draw();

  lineSeg.drawDraggablePoints();
  highlightIntersectionPoints();

  stroke(230);
  strokeWeight(2);
  lineSeg.draw();
}

function keyTyped(){
  switch (key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}

function mousePressed(){
  lineSeg.handleMousePressed();
}

function mouseDragged(){
  lineSeg.handleMouseDragged();
  geomCircleLine.line = lineSeg.getLine();
}

function mouseReleased(){
  lineSeg.handleMouseReleased();
}

function highlightIntersectionPoints(){
  const points = geomCircleLine.intersectionPoints();

  if (points.length == 0){
    return;
  }

  fill(200, 100, 100);
  ellipse(points[0].x, points[0].y, 10, 10);
  ellipse(points[1].x, points[1].y, 10, 10);
}
