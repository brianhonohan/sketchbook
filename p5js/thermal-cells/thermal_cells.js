let grid;
var canvas;

function setup() {
  var canvas = createCanvas(500, 500);
  grid = new GridViewController(0, 0, width, height);
  frameRate(30);
}

function draw() {
  grid.step();
  grid.renderViews();
}

function mouseDragged(){
  if(keyIsDown(87)){  // 'W'.charCodeAt(0)
    console.log(`W is pressed`);
    grid.addWallAt(mouseX, mouseY);
  }else if(keyIsPressed == true){
    grid.removeHeatAt(mouseX, mouseY);
  }else{
    grid.addHeatAt(mouseX, mouseY);
  }
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}
