let seed;
let system;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  system = new System();
  frameRate(1);
  system.tick();
}

function draw(){
  system.tick();
  
  background(170,190,240);
  drawSlope();
}


function drawSlope(){
  var noiseScale = 0.01;
  
  fill(70,75,10);
  noStroke();
  beginShape(); 

  for (var x = 0; x <= width; x += 20) {
    var y = height - 20;

    y -= (zone1Contribution(x)
          + zone2Contribution(x) 
          + zone3Contribution(x) 
          + zone4Contribution(x));
    y -= noise(x*noiseScale) * 130;

    vertex(x, y); 
  }
  vertex(width, height); // down to bottom-right corner
  vertex(0, height);     // over to bottom-left corner
  endShape(CLOSE);
}

function zone1Contribution(x){
  return min(x, 0.25*width) * 0.2;
}

function zone2Contribution(x){
  return min(max(0, x - 0.25*width), width / 2) * 0.1;
}

function zone3Contribution(x){
  return min(max(0, x - 0.50*width), 0.75*width) * 0.2;
}

function zone4Contribution(x){
  return min(max(0, x - 0.75*width), width) * 0.4;
}
