var canvas;
var colorId;

function setup(){
  canvas = createCanvas(500, 500);
  colorId = P5JsUtils.COLOR_ID_GREEN;
  background(50);
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
      fill(P5JsUtils.getRandomColorByID(colorId));
      rect(margin + i * cellWidth, margin + j * cellWidth, cellWidth, cellWidth);
    }
  }
}
