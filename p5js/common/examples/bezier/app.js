var system;
var bezierCurve;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  shapes = [];

  bezierCurve = new BezierCurve(0.2 * width, 0.4 * height,
                                0.4 * width, 0.4 * height,
                                0.6 * width, 0.2 * height,
                                0.8 * width, 0.2 * height);
  bezierCurve.dragEnabled = true;
  // bezierCurve.fillColor = color(80);
  // bezierCurve.move(150, 180);
  shapes.push(bezierCurve);
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
