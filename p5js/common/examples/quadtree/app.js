var canvas;
var quadtree;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  let fullCanvas = new Rect(0, 0, width, height);
  quadtree = new Quadtree(fullCanvas, 5);
}

function draw(){
  background(50);

  noFill();
  stroke(0, 230, 0);
  drawQuadtree(quadtree);
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}

function mousePressed(){
  quadtree.add({x: mouseX, y: mouseY});
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