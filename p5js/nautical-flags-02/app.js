var nauticalFlags;
var keyController;
var nfTypeset;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  nauticalFlags = new NauticalFlags(width * 0.6);
  keyController = new KeyboardController();
  nfTypeset = new NauticalFlagsTypeset();

  keyController.typeset = nfTypeset;
  nfTypeset.setFont(nauticalFlags);
  showIntroScreen();
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
  }
  keyController.handleKeyPressed();
}

function keyReleased(){
  keyController.handleKeyReleased();
}

function showIntroScreen(){
  background(50);
  fill(230);
  textFont('Verdana');
  textAlign(CENTER, CENTER);
  const marginX = 0.2 * width;

  textSize(32);
  text('Welcome', marginX, 0.25 * height, width - 2 * marginX, height / 3);

  nfTypeset.text('WELCOME', undefined, 100);
  const instructions = 'Type on your keyboard to see the corresponding nautical flag.';
  textSize(20);
  const mainBlockY = height / 2;
  text(instructions, marginX, mainBlockY, width - 2 * marginX, height / 3);
}

