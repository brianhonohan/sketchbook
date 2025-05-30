var system;
let canvas;

function setup() {
  canvas = createAutosizedCanvas();
  P5JsSettings.init();
  resetShapes();
}

function draw(){
  background(50);

  noStroke();

  shapes.forEach(s => s.draw());
}

function resetShapes_v0(){
  shapes = [];

  var halfCircleTD;
  halfCircleTD = new HalfCircleTeardrop(width/8, height/2, 11*width/16, height/2);
  halfCircleTD.fillColor = color(180, 50, 50);
  shapes.push(halfCircleTD);

  halfCircleTD = new HalfCircleTeardrop(width/8, height/2, 13*width/32, height/2);
  halfCircleTD.fillColor = color(200, 120, 50);
  shapes.push(halfCircleTD);

  halfCircleTD = new HalfCircleTeardrop(width/8, height/2, 17*width/64, height/2);
  halfCircleTD.fillColor = color(180, 180, 70);
  shapes.push(halfCircleTD);

  halfCircleTD = new HalfCircleTeardrop(13*width/16, height/2, 5*width/8, height/2);
  halfCircleTD.fillColor = color(210, 80, 80);
  shapes.push(halfCircleTD);

  halfCircleTD = new HalfCircleTeardrop(15*width/32, height/2, 12*width/32, height/2);
  halfCircleTD.fillColor = color(230, 150, 80);
  shapes.push(halfCircleTD);

  halfCircleTD = new HalfCircleTeardrop(37*width/128, height/2, 16*width/64, height/2);
  halfCircleTD.fillColor = color(210, 210, 120);
  shapes.push(halfCircleTD);
}


function resetShapes(){
  shapes = [];

  let halfWidth = width / 2;
  let halfHeight = height / 2;
  let maxDropRadius = Math.min(halfWidth, halfHeight) * 0.8;

  var halfCircleTD;
  halfCircleTD = HalfCircleTeardrop.createAt(halfWidth, halfHeight, maxDropRadius);
  halfCircleTD.fillColor = color(180, 50, 50);
  shapes.push(halfCircleTD);

  halfCircleTD = HalfCircleTeardrop.createAt(halfWidth - 0.5 * maxDropRadius, halfHeight, maxDropRadius / 2);
  halfCircleTD.fillColor = color(200, 120, 50);
  shapes.push(halfCircleTD);

  halfCircleTD = HalfCircleTeardrop.createAt(halfWidth - 0.75 * maxDropRadius, halfHeight, maxDropRadius / 4);
  halfCircleTD.fillColor = color(180, 180, 70);
  shapes.push(halfCircleTD);

  halfCircleTD = HalfCircleTeardrop.createAt(halfWidth + 0.5 * maxDropRadius, halfHeight, maxDropRadius / 2.5);
  halfCircleTD.fillColor = color(210, 80, 80);
  halfCircleTD.rotateAboutCenter(Math.PI);
  shapes.push(halfCircleTD);

  halfCircleTD = HalfCircleTeardrop.createAt(halfWidth - 0.25 * maxDropRadius, halfHeight, 3 / 16 * maxDropRadius);
  halfCircleTD.fillColor = color(230, 150, 80);
  halfCircleTD.rotateAboutCenter(Math.PI);
  shapes.push(halfCircleTD);

  halfCircleTD = HalfCircleTeardrop.createAt(halfWidth - 0.625 * maxDropRadius, halfHeight, 5 / 64 * maxDropRadius);
  halfCircleTD.fillColor = color(210, 210, 120);
  halfCircleTD.rotateAboutCenter(Math.PI);
  shapes.push(halfCircleTD);

  attachTouchBehavior();
}


function createAutosizedCanvas(){
  canvas = createCanvas();
  windowResized(undefined, true);
  return canvas;
}

function windowResized(event, noRedraw = false) {
  resizeCanvas(innerWidth, 
              innerHeight - drawingContext.canvas.getBoundingClientRect().top,
              false);
  if (noRedraw) { return ; }
  resetShapes();
  draw();
}

function attachTouchBehavior(){
  shapes.forEach(s => {
    s.dragEnabled = true;
    s.handleMousePressed = function() {
      if (s.containsXY(mouseX, mouseY)) {
        s.isDragged = true;
        return true;
      }
      return false;
    };
    s.handleMouseDragged = function() {
      if (s.isDragged) {
        // HACK - unclear why /2 is needed, but it makes the dragging feel more natural
        s.move( (mouseX - pmouseX)/2, (mouseY - pmouseY)/2);
      }
    };
    s.handleMouseReleased = function() {
      s.isDragged = false;
    };
  });
}

function mousePressed(){
  // check shapes in reverse order so that the last shape is on top
  // and gets the first chance to handle the mouse press
  for (let i = shapes.length - 1; i >= 0; i--) {
    if (shapes[i].dragEnabled && shapes[i].handleMousePressed()) {
      return;
    }
  }
}

function mouseDragged(){
  shapes.filter(s => s.isDragged == true)
        .forEach(s => s.handleMouseDragged());
}

function mouseReleased(){
  shapes.filter(s => s.dragEnabled == true)
        .forEach(s => s.handleMouseReleased());
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
