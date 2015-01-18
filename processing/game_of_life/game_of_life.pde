color bgColor = color(10,10, 50);
GameOfLife game;

// Comment these out if you don't have the GifAnimation
import gifAnimation.*;
GifMaker gifExport;
boolean exportingFrames = false;

void setup(){
  size(500, 500);
  background(bgColor);
  game = new GameOfLife();
//  GliderGun glider = new GliderGun();
//  glider.applyCellsTo(game.current, 0, 0); 
  // game.fillEverOtherRow(false);
  game.fillAsCheckerBoard(false);

  frameRate(60);
// startGifExport();
}

void draw(){
  background(bgColor);
  
  game.draw();
  if(mousePressed == false){
    game.step();
  }
  
  // frameRate(0);
  // println("frameRate: " + frameRate);
  
//  if(exportingFrames){
//    gifExport.addFrame();
//  }
}


void mouseDragged(){
  game.bringLifeAt(mouseX, mouseY);
}
void mousePressed(){
  game.bringLifeAt(mouseX, mouseY); 
// if (exportingFrames){
//   stopGifExport();
// }else{
//   startGifExport();
// }
}

void startGifExport(){
   gifExport = new GifMaker(this, "export" + millis() + ".gif");
   gifExport.setRepeat(0);
   gifExport.setQuality(2);
   int delayInMillis = (int)(1000/10.0);
   gifExport.setDelay( delayInMillis );
   exportingFrames = true;
}

void stopGifExport(){
   if(gifExport != null){
     gifExport.finish();
   }
   exportingFrames = false;
}


class GameOfLife{
  int[][] current;  
  int[][] nextGen;
  
  // boolean wrapEdges = false; // assumed to be false for now.
  
  // FLAG: TODO: Fix Inconsistent naming convention, conflicts with Automaton
  int numCols = 0;
  int numRows = 0;
  int cellWidth = 2;
  
  color c1 = color(200, 200, 50);
  color c2 = color(240, 130, 0);
  
  int[] colors;
  
  final int COLOR_MODE_STATIC = 0;
  final int COLOR_MODE_LERP = 1;
  final int COLOR_MODE_ARRAY = 2;
  
  int colorMode = COLOR_MODE_ARRAY;
  
  GameOfLife(){
    numCols = width / cellWidth;
    numRows = height / cellWidth;
    current = new int[numRows][numCols];
    
    // fillColorArray(c1, c2, 20);
    // fillColorArray( color(50,200,50), color(50,50,200), 20);
    useSetPallete();
  }
  
  void fillEverOtherRow(boolean lifeOnOdds){
    int oddLife = (lifeOnOdds) ? 1 : 0;
    int evenLife = (lifeOnOdds) ? 0 : 1;
    
    for(int i=0; i<numRows; i++){
      // depending on odd/even numRows ... this may or may not have symetry
      for(int j=0; j<numCols; j++){
        current[i][j] = (i%2 == 0) ? evenLife : oddLife;
      }
    }
  }
  
  // offset can be 0 or 1
  void fillAsCheckerBoard(boolean lifeOnOdds){
    int oddLife = (lifeOnOdds) ? 1 : 0;
    int evenLife = (lifeOnOdds) ? 0 : 1;
    for(int i=0; i<numRows; i++){
      for(int j=0; j<numCols; j++){
        current[i][j] = ( (j+i%2)%2 == 0) ? evenLife : oddLife;
      }
    }
  }
  
  void fillColorArray(color color1, color color2, int numSteps){
    colors = new int[numSteps];
    color tmpColor;
    for(int i=0; i<numSteps; i++){
      tmpColor = lerpColor(color1, color2, norm(i, 0,(numSteps-1) ));
      colors[i] = int(tmpColor);
    }
  }
  
  void useSetPallete(){
    colors = new int[6];
    colors[0] = int( color(50,200,50) ); // BUG ... this is ignored
    colors[1] = int( color(50,155,50) );
    colors[2] = int( color(150,150,50) );
    colors[4] = int( color(100,100,50) );
    colors[5] = int( color(50,50,50) );
  }
  
  void bringLifeAt(int x, int y){
    // println("bringLifeAt x("+x+") y("+y+")");
    int rowIdx = y / cellWidth;
    int colIdx = x / cellWidth;
    // println("... row("+rowIdx+") colIdx("+colIdx+")");
    if( !between(colIdx, 0, numCols-1) || !between(rowIdx, 0, numRows-1)){
      return;
    }
    if(0 == current[rowIdx][colIdx]){
      current[rowIdx][colIdx] = 1;
    }
  }
  
  void step(){
    nextGen = new int[numRows][numCols];
    
    for(int i=0; i<numRows; i++){
      for(int j=0; j<numCols; j++){
        int numSurrounding = this.countAt(i, j);
        
        // println("... row["+i+"] ... col["+j+"] ... surrounded by: " + numSurrounding);
        switch(numSurrounding){
          case 0:
          case 1:
            nextGen[i][j] = 0;
            break;
          
          case 2:
            if(current[i][j] > 0){
              nextGen[i][j] = current[i][j] + 1;
            }else{
              nextGen[i][j] = 0;
            }
            break;
            
          case 3:
            // either its alive ... and stays alive
            // or its dead, and comes to live by reproduction
            nextGen[i][j] = current[i][j] + 1;
            break;
          
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
              nextGen[i][j] = 0; 
              break;
        }
      }
    }
    
    current = nextGen;
  }
  
  int countAt(int row, int col){
    int ret_count = 0;
    
    // First, let's figure out some limits
    boolean firstRow  = row == 0;
    boolean lastRow   = row == (numRows-1);
    boolean leftCol   = col == 0;
    boolean rightCol  = col == (numCols-1);
    
    // topleft
    ret_count += (!firstRow && !leftCol && current[row-1][col-1] > 0) ? 1 : 0;
    // topCenter
    ret_count += (!firstRow && current[row-1][col] > 0) ? 1 : 0;
    // topRIght
    ret_count += (!firstRow && !rightCol && current[row-1][col+1] > 0) ? 1 : 0;
    // midLeft
    ret_count += (!leftCol && current[row][col-1] > 0) ? 1 : 0;
    // midRight
    ret_count += (!rightCol && current[row][col+1] > 0) ? 1 : 0;
    // bottomLeft
    ret_count += (!lastRow && !leftCol && current[row+1][col-1] > 0) ? 1 : 0;
    // bottomCenter
    ret_count += (!lastRow && current[row+1][col] > 0) ? 1 : 0;
    // bottomRight
    ret_count += (!lastRow && !rightCol && current[row+1][col+1] > 0) ? 1 : 0;
    
    return ret_count;
  }
  
  void draw(){
    noStroke();
    fill(c2);
    for(int i=0; i<numRows; i++){
      for(int j=0; j<numCols; j++){
        if(colorMode == COLOR_MODE_LERP){
          fill( lerpColor(c1, c2, norm(current[i][j], 0,10)) );
        }else if(colorMode == COLOR_MODE_ARRAY){
          int colorIdx = constrain(current[i][j], 0, colors.length-1);
          int colorAsInt = colors[colorIdx];
          setFillByInt(colorAsInt);
        }
        if(current[i][j] > 0){
          rect( j*cellWidth, i*cellWidth, cellWidth, cellWidth);
        }
      }
    }
  }
}

// TODO: Extract this code into common UTIL
void setFillByInt(int argb){
// From Processing Documentation on ">> right shift"
//  int a = (argb >> 24) & 0xFF;
//  int r = (argb >> 16) & 0xFF;  // Faster way of getting red(argb)
//  int g = (argb >> 8) & 0xFF;   // Faster way of getting green(argb)
//  int b = argb & 0xFF;          // Faster way of getting blue(argb)
//  fill(r, g, b, a);
  fill(
        (argb >> 16) & 0xFF, 
        (argb >> 8) & 0xFF, 
        argb & 0xFF, 
        (argb >> 24) & 0xFF
      );
}


// inclusive
boolean between(int valToCheck, int lowVal, int highVal){
  return (lowVal <= valToCheck) && (valToCheck <= highVal);
}

// Abstract class for creating and merging Cellular Automaton
class Automaton {
  int[][] cells;
  int rows;
  int cols;
  
  void initCells(int numRows, int numCols){
    cells = new int[numRows][numCols];
//    println("INIT CELLS ... w x h :  " + numRows + " x " + numCols);
//    println("... src dimension ["+cells.length+"]["+cells[0].length+"]");
    rows = numRows;
    cols = numCols;
  }
  
  // note this could be abstracted to a "Merge" 
  // ... which could take an operand ... SET | ADD | SUB | MULT | DIV | MOD
  void applyCells(int[][] srcCells, int[][] destCells, int atRow, int atCol){
//    println("applyCells...");
//    println("... src dimension ["+srcCells.length+"]["+srcCells[0].length+"]");
//    println("... dest dimension ["+destCells.length+"]["+destCells[0].length+"]");
//    println("... adding at: row["+atRow+"] ... col["+atCol+"]");
    
    int tmpRowIdx;
    int tmpColIdx; 
    
    for(int i=0; i<srcCells.length; i++){
      for(int j=0; j<srcCells[i].length; j++){
        
        tmpRowIdx = atRow + i;
        tmpColIdx = atCol + j;
        if ( between(tmpRowIdx, 0, destCells.length-1) 
            && between(tmpColIdx, 0, destCells[0].length-1) )
        {
          destCells[tmpRowIdx][tmpColIdx] = srcCells[i][j];
        }else{
          println("WARNING... Out of range"); 
        }
      }
    }
  }
  
  void applyCellsTo(int[][] destCells, int atRow, int atCol){
    applyCells(this.cells, destCells, atRow, atCol);
  }
  
  void addBlockAt(int numRows, int numCols, int atRow, int atCol){
    // println("ADDING BLOCK...");
    int[][] newCells = new int[numRows][numCols];
    for(int i=0; i<numRows; i++){
      for(int j=0; j<numCols; j++){
          newCells[i][j] = 1;
      }
    }
    this.applyCells(newCells, this.cells, atRow, atCol);
  }
}


// Implementation of: http://en.wikipedia.org/wiki/Gun_(cellular_automaton)
class GliderGun extends Automaton{
  GliderGun(){
    initCells(11, 38);
    addBlockAt(2, 2, 5, 1);
    addBlockAt(2, 2, 3, 35);
    
    // right hand side, from right
    addBlockAt(2,1, 1, 25);
    addBlockAt(2,1, 6, 25);
    
    addBlockAt(1,1, 2, 23);
    addBlockAt(1,1, 6, 23);
    addBlockAt(3,2, 3, 21);
    
    // left module, from left
    addBlockAt(3,1, 5, 11);
    
    addBlockAt(1,1, 4, 12);
    addBlockAt(1,1, 8, 12);
    
    addBlockAt(1,2, 3, 13);
    addBlockAt(1,2, 9, 13);
    
    addBlockAt(1,1, 6, 15);
    
    addBlockAt(1,1, 4, 16);
    addBlockAt(1,1, 8, 16);
    
    addBlockAt(3,1, 5, 17);
    
    addBlockAt(1,1, 6, 18);
  }
}
