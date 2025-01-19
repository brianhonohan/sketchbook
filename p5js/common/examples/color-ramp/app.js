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

  colorRamp.setBinCount(20);
}

function draw(){
  background(50);

  const quarterX = (width/4) - rampPos.width / 2;
  colorRamp.draw(quarterX, rampPos.y, rampPos.width, rampPos.height, false);
  
  colorRamp.draw(rampPos.x, rampPos.y, rampPos.width, rampPos.height, true);

  const threeQuarterX = quarterX + width / 2;
  colorRamp.drawBins(threeQuarterX, rampPos.y, rampPos.width, rampPos.height);
}