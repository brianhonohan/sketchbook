
let canvas;
let gui;
let shapes;

const settings = {
  num_sides: 5,
}

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createAutosizedCanvas();
  P5JsSettings.init();
  shapes = [];

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(settings, 'num_sides', 3, 12, 1).onChange(regenerate);

  regenerate();
  P5JsSettings.collapseGuiIfNarrow(gui);
}

function regenerate(){
  shapes = [];
  shapes.push( generatePolygon() );
  shapes.push( buildDraggablePoint() );
}

function generatePolygon(){
  let currentAng = Math.random() * TWO_PI;

  const minRadius = Math.min(width, height) * 0.2;
  const maxRadius = Math.min(width, height) * 0.45; 
  
  let multisidedFig = Polygon2D.generateIrregularPolygon((width/2), (height/2),
                                       settings.num_sides, minRadius, maxRadius);
  let polygon = new Polygon();
  polygon.setPoints(multisidedFig.points);

  polygon.noFill = true;
  polygon.strokeColor = color(230);
  polygon.strokeWeight = 2;
  polygon.dragEnabled = true;
  return polygon;
}

function buildDraggablePoint(){
  let x = Math.random() * width;
  let y = Math.random() * height;
  let point = new Point(x, y);
  point.dragEnabled = true;
  // point.strokeWeight = 2;
  return point;
}

function draw(){
  background(50);
  shapes.forEach(s => s.draw());
  highlightPointIfInPolygon();
}

function createAutosizedCanvas(){
  canvas = createCanvas();
  windowResized(undefined, true);
  return canvas;
}

function windowResized(event, noRedraw = false) {
  resizeCanvas(innerWidth, 
              innerHeight - drawingContext.canvas.getBoundingClientRect().top,
              noRedraw);
}

function detectIfPointInPolygon(){
  if (shapes.length === 1) {
    return;
  }
  let polygon = shapes[0];
  let pointObj = shapes[1];
  if (polygon instanceof Polygon && pointObj instanceof Point) {
    pointObj.isInPolygon = polygon.containsXY(pointObj.x, pointObj.y);
  }
}

function highlightPointIfInPolygon(){
  let pointObj = shapes[1];

  if (!(pointObj instanceof Point)) {
    return;
  }
  if (!pointObj.isInPolygon) {
    return;
  }
  noStroke();
  fill(200, 100, 100);
  ellipse(pointObj.x, pointObj.y, 10, 10);
}

function mousePressed(event){
  if (event.target.nodeName != "CANVAS") {
    return;
  }
  shapes.filter(s => s.dragEnabled)
        .find(s => s.handleMousePressed());
}

function mouseDragged(event){
  if (event.target.nodeName != "CANVAS") {
    return;
  }
  shapes.filter(s => s.isDragged)
        .forEach(s => s.handleMouseDragged());

  detectIfPointInPolygon();
}

function mouseReleased(event){
  if (event.target.nodeName != "CANVAS") {
    return;
  }
  shapes.filter(s => s.isDragged)
        .forEach(s => s.handleMouseReleased());
}


function keyTyped(){
  switch (key) {
    case 'P':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}
