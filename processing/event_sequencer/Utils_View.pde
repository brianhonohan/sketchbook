class UIView{
  float x;
  float y;
  float _width;
  float _height;
  float locationMode;

  public static final int MODE_TOP_LEFT = 0;  // default value
  public static final int MODE_CENTER = 1;

  void setPosition(float xPt, float yPt){
    this.x = xPt;
    this.y = yPt;
  }
  void setPosition(Point location){ setPosition(location.x, location.y); }
  Point getPosition() { return new Point(x, y); }

  void setLocationMode(int mode){
    if (mode == MODE_TOP_LEFT || mode == MODE_CENTER) {
      locationMode = mode;
    }else{
      logger.warn("Invalid Location mode passed in: [" + mode + "]");
    }
  }

  void setDimensions(float widthVal, float heightVal){
    this._width = widthVal;
    this._height = heightVal;
  }
  float centerX(){ return (locationMode == MODE_CENTER) ? x : x + _width / 2; }
  float centerY(){ return (locationMode == MODE_CENTER) ? y : y + _height / 2; }

  Point centerPoint() { return new Point(centerX(), centerY()); }
  float topLeftX(){ return (locationMode == MODE_TOP_LEFT) ? x : x - _width / 2; }
  float topLeftY(){ return (locationMode == MODE_TOP_LEFT) ? y : y - _height / 2; }

  Point topLeftPoint() { return new Point(topLeftX(), topLeftY()); }

  // This is the method that should be overridden in subclasses.
  void draw() {}

  void renderAsRect(){
    startRender();
    //fill(color(random(100,200),random(100,200),random(100,200)));
    //println(String.format("...... rect(%.1f,%.1f,%.1f,%.1f) ", x, y, _width, _height));
    rect(0, 0, _width, _height);
    finishRender();
  }

  void startRender(){
    pushMatrix();
    translate(topLeftX(), topLeftY()); // TODO: Consider optimization of memoizing the TopLeft corner values
  }

  void finishRender(){
    popMatrix();
  }

  // This method just handles translating to the location of the element.
  void render(){
    startRender();
    draw();
    finishRender();
  }
}

class LineView {
  PVector position;
  PVector vector;

  LineView(Point from, Point to){
    position = new PVector(from.x, from.y);
    vector = new PVector(to.x - from.x, to.y - from.y);
  }

  public JSONObject toJSON(){
    JSONObject json = new JSONObject();
    json.setFloat("x", position.x);
    json.setFloat("y", position.y);
    json.setFloat("vector_x", vector.x);
    json.setFloat("vector_y", vector.y);
    return json;
  }

  String toString(){
    return this.toJSON().toString();
  }

  Point midPoint(){
    PVector halfMag = vector.copy();
    halfMag.setMag( vector.mag() / 2 );
    return new Point(position.x + halfMag.x, position.y + halfMag.y);
  }

  LineView perpendicularBisector(){
    PVector newVector = new PVector(vector.x, vector.y);
    newVector.normalize();
    newVector.rotate(HALF_PI);
    Point from = midPoint();
    Point to = new Point(from.x + newVector.x, from.y + newVector.y);
    return new LineView(from, to);
  }

  void setLength(float scale){
    vector.setMag(scale);
  }

  Point destination(){
    return new Point(position.x + vector.x, position.y + vector.y);
  }

  void drawBezier(float bendAmplitude){
    pushStyle();
    noFill();
    PVector from = position;
    PVector to = destination().toPVector();

    LineView perpBisec = perpendicularBisector();
    perpBisec.setLength(bendAmplitude);
    Point perpBisecEndPoint = perpBisec.destination();

    PVector offsetVector = new PVector(vector.x, vector.y);
    int magicAmount = 100;
    offsetVector.setMag(magicAmount);

    Point secondCtrl = perpBisecEndPoint.copy();
    secondCtrl.translateBy(new Point(offsetVector.x, offsetVector.y));

    // Turn the vector to be directed towards the ling origin (rotate by 180 degrees)
    offsetVector.rotate(PI);
    Point firstCtrl = perpBisecEndPoint.copy();
    firstCtrl.translateBy(new Point(offsetVector.x, offsetVector.y));

    bezier(from.x, from.y, firstCtrl.x, firstCtrl.y, secondCtrl.x, secondCtrl.y, to.x, to.y);
    popStyle();
  }
}

class LineUtil {
  // bendAmplitude - number of pixels
  void drawBezier(Point from, Point to, float bendAmplitude){
    LineView lineView = new LineView(from, to);
    lineView.drawBezier(bendAmplitude);
  }

}