var system;
var bezierCurve;
var polybezier;
var bezierCircle;

function setup() {
  // createCanvas(windowWidth, windowHeight-35);
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

function touchStarted(){
  mousePressed();
}

function mouseDragged(){
  shapes.filter(s => s.isDragged == true)
        .forEach(s => s.handleMouseDragged());
}

function mouseReleased(){
  shapes.filter(s => s.dragEnabled == true)
        .forEach(s => s.handleMouseReleased());
}

function touchEnded(){
  mouseReleased();
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

  // BezierCurve accepts the points in the same order as p5.js

  // When adding additional Bezier curves to a connected 'Polybezier'
  // (or attaching a new Bezier curve to an existing one)
  // the first point in the new Bezier doesn't matter, 
  // because it will be set to the last point in the Bezier curve
  // that it is being connected to.
  let _anyValue = 100;

  let polybezier = new Polybezier();
  polybezier.append(new BezierCurve(0.3 * width, 0.4 * height,
                                     0.15 * width, 0.45 * height,
                                     0.1 * width, 0.65 * height,
                                     0.2 * width, 0.7 * height));
  polybezier.append(new BezierCurve(_anyValue, _anyValue,
                                    0.3 * width, 0.8 * height,
                                    0.5 * width, 0.8 * height,
                                    0.6 * width, 0.8 * height));
  polybezier.append(new BezierCurve(_anyValue, _anyValue,
                                    0.7 * width, 0.75 * height,
                                    0.7 * width, 0.7 * height,
                                    0.5 * width, 0.61 * height));
  polybezier.append(new BezierCurve(_anyValue, _anyValue,
                                    0.4 * width, 0.55 * height,
                                    0.4 * width, 0.3 * height,
                                    0.3 * width, 0.4 * height));
  polybezier.close();
  polybezier.smooth(Polybezier.SMOOTH_MODE_TRAILING);
  polybezier.dragEnabled = true;
  polybezier.noFill = true;
  polybezier.strokeColor = color(255);
  shapes.push(polybezier);

  bezierCircle = Polybezier.circle(0.7 * width, 0.3 * height, 0.15 * width);
  shapes.push(bezierCircle);
}