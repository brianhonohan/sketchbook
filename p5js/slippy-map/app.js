var system;
var canvas;
var vertMargin = determineVerticalMargin();

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
  frameRate(2);
}

function draw(){
  background(50);
  console.log('tick');
  system.tick();
  system.render();
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
}

function mouseWheel(event) {
  return system.ui_controller__mouseWheel(event);
}
