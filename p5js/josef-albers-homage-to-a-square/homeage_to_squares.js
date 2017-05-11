let colors = []
let numColors;

function setup() {
  let smallerDimension = min(windowWidth, windowHeight)
  createCanvas(windowWidth, windowHeight);
  frameRate(0);

  colors.push( color(235, 225, 0) );
  colors.push( color(235, 195, 0) );
  colors.push( color(235, 165, 0) );
  colors.push( color(235, 105, 0) );

  numColors = colors.length;

  noStroke();
  rectMode(CENTER);

  translate(width/2, height/2);
  drawSquares();
}

function drawSquares() {
  for (var i = 0; i < numColors; i++) {
    push();
    translate(0, i * 20);
    fill(colors[i]);
    rect(0, 0, 400 - 80 * i, 400 - 80 * i);
    pop();
  }
}
