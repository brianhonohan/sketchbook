var nauticalFlags;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  nauticalFlags = new NauticalFlags();
  background(50);
}

function keyTyped(){
  switch (key) {
    case 'P':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    default:
      nauticalFlags.handleKeyPressed();
  }
}

// function keyPressed(){
  
// }