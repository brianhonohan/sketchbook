class Cell {
  constructor(row, col, index, system){
    // variable names are dictated by CellGrid
    this._row = row;
    this._col = col;

    this._idx = index;
    this.system = system;
    this.grid = this.system.grid;
    this.terrainType = undefined;
    this.nextFrameType = undefined;
    this.fuelAmount = 0;
    this.fireIntensity = 0;
  }

  startBurning(){
    this.terrainType = System.TERRAIN_BURNING;
  }

  isBurning(){
    return [
      System.TERRAIN_BURNING,
      System.TERRAIN_ENGULFED
    ].includes(this.terrainType); 
  }

  tick(){
    if (this.terrainType == System.TERRAIN_BURNING){
      this.fuelAmount -= 0.3;
      this.fireIntensity += 0.3;

      if (this.fireIntensity > 20){
        this.terrainType = System.TERRAIN_ENGULFED;
      }
    } else if (this.terrainType == System.TERRAIN_ENGULFED){
      this.fuelAmount -= 1;
    }

    if (this.fuelAmount < 0){
      this.terrainType = System.TERRAIN_BURNT;
    } 
  }

  get cellAbove() { return this.grid.cellAbove(this._idx); }
  get cellToRight() { return this.grid.cellToRight(this._idx); }
  get cellBelow() { return this.grid.cellBelow(this._idx); }
  get cellToLeft() { return this.grid.cellToLeft(this._idx); }

}
