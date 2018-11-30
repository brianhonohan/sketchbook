var minY;
var maxY;

function setup(){
  createCanvas(windowWidth, windowHeight);

  minY = 0.3 * height;
  maxY = 0.6 * height;
}

function draw(){
  let weight = 1;
  for (var x = 10; x < width - 10; x += (weight + 2)){
    strokeWeight(weight);
    stroke(color(50, x, (width-x)%255));
    line(x, minY,  x, maxY);
    weight += 1;
  }
}