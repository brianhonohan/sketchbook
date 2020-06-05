
FieldEquation fq;
FieldView fv;
Ball testBall;
ArrayList<Ball> balls;

boolean fadeToBlack = false;


void setup(){
  size(displayWidth/2, displayHeight);
  //size(500, 500);
 
  if(fadeToBlack){
    background(0);
  }

  HashMap<String,Integer> hm = new HashMap<String,Integer>();
  fq = new LotkaVolterraEquation();
  // fq = new SimpleWind();
 fq = new SinuousWind();
  // fq = new OddEvenWind();
  // fq = new StackedWind();
  //  fq = new MultiStackedFields();
  //  fq = new GravityField();
  // fq = new LorentzEquation();
  
  fv = new FieldView();
  fv.renderEquation(fq);
  
  balls = new ArrayList<Ball>();  // Create an empty ArrayList
  testBall = new Ball();
  testBall.x = width/2;
  testBall.y = height/2;
//  balls.add(testBall);
//  testBall.render();
 // frameRate(30);

  dropTracers(50);
}

void draw(){
//  float dxBall = fq.dx(testBall.x / 100.0, testBall.y / 100.0);
//  float dyBall = fq.dy(testBall.x / 100.0, testBall.y / 100.0);
  // println("dx " + dxBall);

//  fv.renderEquation(fq);
  // testBall.render();
  if (fadeToBlack){
    fill(0, 10);
    rect(0,0, width, height);
  }


  Ball tmpBall;
  for(int i=0; i < balls.size(); i++){
    tmpBall = balls.get(i);
    float dxBall = fq.dx(tmpBall.x / 100.0, tmpBall.y / 100.0);
    float dyBall = fq.dy(tmpBall.x / 100.0, tmpBall.y / 100.0);
    tmpBall.x += dxBall;
    tmpBall.y += dyBall;

    tmpBall.x += tmpBall.xSpeed;
    tmpBall.y += tmpBall.ySpeed;
    // println("dx: " + dxBall + ", dy: " + dyBall);

    if (abs(tmpBall.x) > 4 * width) {   // off the screen
      balls.remove(i);
    }else if (abs(tmpBall.y) > 4 * height) {
      balls.remove(i);  // off the screen
    }else if (abs(dxBall) < 0.0001 && abs(dyBall) < 0.0001){
      balls.remove(i);
    } // stopped moving

    tmpBall.render();
  }
  println("num balls: " + balls.size() + ", framerate: " + frameRate);
}

void dropTracers(int spacing){
  if (spacing < 20){
   return;
  }
  int numCols = floor(width / spacing);
  int numRows = floor(height / spacing);

  for(int i=0; i<numCols; i++){
    for(int j=0; j<numRows; j++){
      createBallAt(i*spacing,j*spacing);
    }
  }
}

void createBallAt(float x, float y){
  Ball testBall = new Ball();
  testBall.x = x;
  testBall.y = y;
  testBall.render();
  balls.add(testBall);
}

Ball inertialBall = null;
void mouseDragged(){
  if (keyPressed == false){
    createBallAt(mouseX,mouseY);
  }else if(key == 'a'){
    stroke( color(50,200,50) );
    line(inertialBall.x, inertialBall.y, mouseX, mouseY);
  }
}
void mousePressed(){
  if (keyPressed == false){
    createBallAt(mouseX,mouseY);
  }else if(key == 'a'){
    // println("pressing a");
    inertialBall = new Ball();
    inertialBall.x = mouseX;
    inertialBall.y = mouseY;
  }else if(key == 'd'){
   dropTracers(50);  
  }else if(key == 'c'){
   balls.clear();  
  }
}
void mouseReleased(){
  if (inertialBall != null){
    inertialBall.xSpeed = (inertialBall.x - mouseX) / frameRate;
    inertialBall.ySpeed = (inertialBall.y - mouseY) / frameRate;
    inertialBall.render();
    balls.add(inertialBall);
    inertialBall = null;
  }

}


// TODO: Need to externalize these classes to avoid having to reimplment
class Ball {
  float x;
  float y;
  float xSpeed = 0;
  float ySpeed = 0;

  void render(){
    fill(200, 30, 30);
    if (xSpeed > 0 || ySpeed > 0){
      fill(30, 200, 30);
    }
    noStroke();
    ellipse(x, y, 2, 2);
  }
}



class FieldView {
  int vectorSpacing = 50;
  int vectorMargin = 5;
  float scalingFactor = 100;

  void renderEquation(FieldEquation fq){
    int numCols = floor(1.0 * width / (vectorSpacing + 2*vectorMargin));
    int numRows = floor(1.0 * height / (vectorSpacing + 2*vectorMargin));

    float x;
    float y;
    float dx;
    float dy;

    float maxMag = -1;
    float minMag = -1;
    float tmpMag = 0;
    for (int i = 0; i < numCols; i++){
      x = (vectorSpacing+2*vectorMargin) * i  + vectorMargin + (0.5 * vectorSpacing) ;

      for (int j = 0; j < numRows; j++){
        y = (vectorSpacing+2*vectorMargin) * j  + vectorMargin + (0.5 * vectorSpacing) ;

        dx = fq.dx(x/scalingFactor, y/scalingFactor);
        dy = fq.dy(x/scalingFactor, y/scalingFactor);
        tmpMag = mag(dx, dy);
        if (maxMag < 0){ maxMag = tmpMag; }
        if (minMag < 0){ minMag = tmpMag; }

        minMag = min(minMag, tmpMag);
        maxMag = max(minMag, tmpMag);
      }
    }
    
    println("Found max mag:" + maxMag);

    for (int i = 0; i < numCols; i++){
      x = (vectorSpacing+2*vectorMargin) * i  + vectorMargin + (0.5 * vectorSpacing) ;

      for (int j = 0; j < numRows; j++){
        y = (vectorSpacing+2*vectorMargin) * j  + vectorMargin + (0.5 * vectorSpacing) ;

        dx = fq.dx(x/scalingFactor, y/scalingFactor);
        dy = fq.dy(x/scalingFactor, y/scalingFactor);
        //println("---- x,y " + x + ", " + y);
        renderVectorAt(new PVector(dx, dy), x, y, minMag, maxMag);
      }
    }
  }

  void renderVectorAt(PVector vector,float p_nX,float p_nY, float p_nMinMag, float p_nMaxMag){
//    strokeWeight(3);
//    point(p_nX, p_nY);
//    println("... drawing at: " + p_nX + ", y: " + p_nY);
//    println("... vector, x: " + vector.x + ", y: " + vector.y);
//    println("... min: " + p_nMinMag + ", max: " + p_nMaxMag);
    pushMatrix();
    translate(p_nX, p_nY);

    // MOVED DOWN to after the length of the line is determined.
//    translate(-1 * vector.x / p_nMaxMag *  vectorSpacing * 0.5
//              , -1 * vector.y / p_nMaxMag *  vectorSpacing * 0.5);
    strokeWeight(1);

    float magnitude = vector.mag();
    float rotation = vector.heading();
//    println("... mag: " + magnitude);
//    println("... headning: "  + rotation);
    rotate(rotation);
    float lineLength;
    if (p_nMaxMag == p_nMinMag){
      lineLength = vectorSpacing;
    }else if(magnitude > p_nMaxMag){
      lineLength = vectorSpacing;
    }else {
      lineLength = map(magnitude, p_nMinMag, p_nMaxMag, 0, vectorSpacing);
    }
    if (lineLength>vectorSpacing){
      println("CREATED LONG LINE");
      println("... min / max: " + p_nMinMag + " ... " + p_nMaxMag);
      println("... mag: " + magnitude);
      println("... line length: " + lineLength);
    }
    PVector unitVector = new PVector(vector.x, vector.y);
    unitVector.normalize();
    translate(-1 * unitVector.x * lineLength * 0.5, -1 * unitVector.y * lineLength * 0.5);


    line(0,0, lineLength , 0);

    // Walk to the end of the line, and turn to create the arrow
    translate(lineLength, 0);
    rotate( radians(-160) );
    line(0,0, lineLength * 0.25, 0);

    popMatrix();
  }
}

class FieldEquation {
  float dx(float _x, float _y){ return 1; }
  float dy(float _x, float _y){ return 1; }
}


// Based on: http://en.wikipedia.org/wiki/Lotka%E2%80%93Volterra_equation
class LotkaVolterraEquation extends FieldEquation  {
//  float alpha = 0.04;  // population gain by X, due to mating
//  float beta  = 0.0004;  // sort of the likelihood Y eats X
//  float delta = 0.00003;  // sort of the benefit Y gets by eating X
//  float gamma = 0.04;  // Population loss of Y due overpopulation

  float alpha = 3;  // population gain by X, due to mating
  float beta  = 0.5;  // sort of the likelihood Y eats X
  float delta = 0.250001;  // sort of the benefit Y gets by eating X
  float gamma = 1.4;  // Population loss of Y due

  float dx(float _x, float _y){ return alpha * _x - beta * _x * _y; }
  float dy(float _x, float _y){ return delta * _x * _y - gamma * _y; }
}

// Based on: http://en.wikipedia.org/wiki/Lorenz_system
class LorentzEquation extends FieldEquation  {
//  float alpha = 0.04;  // population gain by X, due to mating
//  float beta  = 0.0004;  // sort of the likelihood Y eats X
//  float delta = 0.00003;  // sort of the benefit Y gets by eating X
//  float gamma = 0.04;  // Population loss of Y due overpopulation

  float sigma = 4;
  float rho  = 10;

  float dx(float _x, float _y){ return sigma * (_y - _x ); }
  float dy(float _x, float _y){ return _x * (rho - 10) - _y; }
}

class SimpleWind extends FieldEquation {
  float speed = 10;
  float dx(float _x, float _y){ return speed; }
  float dy(float _x, float _y){ return speed; }
}


class SinuousWind extends FieldEquation {
  float dx(float _x, float _y){ return sin(_x)*4 + cos( _y  ) * 4;  }
  float dy(float _x, float _y){ return cos(_x)*4 + sin( _y  ) * 4; }
}


class OddEven extends FieldEquation {
  int speed = 10;
  float dx(float _x, float _y){ return (floor(_x) % 2 == 0) ? _x * -1 : _x;  }
  float dy(float _x, float _y){ return (floor(_y) % 2 == 0) ? _y * -1 : _y;  }
}
class OddEvenWind extends FieldEquation {
  float speed = 0.3;
  float dx(float _x, float _y){ return (floor(_x) % 2 == 0) ? speed * -1 : speed;  }
  float dy(float _x, float _y){ return (floor(_y) % 2 == 0) ? speed * -1 : speed;  }
}

class StackedWind extends FieldEquation {
  OddEvenWind oddEven;
  LotkaVolterraEquation lotkaVolterra;
  StackedWind(){
    oddEven = new OddEvenWind();
    oddEven.speed = 3;
    lotkaVolterra = new LotkaVolterraEquation();
  }
  float dx(float _x, float _y){ return oddEven.dx(_x,_y) + lotkaVolterra.dx(_x,_y);  }
  float dy(float _x, float _y){ return oddEven.dy(_x,_y) + lotkaVolterra.dy(_x,_y);  }
}

class MassObject {
  float x;
  float y;
  float mass;

  MassObject(float p_nX, float p_nY, float p_nMass){
    this.x = p_nX;
    this.y = p_nY;
    this.mass = p_nMass;
  }
}

class GravityField extends FieldEquation {
  ArrayList<MassObject> masses;
  PVector lastVectorCalculated;
  float _lastX;
  float _lastY;

  GravityField(){
    init();
  }

  void init(){
    masses = new ArrayList<MassObject>();

    //masses.add( new MassObject(width/2 / 100.0,  height/2 / 100.0, 100000.0) );
    masses.add( new MassObject(random(0,width)*0.01,  random(0,height)*0.01, 10000) );
    masses.add( new MassObject(random(0,width)*0.01,  random(0,height)*0.01, 10000) );
    masses.add( new MassObject(random(0,width)*0.01,  random(0,height)*0.01, 10000) );
    masses.add( new MassObject(random(0,width)*0.01,  random(0,height)*0.01, 10000) );
    masses.add( new MassObject(random(0,width)*0.01,  random(0,height)*0.01, 10000) );

  }


  float dx(float _x, float _y){
    lastVectorCalculated = new PVector();

    PVector tmpForce;
    float gravitational_constant = 0.001;
    for(int i=0; i<masses.size(); i++){
      MassObject object = masses.get(i);
      tmpForce = new PVector( object.x - _x, object.y - _y); // /this is where we'd have "REPULSION" force
      tmpForce.normalize();
      float radius = dist(_x, _y, object.x, object.y);
      //println("Mass is at: " + object.x +", " + object.y + " ... and looking at x,y: " + _x + ", " + _y);
      //println("... raidus: " + sq(radius));
      float forceMag = gravitational_constant * object.mass / sq(radius);
      //println("... force Mag: " + forceMag);
      tmpForce.mult( forceMag );
      lastVectorCalculated.add(tmpForce);
    }
    return lastVectorCalculated.x;
  }
  float dy(float _x, float _y){
     return lastVectorCalculated.y;
  }

}


class MultiStackedFields extends FieldEquation {
  final int OPERAND_ADDITIVE  = 0;
  final int OPERAND_SUBTRACT  = 1;
  final int OPERAND_MULTIPLY  = 2;

  int operand = OPERAND_MULTIPLY;
  ArrayList<FieldEquation> fields;

  MultiStackedFields(){
    interestingMix3();
  }

  void initInterestingMix(){
    operand = OPERAND_ADDITIVE;
    fields = new ArrayList<FieldEquation>();
    fields.add( new LotkaVolterraEquation() );
    fields.add( new SimpleWind() );
    fields.add( new SinuousWind() );
    fields.add( new SinuousWind() );
  }
  void initInterestingMix2(){
    operand = OPERAND_ADDITIVE;
    fields = new ArrayList<FieldEquation>();
    fields.add( new LotkaVolterraEquation() );
    fields.add( new SimpleWind() );
  }

  void interestingMix3(){
     operand = OPERAND_MULTIPLY;
    fields = new ArrayList<FieldEquation>();
    fields.add( new LotkaVolterraEquation() );
    // fields.add( new SinuousWind() );
    SimpleWind sw = new SimpleWind();
    sw.speed = 20;
    fields.add( sw );
  }
  float dx(float _x, float _y){
    float retDx = 0;
    FieldEquation fe;
    for(int i=0; i < fields.size(); i++){
      fe = fields.get(i);
      // retDx += fe.dx(_x,_y);
      if (i == 0){
        retDx = fe.dx(_x,_y);
      }else{
        retDx = combineValues(retDx, fe.dx(_x,_y));
      }
    }
    return retDx;
  }

  float dy(float _x, float _y){
    float retDy = 0;
    FieldEquation fe;
    for(int i=0; i < fields.size(); i++){
      fe = fields.get(i);
      if (i == 0){
        retDy = fe.dy(_x,_y);
      }else{
        retDy = combineValues(retDy, fe.dy(_x,_y));
      }
    }
    return retDy;
  }

  float combineValues(float val1, float val2){
    switch(operand){
      case OPERAND_ADDITIVE:  return val1 + val2;
      case OPERAND_SUBTRACT:  return val1 - val2;
      case OPERAND_MULTIPLY:  return val1 * val2;
    }
    return 0;
  }
}
