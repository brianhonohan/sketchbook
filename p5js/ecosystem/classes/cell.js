class Cell {
  constructor (row, col, ecosystem, index) {
    this._index = index;
    this._row = row;
    this._col = col;
    this.scale = ecosystem.getScale();
    this.elevation = 500 - 1000 *
      (
        noise(this.scale * this._row, this.scale * this._col)
        + (ecosystem.getPercentWater() - 0.5)
      );
    this.resources = [];
    this.lowestNeighbor = undefined;
    this.cumulativeInfux = 0;
    this.influxFrom = [];
  }

  setLowestNeighbor(neighbor){
    this.lowestNeighbor = neighbor;
  }

  clearInflux(){
    this.cumulativeInfux = 0;
    this.influxFrom = [];
  }

  addInfluxFrom(otherCell){
    this.influxFrom.push(otherCell);
  }

  addToCumulativeInflux(influx){
    this.cumulativeInfux += influx;
  }

  addResource(resource){
    this.resources.push(resource);
  }

  hasResource(){
    return this.resources.length > 0;
  }
}
