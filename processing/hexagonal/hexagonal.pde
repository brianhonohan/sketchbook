HexLayout hexLayout;
int randomSeed;

void setup() {
  // size(displayWidth/2, displayHeight-50);
  size(500, 500);
  background(200);
  // frameRate(3);
  
  initRandom();
//  setRandomSeed(278827);
//  setRandomSeed(740596);
//  setRandomSeed(482424);
  
  rectMode(CENTER);
  
  hexLayout = new HexLayout();
  hexLayout.x = 0; // 0.1 * width;
  hexLayout.y = 0; // 0.1 * height;
  hexLayout.cellRadius = 15;
//  hexLayout.numCells = 1000;
  hexLayout._width =  width;
  hexLayout._height = height; // 0.80 * height;
  hexLayout.init();
  println("INITIALIZED ... numCells: " + hexLayout.numCells);

  hexLayout.draw();
  loadPixels();
  noStroke();
  
//  hexLayout.drawAtRowCol(3, 1);
}

void draw(){
//  hexLayout.draw();
//  updatePixels();
//  GridCoord gC = hexLayout.coordForXY(mouseX,mouseY);
//  hexLayout.drawAtRowCol(gC.row, gC.col);

  //hexLayout.draw();
//  println(frameRate);
}

void drawDisabled(){
  initRandom();
  hexLayout.draw();
}

void handleClickAt(int x, int y){
  GridCoord gC = hexLayout.coordForXY(x,y);
  hexLayout.drawAtRowCol(gC.row, gC.col);
  noStroke();
  //fill(0,255,0);
}

void mouseClicked(){
  fill(255,255,150,210);
  handleClickAt(mouseX,mouseY);
}

void mouseMoved(){
  fill(150,180,220,30);
  handleClickAt(mouseX,mouseY);
}

void keyPressed(){
  if (key == 'f'){
    hexLayout.toggleOverflow();
  }
  if (key == 'c'){
    hexLayout.draw();
  }
  if (key == 'C'){
    background(200);
  }
  if (key == 'r'){
    initRandom();
    hexLayout.draw();
  }
  if (key == 's'){
    hexLayout.cellRadius = map(mouseX, 0, width, 20, 200);
    hexLayout.calcNumCells(); // hack ... shouldn't have to do this.
    hexLayout.init();
    // hexLayout.draw();
  }
}

void initRandom(){
   randomSeed = (int)random(0, 1000000);
   setRandomSeed(randomSeed);
   println("Seed: " + randomSeed);
}
void setRandomSeed(int seed){
   noiseSeed(seed);
   randomSeed(seed);
}


// --------------------------------------------------------------------------------
class GridCoord {
  int row;
  int col; 
}


class HexLayout {
  Hexagon protoHex;
  float _width  = 10;
  float _height = 10;
  float cellRadius;
  float cellWidth;
  float cellHeight;
  float x;
  float y;
  int colFactor;    // add a row for odd rows when overflow, remove if not overflow for odd rows
  float yOffset;
  float xOffset;
  boolean overflow = true;
  
  int numCells;
  int numCols;
  int numRows;
  
  HexLayout(){
    x = 0;
    y = 0;
    numCells = -1;
    cellRadius = 10;
    protoHex = new Hexagon();
  }
  
  void toggleOverflow(){
    overflow = !overflow;
    numCells = -1;
    this.init();
    background(200);
    this.draw();
  }
  
  void init(){
    protoHex.radius = cellRadius;
    cellWidth = protoHex.width();
    cellHeight = protoHex.height();
    
    if(numCells == -1){
      calcNumCells();
    }
    yOffset = (overflow) ? (0.5 * protoHex.radius) : protoHex.radius;
    colFactor = (overflow) ? 1 : -1;
    xOffset = (overflow) ? 0 : cellWidth/2;
  }
  
  void calcNumCells(){
    calcCols();
    calcRows();
    numCells = numRows * numCols - (numRows/2);
  }

  void calcCols(){
    float preciseCols = _width/cellWidth;
    numCols = (int)((overflow) ? 1 + Math.ceil(preciseCols - 0.5) : Math.floor(preciseCols));
  }
  
  void calcRows(){
    float lossFactor = (overflow) ? 0 : 0.25*cellHeight;
//    println("------: ");
//    println("overflow: " + overflow);
//    println("lossFactor: " + lossFactor);
//    println("_height: " + _height);
//    println("cellHeight: " + cellHeight);
    float preciseRows = (_height - lossFactor)/(0.75 * cellHeight);
//    println("preciseRows: " + preciseRows);
    numRows = (int)((overflow) ? Math.ceil(preciseRows+0.25) : Math.floor(preciseRows));
//    println("... actual rows: " + numRows);
  }
  
  // _x and _y are relative to top left corner
  GridCoord coordForXY(float _x, float _y){
    println("coordForXY: " + _x + ", " + _y);
    GridCoord gridCoord = new GridCoord();

    // Use max() treat negative values as spot on (so we don't need to handle negative values)
    float deltaX = max(0, _x - xOffset);
    float deltaY = max(0, _y - yOffset);
//    println("... cellHeight: " + cellHeight);
//    println("... offsets: " + xOffset + ", " + yOffset);
//    println("... delta:   " + deltaX + ", " + deltaY);
    
    float preciseRowsDown = deltaY / (0.75 * cellHeight);
    int numThirdsDown = (int)((preciseRowsDown * 3) % 3); 
    int numFullCellsDown = (int)(floor(preciseRowsDown)); 
//    println("... preciseRowsDown ... " + preciseRowsDown 
//                  + ", numFullCellsDown ... " + numFullCellsDown 
//                  + ", numThirdsDown: " + numThirdsDown);

//    float preciseColsOver = max(0, deltaX - cellWidth/2) / cellWidth;
    float preciseColsOver = deltaX / cellWidth;
    int numColsOver = (int)floor(preciseColsOver);
//    println("... preciseColsOver: " + preciseColsOver + ", numColsOver ... " + numColsOver);
    
    if (numThirdsDown == 1){
      gridCoord.row = (int) numFullCellsDown;
      gridCoord.col = (int) numColsOver;
      
      float baseY = (0.75 * cellHeight) * (1 + numFullCellsDown);
      int numFullCellsOver = (int)(floor(preciseColsOver));
      
      // NEED TO calcuate the slope ... and value at the X offset 
      // Alternate: 3-dist comparisons to cetners of 2 cells
      
      float slope = 1 / sqrt(3);
      float fractionalCol = preciseColsOver - numFullCellsOver;
//      println("... BEFORE fractionalCol : "+  fractionalCol);
      if(numFullCellsDown % 2 == 1){
         fractionalCol = (fractionalCol > 0.5) ? (fractionalCol - 0.5) : (0.5 + fractionalCol);
      }
//      println("... AFTER fractionalCol : "+  fractionalCol);
      
//      stroke(255, 0, 0);
//      line(0, baseY, width, baseY);
      
//      stroke(255,255, 0);
//      line(0, baseY - protoHex.radius/2, width, baseY-protoHex.radius/2);
      
      
      if (fractionalCol < 0.5){
//        println("test against slope up to RIGHT");
        float deltaXFromBase = (cellWidth * fractionalCol);
//        println("... deltaXFromBase: " + deltaXFromBase);
        
//        stroke(255,0,255);
//        line(cellWidth/2 + cellWidth * numFullCellsOver + deltaXFromBase,0, 
//            cellWidth/2 + cellWidth * numFullCellsOver + deltaXFromBase, height);
        
        float deltaYFromBase = deltaXFromBase * slope;
//        println("... deltaYFromBase: " + deltaYFromBase);
        
        
        float yEdgeAtX = baseY - deltaYFromBase;
//        stroke(0, 0, 255);
//        line(0, yEdgeAtX, width, yEdgeAtX);
        
//        println("... baseY: " + baseY + ", yEdgeAtX: " + yEdgeAtX + ", _y ... " + _y);
        if(_y > yEdgeAtX){
//          println("Below the edge...");
          gridCoord.row += 1;
          gridCoord.col += (gridCoord.row % 2 == 0) ? 1 : 0;
          
        }else{
//          println("Above the edge...");
          // DON'T have to do anything 
        }
      }else{
//        println("test against slope up to LEFT");
        numColsOver = (int)round(deltaX / cellWidth);
        gridCoord.col = numColsOver;
        
        float deltaXFromBase = (cellWidth * (1-fractionalCol));
//        println("... deltaXFromBase: " + deltaXFromBase);

        float deltaYFromBase = deltaXFromBase * slope;
//        println("... deltaYFromBase: " + deltaYFromBase);
        
        float yEdgeAtX = baseY - deltaYFromBase;
        
//        println("... baseY: " + baseY + ", yEdgeAtX: " + yEdgeAtX + ", _y ... " + _y);
        if(_y > yEdgeAtX){
          // Below the edge
//          println("Below the edge...");
          gridCoord.row += 1;
          gridCoord.col -= (gridCoord.row % 2 == 1) ? 1 : 0;
          
        }else{
          // Above the edge
//          println("Above the edge...");
          // DON'T have to do anything 
        }
      }
    }else{
      gridCoord.row = (numThirdsDown==2) ? numFullCellsDown + 1 : numFullCellsDown;
      
      if(gridCoord.row % 2 == 1){
        numColsOver = (int)floor(deltaX / cellWidth);
        gridCoord.col = numColsOver;
      }else{
        numColsOver = (int)round(deltaX / cellWidth);
        gridCoord.col = numColsOver;
      }
      
    }
    
    return gridCoord;
  } 
  
  void draw(){
    pushMatrix();
    translate(x,y);
    
//    println("Drawing");
//    println("... width: " + this._width);
//    println("... cellWidth: " + cellWidth);
//    println("... numCols: " + numCols);
    stroke(40);
//    noStroke();
//    noStroke();
//    stroke(200);
//    strokeWeight(120);
//    strokeWeight(0.01);
      
    float rowOffset = 0;
    int colsInRow;
    
    for(int row=0; row < numRows; row++){
      rowOffset = rowOffset(row);
      colsInRow = numCols + (colFactor * (row % 2));

      for(int col=0; col < colsInRow; col++){
        fill(noisyColor(0.004*(row*col)));
        drawAtRowCol(row,col, rowOffset);
      }
    }
    
    popMatrix();
  }
  
  void drawAtRowCol(int row, int col){
    drawAtRowCol(row,col, rowOffset(row));
  }
  
  float rowOffset(int row){
    return xOffset + (row % 2) * cellWidth/2;
  }
  
  void drawAtRowCol(int row, int col, float rowOffset){
    hexagon(rowOffset + cellWidth * col,
            yOffset + (cellHeight*0.75)*row, 
            protoHex.radius);
  }
}

// --------------------------------------------------------------------------------

class Hexagon {
  float radius = 1;
  
  float width(){
    return 2 * cos(radians(30)) * radius;
  }
  
  float height(){
    return 2 * radius;
  }
}

// --------------------------------------------------------------------------------
// UTIL FUNCTIONS
// --------------------------------------------------------------------------------

color noisyColor(float offset){
  return color( 255*noise(offset), 255*noise(offset+100000), 255*noise(offset-100000));  
}

// DRAWS A HEXAGON ... similar to rect(...)
void hexagon(float centerX, float centerY, float radius){
  pushMatrix();
  // translate(centerX, centerY);
  beginShape();
  
  radius += 0.5;  // To avoid antialiasing introducing empty space between cells
  
  float x = centerX;
  float y = centerY - radius;
  vertex(x, y);
  
  x += cos(radians(30)) * radius; 
  y += radius / 2;
  vertex(x, y);
  
  y += radius;
  vertex(x, y);
  
  x = centerX;
  y = centerY + radius;
  vertex(x, y);
  
  x -= cos(radians(30)) * radius;
  y -= radius / 2;
  vertex(x, y);
  
  y -= radius;
  vertex(x, y);
  
  x = centerX;
  y = centerY - radius;
  vertex(x, y);
  
  x += cos(radians(30)) * radius; 
  y += radius / 2;
  vertex(x, y);
  
  endShape();
  popMatrix(); 
}
