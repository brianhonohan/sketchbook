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