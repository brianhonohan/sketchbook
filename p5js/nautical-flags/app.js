var nauticalFlags;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  nauticalFlags = new NauticalFlags(width * 0.6);
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
  nauticalFlags.handleKeyPressed();
}

function keyReleased(){
  nauticalFlags.handleKeyReleased();
}

function showIntroScreen(){
  background(50);
  fill(230);
  textFont('Verdana');
  textAlign(CENTER, CENTER);
  const marginX = 0.2 * width;

  textSize(32);
  text('Welcome', marginX, 0.25 * height, width - 2 * marginX, height / 3);

  nauticalFlags.text('WELCOME', undefined, 100);
  const instructions = 'Type on your keyboard to see the corresponding nautical flag.';
  textSize(20);
  const mainBlockY = height / 2;
  text(instructions, marginX, mainBlockY, width - 2 * marginX, height / 3);
}

