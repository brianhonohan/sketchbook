var nauticalFlags;
var keyController;
var nfTypeset;
var ui;
var canvas;
var vertMargin = determineVerticalMargin();

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init();

  disableSelectOnElement(canvas.elt);

  nauticalFlags = new NauticalFlags(width * 0.6);
  keyController = new KeyboardController();
  nfTypeset = new NauticalFlagsTypeset();

  let uiRect = new Rect(0, 0, width, 30);
  ui = new UserInterface(uiRect);

  keyController.typeset = nfTypeset;
  nfTypeset.setFont(nauticalFlags);
  nfTypeset.textSize(0.1 * height);

  ui.keyHandler = keyController;

  let params = getURLParams();

  if (params.blocks) {
    nfTypeset.setPrintBlocksFromBase64(params.blocks);
    ui.showMainButtons();
  } else {
    ui.showIntroScreen();
  }
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
}

function draw(){
  ui.tick();
  ui.render();
}

function keyTyped(){
  switch (key) {
    case 'P':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}

function keyPressed(){
  if (key == 'P') {
    return;
  } else {
    return !ui.handleKeyPressed();
  }
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
  ui.handleTouchEnded(event);
}

function keyReleased(){
  ui.handleKeyReleased();
}

function mouseWheel(event){
  ui.handleMouseWheel(event);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ui.handleWindowResized();
  // console.log(`New Window size: ${windowWidth} x ${windowHeight}`);
}

function logMessage(message){
  console.log(message);
}

function disableSelectOnElement(element){
  element.style['user-select'] = 'none';
  element.style['-webkit-user-select'] = 'none';
  element.style['-moz-user-select'] = 'none';
}
