const numRows = 6;
const numCols = 6;
const boxPadding = 8;

const numBoxes = numRows * numCols;
let boxWidth;
let boxHeight;

let colorReUse   = 4;  // meaning each color will appear in 4 tiles 
const colorList  = [];
const bgColors   = [];

function setup() {
  createCanvas(400, 400);

  colorMode(HSB, 100);
  generatePalette();
  assignTileBgColors();

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
      fill( getBgColor(j, i) );
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

function getBgColor(colIndex, rowIndex){
  return bgColors[rowIndex * numCols + colIndex];
}

function generatePalette(){
  // use each color 2-4 times
  // don't use same color for background, middle or foreground
  let numColors = ceil( numBoxes / colorReUse );
  console.log(`Num colors: ${numColors}`);
  
  let randomStartingPoint = random(100);
  for(let i = 0; i < numColors; i++){
    let hue = (randomStartingPoint + 8 * i) % 100;
    colorList[i] = color(hue, 20 + random(80), 90);
  }
}

function assignTileBgColors(){
  let randomTileOrder = getRandomTileOrder();
  
  for(let i = 0; i < numBoxes; i++){
    let colorToUse = floor(i / colorReUse) ;
    bgColors[ randomTileOrder[i] ] = colorList[colorToUse];
  }
}

function getRandomTileOrder(){
  return shuffleArray( getNumberList(numBoxes) );
}



// UTILITY FUNCTIONS BELOW 
// Meaning: They don't reference our variables above, can be reused across other sketches

function getNumberList(numberOfItems){
  // let result = [];
  // for(let i = 0; i < numberOfItems; i++){
  //   result[i] = i;
  // }
  // return result;
  return Array.from(Array(numberOfItems).keys());
}

function shuffleArray(arrayToShuffle){
  // From: https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
  for(let i = arrayToShuffle.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = arrayToShuffle[i];
    arrayToShuffle[i] = arrayToShuffle[j];
    arrayToShuffle[j] = temp;
  }
  return arrayToShuffle;
}

