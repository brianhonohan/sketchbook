var system;
var colorScheme;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();
  initColorScheme();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
  system.render();
}

function initColorScheme(){
  colorScheme = {
    background: color(50),
    line:       color(230),
    object:     color(100),
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