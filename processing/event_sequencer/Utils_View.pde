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
  
  void render(){
  }
}