let colorRamp;
let rampPos = {};

function setup(){
  // canvas = createCanvas(windowWidth, windowHeight-35);
  canvas = createCanvas(500, 500);
  colorRamp = P5jsColorRamp.elevation();

  rampPos.width = 0.1 * width;
  rampPos.height = 0.8 * height;
  rampPos.x = (width/2) - rampPos.width / 2;
  rampPos.y = (height/2) - rampPos.height / 2;
  
}

function draw(){
  background(50);

  colorRamp.draw(rampPos.x, rampPos.y, rampPos.width, rampPos.height, true);
}