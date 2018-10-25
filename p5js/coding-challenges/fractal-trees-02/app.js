var tree;

function setup(){
  createCanvas(windowWidth, windowHeight);

  tree = new FractalTree();
  stroke(200);
  drawTree();
}

function drawTree(){
  background(50);

  push();
  translate(tree.x, tree.y);
  rotate(PI);
  tree.draw(0);
  pop();
}
