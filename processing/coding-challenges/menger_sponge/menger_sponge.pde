float cameraZ;
float cameraYaw;
float cameraRoll;
SpongeBlock block;
int depthCounter;
boolean rotating;

void setup(){
  size(500, 500, P3D);

  cameraZ = 0;
  cameraYaw = PI / 6;
  cameraRoll = PI / 6;
  
  rotating = true;
  initBlock();
  depthCounter = 0;
  noStroke();
}

void initBlock(){
  block = new SpongeBlock(0, 0);
}

void draw(){
  background(180);
  lights();
  
  //...and 3D-specific functions, like box()
  translate(width/2, height/2);
  translate(0, 0, cameraZ);
  rotateX(cameraYaw);
  rotateY(cameraRoll);
  
  if (rotating) {
    cameraYaw += 0.05;
  }
  block.render();
}

class SpongeBlock{
  int indexInParent;
  int state;
  int depth;
  int FULL = 1;
  int EMPTY = 0;
  int RECURSED = 2;
  ArrayList<SpongeBlock> blocks; 
  color myColor;
  
  SpongeBlock(int _index, int _depth){
    indexInParent = _index;
    depth = _depth;
    
    if (isEmptyIndex(indexInParent)){
      state = EMPTY;
    }else{
      state = FULL;
    }
    myColor = color(100, 190, 120);
    blocks = new ArrayList<SpongeBlock>();
  }
  
  void step(){
    if (state == EMPTY){
      return; 
    } else if (state == FULL) {
      SpongeBlock tmpBlock;
      for(int i=0; i < 27; i++){
        tmpBlock = new SpongeBlock(i, depth + 1);
        blocks.add(tmpBlock);
      }
      state = RECURSED;
    } else if (state == RECURSED) {
      SpongeBlock tmpBlock;
      for(int i=0; i < 27; i++){
        tmpBlock = blocks.get(i);
        tmpBlock.step();
      }
    }
  }
  
  float lengthOfSide(){
    return 100 / (pow(3,depth));
  }
  
  boolean isEmptyIndex(int i){
    return (i == 4 
          || i == 10 || i == 12 || i == 13 || i == 14 || i == 16
          || i == 22);
  }
  
  // Three levels
  // 0  1  2
  // 3  4  5
  // 6  7  8
  
  // 9 10 11
  //12 13 14
  //15 16 17
  
  //18 19 20
  //21 22 23
  //24 25 26
  
  void render(){
    if (state == EMPTY){
      return;
    } 
    
    pushMatrix();
    int column = indexInParent % 3;
    int stack = floor(indexInParent / 9);
    int row = floor((indexInParent % 9) / 3);
    
    translate(column * lengthOfSide(), 
              stack * lengthOfSide(), 
              row * lengthOfSide());
    
    if (state == FULL) {
      fill(myColor);
      box(lengthOfSide());
    } else if (state == RECURSED) {
      //println("... recursed, so rendering:");
      SpongeBlock tmpBlock;
      for(int i=0; i < 27; i++){
        tmpBlock = blocks.get(i);
        tmpBlock.render();
      }
    }
    popMatrix();
  }
  
  void renderToConsole(){
    //box(100);
    if (state == EMPTY){
      print(" ");
    } else if (state == FULL) {
      print("8");
    } else if (state == RECURSED) {
      println("... recursed, so rendering:");
      SpongeBlock tmpBlock;
      for(int i=0; i < 27; i++){
        tmpBlock = blocks.get(i);
        tmpBlock.renderToConsole();
      }
      println("");
    }
    
    if (indexInParent % 3 == 2) { println(""); }
    if (indexInParent % 9 == 8) { println(""); }
  }
}
void mousePressed(){
  if (depthCounter > 4){
    return; 
  }
  
  block.step();
  depthCounter += 1;
  block.render();
}

void keyPressed(){
  if (key == 'c') {
    // reset
    initBlock();
  } else if (key == 'r') {
    // toggle rotation
    rotating = !rotating;
  } else if (key == 'w') {
    // zoom in
    cameraZ += 50;
  } else if (key == 's') {
    // zoom out
    cameraZ -= 50;
  } else if (keyCode == UP){
    cameraYaw += PI / 12;
  } else if (keyCode == DOWN){
    cameraYaw -= PI / 12;
  } else if (keyCode == RIGHT){
    cameraRoll += PI / 12;
  } else if (keyCode == LEFT){
    cameraRoll -= PI / 12;
  }
}