var canvas;
var quadtree;
let lastTouch;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  let fullCanvas = new Rect(0, 0, width, height);
  quadtree = new Quadtree(fullCanvas, 5, false);

  addRandomRects();
}

function draw(){
  background(50);

  noFill();
  stroke(0, 230, 0);
  drawQuadtree(quadtree);

  highlightUnderMouse();
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}

function touchMoved(){
  lastTouch = touches[0];
}

function addRandomRects(){
  for (let i = 0; i < 300; i++){

    quadtree.add({x: randomGaussian(width/2, width/4),
                  y: randomGaussian(height/2, height/4),
                  width: 5 + random(40),
                  height: 5 + random(40)});
  }
}

function drawQuadtree(qt){
  if (qt.expanded){
    qt.quadrants.forEach(q => drawQuadtree(q));
  } else {
    strokeWeight(1)
    qt.objects.forEach(obj => {
      stroke(150, 200, 150);
      rect(obj.x, obj.y, obj.width, obj.height);  
    });
    strokeWeight(0.5);
    stroke(0, 230, 0);
    rect(qt.area.x, qt.area.y, qt.area.width, qt.area.height);
  }
}

function highlightUnderMouse(){
  let objects;
  if (lastTouch){
    objects = quadtree.find(lastTouch);
  } else {
    objects = quadtree.find({x: mouseX, y: mouseY});
  }
  
  strokeWeight(2);
  stroke(230, 230, 0);

  objects.forEach(obj => rect(obj.x, obj.y, obj.width, obj.height) );
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