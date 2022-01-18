var system;
var canvas;
var vertMargin = determineVerticalMargin();

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init();
  colorMode(HSB, 100);

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
}

function draw(){
  background(20);
  system.tick();
  system.render();
}

function mousePressed(){
  system.handleMousePressed();
}

function mouseDragged(){
  system.handleMouseDragged();
}

function mouseReleased(){
  system.handleMouseReleased();
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
}

function keyTyped(){
  console.log(`key: ${key}`);
  switch (key) {
    case 'P':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    case 'D':
      system.toggleShapeDragging();
      break;
    case 'r':
      system.resetShapes();
      break;
  }
}
