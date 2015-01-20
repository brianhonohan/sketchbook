AppController app;
GridViewController grid;

// import gifAnimation.*;
// GifMaker gifExport;


void setup(){
  size(500,500);
  grid = new GridViewController(0,0,width, height);
  
  app = new ThermalCellApp();
  frameRate(60);
  
  // gifExport = new GifMaker(this, "export.gif");
  // gifExport.setRepeat(0); 
  // gifExport.setQuality(4);
}

void draw(){
  background(180);
  if(app.isRunning()){
    grid.step();
  }
  grid.renderViews();
  
  if(app.hasOverlays){
    app.displayOverlays();
  }

  // gifExport.setDelay(1);
  // gifExport.addFrame();
}


void mouseDragged(){
  if(app.isRunning()){
    if(keyPressed == true){
      grid.removeHeatAt(mouseX, mouseY);
    }else{
      grid.addHeatAt(mouseX, mouseY);
    }
  }
}

void keyPressed(){
  switch(key){
     case 63:   // Question mark
         app.toggleHelpDisplay();
         return;
  }
}

class AppController{
  ArrayList<ShorcutKeyInfo> hotkeys;
  ArrayList<ShorcutKeyInfo> mouseEffects;
  ArrayList<ShorcutKeyInfo> mouseModifiers;
  
  final int APP_STATE_PAUSED = 0;
  final int APP_STATE_RUNNING = 1; 
  int state = APP_STATE_RUNNING;

  boolean isHelpShown = false;
  boolean hasOverlays = false;
  
  AppController(){
    hotkeys = new ArrayList<ShorcutKeyInfo>();
    mouseEffects = new ArrayList<ShorcutKeyInfo>();
    mouseModifiers = new ArrayList<ShorcutKeyInfo>();
    initShortcutInfo();
  }
  
  void initShortcutInfo(){
    hotkeys.add( new ShorcutKeyInfo("?", "Toggle dislpay of this Shortcut key menu") );
  }
  
  boolean isRunning(){
    return state == APP_STATE_RUNNING;
  }
  
  void togglePause(){
    if(isRunning()){
      state = APP_STATE_PAUSED;
    }else{
      state = APP_STATE_RUNNING;
    }
  }
  
  void toggleHelpDisplay(){
    togglePause();
    isHelpShown = !isHelpShown;
    hasOverlays = isHelpShown;
  }
   
  void displayHelp(){
    float margin = 0.05;
    float padding = 0.05;
    
    float menuWidth =  width*(1-2*margin) - width*(1-2*margin) * 2 * padding;
    float menuHeight = height*(1-2*margin) - height*(1-2*margin) * 2 * padding;
    
    fill(0, 220);
    pushMatrix();
    translate(width * margin, height*margin);
    rect(0,0, width*(1-2*margin), height*(1-2*margin), 20);
    
    pushMatrix();
    translate(menuWidth * padding, menuHeight * padding);
    
    TextStyleWriter txtWriter = new TextStyleWriter();
    
    TextStyle headingStyle = new TextStyle();
    headingStyle.size(20).hue( color(220, 220, 50) );
    
    TextStyle comboStyle = new TextStyle();
    comboStyle.size(14).hue( color(220, 220, 50) ).align(RIGHT);
    
    TextStyle infoStyle = new TextStyle();
    infoStyle.size(14).hue( color(220) );
    
    txtWriter.write("Shortcuts", 0, 0, headingStyle);
    
    stroke(color(220));
    line(0, 30, menuWidth, 30);
    
    float lineHeight = 20;
    float maxComboWidth = 90; // TODO: Make this dynamic
    float currentLineY = 35;
    ShorcutKeyInfo tmpInfo;
    
    // display keys
    for(int i=0; i<hotkeys.size(); i++){
      tmpInfo = hotkeys.get(i);
      txtWriter.write(tmpInfo.keyCombo, maxComboWidth - 5, currentLineY, comboStyle);
      txtWriter.write(":", maxComboWidth, currentLineY, infoStyle);
      txtWriter.write(tmpInfo.description, maxComboWidth + 10, currentLineY, infoStyle);
      currentLineY += lineHeight;
    }
    
    // display mouse effects
    for(int i=0; i<mouseEffects.size(); i++){
      tmpInfo = mouseEffects.get(i);
      txtWriter.write(tmpInfo.keyCombo, maxComboWidth - 5, currentLineY, comboStyle);
      txtWriter.write(":", maxComboWidth, currentLineY, infoStyle);
      txtWriter.write(tmpInfo.description, maxComboWidth + 10, currentLineY, infoStyle);
      currentLineY += lineHeight;
    }
    
    // display mouse modifiers
    for(int i=0; i<mouseModifiers.size(); i++){
      tmpInfo = mouseModifiers.get(i);
      txtWriter.write(tmpInfo.keyCombo, maxComboWidth - 5, currentLineY, comboStyle);
      txtWriter.write(":", maxComboWidth, currentLineY, infoStyle);
      txtWriter.write(tmpInfo.description, maxComboWidth + 10, currentLineY, infoStyle);
      currentLineY += lineHeight;
    }
    
    popMatrix();
    popMatrix();
  }
  
  void displayOverlays(){
    if( isHelpShown ){
      displayHelp();
    }
  }
}

class ShorcutKeyInfo {
  String keyCombo;
  String description;
  
  ShorcutKeyInfo(String keyInput, String descrip){
    keyCombo = keyInput;
    description = descrip;
  }
}

class ThermalCellApp extends AppController {
  
  void initShortcutInfo(){
    super.initShortcutInfo(); 
    
    mouseEffects.add( new ShorcutKeyInfo("Click + Drag", "Adds heat to the system") );
    mouseModifiers.add( new ShorcutKeyInfo("<Space>", "Inverts the temperature effect.") );
  }
  
}


class TextStyleWriter{
  
  void write(String message, float x, float y, TextStyle style){
    style.apply();
    text(message, x, y);
  }
}

// This class captures the styles that text can have
// IT supposts method chaining, like:
//    textStyle.size(10).color(200).align(CENTER);
class TextStyle {
  // TODO: Support Fonts
  color _color;
  float size;
  int mode = MODEL;
  int alignX = LEFT;
  int alignY = TOP;
  float leading = -1;  // use default of font size
  
//  final const int LEFT     = 0;
//  final const int CENTER   = 1;
//  final const int RIGHT    = 2;
//  final const int TOP      = 3;
//  final const int BOTTOM   = 4;
//  final const int CENTER   = 5;
//  final const int BASELINE = 6;
//  
  TextStyle size(float newSize){
    size = newSize;
    return this;
  }
  TextStyle hue(color newColor){
    _color = newColor;
    return this;
  }
  TextStyle mode(int newMode){
    mode = newMode;
    return this;
  }
  TextStyle align(int newAlignX){
    alignX = newAlignX;
    return this;
  }
  TextStyle align(int newAlignX, int newAlignY){
    alignX = newAlignX;
    alignY = newAlignY;
    return this;
  }
  
  void apply(){
    fill(_color);
    textSize(size);
    textMode(mode);
    textAlign(alignX, alignY);
    if(leading > 0){
      textLeading(leading);
    }
  }
  
  float width(String str){
    this.apply();
    return textWidth(str);
  }
  float ascent(){
    this.apply();
    return textAscent();
  }
  float descent(){
    this.apply();
    return textDescent();
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
