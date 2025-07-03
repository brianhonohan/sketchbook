
let canvas;
let gui;
let systemRebuildTimeout;
let shapes;
let polygon;
let lineSeg;
let intersectionPoints = []; // for future use

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
  shapes.push( buildDraggableLine() );
  updateIntersectionPoints();
}

function generatePolygon(){
  let currentAng = Math.random() * TWO_PI;

  const minRadius = Math.min(width, height) * 0.2;
  const maxRadius = Math.min(width, height) * 0.45; 
  
  let multisidedFig = Polygon2D.generateIrregularPolygon((width/2), (height/2),
                                       settings.num_sides, minRadius, maxRadius);
  polygon = new Polygon();
  polygon.setPoints(multisidedFig.points);

  polygon.noFill = true;
  polygon.strokeColor = color(230);
  polygon.strokeWeight = 2;
  polygon.dragEnabled = true;
  return polygon;
}

function buildDraggableLine(){
  lineSeg = new LineSegment(0.2 * width, 0.8 * height,
                            0.8 * width, 0.2 * height);
  lineSeg.dragEnabled = true;
  return lineSeg;
}

function draw(){
  background(50);
  shapes.forEach(s => s.draw());
  
  intersectionPoints.forEach(pt => pt.draw());
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

  if (noRedraw) {
    return;
  }
  
  if (systemRebuildTimeout) {
    clearTimeout(systemRebuildTimeout);
  }
  systemRebuildTimeout = setTimeout(regenerate, 100);
}

function updateIntersectionPoints(){
  if (shapes.length === 1) {
    return;
  }

  intersectionPoints = [];
  intersectionPoints = polygon.intersectionPointsWithLineSeg(lineSeg);
  intersectionPoints = intersectionPoints.map(pt => {
    const newPoint = new Point(pt.x, pt.y);
    newPoint.strokeColor = color(200, 100, 100);
    newPoint.strokeWeight = 10;
    return newPoint;
  });
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

  updateIntersectionPoints();
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
