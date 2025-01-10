var canvas;
var pointObj;
var lineSegment;
var geomPointLine;
var shapes;

function setup(){
  canvas =   createCanvas(windowWidth, windowHeight);

  pointObj = new Point(width/4, height/4);
  pointObj.dragEnabled = true;
  lineSeg = new LineSegment(0.2 * width, 0.8 * height,
                            0.8 * width, 0.2 * height);
  lineSeg.dragEnabled = true;

  geomPointLine = new PointToLine(pointObj, lineSeg);

  closestPoint = new Point(geomPointLine.closestX(), geomPointLine.closestY());

  shapes = [];
  shapes.push(lineSeg, pointObj);
}

function draw(){
  background(50);

  noStroke();
  pointObj.draw();

  stroke(230);
  strokeWeight(2);
  lineSeg.draw();

  highlightClosestPoint();
}

function keyTyped(){
  switch (key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}

function mousePressed(){
  shapes.filter(s => s.dragEnabled)
        .find(s => s.handleMousePressed());
}

function mouseDragged(){
  shapes.filter(s => s.isDragged)
        .forEach(s => s.handleMouseDragged());
  closestPoint = new Point(geomPointLine.closestX(), geomPointLine.closestY());
}

function mouseReleased(){
  shapes.filter(s => s.isDragged)
        .forEach(s => s.handleMouseReleased());
}

function highlightClosestPoint(){

  color(200,50, 50);
  strokeWeight(10);
  closestPoint.draw();

}