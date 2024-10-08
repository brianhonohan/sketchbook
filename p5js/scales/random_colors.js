var canvas;
var colorId;
var mode;

function setup(){
  canvas = createCanvas(500, 500);
  colorId = P5JsUtils.COLOR_ID_GREEN;
  background(50);
  mode = 'random';
  drawColorTiles();
}

function mousePressed(){
  console.log(get(mouseX, mouseY));
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

function toggleMode(){
  if (mode == 'random') {
    mode = 'scales';
  } else {
    mode = 'random';
  }
}

function drawColorTiles(){
  let cellWidth = 20;
  let margin = 20;
  let numRows = (width  - 2 * margin) / cellWidth;
  let numCols = (height - 2 * margin) / cellWidth;

  noStroke();
  for (let i = 0; i < numCols; i++){
    for (let j = 0; j < numRows; j++){
      fillColorFor(j, i);
      rect(margin + i * cellWidth, margin + j * cellWidth, cellWidth, cellWidth);
    }
  }
}

function fillColorFor(row, col){
  if (mode == 'random') {
    fill(P5JsUtils.getRandomColorByID(colorId));
  }
}
