
ColorWheelPoint mouseDroplet;
ColorWheelPoint dropletPlus120;
ColorWheelPoint dropletPlus240;

Point mousePt;
PolarPoint polarPt;

// import gifAnimation.*;
// GifMaker gifExport;
boolean exportingFrames = false;

void setup(){
  size(500,500);
  colorMode(HSB, 360, 100, 100, 100); 
  mousePt = new Point();
  
  rectMode(CENTER);
  ellipseMode(CENTER);
  
  frameRate(30);
  
  // mouseDroplet = new HSBWheelPoint();
  // dropletPlus120 = new HSBWheelPoint();
  // dropletPlus240 = new HSBWheelPoint();
  mouseDroplet = new RYBWheelPoint();
  dropletPlus120 = new RYBWheelPoint();
  dropletPlus240 = new RYBWheelPoint();
  
  
  
  background(0);
}

void draw(){
  // background(0);
  mousePt.x = mouseX - width/2;
  mousePt.y = mouseY - height/2;
  polarPt = mousePt.toPolarPoint();
  
//  fill( color(0, 0, 0, 15) );
//  rect(width/2,height/2, width, height);
  
  mouseDroplet.wheelPoint.moveToPt( mousePt );
  dropletPlus120.wheelPoint.moveToPolarPoint( mouseDroplet.wheelPoint );
  dropletPlus120.wheelPoint.theta += radians(120);
  dropletPlus240.wheelPoint.moveToPolarPoint( mouseDroplet.wheelPoint );
  dropletPlus240.wheelPoint.theta += radians(240);
  
  renderDroplets();
  
  if(exportingFrames){
    // gifExport.setDelay(1);
    // gifExport.addFrame();
  }
}
void mouseDragged(){
  renderDroplets();
}

void mouseClicked(){
  
  println("Mouse Droplet: " + degrees(mouseDroplet.wheelPoint.theta));
  println("... drop 1: " + degrees(dropletPlus120.wheelPoint.theta));
  println("... drop 2: " + degrees(dropletPlus240.wheelPoint.theta));
  
  renderDroplets();
}

void mousePressed(){
 // if (exportingFrames){
 //   stopGifExport();
 // }else{
 //   startGifExport();
 // }
 background(0);
}

void startGifExport(){
   // gifExport = new GifMaker(this, "export" + millis() + ".gif");
   // gifExport.setRepeat(0);
   // gifExport.setQuality(0);
   // // int delayInMillis = (int)(1000/60.0);
   // gifExport.setDelay( 1 );
   exportingFrames = true;
}

void stopGifExport(){
   // if(gifExport != null){
   //   gifExport.finish();
   // }
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


   final int COLOR_RED = 0;
   final int COLOR_RED_ORANGE = 1;
   final int COLOR_ORANGE = 2;
   final int COLOR_YELLOW_ORANGE= 3;
   final int COLOR_YELLOW = 4;
   final int COLOR_YELLOW_GREEN = 5;
   final int COLOR_GREEN = 6;
   final int COLOR_BLUE_GREEN = 7;
   final int COLOR_BLUE = 8;
   final int COLOR_BLUE_VIOLET = 9;
   final int COLOR_VIOLET = 10;
   final int COLOR_RED_VIOLET = 11;

class ColorDroplet{

}

class ColorWheelPoint{
   PolarPoint wheelPoint;
   final ColorDroplet droplet = new ColorDroplet();
   
   ColorWheelPoint(){
     wheelPoint = new PolarPoint(width/2,height/2);
   }
   
   void render(){
     noStroke();
     fill( getColor() );
     float diameter =  2 + 40 * norm(wheelPoint.r,  0, min(width/2, height/2) );
     ellipse(wheelPoint.x(), wheelPoint.y(), diameter, diameter);
   }
   
   color getColor(){ return 0; }
}
   
class HSBWheelPoint extends ColorWheelPoint{
   
   
   color getColor(){
     colorMode(HSB, 360, 100, 100);
     float colorDegree = degrees(wheelPoint.theta) % 360;
     float saturation = 100 *  norm(wheelPoint.r,  0, min(width/2, height/2) );
     return color(colorDegree, saturation, 80);
   }
}

// implement color wheel where 
//   0 deg ==> Red
// 120 deg ==> Yellow
// 240 deg ==> Blue 
// ... with Orange, Green, Purple are evenly spaced between
class RYBWheelPoint extends ColorWheelPoint {
  final float ARC_MAIN_COLORS = 5; //  
  final float DEG_RED = 0;
  final float DEG_ORANGE = 60;
  final float DEG_YELLOW = 120; 
  final float DEG_GREEN = 180; 
  final float DEG_BLUE = 240; 
  final float DEG_VIOLET = 300; 
  
  
   color getColor(){
     colorMode(RGB, 255);
     float degree = degrees(wheelPoint.theta) % 360;
     
     int colorCode = getColorCode( degree );
     float r = 0;
     float g = 0;
     float b = 0;
     switch(colorCode){
       case COLOR_RED:
           return color(255, 0, 0);
       case COLOR_RED_ORANGE:
           g = map(degree, DEG_RED + ARC_MAIN_COLORS, DEG_ORANGE - ARC_MAIN_COLORS, 0, 128);
           return color(255, g, 0);
       case COLOR_ORANGE:
           return color(255, 128, 0);
       case COLOR_YELLOW_ORANGE:
           g = map(degree, DEG_ORANGE + ARC_MAIN_COLORS, DEG_YELLOW - ARC_MAIN_COLORS, 128, 255);
           return color(255, g, 0);
       case COLOR_YELLOW:
           return color(255, 255, 0);
       case COLOR_YELLOW_GREEN:
           r = map(degree, DEG_YELLOW + ARC_MAIN_COLORS, DEG_GREEN - ARC_MAIN_COLORS, 255, 128);
           return color(r, 255, 0);
       case COLOR_GREEN:
           return color(0, 255, 0);
       case COLOR_BLUE_GREEN:
           g = map(degree, DEG_GREEN + ARC_MAIN_COLORS, DEG_BLUE - ARC_MAIN_COLORS, 255, 0);
           b = map(degree, DEG_GREEN + ARC_MAIN_COLORS, DEG_BLUE - ARC_MAIN_COLORS, 0, 255);
           return color(0, g, b);
       case COLOR_BLUE:
           return color(0, 0, 255);
       case COLOR_BLUE_VIOLET:
           r = map(degree, DEG_BLUE + ARC_MAIN_COLORS, DEG_VIOLET - ARC_MAIN_COLORS, 0, 255);
           return color(r, 0, 255);
       case COLOR_VIOLET:
           return color(255, 0, 255);
       case COLOR_RED_VIOLET:
           b = map(degree, DEG_VIOLET + ARC_MAIN_COLORS, 360 - ARC_MAIN_COLORS, 255, 0);
           return color(255, 0, b);
     }
     return color(0);
   }
   
   int getColorCode(float p_nDegree){
     p_nDegree = abs(p_nDegree) % 360;
     
     float[] colorBreakPoints = {
              DEG_RED + ARC_MAIN_COLORS
              , DEG_ORANGE - ARC_MAIN_COLORS
              , DEG_ORANGE + ARC_MAIN_COLORS
              
              , DEG_YELLOW - ARC_MAIN_COLORS
              , DEG_YELLOW + ARC_MAIN_COLORS
              
              , DEG_GREEN - ARC_MAIN_COLORS
              , DEG_GREEN + ARC_MAIN_COLORS
              
              , DEG_BLUE - ARC_MAIN_COLORS
              , DEG_BLUE + ARC_MAIN_COLORS
              
              , DEG_VIOLET - ARC_MAIN_COLORS
              , DEG_VIOLET + ARC_MAIN_COLORS
              
              , 360 - ARC_MAIN_COLORS
           };
      
      int colorIdx = 0;
      for(int i=0; i<colorBreakPoints.length; i++){
        if(p_nDegree < colorBreakPoints[i]){
          break;
        }
        colorIdx++;
      }
           
      int[] colorCodeBreakPoints = {
                COLOR_RED
                , COLOR_RED_ORANGE 
                , COLOR_ORANGE 
                , COLOR_YELLOW_ORANGE
                , COLOR_YELLOW 
                , COLOR_YELLOW_GREEN
                , COLOR_GREEN 
                , COLOR_BLUE_GREEN
                , COLOR_BLUE
                , COLOR_BLUE_VIOLET
                , COLOR_VIOLET 
                , COLOR_RED_VIOLET
                , COLOR_RED
           };
      return colorCodeBreakPoints[colorIdx];
   }
   
   
   // boolean isRed(float p_nDegree){
   //   return between(p_nDegree, (DEG_RED - ARC_MAIN_COLORS), (DEG_RED + ARC_MAIN_COLORS));
   // }
   // boolean isRedOrange(float p_nDegree){
   //   return between(p_nDegree, (DEG_RED + ARC_MAIN_COLORS), (DEG_ORANGE - ARC_MAIN_COLORS));
   // }
   // boolean isOrange(float p_nDegree){
   //   return between(p_nDegree, (DEG_RED + ARC_MAIN_COLORS), (DEG_ORANGE - ARC_MAIN_COLORS));
   // }
   // boolean isYellowOrange(float p_nDegree){
   //   return between(p_nDegree, (DEG_RED + ARC_MAIN_COLORS), (DEG_ORANGE - ARC_MAIN_COLORS));
   // }
   // boolean isYellow(float p_nDegree){
   //   return between(p_nDegree, (DEG_RED + ARC_MAIN_COLORS), (DEG_ORANGE - ARC_MAIN_COLORS));
   // }
   // boolean isYellowGreen(float p_nDegree){
   //   return between(p_nDegree, (DEG_RED + ARC_MAIN_COLORS), (DEG_ORANGE - ARC_MAIN_COLORS));
   // }
   // boolean isGreen(float p_nDegree){
   //   return between(p_nDegree, (DEG_RED + ARC_MAIN_COLORS), (DEG_ORANGE - ARC_MAIN_COLORS));
   // }
   // boolean isBlueGreen(float p_nDegree){
   //   return between(p_nDegree, (DEG_RED + ARC_MAIN_COLORS), (DEG_ORANGE - ARC_MAIN_COLORS));
   // }
   // boolean isBlue(float p_nDegree){
   //   return between(p_nDegree, (DEG_RED + ARC_MAIN_COLORS), (DEG_ORANGE - ARC_MAIN_COLORS));
   // }
   // boolean isBlueViolet(float p_nDegree){
   //   return between(p_nDegree, (DEG_RED + ARC_MAIN_COLORS), (DEG_ORANGE - ARC_MAIN_COLORS));
   // }
   // boolean isViolet(float p_nDegree){
   //   return between(p_nDegree, (DEG_RED + ARC_MAIN_COLORS), (DEG_ORANGE - ARC_MAIN_COLORS));
   // }
   // boolean isRedViolet(float p_nDegree){
   //   return between(p_nDegree, (DEG_VIOLET + ARC_MAIN_COLORS), (DEG_RED-ARC_MAIN_COLORS)+360);
   // }
}

boolean between(float val, float rangeStart, float rangeEnd){
  if(rangeEnd > rangeStart){
    return (rangeStart >= val && val <= rangeEnd);
  } else {
    return (rangeEnd >= val && val <= rangeStart);
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
