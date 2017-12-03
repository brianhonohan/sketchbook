class UIView{
  float x;
  float y;
  float _width;
  float _height;
  
  void setPosition(float xPt, float yPt){
    this.x = xPt;
    this.y = yPt;
  }
  
  void setDimensions(float widthVal, float heightVal){
    this._width = widthVal;
    this._height = heightVal;
  }
  
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
    translate(x, y);
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