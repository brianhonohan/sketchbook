const numRows = 6;
const numCols = 6;
const boxPadding = 8;

let boxWidth;
let boxHeight;

function setup() {
  createCanvas(400, 400);

  boxWidth   = (width - ((numCols + 1) * boxPadding))/ numCols;
  boxHeight  = (height - ((numRows + 1) * boxPadding)) / numRows;
}

function draw() {
  background(120);
  renderGrid();
}

function renderGrid(){
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      rect( getX(j), getY(i), boxWidth, boxHeight);
    }
  }
}
    
function getX(colIndex){
  return colIndex * boxWidth + boxPadding + colIndex * boxPadding;
}
   
function getY(rowIndex){
  return rowIndex * boxHeight + boxPadding + rowIndex * boxPadding;
}
