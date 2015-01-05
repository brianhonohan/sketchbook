color bgColor = color(10,10, 50);

Point mouse;
PolarPoint polarMouse;
Spiral spiral;

import gifAnimation.*;
GifMaker gifExport;
boolean exportingFrames = false;

float ptStepPercent = 0.05;  // percent of difference to move to target
final float VOGEL_ANGLE = 137.508;

void setup(){
  // size(displayWidth/2, displayHeight);
  size(500, 500);
  background(bgColor);
  colorMode(RGB, 255);
  
  mouse = new Point();
  spiral = new Spiral();
  frameRate(30);
  
  // startGifExport();
  spiral.setConfig(VOGEL_ANGLE, 10);
  
  // Draw a singel spiral
  // frameRate(0);
  // drawVogelSpiral(500, VOGEL_ANGLE, 10.5, 8);
}

void draw(){
  background(bgColor);
  spiral.draw();
  
  if(exportingFrames){
    gifExport.addFrame();
    //saveFrame("spirals-######.png");
  }
}

void mouseMoved(){
  mouse.x = mouseX;
  mouse.y = mouseY;
  polarMouse = mouse.toPolarPoint();
  
  // int numPoints = (int) ( 500 * norm(mouseY*mouseX, 0, width*height) );
  
  float degrees = ( 360 * norm(mouseY*mouseX, 0, width*height) );
  float degress = degrees(polarMouse.theta);
  if (keyPressed == true){
    degrees = 137.508;
  }
  
  float scalingFactor = ( 20 * norm(mouseX, 0, width) );
  // float pointWt = ( 20 * norm(mouseY, 0, height) );
  
  spiral.setConfig(degrees, 10); //scalingFactor);
}

void mousePressed(){
 if (exportingFrames){
   stopGifExport();
 }else{
   startGifExport();
 }
}

void startGifExport(){
   gifExport = new GifMaker(this, "export" + millis() + ".gif");
   gifExport.setRepeat(0);
   gifExport.setQuality(2);
   int delayInMillis = (int)(1000/60.0);
   gifExport.setDelay( delayInMillis );
   exportingFrames = true;
}

void stopGifExport(){
   if(gifExport != null){
     gifExport.finish();
   }
   exportingFrames = false;
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
     strokeWeight(pointRadius);
     
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
