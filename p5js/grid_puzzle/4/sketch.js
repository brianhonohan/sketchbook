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

let firstSelectedBox;
let secondSelectedBox;
let firstBoxFadeIn;
let secondBoxFadeIn; 
const fadeInSteps = 12;


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
  
  if (firstBoxFadeIn != undefined){
    firstBoxFadeIn = constrain(firstBoxFadeIn + 1, 0, fadeInSteps); 
  }
  
  if (secondBoxFadeIn != undefined){
    secondBoxFadeIn = constrain(secondBoxFadeIn + 1, 0,fadeInSteps); 
  }
}

function renderGrid(){
  noStroke();
  
  let tmpColor;
  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let topLeftX = getX(j);
      let topLeftY = getY(i);
      
      let boxNum = getBoxNumberForRowCol(i, j);
      if (boxNum == firstSelectedBox){
        drawHighlightAroundBox(topLeftX, topLeftY, firstBoxFadeIn);
        
      } else if (boxNum == secondSelectedBox) {
        drawHighlightAroundBox(topLeftX, topLeftY, secondBoxFadeIn);
        if (secondBoxFadeIn == fadeInSteps){
          resolveSecondBox();
        }
      }
      
      tmpColor = getBgColor(j, i);
      if (tmpColor !== undefined){
        fill( tmpColor );
        rect( topLeftX, topLeftY, boxWidth, boxHeight);
      }
      
      tmpColor = getMgColor(j, i);
      if (tmpColor !== undefined){
        fill( tmpColor );
        rect( topLeftX + 0.25 * boxWidth, topLeftY + 0.42 * boxHeight, 
                 0.5 * boxWidth, 0.5 * boxHeight);
      }
      
      tmpColor = getFgColor(j, i);
      if (tmpColor !== undefined){
        fill( tmpColor );
        rect( topLeftX + 0.35 * boxWidth, topLeftY + 0.55 * boxHeight, 
                 0.3 * boxWidth, 0.3 * boxHeight);
      }
    }
  }
}

function drawHighlightAroundBox(x, y, fadeInProgress){
  let saturation = fadeInProgress / fadeInSteps * 100;
  stroke(55, saturation, 100);
  strokeWeight(3);
  noFill();
  rect(x - 1, y - 1, boxWidth + 2, boxHeight + 2);
  noStroke();
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
  let hueStepSize = 8;
  for(let i = 0; i < numColors; i++){
    let hue = (randomStartingPoint + hueStepSize * i) % 100;
    colorList[i] = color(hue, 30 + (floor(i/numSets) * 25), 85);
    // colorList[i] = color(hue, 20 + random(80), 90);
    // colorList[i] = color(hue, 50 + (floor(i/numSets) * 15), 90 - (floor(i/numSets) * 10));
    // colorList[i] = color(hue, 50, 50);
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

function getBoxNumberForRowCol(row, col){
  return row * numCols + col;
}

function getBoxNumberFromXY(x, y){
  let col = floor((x - boxPadding) / (boxWidth  + boxPadding));
  let row = floor((y - boxPadding) / (boxHeight + boxPadding));
  return getBoxNumberForRowCol(row, col);
}

function mousePressed(){
  if (secondSelectedBox !== undefined){
    return; 
  }

  let selectedBox = getBoxNumberFromXY(mouseX, mouseY);
  
  if (undefined == bgColors[selectedBox] 
      && undefined == mgColors[selectedBox] 
      && undefined == fgColors[selectedBox] )
  {
    return;
  }
  
  if (firstSelectedBox !== undefined) {
    secondSelectedBox = selectedBox;
    secondBoxFadeIn = 0;
    
  } else {
    firstSelectedBox = selectedBox;
    firstBoxFadeIn = 0;
  }
}

function resolveSecondBox(){
  let matchCount = 0;
  
  if( bgColors[firstSelectedBox] == bgColors[secondSelectedBox]){
    matchCount += 1;
    bgColors[firstSelectedBox]  = undefined;
    bgColors[secondSelectedBox] = undefined;
  }
  
  if( mgColors[firstSelectedBox] == mgColors[secondSelectedBox]){
    matchCount += 1;
    mgColors[firstSelectedBox]  = undefined;
    mgColors[secondSelectedBox] = undefined;
  }
  
  if( fgColors[firstSelectedBox] == fgColors[secondSelectedBox]){
    matchCount += 1;
    fgColors[firstSelectedBox]  = undefined;
    fgColors[secondSelectedBox] = undefined;
  }
  
  if (matchCount > 0){
    firstSelectedBox = secondSelectedBox;
  } else { 
    firstSelectedBox = undefined;
  }
  
  if (undefined == bgColors[firstSelectedBox] 
      && undefined == mgColors[firstSelectedBox] 
      && undefined == fgColors[firstSelectedBox] )
  {
    firstSelectedBox = undefined;
  }
  
  secondSelectedBox = undefined;
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

