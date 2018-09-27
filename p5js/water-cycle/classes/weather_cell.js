class WeatherCell {
  constructor (row, col, system, index) {
    this._index = index;
    this._row = row;
    this._col = col;

    this.air = false;
    this.water = false;
    this.soil = false;

    // Properties
    this.current = WeatherCell.buildPropset();
    this.delta =  WeatherCell.buildPropset();
  }

  static buildPropset(){
    return {
      temperature: 0,
      windSpeed: 0,
      windDirection: createVector(0,0),
      humidity: 0,
      // this.airPressure = 0
    };
  }

  static createCell(row, col, index){
    return new WeatherCell(row, col, index);
  }
}