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
    this.moistureLevel = 1.0;
    this.wasIgnited = false;
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

  isIgnitable(){
    return this.fuelAmount > 0 && !this.isBurning();
  }

  setType(type){
    this._needsRender |= this.terrainType != type;
    this.terrainType = type;
    this.wasIgnited = this.wasIgnited || this.isBurning();
  }

  receiveWaterDrop(){
    let waterFactor = 50;

    if (this.isBurning()){      
      if (waterFactor > this.fireIntensity){
        this.fireIntensity = 0;
        let leftoverWater = waterFactor - this.fireIntensity;
        this.moistureLevel = Math.min(3.0, this.moistureLevel + leftoverWater / 5);
      } else {
        this.fireIntensity -= waterFactor;
      }
      this._updateTerrainType();
    } else {
      this.moistureLevel = Math.min(3.0, this.moistureLevel + 2.5);
    }
  }

  _updateTerrainType(){
    if (this.wasIgnited == false){
      return;
    }

    if (this.fireIntensity < 0){
      if (this.fuelAmount > 0){
        this.setType(System.TERRAIN_PARTIAL_BURN);
      } else {
        this.setType(System.TERRAIN_BURNT);
      }
      return;
    }

    if (this.fuelAmount < 0){
      this.setType(System.TERRAIN_SMOLDERING);
      return;
    }

    if (this.fireIntensity > 20){
      this.setType(System.TERRAIN_ENGULFED);
      return;
    }
  }

  tick(){
    if (this.terrainType == System.TERRAIN_BURNING){
      this.fuelAmount -= 0.3;
      this.fireIntensity += 0.3;
    } else if (this.terrainType == System.TERRAIN_ENGULFED){
      this.fuelAmount -= 1;
    } else if (this.terrainType == System.TERRAIN_SMOLDERING){
      this.fireIntensity -= 0.05;
    }
    this._updateTerrainType();
  }

  get cellAbove() { return this.grid.cellAbove(this._idx); }
  get cellToRight() { return this.grid.cellToRight(this._idx); }
  get cellBelow() { return this.grid.cellBelow(this._idx); }
  get cellToLeft() { return this.grid.cellToLeft(this._idx); }

}
