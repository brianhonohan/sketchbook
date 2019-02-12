var canvas;
var quadtree;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  let fullCanvas = new Rect(0, 0, width, height);
  quadtree = new Quadtree(fullCanvas, 5);

  addRandomPoints();
}

function draw(){
  background(50);

  noFill();
  stroke(0, 230, 0);
  drawQuadtree(quadtree);

  highlightAroundMouse();
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}

function mousePressed(){
  quadtree.add({x: mouseX, y: mouseY});
}

function addRandomPoints(){
  for (let i = 0; i < 500; i++){
     quadtree.add({x: randomGaussian(width/2, width/4),
                   y: randomGaussian(height/2, height/4)});
  }
}

function drawQuadtree(qt){
  if (qt.expanded){
    qt.quadrants.forEach(q => drawQuadtree(q));
  } else {
    strokeWeight(1)
    qt.objects.forEach(obj => {
      point(obj.x, obj.y);
    });
    strokeWeight(0.5);
    rect(qt.area.x, qt.area.y, qt.area.width, qt.area.height);
  }
}

function highlightAroundMouse(){
  const areaWidth = 100;
  const areaAroundMouse = new Rect(mouseX - areaWidth / 2,
                                   mouseY - areaWidth / 2,
                                   areaWidth,
                                   areaWidth
                                  );
  stroke(240, 50, 50);
  rect(areaAroundMouse.x, areaAroundMouse.y, areaAroundMouse.width, areaAroundMouse.height);

  const nearbyObjs = quadtree.find(areaAroundMouse);

  strokeWeight(2);
  stroke(230, 230, 0);

  nearbyObjs.forEach(obj => point(obj.x, obj.y) );
}