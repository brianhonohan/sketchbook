class Rect {
  constructor(x, y, p_nWidth, p_nHeight){
    this._x = x;
    this._y = y;
    this._width = p_nWidth;
    this._height = p_nHeight;
  }

  get x(){ return this._x; }
  get y(){ return this._y; }
  get maxX(){ return this._x + this._width; }
  get maxY(){ return this._y + this._height; }

  contains(otherRect){
    return this.x < otherRect.x && this.maxX > otherRect.maxX
            && this.y < otherRect.y && this.maxY > otherRect.maxY;
  }
}