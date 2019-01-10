var canvas;
var circle;
var lineSegment;

function setup(){
  canvas = createCanvas(500, 500);

  circle = new Circle(300, height/2,  100);
  lineSeg = new LineSegment(150, 350, 400, 100);
}

function draw(){
  background(50);

  noFill();
  stroke(230);
  strokeWeight(2);
  circle.draw();

  lineSeg.drawDraggablePoints();

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
}

function mouseReleased(){
  lineSeg.handleMouseReleased();
}
