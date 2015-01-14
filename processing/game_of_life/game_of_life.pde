color bgColor = color(10,10, 50);
GameOfLife game;


import gifAnimation.*;
GifMaker gifExport;
boolean exportingFrames = false;

void setup(){
  size(500, 500);
  background(bgColor);
  game = new GameOfLife();
  
  frameRate(5);
  startGifExport();
}

void draw(){
  background(bgColor);
  game.draw();
  game.step();
  
  if(exportingFrames){
    gifExport.addFrame();
  }
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
  boolean[][] current;  
  boolean[][] nextGen;
  
  // boolean wrapEdges = false; // assumed to be false for now.
  
  int numCols = 0;
  int numRows = 0;
  int cellWidth = 10;
  
  color c1 = color(200, 200, 50);
  color c2 = color(240, 130, 0);
  
  GameOfLife(){
    numCols = width / cellWidth;
    numRows = height / cellWidth;
    current = new boolean[numRows][numCols];
//    nextGen = new boolean[numRows][numCols];
  }
  
  void bringLifeAt(int x, int y){
    // println("bringLifeAt x("+x+") y("+y+")");
    int rowIdx = y / cellWidth;
    int colIdx = x / cellWidth;
    // println("... row("+rowIdx+") colIdx("+colIdx+")");
    current[rowIdx][colIdx] = true;
  }
  
  void step(){
    nextGen = new boolean[numRows][numCols];
    
    for(int i=0; i<numRows; i++){
      for(int j=0; j<numCols; j++){
        int numSurrounding = this.countAt(i, j);
        
        // println("... row["+i+"] ... col["+j+"] ... surrounded by: " + numSurrounding);
        switch(numSurrounding){
          case 0:
          case 1:
            nextGen[i][j] = false;
            break;
          
          case 2:
            nextGen[i][j] = current[i][j];
            break;
            
          case 3:
            // either its alive ... and stays alive
            // or its dead, and comes to live by reproduction
            nextGen[i][j] = true;
            break;
          
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
              nextGen[i][j] = false; 
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
    ret_count += (!firstRow && !leftCol && current[row-1][col-1]) ? 1 : 0;
    // topCenter
    ret_count += (!firstRow && current[row-1][col]) ? 1 : 0;
    // topRIght
    ret_count += (!firstRow && !rightCol && current[row-1][col+1]) ? 1 : 0;
    // midLeft
    ret_count += (!leftCol && current[row][col-1]) ? 1 : 0;
    // midRight
    ret_count += (!rightCol && current[row][col+1]) ? 1 : 0;
    // bottomLeft
    ret_count += (!lastRow && !leftCol && current[row+1][col-1]) ? 1 : 0;
    // bottomCenter
    ret_count += (!lastRow && current[row+1][col]) ? 1 : 0;
    // bottomRight
    ret_count += (!lastRow && !rightCol && current[row+1][col+1]) ? 1 : 0;
    
    return ret_count;
  }
  
  void draw(){
    noStroke();
    fill(c2);
    for(int i=0; i<numRows; i++){
      for(int j=0; j<numCols; j++){
        if(current[i][j]){
          rect( j*cellWidth, i*cellWidth, cellWidth, cellWidth);
        }
      }
    }
  }
}
