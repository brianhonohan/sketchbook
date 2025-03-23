// 10_000 of something
var shapeLimit = 10000;
var shapesDrawn = 0;

var startColor = null;
var endColor = null;

var displayWidth = 400;
var displayHeight = 400;
var margin = 50;
var itemSpacing = 4;
var itemsPerRow = Math.floor(displayWidth / itemSpacing);

function setup() {
  createCanvas(500, 500);
  background(10,10,50);
  
  startColor = color(220, 220, 70);
  endColor = color(240, 130, 0);
  strokeWeight(2);
  
  // noStroke();
}

function draw() {
  let iterPerFrame = 10;
  let x = 0;
  let y = 0;
  noStroke();
  for (let i = 0; i < iterPerFrame; i++){
    // stroke( lerpColor(startColor, endColor, shapesDrawn/shapeLimit));
    fill( lerpColor(startColor, endColor, shapesDrawn/shapeLimit));
    x = margin + itemSpacing * (shapesDrawn % itemsPerRow);
    y = margin + itemSpacing * Math.floor(shapesDrawn / itemsPerRow);
    
    rect(x, y, 1,1);
    // point(x, y);
  
    shapesDrawn += 1;
  }
  
  if (shapesDrawn % 1000 == 0){
    // console.log(`shapesDrawn: ${shapesDrawn}`);
  }
  
  if (shapesDrawn == shapeLimit){
    noLoop();
  }
}