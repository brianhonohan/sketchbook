class WeatherCell {
  constructor (row, col, system, index) {
    this._index = index;
    this._row = row;
    this._col = col;

    this.air = false;
    this.water = false;
    this.soil = false;
  }

  static createCell(row, col, index){
    return new WeatherCell(row, col, index);
  }
}