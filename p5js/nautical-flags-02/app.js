var nauticalFlags;
var keyController;
var nfTypeset;
var ui;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

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
  } else {
    ui.showIntroScreen();
  }
}

function draw(){
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
    return ui.handleKeyPressed();
  }
}

function touchEnded(){
  ui.handleTouchEnded();
}

function keyReleased(){
  ui.handleKeyReleased();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ui.handleWindowResized();
  // console.log(`New Window size: ${windowWidth} x ${windowHeight}`);
}
