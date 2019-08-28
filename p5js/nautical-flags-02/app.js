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

  let params = getURLParams();

  if (params.blocks) {
    nfTypeset.setPrintBlocksFromBase64(params.blocks);
  } else {
    showIntroScreen();
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
  } else if (ui.isShowingDialog()){
    return ui.handleKeyPressed();
  }
  keyController.handleKeyPressed();
}

function keyReleased(){
  if (ui.isShowingDialog()){
    ui.handleKeyReleased();
  } else {
    keyController.handleKeyReleased();
  }
}

function showIntroScreen(){
  background(50);
  fill(230);
  textFont('Verdana');
  textAlign(CENTER, CENTER);
  const marginX = 0.2 * width;

  textSize(32);
  text('Welcome', marginX, 0.25 * height, width - 2 * marginX, height / 3);

  nfTypeset.push();
  nfTypeset.textSize(0.1 * height);
  nfTypeset.text('WELCOME', 0.1 * width, 0.25 * height, 0.8 * width);
  nfTypeset.pop();

  const instructions = 'Type on your keyboard to see the corresponding nautical flag.';
  textSize(20);
  const mainBlockY = height / 2;
  text(instructions, marginX, mainBlockY, width - 2 * marginX, height / 3);
}

