class Cell {
  constructor (row, col, ecosystem) {
    this._row = row;
    this._col = col;
    this.scale = ecosystem.getScale();
    this.elevation = 150 - 300 *
      (
        noise(this.scale * this._row, this.scale * this._col)
        + (ecosystem.getPercentWater() - 0.5)
      );
    this.resources = [];
  }

  addResource(resource){
    this.resources.push(resource);
  }

  hasResource(){
    return this.resources.length > 0;
  }
}
