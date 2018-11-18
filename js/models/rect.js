class Rect {
  constructor(x, y, p_nWidth, p_nHeight){
    this._x = x;
    this._y = y;
    this._width = p_nWidth;
    this._height = p_nHeight;
  }

  get x(){ return this._x; }
  get y(){ return this._y; }
  get width(){ return this._width; }
  get height(){ return this._height; }
  get minX(){ return this._x; }
  get minY(){ return this._y; }
  get maxX(){ return this._x + this._width; }
  get maxY(){ return this._y + this._height; }
  get centerX(){ return this._x + this._width / 2; }
  get centerY(){ return this._y + this._height / 2; }

  contains(otherRect){
    return this.minX < otherRect.minX && this.maxX > otherRect.maxX
            && this.minY < otherRect.minY && this.maxY > otherRect.maxY;
  }

  containsXY(x, y){ 
    return this.minX <= x && x < this.maxX 
           && this.minY <= y && y < this.maxY;
  }
}