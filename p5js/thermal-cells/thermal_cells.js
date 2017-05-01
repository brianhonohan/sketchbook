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
  if(keyIsPressed == true){
    grid.removeHeatAt(mouseX, mouseY);
  }else{
    grid.addHeatAt(mouseX, mouseY);
  }
}
