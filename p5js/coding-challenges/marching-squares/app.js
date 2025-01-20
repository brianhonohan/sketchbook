var system;
var canvas;
var vertMargin = determineVerticalMargin();

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
}

function draw(){
  background(50);
  system.tick();
  system.render();
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
}

function keyTyped(){
  switch (key) {
    case 'P':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}
