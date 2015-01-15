color bgColor = color(10,10, 50);
GameOfLife game;


import gifAnimation.*;
GifMaker gifExport;
boolean exportingFrames = false;

void setup(){
  size(500, 500);
  background(bgColor);
  game = new GameOfLife();
  
  frameRate(6);
//  startGifExport();
}

void draw(){
  background(bgColor);
  game.draw();
  game.step();
  
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
  
  int numCols = 0;
  int numRows = 0;
  int cellWidth = 20;
  
  color c1 = color(200, 200, 50);
  color c2 = color(240, 130, 0);
  
  final int COLOR_MODE_STATIC = 0;
  final int COLOR_MODE_LERP = 1;
  final int COLOR_MODE_ARRAY = 2;
  
  int colorMode = COLOR_MODE_LERP;
  
  GameOfLife(){
    numCols = width / cellWidth;
    numRows = height / cellWidth;
    current = new int[numRows][numCols];
  }
  
  void bringLifeAt(int x, int y){
    // println("bringLifeAt x("+x+") y("+y+")");
    int rowIdx = y / cellWidth;
    int colIdx = x / cellWidth;
    // println("... row("+rowIdx+") colIdx("+colIdx+")");
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
        }
        if(current[i][j] > 0){
          rect( j*cellWidth, i*cellWidth, cellWidth, cellWidth);
        }
      }
    }
  }
}
