Keyboard keyboard;
Keyboard keyboardViewer;
Palette palette = new Palette();

// import gifAnimation.*;
// GifMaker gifExport;

final int BTN_START_RECORDING = 0;
final int BTN_STOP_RECORDING = 1;
final int BTN_REPLAY_RECORDING = 2;
final int BTN_STOP_REPLAY = 3;
KeyRecording  keyRecorder;
KeyRecordingPlayer  recordingPlayer;
ArrayList<Button> buttons;


void setup(){
  size(500, 500);
  background(0);
  noStroke();
//  noLoop();
  
  // keyboard = new Keyboard(150, 50);
  keyboard = new Keyboard(0,40,300,120);//,height);
  keyboardViewer = new Keyboard(0,250,300,120);//,height);
  noStroke();
  fill(200,0,0);
  
  buttons = new ArrayList<Button>();
  buttons.add( new Button(BTN_START_RECORDING, "Start Recording", 0.7 * width, 50, 180) );
  buttons.add( new Button(BTN_STOP_RECORDING, "Stop Recording", 0.7 * width, 100, 180) );
  buttons.add( new Button(BTN_REPLAY_RECORDING, "Replay Recording", 0.7 * width, 150, 180) );
  buttons.add( new Button(BTN_STOP_REPLAY, "Stop Replay", 0.7 * width, 200, 180) );
  
  keyRecorder = new KeyRecording();
  keyboard.setColorRange(keyboardViewer.COLOR_RANGE_GREEN);
  keyboardViewer.setColorRange(keyboardViewer.COLOR_RANGE_RED);
  recordingPlayer = new KeyRecordingPlayer(keyRecorder, keyboardViewer);
  
  // gifExport = new GifMaker(this, "export.gif");
  // gifExport.setRepeat(0);             // make it an "endless" animation

}

void draw(){
  fill( 0,10);
  rect(0,0, width, height);
  if (recordingPlayer.isPlaying()){ 
    println("playing back");
    recordingPlayer.stepFrame(); 
  } 
  
  for(int i=0; i<buttons.size(); i++){
    Button button = buttons.get(i);
    button.render(); 
  }
  
  // gifExport.setDelay(1);
  // gifExport.addFrame();
}

void keyTyped(){
  keyboard.showPressedKey(int(key));
  if (keyRecorder.isRecording()){  keyRecorder.recordKeyPress(int(key)); }
}

void mousePressed(){
  for(int i=0; i<buttons.size(); i++){
    Button button = buttons.get(i);
    boolean pressed = button.pressIfHit(mouseX, mouseY);
    if (pressed){
      handleButton(i); 
    }
  }
}

void handleButton(int buttonId){
  println("Handling button: " + buttonId);
  switch(buttonId){
    case   BTN_START_RECORDING:  
                handleStartRecording();
                return;
    case   BTN_STOP_RECORDING:  
                handleStopRecording();
                return;
    case   BTN_REPLAY_RECORDING:  
                handleReplayRecording();
                return;
    case   BTN_STOP_REPLAY:  
                handleStopReplay();
                return;
  }
}

void handleStartRecording(){
  keyRecorder.setRecording(true);
  
}
void handleStopRecording(){
  keyRecorder.setRecording(false);
  
}
void handleReplayRecording(){
  fill(0);
  rect(0,0, 305, 175); // cheat ... draw black over keyboard.
  recordingPlayer.playFromBeginning();
}
void handleStopReplay(){
  recordingPlayer.pausePlaying();
  // gifExport.finish(); 
}



void mouseReleased(){
  println("Checking the buttons if their pressed");
  
  for(int i=0; i<buttons.size(); i++){
    Button button = buttons.get(i);
    button.releaseButton();
  }
}

class Button{
  int id;
  float x;
  float y;
  String label;
  float _width;
  float _height;
  float margin;
  color _color;
  
  final int STATE_PRESSED = 0;
  final int STATE_UNPRESSED = 1;
  
  int state;
  
  Button(int p_nId, String p_sLabel, float p_nX, float p_nY, float p_nWidth){
    this.id = p_nId;
    this.margin = 5;
    this.label = p_sLabel;
    this.x = p_nX;
    this.y = p_nY;
    this._height = 24;
    this._color = color(120);
    this.setWidth(p_nWidth);
    this.state = STATE_UNPRESSED;
  }
  
  void setColor(color c){
    
  }
  
  void setWidth(float p_nWidth){
    textSize(16);
    this._width = min(p_nWidth, margin*2 + textWidth(this.label));
  }
  
  private color backgroundColor(){
    switch(state){
        case STATE_PRESSED:
                return color(100,200,100);
        case STATE_UNPRESSED:
        default:
                return _color;
    }
  }
  private color labelColor(){
    switch(state){
        case STATE_PRESSED:
                return color(150,240,150);
        case STATE_UNPRESSED:
        default:
                return color(250);
    }
  }
  
  void render(){
    pushMatrix();
    translate(x,y);
    fill(backgroundColor());
    rect(0,0, _width, _height,5);
    fill(labelColor());
    textSize(16);
    text(label, margin, margin+12);
    
    popMatrix();
  }
  
  void releaseButton(){
    this.state = STATE_UNPRESSED;
    
  }
  
  boolean pressIfHit(float p_nX, float p_nY){
    if (x <= p_nX && p_nX <= (x+_width)
          && y <= p_nY && p_nY <= (y+_height))
    {
      this.state = STATE_PRESSED;
      return true;
    }
    return false;
  }
}



class KeyEvent{
  int keycode;
  int time;
  
  KeyEvent(int p_nKeycode, int p_nTime){
    this.keycode = p_nKeycode;
    this.time = p_nTime;  
  }
}

class KeyRecordingPlayer{
  int playheadTime;  // global time, in recording, to start playing at
  KeyRecording keyRecording;
  Keyboard keyboard;
  boolean isPlaying;
  int currentEventIndex;
  
  KeyRecordingPlayer(KeyRecording p_xKeyRecording, Keyboard p_xKeyboard){
    keyRecording = p_xKeyRecording;
    keyboard = p_xKeyboard;
    isPlaying = false;
    
  }
  
  public void seek(int p_nSeekTo){
    int seekTo = min(p_nSeekTo, keyRecording.getLatestRecordingTime());
    seekTo = max(seekTo, keyRecording.getFirstRecordingTime());
    playheadTime = seekTo;
  }
  
  public void reset(){
    this.seek(0);  
  }
  
  public void playFromBeginning(){
    reset();
    startPlaying();
    currentEventIndex = 0;
  }
  public boolean isPlaying(){
    return isPlaying;
  }
  
  public void startPlaying(){
    isPlaying = true;
  }
  public void pausePlaying(){
    isPlaying = false;
  }
  
  public void stepFrame(){
    float millisPerFrame = 1.0 / frameRate * 1000;
    // int simulatedTime = timeOffSet + frameCounter;
//    println("----");
//    println("... millis per frame: " + millisPerFrame);
//    println("... playhead at: " + playheadTime);
    
    // Find and re-fire events up to and including, playhead + millisPerFrame
    KeyEvent keyEvent = keyRecording.getEvent(currentEventIndex);
    int limit = 20;
    int loopCounter = 0;
    while((loopCounter < limit)
         && keyEvent != null
         && (keyEvent.time < (playheadTime + millisPerFrame)) )
    {
      // println("... have key, replaying event: " + keyEvent.keycode);
      keyboard.showPressedKey(keyEvent.keycode);
      currentEventIndex++;
      keyEvent = keyRecording.getEvent(currentEventIndex);
      loopCounter++;
    }
    // Move the playhead through  
    playheadTime += millisPerFrame;
    
    // Make sure we didn't run out of track.
    if (playheadTime > keyRecording.getLatestRecordingTime()){
      this.pausePlaying();
    }
  }
}

class KeyRecording {
  ArrayList<KeyEvent> keyPresses;
  int firstRecordingAt;
  int latestRecordingAt;
  boolean isRecording;
  // int timeOffset;
  
  KeyRecording(){
    keyPresses = new ArrayList<KeyEvent>();
  }
  
  public boolean isRecording(){
    return isRecording;
  }
  
  public void setRecording(boolean p_bRecording){
    isRecording = p_bRecording;
//    if (isRecording){
//      timeOffset = min(millis();
//    }
  }
  
  public KeyEvent getEvent(int index){
    if (index < 0 || index > (keyPresses.size()-1)){
      return null; 
    }
    return keyPresses.get(index);
  }
  
  public void recordKeyPress(int keycode){
    int currentMillis = millis(); //-timeOffset;
    println("Recording key["+keycode+"] at time["+currentMillis+"]");
    if (firstRecordingAt == 0){
      firstRecordingAt = currentMillis;
    }
    latestRecordingAt = max(latestRecordingAt, currentMillis);
    keyPresses.add( new KeyEvent(keycode, currentMillis) );
  }
  
  public int getFirstRecordingTime(){
    return firstRecordingAt;
  }
  public int getLatestRecordingTime(){
    return latestRecordingAt;
  }
  
}

//
//class Rectangle{
//  float x;
//  float y;
//  float _width;
//  float _height;
//}

class Point {
  float x;
  float y; 
  
  Point(){ 
    
  }
  Point(int _x,int _y){ 
    x = _x;
    y = _y;
  }
  
  Point(float _x,float _y){ 
    x = _x;
    y = _y;
  }
}

class TableCell {
 int row;
 int col;
 
 TableCell(int p_nRow, int p_nCol){
   this.row = p_nRow;
   this.col = p_nCol;
 } 
}

class Keyboard{
  int x;
  int y;
  int _width;
  int _height;
  int margin=0;
  float keyWidth;
  float keyHeight;
  ArrayList<TableCell> keycodesToTableCell;
  
  int[] keycodeToRow;
  int[] keycodeToCol;
  float[] rowToMargin;
  
  final int COLOR_RANGE_RED = 0;
  final int COLOR_RANGE_GREEN = 1;
  final int COLOR_RANGE_BLUE = 2;
  int colorRange = COLOR_RANGE_GREEN;
  
  Keyboard(){
    println("AHASDSD");
    this._width = width;
    this._height = height;
  }
  
  Keyboard(int p_nWidth, int p_nHeight){
    println("aoavasdfoiasdfas");
    this._width = p_nWidth;
    this._height = p_nHeight;
    println("This width/height: " + p_nWidth + "x" + _height);
    initStaticProperties();
    initDerivedProperties();
  }
  Keyboard(int p_nX, int p_nY, int p_nWidth, int p_nHeight){
    this.x = p_nX;
    this.y = p_nY;
    
    this._width = p_nWidth;
    this._height = p_nHeight;
    println("This width/height: " + p_nWidth + "x" + _height);
    initStaticProperties();
    initDerivedProperties();
  }
  
  public void setColorRange(int p_nColorRange){
    switch(p_nColorRange){
        case COLOR_RANGE_RED:
            colorRange = COLOR_RANGE_RED;
            break;
        case COLOR_RANGE_GREEN:
            colorRange = COLOR_RANGE_GREEN;
            break;
        case COLOR_RANGE_BLUE:
            colorRange = COLOR_RANGE_BLUE;
            break;
    }
  }
  
  private color getColorInRange(){
    switch(colorRange){
        case COLOR_RANGE_RED:
            return palette.initRandomRed().getColor();
        case COLOR_RANGE_GREEN:
            return palette.initRandomGreen().getColor();
        case COLOR_RANGE_BLUE:
        default:
            return palette.initRandomBlue().getColor();
    }
    
  }
  
  
  
  private void initStaticProperties(){
    // keycodesToTableCell = new ArrayList<TableCell>();
    
    int numKeys = 127;
    keycodeToRow = new int[numKeys];
    keycodeToCol = new int[numKeys];
    
    populateKeycodeTable("~!@#$%^&*()_+", 0, 0);
    populateKeycodeTable("`1234567890-=", 0, 0);
    populateKeycodeTable("qwertyuiop[]\\", 1, 0);
    populateKeycodeTable("QWERTYUIOP{}|", 1, 0);
    populateKeycodeTable("asdfghjkl;'", 2, 0);
    populateKeycodeTable("ASDFGHJKL:\"", 2, 0);
    populateKeycodeTable("ASDFGHJKL:\"", 2, 0);
    populateKeycodeTable("zxcvbnm,./", 3, 0);
    populateKeycodeTable("ZXCVBNM<>?", 3, 0);
    populateKeycodeTable(" ", 4, 0);
    
  }
  
  private void populateKeycodeTable(String keys, int row, int colOffset){
    for(int i=0; i<keys.length(); i++){
      char c = keys.charAt(i);
      keycodeToRow[(int)c] = row;
      keycodeToCol[(int)c] = colOffset + i;
    }
  }
  
  private void initDerivedProperties(){
    int numRows = 5;
    int numCols = 14; // backtick to += key ... and delete key
    println("This width/height: " + _width + "x" + _height);
    this.keyWidth = (this._width - this.margin*(numCols+1))/ (1.0 * numCols);
    this.keyHeight = (this._height - this.margin*(numRows+2))/ (1.0 * numRows); 
    
    this.rowToMargin = new float[numRows];
    this.rowToMargin[0] = 0;
    this.rowToMargin[1] = margin + (keyWidth + margin) *1.5;
    this.rowToMargin[2] = margin + (keyWidth + margin) *1.7;
    this.rowToMargin[3] = margin + (keyWidth + margin)*2;
    this.rowToMargin[4] = margin + (keyWidth + margin)*4;
  }
  
  public Point getPointForKey(int keycode){
    return this.getPointForKey(keycode, 0, width, 0, height);
  }
   
  public Point getPointForKeyRandom(int keycode, int minX, int maxX, int minY, int maxY){
    Point retVal = new Point();
    retVal.x = (int)random(30, 300);
    retVal.y = (int)random(30, 300);
    return retVal;
  }
  
  public Point getPointForKey(int keycode, int minX, int maxX, int minY, int maxY){
    if (keycode < 0 || keycode > (keycodeToRow.length-1)){
       println("INVALID KEYCODE" +  keycode);
       return new Point(-1000,-1000);
    }
    
    int row = keycodeToRow[keycode];
    int col = keycodeToCol[keycode];
    //println("KEY: " + keycode + ", in row,col: " + row + ", " + col);
    //println("... Margin: " + rowToMargin[row]);
    return new Point(rowToMargin[row] + margin*col + col*keyWidth + 0.5*keyWidth
                     , margin*row + row*keyHeight + 0.5*keyHeight );
  }
  
  public int rowForKey(int keycode){
    return (keycode > (keycodeToRow.length-1)) ? -1 : keycodeToRow[keycode];
  }
  public int colForKey(int keycode){
    return (keycode > (keycodeToCol.length-1)) ? -1 : keycodeToCol[keycode];
  }
  
  public float keyWidthForCode(int keyCode){
    return (keyCode == 32) ? (5*keyWidth + 4*margin) : keyWidth;
  }
  
  public void showPressedKey(int keyCode){
    pushMatrix();
    translate(x,y);
    Point pt = this.getPointForKey(keyCode);
    fill(0,200,0);
    fill( getColorInRange() );
    rect(pt.x, pt.y, keyWidthForCode(keyCode), keyHeight );
    popMatrix();
  }
}

class FloatColor{
    float r = 0;
    float g = 0;
    float b = 0;
    float a = 255;
    
    float minR = 0;
    float maxR = 255;
    float minG = 0;
    float maxG = 255;
    float minB = 0;
    float maxB = 255;
  
  public FloatColor(float rVal, float gVal, float bVal){
    this.r = rVal;
    this.g = gVal;
    this.b = bVal;
  }
  
  public color getColor(){
    return color(this.r, this.g, this.b, this.a);
  }
}


class Palette{
  public FloatColor initRandomRed(){
    float baseVal = this.randomIntensity();
    float secondary = this.randomSecondaryIntensity();
    FloatColor retVal = new FloatColor(baseVal, secondary*baseVal, secondary*baseVal);
    return retVal;
  }
  public FloatColor initRandomGreen(){
    float baseVal = this.randomIntensity();
    float secondary = this.randomSecondaryIntensity();
    // println("Secondary: " + secondary);
    FloatColor retVal = new FloatColor(0.2*baseVal, baseVal, secondary*baseVal);
    return retVal;
  }
  public FloatColor initRandomBlue(){
    float baseVal = this.randomIntensity();
    float secondary = this.randomSecondaryIntensity();
    FloatColor retVal = new FloatColor(secondary*baseVal, secondary*baseVal, baseVal);
    return retVal;
  }
  
  private float randomIntensity(){
   return random(150,255); 
  }
  
  private float randomSecondaryIntensity(){
    return 0.1 + random(1) / 2.0;
  }
  
  
}
