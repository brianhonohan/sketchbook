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
    return tmpCell;
  }

  static get TERRAIN_SOIL(){ return 0; }
  static get TERRAIN_WATER(){ return 1; }
  static get TERRAIN_FOLLIAGE(){ return 2; }

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

  tick(){
    // console.log("tock");
  }

  render(){
    background(0);
    noStroke();
    this.grid.renderViews();
  }
}
