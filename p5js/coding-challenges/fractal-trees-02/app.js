var tree;
var branchCounter;

function setup(){
  createCanvas(windowWidth, windowHeight);

  tree = new FractalTree();

  colorMode(HSB);
  branchCounter = 0;
  stroke(250);

  drawTree(tree.x, tree.y);
}

function drawTree(x, y){
  background(50);
  push();
  translate(x, y);
  rotate(PI);
  tree.draw(0);
  pop();
}

function mousePressed(){
  drawTree(mouseX, mouseY);
}
