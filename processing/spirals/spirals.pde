AppController app;
color bgColor = color(10,10, 50);

Point mouse;
PolarPoint polarMouse;
Spiral spiral;

//import gifAnimation.*;
//GifMaker gifExport;
boolean exportingFrames = false;

float ptStepPercent = 0.03;  // percent of difference to move to target
final float VOGEL_ANGLE = 137.508;

void setup(){
  // size(displayWidth/2, displayHeight);
  size(500, 500);
  background(bgColor);
  colorMode(RGB, 255);
  app = new SpiralsApp();
  
  mouse = new Point();
  spiral = new Spiral();
  frameRate(30);
  
  // startGifExport();
  spiral.setConfig(VOGEL_ANGLE, 10);
//  spiral.setConfig(3, 10);
  
  // drawVogelSpiral(500, VOGEL_ANGLE, 10.5, 8);
}

void draw(){
  background(bgColor);
  
  // should consider refactoring into spiral.step() and spiral.draw();
  spiral.draw();
  
  if(exportingFrames){
//    gifExport.setDelay();
    //gifExport.addFrame();
    //saveFrame("spirals-######.png");
  }
  
  if(app.hasOverlays){
    app.displayOverlays();
  }
  // println(frameRate);
}

void keyPressed(){
  switch(key){
     case 63:   // Question mark
         app.toggleHelpDisplay();
         return;
     case 44:   // Comma
         app.toggleConfigDisplay();
         return;
     default:
         spiral.setConfig(137.508, 10);
  }
}

void mouseMoved(){
  mouse.x = mouseX;
  mouse.y = mouseY;
  polarMouse = mouse.toPolarPoint();
  
  // int numPoints = (int) ( 500 * norm(mouseY*mouseX, 0, width*height) );
  
  float degrees = ( 360 * norm(mouseY*mouseX, 0, width*height) );
  float degress = polarMouse.theta * 180 / PI;
  if (keyPressed == true){
    degrees = 137.508;
  }
  
  float scalingFactor = ( 20 * norm(mouseX, 0, width) );
  // float pointWt = ( 20 * norm(mouseY, 0, height) );
  
  spiral.setConfig(degrees, 10);
  // spiral.setConfig(degrees, scalingFactor);
 // spiral.setConfig(degrees, 3);
}

void mousePressed_disabled(){
 if (exportingFrames){
   stopGifExport();
 }else{
   startGifExport();
 }
}

void startGifExport(){
   //gifExport = new GifMaker(this, "export" + millis() + ".gif");
   //gifExport.setRepeat(0);
   //gifExport.setQuality(2);
   //int delayInMillis = (int)(1000/60.0);
   //gifExport.setDelay( delayInMillis );
   //exportingFrames = true;
}

void stopGifExport(){
   //if(gifExport != null){
   //  gifExport.finish();
   //}
   //exportingFrames = false;
}

void draw_DISABLED(){
  background(bgColor);
  
  mouse.x = mouseX;
  mouse.y = mouseY;
  polarMouse = mouse.toPolarPoint();
  
  int numPoints = 500; // 
  // int numPoints = (int) ( 500 * norm(mouseY*mouseX, 0, width*height) );
  
  float degrees = ( 360 * norm(mouseY*mouseX, 0, width*height) );
  float degress = degrees(polarMouse.theta);
  if (keyPressed == true){
    degrees = 137.508;
  }
  
  float scalingFactor = ( 20 * norm(mouseX, 0, width) );
  float pointWt = ( 20 * norm(mouseY, 0, height) );
  
  drawVogelSpiral(numPoints, degrees, scalingFactor, pointWt);
  
//  gifExport.setDelay(1);
//  gifExport.addFrame();
}


class SpiralsApp extends AppController {
  
  void initShortcutInfo(){
    super.initShortcutInfo(); 
    
    mouseEffects.add( new ShorcutKeyInfo("Mouse Moving", "Triggers the layout of the spiral") );
    mouseModifiers.add( new ShorcutKeyInfo("<any key>", "Sets the spacing angle to 137.508 (Vogel's)") );
  }
  
}



class Point {
  float x;
  float y;
  
  PolarPoint toPolarPoint(){
    PolarPoint polarPt = new PolarPoint();
    polarPt.r = sqrt(sq(x) + sq(y));
    polarPt.theta = atan2(y, x);
    return polarPt;
  }
  
  float distTo(Point otherPt){
    return dist(x, y, otherPt.x, otherPt.y);
  }
  
  public JSONObject toJSON(){
    JSONObject json = new JSONObject();
    json.setFloat("x", x);
    json.setFloat("y", y);
    return json;
  }
   
  public String toString(){
    return this.toJSON().toString();
  }
}

class PolarPoint {
  float r = 0;
  float theta = 0;
  
  public Point toPoint(){
    Point retPoint = new Point();
    retPoint.x = r * cos(theta);
    retPoint.y = r * sin(theta);
    return retPoint;
  }

  public JSONObject toJSON(){
    JSONObject json = new JSONObject();
    json.setFloat("r", r);
    json.setFloat("theta", theta);
    return json;
   }
   
  public String toString(){
    return this.toJSON().toString();
  }
}


class HomingPoint {
  Point current;
  Point target;
  float radius;
  color _color;
  
  HomingPoint(){
    current = new Point();
    target = new Point();
  }
  
  HomingPoint(float p_nX, float p_nY){
    current = new Point();
    current.x = p_nX;
    current.y = p_nY;
    target = new Point();
    target.x = p_nX;
    target.y = p_nY;
  }
  
  void draw(){
    stepToTarget();
    stroke(_color);
    point(current.x, current.y);
  }
  
  void stepToTarget(){
    if (target == null){
      return; 
    }
    float distance = current.distTo( target );
    if (distance < 1){
      current.x = target.x;
      current.y = target.y;
      target = null;
      return;
    }
    current.x += (target.x - current.x) * ptStepPercent;
    current.y += (target.y - current.y) * ptStepPercent;
  }
  
  void setTarget(float p_nX, float p_nY){
    target = new Point();
    target.x = p_nX;
    target.y = p_nY;
  }
}

class Spiral {
  int numPoints = 300;
  float separationAngle = 137;
  float scalingFactor = 10;
  float pointRadius = 8;
  
  ArrayList<HomingPoint> homingPts;
  
  Spiral(){
    this.setup(); 
    this.layoutSpiral();
  }
  
  void setup(){
     homingPts = new ArrayList<HomingPoint>();
     
     HomingPoint tmpHomingPt; 
     Point tmpCurrent; 
     Point tmpTarget; 
     
     color c1 = color(200, 200, 50);
     color c2 = color(240, 130, 0);
     
     for(int i=0; i<numPoints; i++){
       tmpHomingPt = new HomingPoint(0,0);
       tmpHomingPt._color = lerpColor(c1, c2, norm(i, 0,numPoints-1));
       homingPts.add(tmpHomingPt);
     }
  }
  
  void draw(){
     pushMatrix();
     strokeWeight(pointRadius);
     translate(width/2, height/2);
     HomingPoint tmpHomingPt; 
     for(int i=0; i<numPoints; i++){
       tmpHomingPt = homingPts.get(i);
       tmpHomingPt.draw();
     }
     popMatrix();
  }
  
  void setConfig(float degrees, float p_nScalingFactor){
    this.separationAngle = degrees;
    this.scalingFactor = p_nScalingFactor;
    layoutSpiral();
    
  }
  
  void layoutSpiral(){
    PolarPoint pPt = new PolarPoint();
    Point pt  = new Point();
    HomingPoint tmpHomingPt;

    // Based on: http://en.wikipedia.org/wiki/Fermat%27s_spiral 
    for(int i=1; i<=numPoints; i++){
      pPt.r = this.scalingFactor * sqrt(i);
      pPt.theta = radians(i * this.separationAngle);
      pt = pPt.toPoint();
      
      tmpHomingPt = homingPts.get(i-1);
      tmpHomingPt.setTarget( pt.x, pt.y );
    }
  }
  
}

void drawVogelSpiral(int numPoints, float angleDegrees, float scalingFactor, float pointRadius){
  float c = scalingFactor;
  PolarPoint pPt = new PolarPoint();
  Point pt  = new Point();
  
  
  // angleDegrees = 137.508; // Special Angle, as per H Vogel: http://en.wikipedia.org/wiki/Fermat%27s_spiral
  pushMatrix();
  translate(width/2, height/2);
  
//  pointRadius = constrain(pointRadius, 0, scalingFactor);
//  pointRadius = max(pointRadius,  scalingFactor);
  strokeWeight(pointRadius);
  
  color c1 = color(200, 200, 50);
  color c2 = color(240, 130, 0);

  for(int i=1; i<numPoints; i++){
    pPt.r = c * sqrt(i);
    pPt.theta = radians(i * angleDegrees);
    
    pt = pPt.toPoint();
     
    stroke( lerpColor(c1, c2, norm(i, 1,numPoints) ) );
    point( pt.x, pt.y );
  }
  
  popMatrix();
  
}

//color colorWithAlpha(color colorToAlpha, float alpha){
//  color retColor = new color( colorToAlpha >> 16 & 0xFF
//            , colorToAlpha >> 8 & 0xFF
//            , colorToAlpha & 0xFF
//            , alpha); 
//  return retColor;
//}




/// GENERIC CLASSES TO MOVE into a component: 
class AppController{
  ArrayList<ShorcutKeyInfo> hotkeys;
  ArrayList<ShorcutKeyInfo> mouseEffects;
  ArrayList<ShorcutKeyInfo> mouseModifiers;
  ArrayList<AppMenu> menus;
  ShortcutMenu helpMenu;
  ConfigMenu configMenu;
  
  final int APP_STATE_PAUSED = 0;
  final int APP_STATE_RUNNING = 1; 
  int state = APP_STATE_RUNNING;

  boolean isHelpShown = false;
  boolean isConfigShown = false;
  boolean hasOverlays = false;
  
  AppController(){
    hotkeys = new ArrayList<ShorcutKeyInfo>();
    mouseEffects = new ArrayList<ShorcutKeyInfo>();
    mouseModifiers = new ArrayList<ShorcutKeyInfo>();
    initShortcutInfo();
    
    menus = new ArrayList<AppMenu>();
    initMenus();
  }
  
  void initShortcutInfo(){
    hotkeys.add( new ShorcutKeyInfo("?", "Toggle dislpay of this Shortcut key menu") );
    hotkeys.add( new ShorcutKeyInfo(",", "Toggle dislpay of this Configuration menu") );
  }
  
  void initMenus(){
    helpMenu = new ShortcutMenu(this);
    menus.add(helpMenu);
    
    configMenu = new ConfigMenu(this);
    menus.add(configMenu);
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
  
  void toggleConfigDisplay(){
    boolean showingOtherMenu = hasOverlays && !isConfigShown;
    if(!showingOtherMenu){
      togglePause();
    }
    isConfigShown = !isConfigShown;
    isHelpShown = false;
    hasOverlays = isConfigShown;
  }
  
  void toggleHelpDisplay(){
    boolean showingOtherMenu = hasOverlays && !isHelpShown;
    if(!showingOtherMenu){
      togglePause();
    }
    isHelpShown = !isHelpShown;
    isConfigShown = false;
    hasOverlays = isHelpShown;
  }
  
  void displayHelp(){
    helpMenu.display();
  }
  
  void displayConfig(){
    configMenu.display();
  }
  
  void displayOverlays(){
    if( isHelpShown ){
      displayHelp();
    }else if(isConfigShown ){
      displayConfig();
    }
  }
}

class AppMenu{
  AppController _app;
  TextStyleWriter txtWriter;
  String title = "Unnamed Menu";
  float margin = 0.05;
  float padding = 0.05;
  float _width;
  float _height; 
  
  
  
  AppMenu(AppController appController){
    _app = appController;
    txtWriter = new TextStyleWriter();
    _width =  width*(1-2*margin) - width*(1-2*margin) * 2 * padding;
    _height = height*(1-2*margin) - height*(1-2*margin) * 2 * padding;
  }
  
  void display(){
    startDisplay();
    displayHeading();
    displayContents();
    finishDisplay();
  }
  
  // TODO: Refactor into ColorScheme or ColorPallete class
  color getDefaultColor(){
    return color(220);
  }  
  color getAccentColor(){
    return color(220, 220, 50);
  }
  
  void startDisplay(){
    fill(0, 220);
    pushMatrix();
    translate(width * margin, height*margin);
    noStroke();
    rect(0,0, width*(1-2*margin), height*(1-2*margin), 20);
    
    pushMatrix();
    translate(_width * padding, _height * padding);
  }
  
  void displayHeading(){
    TextStyle headingStyle = new TextStyle();
    headingStyle.size(20).hue( getAccentColor() );
    txtWriter.write(title, 0, 0, headingStyle);
    
    stroke( getDefaultColor() );
    strokeWeight(1);
    line(0, 30, _width, 30);
    
    // Allow the contents to start at 0-0;
    translate(0, 35);
  }
  
  void displayContents(){
    println("... AppMenu.displayContent");
   // override in subclass
  }
  
  void finishDisplay(){
    popMatrix();
    popMatrix();
  }
}

class ShortcutMenu extends AppMenu {
  
  ShortcutMenu(AppController appController){
    super(appController);
    title = "Shortcuts";
  }
  
  void displayContents(){
    TextStyle comboStyle = new TextStyle();
    comboStyle.size(14).hue( getAccentColor() ).align(RIGHT);
    
    TextStyle infoStyle = new TextStyle();
    infoStyle.size(14).hue( getDefaultColor() );
    
    float lineHeight = 20;
    float maxComboWidth = 90; // TODO: Make this dynamic
    float currentLineY = 0;
    ShorcutKeyInfo tmpInfo;
    
    // display keys
    for(int i=0; i< _app.hotkeys.size(); i++){
      tmpInfo = _app.hotkeys.get(i);
      txtWriter.write(tmpInfo.keyCombo, maxComboWidth - 5, currentLineY, comboStyle);
      txtWriter.write(":", maxComboWidth, currentLineY, infoStyle);
      txtWriter.write(tmpInfo.description, maxComboWidth + 10, currentLineY, infoStyle);
      currentLineY += lineHeight;
    }
    
    // display mouse effects
    for(int i=0; i<_app.mouseEffects.size(); i++){
      tmpInfo = _app.mouseEffects.get(i);
      txtWriter.write(tmpInfo.keyCombo, maxComboWidth - 5, currentLineY, comboStyle);
      txtWriter.write(":", maxComboWidth, currentLineY, infoStyle);
      txtWriter.write(tmpInfo.description, maxComboWidth + 10, currentLineY, infoStyle);
      currentLineY += lineHeight;
    }
    
    // display mouse modifiers
    for(int i=0; i<_app.mouseModifiers.size(); i++){
      tmpInfo = _app.mouseModifiers.get(i);
      txtWriter.write(tmpInfo.keyCombo, maxComboWidth - 5, currentLineY, comboStyle);
      txtWriter.write(":", maxComboWidth, currentLineY, infoStyle);
      txtWriter.write(tmpInfo.description, maxComboWidth + 10, currentLineY, infoStyle);
      currentLineY += lineHeight;
    }
  }
  
}


class ConfigMenu extends AppMenu {
  
  ConfigMenu(AppController appController){
    super(appController);
    title = "Configuration";
  }
  
  void displayContents(){
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