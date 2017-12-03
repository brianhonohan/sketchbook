class Point {
  float x;
  float y;
  
  Point(){
    x = 0;
    y = 0;
  }
  
  Point(float _x, float _y){
    x = _x;
    y = _y;
  }
  
  PolarPoint toPolarPoint(){
    PolarPoint polarPt = new PolarPoint();
    polarPt.r = sqrt(sq(x) + sq(y));
    polarPt.theta = atan2(y, x);
    return polarPt;
  }
  
  float distTo(Point otherPt){
    return dist(x, y, otherPt.x, otherPt.y);
  }
  
  void translateBy(Point translation){
    x += translation.x;
    y += translation.y;
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