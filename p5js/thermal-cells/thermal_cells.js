let grid;

function setup() {
  createCanvas(400, 400);
  grid = new GridViewController(0, 0, 400, 400);
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
