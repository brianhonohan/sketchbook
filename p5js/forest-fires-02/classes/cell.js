class Cell {
  constructor(row, col, index, system){
    // variable names are dictated by CellGrid
    this._row = row;
    this._col = col;

    this._needsRender = true;
    this._idx = index;
    this.system = system;
    this.grid = this.system.grid;
    this.terrainType = undefined;
    this.nextFrameType = undefined;
    this.fuelAmount = 0;
    this.fireIntensity = 0;
  }

  get x() { return this._col * this.system.cellWidth; }
  get y() { return this._row * this.system.cellWidth; }

  startBurning(){
    this.setType(System.TERRAIN_BURNING);
  }

  isBurning(){
    return [
      System.TERRAIN_BURNING,
      System.TERRAIN_ENGULFED,
      System.TERRAIN_SMOLDERING
    ].includes(this.terrainType); 
  }

  setType(type){
    this.terrainType = type;
    this._needsRender = true;
  }

  tick(){
    if (this.terrainType == System.TERRAIN_BURNING){
      this.fuelAmount -= 0.3;
      this.fireIntensity += 0.3;

      if (this.fuelAmount < 0){
        this.setType(System.TERRAIN_SMOLDERING);
      }

      if (this.fireIntensity > 20){
        this.setType(System.TERRAIN_ENGULFED);
      }
    } else if (this.terrainType == System.TERRAIN_ENGULFED){
      this.fuelAmount -= 1;
      if (this.fuelAmount < 0){
        this.setType(System.TERRAIN_SMOLDERING);
      }
    } else if (this.terrainType == System.TERRAIN_SMOLDERING){
      this.fireIntensity -= 0.05;

      if (this.fireIntensity < 0){
        if (this.fuelAmount > 0){
          this.setType(System.TERRAIN_PARTIAL_BURN);
        } else {
          this.setType(System.TERRAIN_BURNT);
        }
      }
    }
  }

  get cellAbove() { return this.grid.cellAbove(this._idx); }
  get cellToRight() { return this.grid.cellToRight(this._idx); }
  get cellBelow() { return this.grid.cellBelow(this._idx); }
  get cellToLeft() { return this.grid.cellToLeft(this._idx); }

}
