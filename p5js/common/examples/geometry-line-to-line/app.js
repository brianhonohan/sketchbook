var canvas;
var lineSegment;
var lineSegment2;
var shapes;
var vertMargin = determineVerticalMargin();

function setup(){
  // canvas =   createCanvas(500, 500);
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);

  lineSeg = new LineSegment(0.2 * width, 0.8 * height,
                            0.8 * width, 0.2 * height);
  lineSeg.dragEnabled = true;
  
  lineSeg2 = new LineSegment(0.2 * width, 0.2 * height,
    0.6 * width, 0.6 * height);
  lineSeg2.dragEnabled = true;

  shapes = [];
  shapes.push(lineSeg, lineSeg2);
}

function draw(){
  background(50);

  stroke(230);
  strokeWeight(2);
  lineSeg.draw();
  lineSeg2.draw();

  highlightIntersectionPoint();
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
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
  
}

function mouseReleased(){
  shapes.filter(s => s.isDragged)
        .forEach(s => s.handleMouseReleased());
}

function highlightIntersectionPoint(){
  let intersectionCoords = Line.intersectionPoint(lineSeg.getLine(), lineSeg2.getLine());
  if (intersectionCoords == undefined) {
    console.log(intersectionCoords);
    return;
  }
  stroke(200, 100, 100);
  strokeWeight(10);
  intersectionPoint = new Point(intersectionCoords.x, intersectionCoords.y);
  intersectionPoint.draw();

}