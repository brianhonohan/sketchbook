class Rect implements Shape {
  float _x;
  float _y;
  float _width;
  float _height;

  Rect(float x, float y, float p_nWidth, float p_nHeight){
    this._x = x;
    this._y = y;
    this._width = p_nWidth;
    this._height = p_nHeight;
  }

  float x(){ return this._x; }
  float y(){ return this._y; }
  float width(){ return this._width; }
  float height(){ return this._height; }
  float minX(){ return this._x; }
  float minY(){ return this._y; }
  float maxX(){ return this._x + this._width; }
  float maxY(){ return this._y + this._height; }
  float centerX(){ return this._x + this._width / 2; }
  float centerY(){ return this._y + this._height / 2; }

  boolean contains(Shape other){
    return this.minX() < other.minX() && this.maxX() > other.maxX()
            && this.minY() < other.minY() && this.maxY() > other.maxY();
  }

  void expandToIncludeRect(Rect otherRect){
    float maxX = this.maxX();
    float maxY = this.maxY();

    this._x = min(this._x, otherRect._x);
    this._y = min(this._y, otherRect._y);

    maxX = max(maxX, otherRect.maxX());
    maxY = max(maxY, otherRect.maxY());

    this._width  = maxX - this._x;
    this._height = maxY - this._y;
  }

  boolean containsXY(float x, float y){ 
    return this.minX() <= x && x < this.maxX() 
           && this.minY() <= y && y < this.maxY();
  }
  
  String toString(){
    return "Rect ... x: " + int(this._x) + " y: " + int(_y) 
         + ", WxH " + _width + " x " + _height; 
  }
  
  void draw(){
    rectMode(CORNER);
    rect(this._x, this._y, this._width, this._height);
  }
}
