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
  ui.showShareButton();
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
  textAlign(CENTER, TOP);
  const marginX = (width > 667) ? 0.2 * width : 0.05 * width;
  const lineHeight = 40;
  let yPos =  0.15 * height;
  let flagSize = 0.8 * width / (7 * 1.1);

  nfTypeset.push();
  nfTypeset.textSize(flagSize);
  nfTypeset.text('WELCOME', 0.1 * width, yPos, 0.8 * width);
  nfTypeset.pop();

  textSize(32);
  yPos += 1.5 * flagSize;
  text('Welcome', marginX, yPos, width - 2 * marginX, lineHeight);

  const instr1 = 'Type to see the corresponding nautical flags.';
  const instr2 = 'Press SHIFT + P to download an image of what you\'ve typed.';
  const instr3 = 'Click the SHARE button to get a shareable link to send a message to friend.';

  let lineSpacer = (width > 667) ? "\n\n" : "\n\n";
  let instructions;
  if (width > 667) {
    instructions = instr1 + lineSpacer + instr2 + lineSpacer + instr3;
  } else {
    instructions = instr1 + lineSpacer + instr3;
  }
  textSize(20);
  yPos += (width > 667) ? lineHeight * 2 : lineHeight;
  const mainBlockHeight = height - yPos;
  text(instructions, marginX, yPos, width - 2 * marginX, mainBlockHeight);
}

