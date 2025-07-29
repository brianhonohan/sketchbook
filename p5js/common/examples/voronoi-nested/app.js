
let canvas;
let gui;
let shapes;
let voronoiSites;
let voronoiDiagram;
let sitesPerCellAtDepth;

const settings = {
  num_levels: 2,
  level_0_pts: 3,
  level_1_pts: 3,
  level_2_pts: 3,
  level_3_pts: 5,
  show_points: true, 
  voronoi_options: {
    show_vertices: false,
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
  gui.add(settings, 'num_levels',2, 4, 1).onChange(regenerate);
  
  gui.add(settings, 'level_0_pts', 3, 30, 1).name('Level 1 - Num pts').onChange(regenerate);
  gui.add(settings, 'level_1_pts', 3, 30, 1).name('Level 2 - Num pts').onChange(regenerate);
  gui.add(settings, 'level_2_pts', 3, 30, 1).name('Level 3 - Num pts').onChange(regenerate);
  gui.add(settings, 'level_3_pts', 3, 30, 1).name('Level 4 - Num pts').onChange(regenerate);
  gui.add(settings, 'show_points').onChange(draw);

  let voronoiGui = gui.addFolder("Voronoi Options");
  voronoiGui.add(settings.voronoi_options, 'show_vertices').onChange(draw);
  voronoiGui.add(settings.voronoi_options, 'show_edges').onChange(draw);

  gui.add(window, 'reset');
  gui.add(window, 'regenerate');

  regenerate();

  gui.close();
  P5JsSettings.collapseGuiIfNarrow(gui);
}

function reset(){
  P5JsSettings.resetSeed();
  regenerate();
}

function regenerate(){
  shapes = [];

  sitesPerCellAtDepth = [];
  sitesPerCellAtDepth.push(settings.level_0_pts);
  sitesPerCellAtDepth.push(settings.level_1_pts);
  sitesPerCellAtDepth.push(settings.level_2_pts);
  sitesPerCellAtDepth.push(settings.level_3_pts);

  const mainBbox = getMainBoundingBox();
  const topLevelSites = generateRandomPoints(settings.level_0_pts, mainBbox);
  voronoiOne = createVoronoi(topLevelSites, mainBbox);

  voronoiOne.strokeColor = color(200);
  voronoiOne.strokeWeight = 1;
  
  voronoiOne.voronoiSiteStrokeWeight = 5;
  voronoiOne.voronoiSiteStroke = color(50,230, 230);
  voronoiOne.fillColor = color(30, 150, 30);

  let currentDepth = 0;
  nestVoronoiIn(voronoiOne, currentDepth+1, settings.num_levels);

  draw();
  noLoop();
}

function nestVoronoiIn(parentVoronoi, depth, depthLimit){
  if (depth > (depthLimit-1)) {
    return;
  }

  let sitesPerCell = sitesPerCellAtDepth[depth];
  for(let i = 0; i < parentVoronoi.cells.length; i++){
    let cell = parentVoronoi.cells[i];
    let cellAsPolygon = cell.asPolygon();

    let randPoints = generatePointsInPolygon(cellAsPolygon, sitesPerCell);
    cell.nestedDiagram = Voronoi.createDiagramInPolygon(randPoints, cellAsPolygon);
    cell.nestedDiagram.fillColor = P5JsUtils.getRandomBlue();
    nestVoronoiIn(cell.nestedDiagram, depth+1, depthLimit);
  }
}

function getMainBoundingBox(){
  return {xl: 0.1 * width, xr: 0.9 * width, yt: 0.1 * height, yb: 0.9 * height};
}

function generateRandomPoints(numPoints, bbox){
  let points = [];

  for(let i = 0; i < numPoints; i++){
    points.push({x: bbox.xl + random() * (bbox.xr - bbox.xl), 
                 y: bbox.yt + random() * (bbox.yb - bbox.yt)});
  }
  return points;
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

function draw(){
  background(50);

  voronoiOne.voronoiSiteNoStroke = !(settings.show_points);
  // drawVoronoi(voronoiOne, 0, 0, { redrawAll: true });
  drawVoronoiNested(voronoiOne, 0, 0, {nestedDiagram: 'nestedDiagram'});

  if (settings.voronoi_options.show_vertices) {
    for (let v of voronoiOne.vertices) {
      fill(200, 100, 100);
      ellipse(v.x, v.y, 5, 5);
    }
  }

  shapes.forEach(s => s.draw());
  
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

function mousePressed(event){
  if (event.target.nodeName != "CANVAS") {
    return;
  }
  shapes.filter(s => s.dragEnabled)
        .find(s => s.handleMousePressed());

  console.log(`Mouse pressed: ${mouseX}, ${mouseY}`);
}

function mouseDragged(event){
  if (event.target.nodeName != "CANVAS") {
    return;
  }
  shapes.filter(s => s.isDragged)
        .forEach(s => s.handleMouseDragged());
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
