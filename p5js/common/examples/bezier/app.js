var system;
var bezierCurve;
var polybezier;
var bezierCircle;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();
  resetShapes();
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

function keyPressed(){
  switch(key){
    case 'd':
      shapes.forEach(s => s.toggleDragEnabled());
      break;
    case 'r':
      resetShapes();
      break;
  }
}

function resetShapes(){
  shapes = [];

  bezierCurve = new BezierCurve(0.2 * width, 0.4 * height,
                                0.4 * width, 0.4 * height,
                                0.6 * width, 0.2 * height,
                                0.8 * width, 0.2 * height);
  bezierCurve.dragEnabled = true;
  // bezierCurve.makeLinear();
  // bezierCurve.move(150, 180);
  shapes.push(bezierCurve);

  polybezier = new Polybezier();
  polybezier.append(new BezierCurve(0.2 * width, 0.5 * height,
                                0.3 * width, 0.6 * height,
                                0.3 * width, 0.8 * height,
                                0.2 * width, 0.8 * height));
  polybezier.append(new BezierCurve(100, 10,  // first point doesn't matter
                                0.45 * width, 0.75 * height,
                                0.55 * width, 0.75 * height,
                                0.8 * width, 0.8 * height));
  polybezier.append(new BezierCurve(10, 100,  // first point doesn't matter
                                0.7 * width, 0.8 * height,
                                0.7 * width, 0.7 * height,
                                0.8 * width, 0.5 * height));
  polybezier.close();
  polybezier.smooth(Polybezier.SMOOTH_MODE_TRAILING);
  polybezier.dragEnabled = true;
  shapes.push(polybezier);

  bezierCircle = Polybezier.circle(0.7 * width, 0.5 * height, 0.15 * width);
  shapes.push(bezierCircle);
}