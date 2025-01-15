var canvas;
var colorId;
var mode;

const colorOptions = [
  P5JsUtils.COLOR_ID_RED,
  P5JsUtils.COLOR_ID_GREEN,
  P5JsUtils.COLOR_ID_BLUE,
  P5JsUtils.COLOR_ID_ORANGE,
  P5JsUtils.COLOR_ID_YELLOW,
  P5JsUtils.COLOR_ID_VIOLET];

function setup(){
  canvas = createCanvas(windowWidth, windowHeight-35);
  // canvas = createCanvas(500, 500);
  colorId = P5JsUtils.COLOR_ID_GREEN;
  background(50);
  mode = 'random';
  drawColorTiles();
}

function mousePressed(){
  colorId = (colorId + 1) % colorOptions.length;
  drawColorTiles();
}

function keyTyped(){
  switch (key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    case 'r':
      colorId = P5JsUtils.COLOR_ID_RED;
      drawColorTiles();
      break;
    case 'o':
      colorId = P5JsUtils.COLOR_ID_ORANGE;
      drawColorTiles();
      break;
    case 'y':
      colorId = P5JsUtils.COLOR_ID_YELLOW;
      drawColorTiles();
      break;
    case 'g':
      colorId = P5JsUtils.COLOR_ID_GREEN;
      drawColorTiles();
      break;
    case 'b':
      colorId = P5JsUtils.COLOR_ID_BLUE;
      drawColorTiles();
      break;
    case 'v':
      colorId = P5JsUtils.COLOR_ID_VIOLET;
      drawColorTiles();
      break;
    case 'm':
      toggleMode();
      drawColorTiles();
      break;
  }
}


function drawColorTiles(){
  let cellWidth = 20;
  let marginX = 0.1 * width;
  let marginY = 0.1 * height;
  let numRows = Math.floor( (width  - 2 * marginY) / cellWidth );
  let numCols = Math.floor( (height - 2 * marginY) / cellWidth );

  noStroke();
  for (let i = 0; i < numRows; i++){
    for (let j = 0; j < numCols; j++){
      fillColorFor(j, i);
      rect(marginX + i * cellWidth, marginY + j * cellWidth, cellWidth, cellWidth);
    }
  }
}

function fillColorFor(row, col){
  fill(P5JsUtils.getRandomColorByID(colorId));
}
