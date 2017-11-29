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