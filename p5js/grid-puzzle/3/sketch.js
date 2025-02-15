const numRows = 6;
const numCols = 6;
const boxPadding = 8;

const numBoxes = numRows * numCols;
let boxWidth;
let boxHeight;

let colorReUse   = 4;  // meaning each color will appear in 4 tiles 
const colorList  = [];
const bgColors   = [];  // background colors
const mgColors   = [];  // 'mid'-ground colors
const fgColors   = [];  // foreground colors
let bgOffset;
let mgOffset;
let fgOffset;

function setup() {
  createCanvas(600, 600);

  colorMode(HSB, 100);
  generatePalette();
  assignBgTileColors();
  assignMgTileColors();
  assignFgTileColors();

  boxWidth   = (width - ((numCols + 1) * boxPadding))/ numCols;
  boxHeight  = (height - ((numRows + 1) * boxPadding)) / numRows;
}

function draw() {
  background(120);
  renderGrid();
}

function renderGrid(){
  noStroke();
  
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let topLeftX = getX(j);
      let topLeftY = getY(i);
      
      fill( getBgColor(j, i) );
      rect( topLeftX, topLeftY, boxWidth, boxHeight);
      
      fill( getMgColor(j, i) );
      rect( topLeftX + 0.25 * boxWidth, topLeftY + 0.4 * boxHeight, 
                 0.5 * boxWidth, 0.5 * boxHeight);
      
      fill( getFgColor(j, i) );
      rect( topLeftX + 0.35 * boxWidth, topLeftY + 0.55 * boxHeight, 
                 0.3 * boxWidth, 0.3 * boxHeight);
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
function getMgColor(colIndex, rowIndex){
  return mgColors[rowIndex * numCols + colIndex];
}
function getFgColor(colIndex, rowIndex){
  return fgColors[rowIndex * numCols + colIndex];
}

function generatePalette(){
  // use each color 2-4 times
  // don't use same color for background, middle or foreground
  let numSets = ceil( numBoxes / colorReUse );
  let numColors = numSets * 3;
  console.log(`Num colors: ${numColors}`);
  
  bgOffset = 0 * numSets;
  mgOffset = 1 * numSets;
  fgOffset = 2 * numSets;
  
  let randomStartingPoint = random(100);
  let hueStepSize = 17;
  for(let i = 0; i < numColors; i++){
    let hue = (randomStartingPoint + hueStepSize * i) % 100;
    colorList[i] = color(hue, 30 + (floor(i/numSets) * 25), 85);
  }
}

function assignBgTileColors(){
  let randomTileOrder = getRandomTileOrder();
  
  for(let i = 0; i < numBoxes; i++){
    let colorToUse = bgOffset + floor(i / colorReUse) ;
    
    bgColors[ randomTileOrder[i] ] = colorList[colorToUse];
  }
}

function assignMgTileColors(){
  let randomTileOrder = getRandomTileOrder();
  
  for(let i = 0; i < numBoxes; i++){
    let colorToUse = mgOffset + floor(i / colorReUse) ;
    
    mgColors[ randomTileOrder[i] ] = colorList[colorToUse];
  }
}

function assignFgTileColors(){
  let randomTileOrder = getRandomTileOrder();
  
  for(let i = 0; i < numBoxes; i++){
    let colorToUse = fgOffset + floor(i / colorReUse) ;
    fgColors[ randomTileOrder[i] ] = colorList[colorToUse];
  }
}

function getRandomTileOrder(){
  return shuffleArray( getNumberList(numBoxes) );
}



// UTILITY FUNCTIONS BELOW 
// Meaning: They don't reference our variables above, can be reused across other sketches

function getNumberList(numberOfItems){
  let result = [];
  for(let i = 0; i < numberOfItems; i++){
    result[i] = i;
  }
  return result;
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

