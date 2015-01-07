PolarPoint polarPt;
Point mousePt;

void setup(){
  size(500,500);
  colorMode(HSB, 360); 
  mousePt = new Point();
}

void draw(){
  mousePt.x = mouseX - width/2;
  mousePt.y = mouseY - height/2;
  polarPt = mousePt.toPolarPoint();
  
  println("theta: " + degrees(polarPt.theta));
  fill( color(degrees(polarPt.theta), 200, 100) );
  rect(0, 0, width, height);
  
}


class Point {
  float x;
  float y;

  PolarPoint toPolarPoint(){
    PolarPoint polarPt = new PolarPoint();
    polarPt.r = sqrt(sq(x) + sq(y));
    polarPt.theta = atan2(y, x);
    if(polarPt.theta < 0){
      polarPt.theta = polarPt.theta + 2 * PI; 
    }
    return polarPt;
  }

  float distTo(Point otherPt){
    return dist(x, y, otherPt.x, otherPt.y);
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
}

class Pallete{
  
  
}
