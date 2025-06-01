var nauticalFlags;
var nfTypeset;
var ui;
var canvas;

function setup() {
  canvas = createAutosizedCanvas();
  P5JsSettings.init();

  disableSelectOnElement(canvas.elt);

  nauticalFlags = new NauticalFlags(width * 0.6);
  nfTypeset = new NauticalFlagsTypeset();

  let uiRect = new Rect(0, 0, width, 30);
  ui = new UserInterface(uiRect);

  nfTypeset.setFont(nauticalFlags);
  let textSize = Math.min(width, height) * 0.1; 
  nfTypeset.textSize(textSize);

  ui.render();
}
function createAutosizedCanvas(){
  canvas = createCanvas();
  windowResized(undefined, true);
  return canvas;
}

function windowResized(event, noRedraw = false) {
  resizeCanvas(innerWidth, 
              innerHeight - drawingContext.canvas.getBoundingClientRect().top,
              noRedraw);
  if (noRedraw) {
    return;
  }
  ui.handleWindowResized();
}


function draw(){
  ui.tick();
  ui.render();
}

function keyTyped(){
  switch (key) {
    case '[':
      saveCanvas(canvas, 'screenshot', 'png');
      return;
      break;
  }
  ui.handleKeyTyped();
}

function keyPressed(){
  return !ui.handleKeyPressed();
}

function mousePressed(event){
  ui.handleMousePressed(event);
}

function mouseReleased(event){
  ui.handleMouseReleased(event);
}

function touchStarted(event){
  if (!(event instanceof TouchEvent)){
    return;
  }
  ui.handleTouchStarted(event);
}

function touchMoved(event){
  if (!(event instanceof TouchEvent)){
    return;
  }
  ui.handleTouchMoved(event);
}

function touchEnded(event){
  if (!(event instanceof TouchEvent)){
    return;
  }
  return !ui.handleTouchEnded(event);
}

function keyReleased(){
  ui.handleKeyReleased();
}

function mouseWheel(event){
  ui.handleMouseWheel(event);
}

function logMessage(message){
  console.log(message);
}

function disableSelectOnElement(element){
  element.style['user-select'] = 'none';
  element.style['-webkit-user-select'] = 'none';
  element.style['-moz-user-select'] = 'none';
}
