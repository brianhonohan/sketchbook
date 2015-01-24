Keyboard keyboard;
int worldSeed;

TerrainViewer terrainViewer;
Terrain terrain;
CameraView camView;
// init 
boolean processedMouseEvnt = false;
float prevMouseX = MAX_FLOAT;
float prevMouseY = MAX_FLOAT; 



void setup(){
  size(500, 500, P3D);
  
  worldSeed = int(random(1000, 9999));
  noiseSeed(worldSeed);
  
  keyboard = new Keyboard();
  
  terrain = new Terrain();
  terrainViewer = new BirdsEyeTerrainViewer();
  camView = new CameraView();
  
  camView.moveBy(0, 0, -10);
  
  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

int incr = 0;

void draw(){
  applyPressedKeys();
  
  background(180);
  pushMatrix();
  applyDefaultTransforms();
  //rotateZ( radians(45) );
//  rotateY( radians(45) );
  // rotateY( radians(camDir.theta) );
  // rotateX( radians(camDir.phi) );
  // rotateX( radians(mouseY) );
  // terrainViewer.render(terrain);

  // translate(incr, 0, 0);
  // translate(0, incr, 0);
  // translate(0, 0, incr);
  // camView.moveBy(0, 0, -1);
  camView.apply();
  
  int blockSize = 20;
  int elevAtXZ;
  int numCols = 10;
  int numRows = 10;
  noStroke();
  for(int x=0; x<numCols; x++){
    pushMatrix();
    translate(x*blockSize, 0, 0);
    
    for(int z=0; z<numRows; z++){
      translate(0, 0, z*blockSize);
      
      elevAtXZ = terrain.elevationAt(x,z);
      pushMatrix();
        translate(0, -elevAtXZ, 0);
        fill(elevAtXZ);
        box(blockSize);
      popMatrix();
    }
    popMatrix();
  }
    
  draw3dAxis();
  popMatrix();
  incr++;
}

void applyDefaultTransforms(){
  translate(width/2, height/2, 0);
  
}

void keyReleased(){
  println("...Key Released: " + key);
  if(key == CODED){
    keyboard.releaseCodedKey(keyCode);
  }else{
    keyboard.releaseKey(key);  
  }
}


void keyPressed(){
  // only works if there is no tilt to the camera
  println("Key pressed: " + key);
  if(key == CODED){
    keyboard.pressCodedKey(keyCode);
  }else{
    keyboard.pressKey(key);  
  }
  applyKey(key);
}

void applyPressedKeys(){
  int[] keysListenedTo = {'w', 's', 'a', 'd'};
  int tmpKey;
  for(int i=0; i<keysListenedTo.length; i++){
    tmpKey = keysListenedTo[i];
    if(keyboard.isKeyPressed(tmpKey)){
      applyKey(tmpKey);
    }
  }
}

void applyKey(int asciiKey){
  switch(asciiKey){
    case 'w':
            // otherwise we need to move in the direction the camera is pointing
            camView.moveBy(0,0,1);
            break;
    case 's':
            // otherwise we need to move in the direction the camera is pointing
            camView.moveBy(0,0,-1);
            break;
    case 'a':
            // otherwise we need to move in the direction the camera is pointing
            camView.moveBy(1,0,0);
            break;
    case 'd':
            // otherwise we need to move in the direction the camera is pointing
            camView.moveBy(-1,0,0);
            break;
  }
}


class Keyboard {
  boolean[] pressed;
  boolean[] codedKeys;
  
  Keyboard(){
    pressed = new boolean[256];
    codedKeys = new boolean[11];
  }
  
  void pressKey(int asciiId){
    if(pressed.length == 0 || !between(asciiId, 0, pressed.length-1)){
      return;
    }
    pressed[asciiId] = true;
  }
  
  void releaseKey(int asciiId){
    if(pressed.length == 0 || !between(asciiId, 0, pressed.length-1)){
      return;
    }
    pressed[asciiId] = false;
  }
  
  int getIdxForCodedKey(int keyCodeVal){
    switch(keyCodeVal){
       case UP:   return 0;
       case DOWN:   return 1;
       case LEFT:   return 2;
       case RIGHT:   return 3;
       
       case ALT:   return 4;
       case CONTROL:   return 5;
       case SHIFT:   return 6;
       
       // Undefined, but in processing doc
//       case PAGE_UP:   return 7;
//       case PAGE_DOWN:   return 8;
//       case HOME:   return 9;
//       case END:   return 10;
    }
    return -1;
  }
  
  void pressCodedKey(int keyCodeVal){
    int idx = getIdxForCodedKey(keyCodeVal);
    if(codedKeys.length == 0 || !between(idx, 0, codedKeys.length-1)){
      return;
    }
    codedKeys[idx] = true;
  }
  
  void releaseCodedKey(int keyCodeVal){
    int idx = getIdxForCodedKey(keyCodeVal);
    if(codedKeys.length == 0 || !between(idx, 0, codedKeys.length-1)){
      return;
    }
    codedKeys[idx] = false;
  }
  
  boolean isKeyPressed(int asciiId){
    if(pressed.length == 0 || !between(asciiId, 0, pressed.length-1)){
      println("WARNING!   Keyboard.isKeyPressed() ... unknown key: " + asciiId);
      return false;
    }
    return pressed[asciiId]; 
  }
}


void mouseMoved(){
  float deltaMouseX = mouseX - prevMouseX;
  println("DeltaX : " + deltaMouseX);
  float horizPanDeg = map( deltaMouseX, -20, 20, -360, 360);
//  camDir.theta += radians( horizPanDeg );
  
  float deltaMouseY = mouseY - prevMouseY;
  float vertPanDeg = map( deltaMouseY, -50, 50, -360, 360);
//  camDir.phi += radians( vertPanDeg );
  
  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

void draw3dAxis(){
  int axisLen = 50;
  stroke(255, 0, 0);
  line(0, 0, 0,   axisLen, 0, 0);
  stroke( 0, 255, 0);
  line(0, 0, 0,   0, -axisLen, 0);
  stroke( 0, 0, 255);
  line(0, 0, 0,   0, 0, axisLen);
}

class CameraView {
  Point3D location;
  PolarPoint3D direction;
  Point3D cachedDir;
  
  CameraView(){
    location = new Point3D();
    direction = new PolarPoint3D();
    direction.phi = PI/2;
    
    cachedDir = direction.toPoint();
  }
  
  void moveBy(float x, float y, float z){
    location.moveBy(x, y, z);
  }
  
  void apply(){
    translate(location.x, location.y, location.z);
  }
//  void apply(){
//    camera( location.x, location.y, location.z
//              , location.x + cachedDir.x
//              , location.y + cachedDir.y
//              , location.z + cachedDir.z
//              , 0, 1, 0);
//  }
}

class TerrainViewer {
  void render(Terrain terrain){
  }
}

class BirdsEyeTerrainViewer extends TerrainViewer{
  int blockSize = 30;
  
  void render(Terrain terrain){
    int numRows = int(ceil(height / blockSize));
    int numCols = int(ceil(width / blockSize));
    
    noStroke();
    int elevAtXZ;
    for(int x=0; x<numCols; x++){
      for(int y=0; y<numRows; y++){
        elevAtXZ = terrain.elevationAt(x,y);
        fill(elevAtXZ);
        rect(x*blockSize, y*blockSize, (x+1)*blockSize, (y+1)*blockSize); 
      }
    }
  }
}


class Terrain {
  // int[][] ground; 
  float smoothing;
  
  Terrain(){
    smoothing = 10; 
  }
  
  // returns values between 0 - 255
  int elevationAt(float x, float z){
    return int( map(noise(x/smoothing, z/smoothing), 0,1, 0, 255) ); 
  }
}



// inclusive
boolean between(int valToCheck, int lowVal, int highVal){
  return (lowVal <= valToCheck) && (valToCheck <= highVal);
}


class Point3D {
  float x;
  float y;
  float z;
  
  PolarPoint3D toPolarPoint(){
    // http://en.wikipedia.org/wiki/Spherical_coordinate_system#Cartesian_coordinates
    PolarPoint3D polarPt = new PolarPoint3D();
    polarPt.r = sqrt(sq(x) + sq(y) + sq(z));
    polarPt.theta = acos(z / polarPt.r);
    polarPt.phi = atan2(y, x);
    return polarPt;
  }
  
  float distTo(Point3D otherPt){
    return dist(x, y, z, otherPt.x, otherPt.y, otherPt.z);
  }
  
  void moveBy(float deltaX, float deltaY, float deltaZ){
    x += deltaX;
    y += deltaY;
    z += deltaZ;
  }
  
  public JSONObject toJSON(){
    JSONObject json = new JSONObject();
    json.setFloat("x", x);
    json.setFloat("y", y);
    json.setFloat("z", z);
    return json;
  }
   
  public String toString(){
    return this.toJSON().toString();
  }
}

class PolarPoint3D {
  float r = 0;
  float theta = 0;
  float phi = 0;
  
  public Point3D toPoint(){
    Point3D retPoint = new Point3D();
    retPoint.x = r * cos(theta);
    retPoint.y = r * sin(theta);
    retPoint.z = r * cos(phi);
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


