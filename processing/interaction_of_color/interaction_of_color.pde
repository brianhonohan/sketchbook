
ColorDroplet mouseDroplet;
ColorDroplet dropletPlus120;
ColorDroplet dropletPlus240;

Point mousePt;
PolarPoint polarPt;

import gifAnimation.*;
GifMaker gifExport;
boolean exportingFrames = false;

void setup(){
  size(500,500);
  colorMode(HSB, 360, 100, 100, 100); 
  mousePt = new Point();
  
  rectMode(CENTER);
  ellipseMode(CENTER);
  
  frameRate(30);
  
  mouseDroplet = new ColorDroplet();
  dropletPlus120 = new ColorDroplet();
  dropletPlus240 = new ColorDroplet();
  
  background(0);
}

void draw(){
  // background(0);
  mousePt.x = mouseX - width/2;
  mousePt.y = mouseY - height/2;
  polarPt = mousePt.toPolarPoint();
  
//  fill( color(0, 0, 0, 15) );
//  rect(width/2,height/2, width, height);
  
  mouseDroplet._colorWheelPt.moveToPt( mousePt );
  dropletPlus120._colorWheelPt.moveToPolarPoint( mouseDroplet._colorWheelPt );
  dropletPlus120._colorWheelPt.theta += radians(120);
  dropletPlus240._colorWheelPt.moveToPolarPoint( mouseDroplet._colorWheelPt );
  dropletPlus240._colorWheelPt.theta += radians(240);
  
  renderDroplets();
  
  if(exportingFrames){
    gifExport.setDelay(1);
    gifExport.addFrame();
  }
}
void mouseDragged(){
  renderDroplets();
}

void mouseClicked(){
  
  println("Mouse Droplet: " + degrees(mouseDroplet._colorWheelPt.theta));
  println("... drop 1: " + degrees(dropletPlus120._colorWheelPt.theta));
  println("... drop 2: " + degrees(dropletPlus240._colorWheelPt.theta));
  
  renderDroplets();
}

void mousePressed(){
 if (exportingFrames){
   stopGifExport();
 }else{
   startGifExport();
 }
 background(0);
}

void startGifExport(){
   gifExport = new GifMaker(this, "export" + millis() + ".gif");
   gifExport.setRepeat(0);
   gifExport.setQuality(0);
   // int delayInMillis = (int)(1000/60.0);
   gifExport.setDelay( 1 );
   exportingFrames = true;
}

void stopGifExport(){
   if(gifExport != null){
     gifExport.finish();
   }
   exportingFrames = false;
}

void renderDroplets(){
  pushMatrix();
  translate(width/2, height/2);
  mouseDroplet.render();
  dropletPlus120.render();
  dropletPlus240.render();
  popMatrix();
}


class ColorDroplet{
   PolarPoint _colorWheelPt;
   
   ColorDroplet(){
     _colorWheelPt = new PolarPoint(width/2,height/2);
   }
   
   void render(){
     noStroke();
     float colorDegree = degrees(_colorWheelPt.theta) % 360;
     float saturation = 100; // 100 * norm(_colorWheelPt.r,  0, min(width/2, height/2));
     fill( color(colorDegree, saturation, 80) );
     
     float diameter =  2 + 40 * norm(_colorWheelPt.r,  0, min(width/2, height/2) );
     ellipse(_colorWheelPt.x(), _colorWheelPt.y(), diameter, diameter);
   }
}


class Point {
  float x;
  float y;

  PolarPoint toPolarPoint(){
    PolarPoint polarPt = new PolarPoint();
    polarPt.r = this.r();
    polarPt.theta = atan2(y, x);
    if(polarPt.theta < 0){
      polarPt.theta = polarPt.theta + 2 * PI; 
    }
    return polarPt;
  }
  
  public float r(){
    return sqrt(sq(x) + sq(y));
  }
  public float theta(){
    float ret_theta = atan2(y, x);
    if(ret_theta < 0){
      ret_theta = ret_theta + 2 * PI; 
    }
    return ret_theta;
  }

  float distTo(Point otherPt){
    return dist(x, y, otherPt.x, otherPt.y);
  }
}


class PolarPoint {
  float r = 0;
  float theta = 0;
  
  PolarPoint(){
  }
  PolarPoint(float _r, float _theta){
    this.r = _r;
    this.theta = _theta;
  }

  public Point toPoint(){
    Point retPoint = new Point();
    retPoint.x = this.x();
    retPoint.y = this.y();
    return retPoint;
  }
  
  public float x(){
    return r * cos(theta);
  }
  
  public float y(){
    return r * sin(theta);
  }
  
  public float rForXY(float x, float y){
    return sqrt(sq(x) + sq(y));
  }

  public float thetaForXY(float x, float y){
    float ret_theta = atan2(y, x);
    if(ret_theta < 0){
      ret_theta = ret_theta + 2 * PI; 
    }
    return ret_theta;
  }
  
  // Could Overload the "moveTo()" method 
  // ... but won't work in ProcessingJS 
  // ... so avoiding that.
  
  public void moveToXY(float x, float y){
    this.r = rForXY(x, y);
    this.theta = thetaForXY(x, y);
  }
  
  public void moveToPt(Point pt){
    this.moveToXY(pt.x, pt.y);
  }
  public void moveToPolarPoint(PolarPoint pPt){
    this.r = pPt.r;
    this.theta = pPt.theta;
  }
}
