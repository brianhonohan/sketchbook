let canvas;
let gui;
let shapes;
let polygonObj;
let point1;
let point2;
const sideHighlightModes = ['between points', 'touching points'];

const settings = {
  num_sides: 5,
  highlight_sides: 'touching points',
  contact_threshold: 1,
  clockwise: true
}

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createAutosizedCanvas();
  P5JsSettings.init();
  shapes = [];

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(settings, 'num_sides', 3, 12, 1).onChange(regenerate);
  gui.add(settings, 'contact_threshold', 0.1, 3, 0.1);
  gui.add(settings, 'highlight_sides', sideHighlightModes);
  gui.add(settings, 'clockwise');

  regenerate();
  P5JsSettings.collapseGuiIfNarrow(gui);
}

function regenerate(){
  shapes = [];
  shapes.push( generatePolygon() );
  shapes.push( buildDraggablePoint() );
  shapes.push( buildDraggablePoint() );
  
  polygonObj = shapes[0];
  point1 = shapes[1];
  point2 = shapes[2];
}

function generatePolygon(){
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
  point.strokeWeight = 2;
  return point;
}

function draw(){
  background(50);
  shapes.forEach(s => s.draw());
  highlightPoints();
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

function highlightPoints(){
  highlightPoint(point1);
  highlightPoint(point2);

  highlightSides();
}

function highlightPoint(pointObj){
  if (polygonObj.containsXY(pointObj.x, pointObj.y)) {
    noStroke();
    fill(200, 100, 100);
    ellipse(pointObj.x, pointObj.y, 10, 10);
  }
}

function highlightSides(){
  if (settings.highlight_sides === 'touching points') {
    [point1, point2].forEach(pointObj => {
      let side = polygonObj.sideViaPoint(pointObj, settings.contact_threshold);
      if (side) {
        stroke(200, 100, 100);
        strokeWeight(2);
        line(side.startX, side.startY, side.endX, side.endY);
      }
    });
    return;
  }

  if (settings.highlight_sides === 'between points') {
    let lineSegsBtw = polygonObj.lineSegmentsFromTo(point1, point2, settings.clockwise, settings.contact_threshold);
    lineSegsBtw.forEach(lineSeg => {
      stroke(200, 100, 100);
      strokeWeight(2);
      line(lineSeg.startX, lineSeg.startY, lineSeg.endX, lineSeg.endY);
    });
  }
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
  polygonObj.getSides(true);
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
