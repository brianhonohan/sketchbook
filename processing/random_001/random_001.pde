int centerX;
int centerY;
float boxSize; 
float frameAsRadians;
SpinningSquare spinner;
SpinningSquare spinner2;
ArrayList<SpinningSquare> spinners;
SpinningSquare tmpSpinner;

boolean drawLoopForward;
boolean randSetup = true;

boolean fade = false;
boolean rectangles = false;
boolean outerSpin = true;
boolean innerSpin = true;
int colorScheme = 0;
int numSpinners = 20;

void setup(){
  size(500, 500);
  background(0);
  strokeWeight(5);
  rectMode(CENTER);
  // frameRate(30);
  
  spinners = new ArrayList<SpinningSquare>();
  
  for(int ii = 0; ii < numSpinners; ii++){
    tmpSpinner = new SpinningSquare();
    
    if (randSetup){
      tmpSpinner.minSize = random(0,300);
      tmpSpinner.maxSize = random(100, 500);
      tmpSpinner.spinPhaseShift = radians(random(90));
      tmpSpinner.sizePhaseShift = radians(random(90));
    }else{
      tmpSpinner.minSize = (ii + 1) * 3;
      tmpSpinner.maxSize = ii * 20;
      tmpSpinner.spinPhaseShift = radians(random(ii*5));
      tmpSpinner.sizePhaseShift = radians(random(ii*10));
    }
    
    tmpSpinner._strokeWeight = 0.25 + random(5);
    spinners.add(tmpSpinner);
  }

  applyColorScheme(colorScheme);
}


void draw(){
  // background(0);
//  fill(0.15, 0.15, 0.15, 1);
  if(fade){
    fill(10,10,50, 10);
  }else{
    fill(10, 10, 50);
  }
  noStroke();
  rect(width/2, height/2, width, height);
  frameAsRadians = radians(frameCount);
  
  pushMatrix();
  if (outerSpin){
    translate(  -1 * 100 * sin(frameAsRadians*0.5), -1 * 100 * cos(frameAsRadians*0.5) );
  }
   
//  drawLoopForward = (frameCount % 2 == 0);
  drawLoopForward = (sin(frameAsRadians) > 0);

  int startAt = (drawLoopForward) ? 0 : spinners.size()-1;
  int loopDir = (drawLoopForward) ? 1 : -1;
  int idxToDraw = (int)floor(random(0, spinners.size()));
  
  for(int ii = 0; ii < spinners.size(); ii++){
    // idxToDraw = (int)floor(random(0, spinners.size()));
    // idxToDraw = startAt + ii * loopDir;
    idxToDraw = ii;
    tmpSpinner = spinners.get(idxToDraw);
    tmpSpinner.draw();
  }
  popMatrix();
}

void keyPressed(){
 switch(key){
   case 'f':
             fade = !fade;
             break;
   case 'r':
             rectangles = !rectangles;
             break;
   case 'o':
             outerSpin = !outerSpin;
             break;
   case 'i':
             innerSpin = !innerSpin;
             break;
   case 'C':
             applyColorScheme(colorScheme);
             break;
   case 'c':
             applyColorScheme(++colorScheme);
             break;
 }
}

void applyColorScheme(int p_colorScheme){
  
  int scheme = p_colorScheme % 5;
  
  color c1 = color(200, 180, 50);
  color c2 = color(230, 120, 0);
  
  for(int ii = 0; ii < numSpinners; ii++){
    tmpSpinner = spinners.get(ii);
  
    switch(scheme) {
      case 0:
              // pastels
              tmpSpinner._color = color( random(100,200), random(100,200), random(100,200) );
              continue;
      case 1:
              // reds
              tmpSpinner._color = color(random(100,200), random(10,100), random(10,100));
              continue;
      case 2:
              // full random
              tmpSpinner._color = color( random(255), random(255), random(255) );
              continue;
      case 3:
              // yellow-orange
              float brightness = random(60, 220);
              tmpSpinner._color = color( brightness, brightness/ (random(1.3, 2.4)), random(10,20));
              continue;
      case 4: 
              // lerped
              tmpSpinner._color = lerpColor(c1, c2, norm(ii, 0,numSpinners));
              continue;
    }
  }
}

// ----- 


class SpinningSquare {
 float spinPhaseShift;
 float sizePhaseShift;
 color _color;
 float minSize;
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
  boxSize = minSize + maxSize * abs(sin( sizePhaseShift + frameAsRadians )) / 2.0;
  
  ellipseMode(RADIUS);
  if(innerSpin){
    translate( boxSize * sin(frameAsRadians), boxSize * cos(frameAsRadians) );
  }
  rotate( spinPhaseShift + frameAsRadians );
  
  if (rectangles){
    rect(0, 0, boxSize, boxSize);
  }else{
    ellipse(0, 0, boxSize, boxSize);
  }
  
  popMatrix();
 }
}




