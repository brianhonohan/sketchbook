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
    object:     color(100)
  };
}
