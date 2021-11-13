var system;
var canvas;
var vertMargin = determineVerticalMargin();

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
  // frameRate(2);
  background(50);
}

function draw(){
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

function mousePressed() {
  return system.ui_controller__mousePressed(mouseX, mouseY);
}

function mouseReleased() {
  return system.ui_controller__mouseReleased(mouseX, mouseY);
}

function mouseDragged() {
  return system.ui_controller__mouseDragged(mouseX, mouseY, pmouseX, pmouseY);
}
