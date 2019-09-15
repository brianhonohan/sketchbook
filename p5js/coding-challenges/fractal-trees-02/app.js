var tree;
var branchCounter;

var gui;
var params = {
  maxSteps: 8,
  branches: 2,
  baseLengthFactor: 0.25,
  likelihoodOfBranch: 0.9,
  branchAngleRange: 0.95,
  angleVariance: Math.PI / 8,
};

function setup(){
  createCanvas(windowWidth, windowHeight);

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(params, "maxSteps").min(1).max(10).step(1);
  gui.add(params, "branches").min(1).max(5).step(1);
  gui.add(params, "baseLengthFactor").min(.1).max(.5).step(.05);
  gui.add(params, "likelihoodOfBranch").min(.1).max(1).step(.05);
  gui.add(params, "branchAngleRange").min(.1).max(PI).step(.05);
  gui.add(params, "angleVariance").min(0).max(Math.PI / 4).step(.05);

  tree = new FractalTree(params);

  colorMode(HSB);
  branchCounter = 0;
  stroke(250);

  frameRate(10);
  drawTree(tree.x, tree.y);
}

function drawTree(x, y){
  background(20);
  push();
  translate(x, y);
  rotate(PI);
  tree.draw(0);
  pop();
}

function mouseDragged(){
  randomSeed(mouseX * 10000 + mouseY);
  drawTree(mouseX, mouseY);
}
