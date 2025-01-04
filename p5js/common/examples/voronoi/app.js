let voronoiOne;
let voronoiTwo;
let voronoiThree;
let voronoiFour;

let halfWidth;
let halfHeight;
let bbox;

function setup() {
  createCanvas(windowWidth, windowHeight-35);

  P5JsSettings.init();

  halfWidth = 0.5 * width;
  halfHeight = 0.5 * height;

  let sites;
  bbox = {xl: 0, xr: halfWidth, yt: 0, yb: halfHeight}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom

  sites = randomPointsWithin(10, bbox);
  voronoiOne = createVoronoi(sites, bbox);

  sites = randomPointsWithin(10, bbox);
  voronoiTwo = createVoronoi(sites, bbox);

  sites = randomPointsWithin(10, bbox);
  voronoiThree = createVoronoi(sites, bbox);

  sites = randomPointsWithin(10, bbox);
  voronoiFour = createVoronoi(sites, bbox);
}

function draw(){
  background(255);
  
  voronoiSiteStrokeWeight(10);
  voronoiSiteStroke(color(180,50, 50));

  strokeWeight(1)
  fill(50, 180, 50);
  drawVoronoi(voronoiOne, 0, 0);
  
  voronoiSiteStrokeWeight(10);
  voronoiSiteStroke(color(180,100, 180));

  fill(180, 180, 50);
  drawVoronoi(voronoiTwo, halfWidth, 0);
  
  voronoiSiteStroke(color(180,100, 50));

  fill(50, 180, 180);
  drawVoronoi(voronoiThree, 0, halfHeight);

  fill(50, 50, 180);
  drawVoronoi(voronoiFour, halfWidth, halfHeight);
  
  noLoop();
}

function mousePressed(){
  sites = randomPointsWithin(10, bbox);

  if (mouseX < halfWidth && mouseY < halfHeight){
    voronoiOne = createVoronoi(sites, bbox);
  } else if (mouseX >= halfWidth && mouseY < halfHeight){
    voronoiTwo = createVoronoi(sites, bbox);
  } else if (mouseX < halfWidth && mouseY >= halfHeight){
    voronoiThree = createVoronoi(sites, bbox);
  } else {
    voronoiFour = createVoronoi(sites, bbox);
  }
  draw();
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