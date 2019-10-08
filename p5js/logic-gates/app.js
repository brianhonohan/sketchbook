var system;
var colorScheme;
var ui;
var vertMargin = determineVerticalMargin();

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init();
  initColorScheme();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);

  let uiRect = new Rect(0, 0, width, 50);
  ui = new UserInterface(uiRect, system);

  system.init();
  system.render();
  ui.initialRender();
}

function draw(){
  system.tick();
  system.render();
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
}

function initColorScheme(){
  colorScheme = {
    background: color(50),
    line:       color(230),
    object:     color(100),
    objectClickable:     color(150,150,80),
    lineOn:     color(40, 200,40),
    lineOff:    color(200, 40, 40),
  };
}

function mousePressed(){
  system.handleMousePressed();
  system.render();
}

function mouseReleased(){
  system.handleMouseReleased();
  system.render();
}

function keyTyped(){
  if (key >= 1 && key <= 6) {
    let gateType = int(key) + 1;
    system.setMainGate(gateType);
    system.render();
  }
}

function windowResized() {
  canvas = resizeCanvas(windowWidth, windowHeight);
  ui.handleWindowResized();
  system.render();
}
