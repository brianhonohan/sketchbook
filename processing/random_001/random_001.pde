int centerX;
int centerY;
float boxSize; 
float frameAsRadians;
SpinningSquare spinner;
SpinningSquare spinner2;
ArrayList<SpinningSquare> spinners;
SpinningSquare tmpSpinner;
boolean drawLoopForward;

void setup(){
  size(500, 500);
  background(0);
  strokeWeight(10);
  rectMode(CENTER);
  // frameRate(30);
  
  int numSpinners = 20;
  spinners = new ArrayList<SpinningSquare>();
  
  color c1 = color(200, 200, 50);
  color c2 = color(240, 130, 0);
  
  for(int ii = 0; ii < numSpinners; ii++){
    tmpSpinner = new SpinningSquare();
    tmpSpinner.minSize = ii * 10;
    tmpSpinner.maxSize = random(100, 500);
    
    // pastels 
    tmpSpinner._color = color( random(100,200), random(100,200), random(100,200) );
    
    // reds
    // tmpSpinner._color = color(random(100,200), random(10,100), random(10,100));
    
    // full random
    // tmpSpinner._color = color( random(255), random(255), random(255) );
    
    // yellow-orange
    float brightness = random(60, 220);
    tmpSpinner._color = color( brightness, brightness/ (random(1.3, 2.4)), random(10,20));
    
    // lerped
    // tmpSpinner._color = lerpColor(c1, c2, norm(ii, 0,numSpinners));
    
    tmpSpinner.spinPhaseShift = radians(random(90));
    tmpSpinner.sizePhaseShift = radians(random(90));
    tmpSpinner._strokeWeight = 0.25 + random(5);
    spinners.add(tmpSpinner);
  }
}



void draw(){
  // background(0);
//  fill(0.15, 0.15, 0.15, 1);
  fill(10,10,50, 10);
  noStroke();
  rect(width/2, height/2, width, height);
  frameAsRadians = radians(frameCount);
  
//  translate( 10 * asin(frameAsRadians), 10 * acos(frameAsRadians) );
  boolean 
  
//  drawLoopForward = (frameCount % 2 == 0);
  drawLoopForward = (sin(frameAsRadians) > 0);

  int startAt = (drawLoopForward) ? 0 : spinners.size()-1;
  int loopDir = (drawLoopForward) ? 1 : -1;
  int idxToDraw = (int)floor(random(0, spinners.size()));
  
  for(int ii = 0; ii < spinners.size(); ii++){
    // idxToDraw = (int)floor(random(0, spinners.size()));
    idxToDraw = startAt + ii * loopDir;
//    idxToDraw = ii;
    tmpSpinner = spinners.get(idxToDraw);
    tmpSpinner.draw();
  }
}

// ----- 


class SpinningSquare {
 float spinPhaseShift;
 float sizePhaseShift;
 color _color;
 int minSize;
 float maxSize;
 float boxSize;
 float _strokeWeight;
 
 SpinningSquare(){
   spinPhaseShift = 0;
   sizePhaseShift = 0;
   minSize = 0;
   maxSize = 300;
   _color = color(200, 200, 0);
   _strokeWeight = 1;
 }
 
 void draw(){
  stroke(_color);
//  strokeWeight( abs( 3 * sin( sizePhaseShift + frameAsRadians ) ) );
  noFill();
  
  pushMatrix();
  translate(width/2, height/2);
  boxSize = minSize + maxSize * abs(sin( sizePhaseShift + frameAsRadians ));
  
//  rotate( spinPhaseShift + frameAsRadians );
  //  rect(0, 0, boxSize, boxSize);
  ellipse(0, 0, boxSize, boxSize);
  
  popMatrix();
 } 
  
}




