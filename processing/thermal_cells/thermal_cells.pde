
GridViewController grid;

// import gifAnimation.*;
// GifMaker gifExport;


void setup(){
  size(500,500);
  grid = new GridViewController(0,0,width, height);
  
  frameRate(30);
  
  // gifExport = new GifMaker(this, "export.gif");
  // gifExport.setRepeat(0); 
  // gifExport.setQuality(4);
}

void draw(){
  grid.step();
  grid.renderViews();
  
  // gifExport.setDelay(1);
  // gifExport.addFrame();
}


void mouseDragged(){
  if(keyPressed == true){
    grid.removeHeatAt(mouseX, mouseY);
  }else{
    grid.addHeatAt(mouseX, mouseY);
  }
}



class GridViewController {
  ArrayList<Cell> cells;
  ArrayList<CellViewer> cellViewers;
  
  int cellWidth = 15;
  int cellHeight = 15;
  int _x;
  int _y;
  int _width; 
  int _height; 
  
  int cellSpacing = 2;
  int numCols;
  int numRows;
  
  GridViewController(int x, int y, int p_nWidth, int p_nHeight){
    this._x = x;
    this._y = y;
    this._width = p_nWidth;
    this._height = p_nHeight;
    
    this.initCells();
  }
  
  void addHeatAt(int globalX, int globalY){
    this._deltaHeatAt(true, globalX, globalY);
    
  }
  void removeHeatAt(int globalX, int globalY){
    this._deltaHeatAt(false, globalX, globalY);
  }
  
  void _deltaHeatAt(boolean addingHeat, int globalX, int globalY){
    int inCol = globalX / (cellWidth+cellSpacing);
    int inRow = globalY / (cellHeight+cellSpacing);
    
    int idxOfCell = inCol + inRow * numCols;
    Cell tmpCell = cells.get(idxOfCell);
    
    float deltaTmp = 300; 
    if (addingHeat == false){
      deltaTmp *= -1;
    }
    tmpCell.temp = constrain( tmpCell.temp+deltaTmp, -300, 300);
  }
  
  void initCells(){
    this.cells = new ArrayList<Cell>();
    this.cellViewers = new ArrayList<CellViewer>();
    
    int effectCellWidth = this.cellWidth + cellSpacing;
    int effectCellHeight = this.cellHeight + cellSpacing;
    
    // Note, by using 'ceil' we will overstep the bounds of the width/height;
    numCols = (int)ceil( (1.0 * this._width)  / (effectCellWidth) );
    numRows = (int)ceil( (1.0 * this._height) / (effectCellHeight) );
    
    int numCells = numCols * numRows;
    
    Cell tmpCell;
    CellViewer tmpCellViewer;
    int tmpRow; 
    int tmpCol;
    for(int i=0; i<numCells; i++){
      tmpCell = new Cell();
      tmpCol = i % numCols;
      tmpRow = i / numCols;
      // tmpCell.temp = map(tmpCol, 0, numCols, -300, 300);
      // tmpCell.temp = 100 * randomGaussian();
      tmpCell.temp = 300 * (noise(tmpCol, tmpRow) - 0.5);
      
      
      tmpCellViewer = new CellViewer(tmpCol * effectCellWidth, tmpRow * effectCellHeight, effectCellWidth, effectCellHeight, tmpCell);
      
      this.cells.add(tmpCell);
      this.cellViewers.add(tmpCellViewer);
    }
  }
  
  void step(){
    Cell tmpCell;
    Cell cellToRight;
    Cell cellBelow;
    for(int i=0; i<cells.size(); i++){
      tmpCell = cells.get(i);
      cellToRight = cells.get( this.cellIndexToRight(i) );
      cellBelow = cells.get( this.cellIndexBelow(i) );
      
      tmpCell.exchangeHeat(cellToRight);
      tmpCell.exchangeHeat(cellBelow);
    }
    
    this.resolveHeatExchange();
  }
  
  void resolveHeatExchange(){
    Cell tmpCell;
    for(int i=0; i<cells.size(); i++){
      tmpCell = cells.get(i);
      tmpCell.resolveHeatExchange();
    }
  }
  
  int cellIndexToRight(int idx){
    int idxRight;
    if (idx == (numCols * numRows - 1)){
      idxRight =  0;
    } else if (idx % numCols == (numCols - 1)){
      idxRight = idx - (numCols - 1); 
    }else {
      idxRight = idx + 1;
    }
    // println("Cell to right of i["+idx+"] is: ["+idxRight+"]");
    return idxRight;
  }
  
  int cellIndexBelow(int idx){
    int idxBelow = idx + numCols;
    if (idxBelow > (numCols * numRows - 1)){
      idxBelow %= numCols;
    }
    return idxBelow;
  }
  
  void renderViews(){
    pushMatrix();
    translate(_x, _y);
    CellViewer cellViewer;
    for(int i=0; i<this.cellViewers.size(); i++){
      cellViewer = cellViewers.get(i);
      cellViewer.renderOnScale(-300, 0, 300);
    }
    popMatrix();
  }
}

color minColor = color(255,0,0);
color midColor = color(255);
color maxColor = color(0,0,255);

class CellViewer {
  Cell cell;
  int _x;
  int _y;
  int _width;
  int _height;
  
  
  CellViewer(int x, int y, int p_nWidth, int p_nHeight, Cell p_xCell){
    this._x = x;
    this._y = y;
    this._width = p_nWidth;
    this._height = p_nHeight;
    this.cell = p_xCell;
  }
  
  void renderOnScale(float minTemp, float midPoint, float maxTemp){
    color fillColor = color(0);
    float normalizedTmp = 0;
    if (cell.temp < midPoint){
      normalizedTmp = norm( cell.temp, minTemp, midPoint);
      fillColor = lerpColor(minColor, midColor, normalizedTmp); 
    }else{
      normalizedTmp = norm( cell.temp, midPoint, maxTemp);
      fillColor = lerpColor(midColor, maxColor, normalizedTmp); 
    }
    noStroke();
    fill(fillColor);
    rect(_x, _y, _width, _height);
  }
}



class Cell {
  float temp;
  float deltaTemp = 0;
  int index;
  
  float condFactor = 0.2;
  
  void exchangeHeat(Cell otherCell){
    float heatGained = (otherCell.temp - this.temp) *  condFactor;
    this.deltaTemp += heatGained;
    otherCell.deltaTemp -= heatGained;
  }
  
  void resolveHeatExchange(){
    this.temp += this.deltaTemp;
    this.deltaTemp = 0; 
  }
}
