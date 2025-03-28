var canvas;
var quadtree;
let lastTouch;
let gui; 

const object_types = ['point', 'rect', 'line'];
const query_types = {
  point: ['rect'],
  rect: ['point', 'rect', 'line'],
  line: ['rect', 'line']
}

let settings = {
  object_type: 'line',
  query_type: 'rect',
  query_rect_size: 100,
  number_objects: 250
}

function setup() {
  // createCanvas(500, 500);
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(settings, 'object_type', object_types).onChange(regenerate);
  gui.add(settings, 'number_objects', 20, 10000, 10).onChange(regenerate);
  // gui.add(settings, 'query_type');
  gui.add(settings, 'query_rect_size', 20, 200, 10);
  regenerate();
}

function draw(){
  background(50);

  noFill();
  stroke(0, 230, 0);
  drawQuadtree(quadtree);

  highlightUnderMouse();
}

function regenerate(){
  let fullCanvas = new Rect(0, 0, width, height);
  let containsPoints = ('point' == settings.object_type);
  quadtree = new Quadtree(fullCanvas, 5, containsPoints);

  addRandomObjects();
}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}

function touchMoved(){
  lastTouch = touches[0];
}

function addRandomObjects(){
  for (let i = 0; i < settings.number_objects; i++){
    quadtree.add(randomObject());
  }
}

function randomObject(){
  const x = randomGaussian(width/2, width/4);
  const y = randomGaussian(height/2, height/4);

  switch (settings.object_type) {
    case 'point':
      return {x: x, y: y}; 
    case 'rect':
      return {x: x, y: y,
              width: 5 + random(40),
              height: 5 + random(40)};
    case 'line':
      const xDir = random([-1, 1]);
      const yDir = random([-1, 1]);
      return new LineSeg(x, y, 
                  x + xDir * (5 + randomGaussian(40, 20)),
                  y + yDir * (5 + randomGaussian(40, 20)));
  }
}

function drawQuadtree(qt){
  if (qt.expanded){
    qt.quadrants.forEach(q => drawQuadtree(q));
  } else {
    strokeWeight(1)
    stroke(150, 200, 150);
    qt.objects.forEach(obj => {drawObject(obj); });

    strokeWeight(0.5);
    stroke(0, 230, 0);
    rect(qt.area.x, qt.area.y, qt.area.width, qt.area.height);
  }
}

function drawObject(obj){
  if (obj instanceof LineSeg) {
    line(obj.startX, obj.startY, obj.endX, obj.endY);
    return;
  }

  if (obj.width != undefined && obj.height != undefined) {
    rect(obj.x, obj.y, obj.width, obj.height);
    return;
  }
  // Default to point if no other type matches
  if (obj.x != undefined && obj.y != undefined) {
    point(obj.x, obj.y);
    return;
  }
}

function highlightUnderMouse(){
  let cursorPt =  (lastTouch) ? lastTouch : {x: mouseX, y: mouseY};
  let queryObj = cursorPt;

  if (settings.query_type == 'rect') {
    
    queryObj = new Rect(cursorPt.x - settings.query_rect_size / 2, 
                        cursorPt.y - settings.query_rect_size / 2,
                      settings.query_rect_size, settings.query_rect_size)
    
    strokeWeight(2);
    stroke(230, 0, 0);
    P5JsUtils.drawRect(queryObj);
  }
  let objects = quadtree.find(queryObj);

  strokeWeight(2);
  stroke(230, 230, 0);
  objects.forEach(obj => drawObject(obj) );
}
