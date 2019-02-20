class CellViewer {
  constructor (){
    this._colors = this.colorScheme();
    this.initColorSchemeLookup();
  }

  renderCell(tmpCell, tmpX, tmpY, cellWidth, cellHeight){
    fill(this.colorLookup[tmpCell.terrainType]);
    rect(tmpX, tmpY, cellWidth, cellHeight);
  }

  colorScheme(){
    return {
      water: color(52, 127, 207),
      soil: color(117, 55, 40),
      sand: color(232, 210, 131),
      foliage: color(54, 143, 36)
    };
  }

  initColorSchemeLookup(){
    this.colorLookup = [];
    this.colorLookup[System.TERRAIN_SOIL] = this._colors.soil;
    this.colorLookup[System.TERRAIN_WATER] = this._colors.water;
    this.colorLookup[System.TERRAIN_FOLLIAGE] = this._colors.foliage;
  }
}
