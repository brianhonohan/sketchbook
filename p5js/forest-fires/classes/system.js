class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;
    this.scale =  this.settings.scale;

    this.cellViewer = new CellViewer();
    this.grid = new CellGrid(this.sizeAndPosition, 
                             this, 
                             this.settings.cellWidth,
                             this.cellViewer
                             );
    this.grid.initCells();

  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string
  optionsMetadata(){
    return [
      { name: "cellWidth", type: "integer", default: 50}, 
      { name: "scale", type: "float", default: 0.02}, 
      // { name: "varname3", type: "float", default: 0.6}
    ];
  }

  createCell(tmpRow, tmpCol, i){
    const tmpCell = new Cell(tmpRow, tmpCol, i, this);
    tmpCell.terrainType = this.terrainTypeForPos(tmpRow, tmpCol)
    if (tmpCell.terrainType == System.TERRAIN_FOLLIAGE){
      tmpCell.fuelAmount = 100;
    }
    return tmpCell;
  }

  static get TERRAIN_SOIL(){ return 0; }
  static get TERRAIN_WATER(){ return 1; }
  static get TERRAIN_FOLLIAGE(){ return 2; }
  static get TERRAIN_BURNING(){ return 3; }
  static get TERRAIN_ENGULFED(){ return 4; }
  static get TERRAIN_SMOLDERING(){ return 5; }
  static get TERRAIN_BURNT(){ return 6; }

  terrainTypeForPos(x, y){
    const waterOrLand = noise(this.scale * x, this.scale * y);

    if (waterOrLand < 0.5){
      return System.TERRAIN_WATER;

    } else {
      const largeOffset = 100000;
      const landOrFolliage = noise(this.scale * (x + largeOffset),
                                   this.scale * (y + largeOffset));
      if (landOrFolliage < 0.6) {
        return System.TERRAIN_SOIL;
      } else {
        return System.TERRAIN_FOLLIAGE;
      }
    }
  }

  lightningStrike(){
    let firstFolliage = this.grid.cells.find(c => c.terrainType == System.TERRAIN_FOLLIAGE);
    if (firstFolliage) {
      firstFolliage.startBurning();
    }
  }

  tick(){
    // console.log("tock");
    this.grid.cells.forEach(cell => cell.tick());
  }

  render(){
    noStroke();
    this.grid.renderViews();
  }
}
