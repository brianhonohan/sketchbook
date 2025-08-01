
let canvas;
let gui;
let shapes;
let polygonObj;
let voronoiSites;
let voronoiDiagram;

const settings = {
  num_sides: 5,
  show_bounding_box: false,
  approx_points: 30,
  show_points: true, 
  voronoi_options: {
    show_vertices: true,
    show_edges: true,
  }
}

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createAutosizedCanvas();
  P5JsSettings.init();
  UtilFunctions.random = random; // monkey patch UtilFunctions to use p5's random
  UtilFunctions.randomGaussian = randomGaussian; // monkey patch UtilFunctions to use p5's
  shapes = [];

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(settings, 'num_sides', 3, 100, 1).onChange(regenerate);
  gui.add(settings, 'show_bounding_box');
  gui.add(settings, 'approx_points', 3, 500, 1).onChange(regenerate);
  gui.add(settings, 'show_points');

  let voronoiGui = gui.addFolder("Voronoi Options");
  voronoiGui.add(settings.voronoi_options, 'show_vertices');
  voronoiGui.add(settings.voronoi_options, 'show_edges');

  gui.add(window, 'reset');
  gui.add(window, 'regenerate');
  gui.add(window, 'clipToPolygon');

  regenerate();
  P5JsSettings.collapseGuiIfNarrow(gui);
}

function reset(){
  P5JsSettings.resetSeed();
  regenerate();
}

function regenerate(){
  shapes = [];

  polygonObj = generatePolygon();
  shapes.push(polygonObj);
  // shapes.push( buildDraggablePoint() );
  generatePointsInPolygon(polygonObj, settings.approx_points);

  voronoiOne = Voronoi.createDiagramInPolygon(voronoiSites, polygonObj);
}

function clipToPolygon(){
  voronoiOne.clipToPolygon(polygonObj);
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

function generatePointsInPolygon(polygon, numPoints){
  voronoiSites = [];
  const boundingRect = polygon.getBoundingRect();
  let x, y;
  const tryLimit = 20;

  for (let i = 0; i < numPoints; i++) {
    // Try to find a point inside the polygon
    for (let j = 0; j < tryLimit; j++) {  
      x = boundingRect.minX + random() * boundingRect.width;
      y = boundingRect.minY + random() * boundingRect.height;
      if (polygon.containsXY(x, y)) {
        voronoiSites.push(new Point(x, y));
        break; // Found a valid point, exit the inner loop
      }
    }
  }
  return voronoiSites;
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

  voronoiSiteStrokeWeight(2);
  stroke(50);
  strokeWeight(0.5);
  voronoiSiteStroke(color(180,50, 50));
  fill(30, 150, 30);
  drawVoronoi(voronoiOne, 0, 0, { redrawAll: true });

  if (settings.voronoi_options.show_vertices) {
    for (let v of voronoiOne.vertices) {
      fill(200, 100, 100);
      ellipse(v.x, v.y, 5, 5);
    }
  }

  shapes.forEach(s => s.draw());
  highlightPointIfInPolygon();

  if (settings.show_bounding_box) {
    noFill();
    stroke(50, 230, 230);
    strokeWeight(1);
    P5JsUtils.drawRect(polygonObj.getBoundingRect());
  }

  if (settings.show_points && voronoiSites) {
    noStroke();
    fill(50, 230, 230);
    voronoiSites.forEach(p => ellipse(p.x, p.y, 5, 5));
  }
  
  if (settings.voronoi_options.show_edges) {
    for (let edge of voronoiOne.edges) {
      stroke(200, 200, 100);
      line(edge.va.x, edge.va.y, edge.vb.x, edge.vb.y);
    }
  }
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
