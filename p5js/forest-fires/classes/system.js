class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;
    this.scale =  this.settings.scale;

    this.initFireRisks();
    this.fireRiskThreshold = 0.1;
    this.cellViewer = new CellViewer();
    this.grid = new CellGrid(this.sizeAndPosition, 
                             this, 
                             this.settings.cellWidth,
                             this.cellViewer
                             );
    this.grid.initCells();

    this.firePropagationMatrix = System.BASE_INFLUENCE_MATRIX;
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

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  containsXY(x, y){ return this.sizeAndPosition.containsXY(x, y); }

  static get TERRAIN_SOIL(){ return 0; }
  static get TERRAIN_WATER(){ return 1; }
  static get TERRAIN_FOLLIAGE(){ return 2; }
  static get TERRAIN_BURNING(){ return 3; }
  static get TERRAIN_ENGULFED(){ return 4; }
  static get TERRAIN_SMOLDERING(){ return 5; }
  static get TERRAIN_BURNT(){ return 6; }
  static get TERRAIN_PARTIAL_BURN(){ return 7; }

  static get BASE_INFLUENCE_MATRIX(){ 
    return [
        0.02,
        0.05,
        0.02,

        0.05,
        // cell
        0.05,

        0.02,
        0.05,
        0.02
      ];
  }

  initFireRisks(){
    this.terrainFireRisks = [];
    this.terrainFireRisks[System.TERRAIN_SOIL]       = 0;
    this.terrainFireRisks[System.TERRAIN_WATER]      = -0.1;
    this.terrainFireRisks[System.TERRAIN_FOLLIAGE]   = 0;
    this.terrainFireRisks[System.TERRAIN_BURNING]    = 1.0;
    this.terrainFireRisks[System.TERRAIN_ENGULFED]   = 1.5;
    this.terrainFireRisks[System.TERRAIN_SMOLDERING] = 0.3;
    this.terrainFireRisks[System.TERRAIN_BURNT]      = 0.05;
    this.terrainFireRisks[System.TERRAIN_PARTIAL_BURN] = 0;
  }

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

  knockDownAt(x, y){
    const cell = this.grid.cellForXY(x, y);
    if (!cell.isBurning()){
      return;
    }
    cell.fireIntensity = 0;
    cell.terrainType = System.TERRAIN_SMOLDERING;
  }

  fireBreakAt(x, y){
    const cell = this.grid.cellForXY(x, y);

    if (!cell.isBurning() && cell.terrainType == System.TERRAIN_FOLLIAGE){
      cell.terrainType = System.TERRAIN_SOIL;
      cell.fuelAmount = 0;
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
    if (frameCount % 5 == 0) {
      this.calcNextCellTypes();
      this.assignNextTypes();
    }
    this.grid.cells.forEach(cell => cell.tick());
  }

  assignNextTypes(){
    this.grid.cells.filter(c => c.nextFrameType != undefined)
                   .forEach((c) => {
                      c.terrainType = c.nextFrameType;
                      c.nextFrameType = undefined;
                    });
  }

  calcNextCellTypes(){
    this.grid.cells.filter(c => !c.isBurning() && c.fuelAmount > 0)
                   .forEach(c => this.setNextTypeForCell(c));
  }

  setNextTypeForCell(cell){
    if(this.fireRiskFromNeighbors(cell) > this.fireRiskThreshold){
      cell.nextFrameType = System.TERRAIN_BURNING;
    }
  }

  fireRiskFromNeighbors(cell){
    const neighbors = this.grid.cellNeighborsOfIdx(cell._idx);

    return  neighbors.map(this.fireRisk, this)
                     .reduce((total, riskFactor) => total + riskFactor, 0);
  }

  fireRisk(cell, neighborIdx){
    if (cell == undefined) {
      return 0;
    }

    return this.terrainFireRisks[cell.terrainType]
              * this.firePropagationMatrix[neighborIdx];
  }

  render(){
    noStroke();
    this.grid.renderViews();
  }
}
