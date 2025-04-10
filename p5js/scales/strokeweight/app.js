var minY;
var maxY;

function setup(){
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createCanvas(windowWidth, windowHeight-vertMargin());

  minY = 0.3 * height;
  maxY = 0.7 * height;
  draw();
  noLoop();
}

function draw(){
  background(50);
  let weight = 0.5;

  stroke(color(100, 200, 100));
  for (var x = 0.1 * width; x < 0.9*width; x += (weight + 2)){
    strokeWeight(weight);
    // stroke(color(150, 50 + (x % 255), 50 + (width-x) % 255));
    line(x, minY,  x, maxY);
    weight = Math.ceil(weight + 1);
  }
}

function vertMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 62;
}