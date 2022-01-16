var canvas;
var circle;
var lineSegment;
var geomCircleLine;

function setup(){
  canvas =   createCanvas(windowWidth, windowHeight);

  circle = new Circle(width/2, height/2,  100);
  lineSeg = new LineSegment(0.2 * width, 0.8 * height,
                            0.8 * width, 0.2 * height);
  lineSeg.dragEnabled = true;

  let line = lineSeg.getLine();
  geomCircleLine = new CircleLineIntersection(circle, line);
}

function draw(){
  background(50);

  noFill();
  stroke(230);
  strokeWeight(2);
  circle.draw();

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

  noStroke();
  fill(200, 100, 100);
  ellipse(points[0].x, points[0].y, 10, 10);
  ellipse(points[1].x, points[1].y, 10, 10);
}
