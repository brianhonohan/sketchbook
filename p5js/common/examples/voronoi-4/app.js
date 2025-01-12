let voronoiOne;
let voronoiTwo;
let voronoiThree;
let voronoiFour;

let halfWidth;
let halfHeight;
let bbox;
let highlightedCell;
let highlightedOffset;
let highlightedCellNeighbors;
let lastTouch;
const sitesList = [];

var gui;
var systemParams = {
  sitesPerDiagram: 200,
  highlightNeighbors: true,
  drawFourDiagrams: false,
  useQuadtree: true,
  useD3Delaunay: true,
  pause: false,
}
let genericGuiListeners;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  // createCanvas(500, 500);

  gui = P5JsSettings.addDatGui({autoPlace: false});
  genericGuiListeners = [];
  guiSiteCountListener = gui.add(systemParams, "sitesPerDiagram").min(1).max(20000).step(50);
  genericGuiListeners.push(gui.add(systemParams, "highlightNeighbors"));
  guiDrawFourListener = gui.add(systemParams, "drawFourDiagrams");
  genericGuiListeners.push(gui.add(systemParams, "useQuadtree"));
  genericGuiListeners.push(gui.add(systemParams, "useD3Delaunay"));
  p5jsUtilPauseListnener = gui.add(systemParams, "pause");
  addGuiListeners();
  
  sitesList[0] = randomPointsWithin(systemParams.sitesPerDiagram, getBbox());

  generatePointsForDiagrams();
  recomputeDiagrams();
}

function getBbox(){
  if (systemParams.drawFourDiagrams){
    halfWidth = 0.5 * width;
    halfHeight = 0.5 * height;
  } else {
    halfWidth = width;
    halfHeight = height;  
  }
  bbox = {xl: 0, xr: halfWidth, yt: 0, yb: halfHeight}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
  return bbox;
}

function generatePointsForDiagrams(){
  sitesList[0] = randomPointsWithin(systemParams.sitesPerDiagram, getBbox());
  if (systemParams.drawFourDiagrams){
    sitesList[1] = randomPointsWithin(systemParams.sitesPerDiagram, bbox);
    sitesList[2] = randomPointsWithin(systemParams.sitesPerDiagram, bbox);
    sitesList[3] = randomPointsWithin(systemParams.sitesPerDiagram, bbox);
  }
}

function recomputeDiagrams(){
  // sites = randomPointsWithin(systemParams.sitesPerDiagram, getBbox());
  voronoiOne = createVoronoi(sitesList[0], bbox, systemParams.useD3Delaunay);

  highlightedCell = undefined;
  highlightedOffset = undefined;
  highlightedCellNeighbors = undefined;
  
  if (systemParams.drawFourDiagrams){
    voronoiTwo = createVoronoi(sitesList[1], bbox);
    voronoiThree = createVoronoi(sitesList[2], bbox);
    voronoiFour = createVoronoi(sitesList[3], bbox);
  }
}

function addGuiListeners(){
  guiSiteCountListener.onFinishChange(() => { generatePointsForDiagrams(); recomputeDiagrams(); });
  guiDrawFourListener.onFinishChange(() => { generatePointsForDiagrams(); recomputeDiagrams(); });
  genericGuiListeners.forEach(l => l.onFinishChange( () => recomputeDiagrams() ));
  p5jsUtilPauseListnener.onFinishChange(() => P5JsUtils.toggleLoop() );
}

function draw(){
  voronoiSiteStrokeWeight(2);
  stroke(50);
  strokeWeight(0.5)

  voronoiSiteStroke(color(180,50, 50));
  fill(50, 180, 50);
  drawVoronoi(voronoiOne, 0, 0, { redrawAll: false, useD3: systemParams.useD3Delaunay});
  
  if (systemParams.drawFourDiagrams){
    voronoiSiteStroke(color(180,100, 180));
    fill(180, 180, 50);
    drawVoronoi(voronoiTwo, halfWidth, 0);
    
    voronoiSiteStroke(color(180,100, 50));
    fill(50, 180, 180);
    drawVoronoi(voronoiThree, 0, halfHeight);

    voronoiSiteStroke(color(180,100, 50));
    fill(50, 50, 180);
    drawVoronoi(voronoiFour, halfWidth, halfHeight);
  }
  
  drawHighlightedCell();
}

function mouseMoved(){
  highlightUnderMouse();
}

function touchMoved(){
  lastTouch = touches[0];
  highlightUnderMouse()
}

function highlightUnderMouse(){
  if (lastTouch){
    updatedHighlightCell(lastTouch.x, lastTouch.y);
  } else {
    updatedHighlightCell(mouseX, mouseY);
  }
}

function updatedHighlightCell(x, y){
  if (systemParams.useD3Delaunay){
    // unsupported
    return;
  }

  diagram = diagramForXY(x, y);
  if (diagram == undefined){
    return;
  }
  cell = diagram.getCellAtXY(x % halfWidth, y % halfHeight,
                    {useQuadTree: systemParams.useQuadtree});
  if (cell == undefined){
    return;
  }
  if (cell == highlightedCell){
    return;
  }
  highlightedOffset = {x: Math.floor(x/halfWidth) * halfWidth, y: Math.floor(y/halfHeight) * halfHeight};
  highlightedCell = cell;
  
  if (systemParams.highlightNeighbors){
    highlightedCellNeighbors = diagram.neighborsOfCell(cell);
  }
}

function drawHighlightedCell(){
  if (highlightedCell == undefined){
    return;
  }
  push()
  fill(180, 50, 50);
  stroke(200);
  translate(highlightedOffset.x, highlightedOffset.y);
  drawVoronoiCell(highlightedCell, 0, 0, VOR_CELLDRAW_RELATIVE);
  highlightedCell.needsRedraw = true;

  if (systemParams.highlightNeighbors){
    for(let i = 0; i < highlightedCellNeighbors.length; i++){
      fill(180, 110, 100);
      drawVoronoiCell(highlightedCellNeighbors[i], 0, 0, VOR_CELLDRAW_RELATIVE, true);
      highlightedCellNeighbors[i].needsRedraw = true;
    }
  }
  pop();
}

function diagramForXY(x, y){
  if (x < halfWidth && y < halfHeight){
    return voronoiOne;
  } else if (x >= halfWidth && y < halfHeight){
    return voronoiTwo;
  } else if (x < halfWidth && y >= halfHeight){
    return voronoiThree;
  } else {
    return voronoiFour;
  }
}

function randomPointsWithin(number, bbox){
  return Array(number).fill().map(() => ({x: random(bbox.xl, bbox.xr), y: random(bbox.yt, bbox.yb)}));
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    case '0':
      P5JsUtils.toggleLoop();
      break;
  }
}