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


var gui;
var systemParams = {
  sitesPerDiagram: 200,
  highlightNeighbors: true,
  drawFourDiagrams: true,
}

function setup() {
  // createCanvas(windowWidth, windowHeight-35);
  createCanvas(800, 600);

  gui = P5JsSettings.addDatGui({autoPlace: false});
  guiSitesPerDiagrams = gui.add(systemParams, "sitesPerDiagram").min(1).max(5000).step(50);
  gui.add(systemParams, "highlightNeighbors");
  guiDrawFourDiagrams = gui.add(systemParams, "drawFourDiagrams");
  addGuiListeners();

  generatePointsForDiagrams();
}

function generatePointsForDiagrams(){
  if (systemParams.drawFourDiagrams){
    halfWidth = 0.5 * width;
    halfHeight = 0.5 * height;
  } else {
    halfWidth = width;
    halfHeight = height;  
  }
  bbox = {xl: 0, xr: halfWidth, yt: 0, yb: halfHeight}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom

  sites = randomPointsWithin(systemParams.sitesPerDiagram, bbox);
  voronoiOne = createVoronoi(sites, bbox);
  
  if (systemParams.drawFourDiagrams){
    sites = randomPointsWithin(systemParams.sitesPerDiagram, bbox);
    voronoiTwo = createVoronoi(sites, bbox);

    sites = randomPointsWithin(systemParams.sitesPerDiagram, bbox);
    voronoiThree = createVoronoi(sites, bbox);

    sites = randomPointsWithin(systemParams.sitesPerDiagram, bbox);
    voronoiFour = createVoronoi(sites, bbox);
  }
}

function addGuiListeners(){
  guiSitesPerDiagrams.onFinishChange(function(value) {
    generatePointsForDiagrams();
  });
  guiDrawFourDiagrams.onFinishChange(function(value) {
    generatePointsForDiagrams();
  });
}

function draw(){
  voronoiSiteStrokeWeight(2);
  stroke(50);
  strokeWeight(0.5)

  voronoiSiteStroke(color(180,50, 50));
  fill(50, 180, 50);
  drawVoronoi(voronoiOne, 0, 0);
  
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
  diagram = diagramForXY(x, y);
  if (diagram == undefined){
    return;
  }
  cell = diagram.getCellAtXY(x % halfWidth, y % halfHeight);
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

  if (systemParams.highlightNeighbors){
    for(let i = 0; i < highlightedCellNeighbors.length; i++){
      fill(180, 110, 100);
      drawVoronoiCell(highlightedCellNeighbors[i], 0, 0, VOR_CELLDRAW_RELATIVE, true);
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