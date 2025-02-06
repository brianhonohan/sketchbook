var system;
var bezierCurve;
let pointsAlongCurve;
let tangentLine;

const settings = {
  enable_drag: true,
  num_points: 5,
  tangent: {
    draw: true,
    percent: 0.25
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  // createCanvas(500, 500);
  P5JsSettings.init();
  resetShapes();

  pointsAlongCurve = [];
  
  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(settings, "enable_drag").onChange(updateDragEnabled);
  let pointsGui = gui.addFolder("Points Along Curve Debug");
  pointsGui.open();
  pointsGui.add(settings, "num_points", 0, 10, 1).onChange(drawIntermediatePoints);
  
  let tangentGui = gui.addFolder("Tangent Debug");
  tangentGui.open();
  tangentGui.add(settings.tangent, "draw");
  tangentGui.add(settings.tangent, "percent", 0, 1, 0.02);

  drawIntermediatePoints();
}

function draw(){
  background(50);

  noStroke();
  strokeWeight(1);
  shapes.forEach(s => s.draw());

  stroke(200, 200, 50);
  fill(200, 200, 50);
  strokeWeight(12);
  pointsAlongCurve.forEach(p => p.draw());

  if (settings.tangent.draw){
    tangentLine = bezierCurve.tangentAt(settings.tangent.percent);
    stroke(50, 200, 200);
    strokeWeight(2);
    tangentLine.setLength(50);
    tangentLine.draw();
  }
}

function updateDragEnabled(){
  shapes.forEach(s => s.dragEnabled = settings.enable_drag);
}

function drawIntermediatePoints(){
  pointsAlongCurve = [];
  if (settings.num_points == 0){ return; }

  const fraction = 1.0 / (settings.num_points + 1);

  for (let i = 1; i <= settings.num_points; i++){
    pointsAlongCurve.push(bezierCurve.pointAt(fraction * i));
  }
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

  bezierCurve = new BezierCurve(0.2 * width, 0.8 * height,
                                0.4 * width, 0.8 * height,
                                0.6 * width, 0.2 * height,
                                0.8 * width, 0.2 * height);
  bezierCurve.dragEnabled = true;
  // bezierCurve.makeLinear();
  // bezierCurve.move(150, 180);
  bezierCurve.strokeColor = color(255);
  shapes.push(bezierCurve);
}