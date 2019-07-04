class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
  }

  init(p_xSettings){
    if (p_xSettings){
      this.settings = p_xSettings;
    } else {
      this.optionsSet = new OptionsSet(this.optionsMetadata());
      this.settings = this.optionsSet.settings;
    }
    P5JsSettings.setSeed(this.settings.seed);
    this.scale =  this.settings.scale;
    this.baseImage = this.settings.baseImage;
    this.cellWidth = this.settings.cellWidth;

    this.internalTicksPerFrame = 1;
    this.speedIdx = 1;
    this.paused = false;
    this.tickCount = 0;
    this.initFireRisks();
    this.fireRiskThreshold = 0.1;
    this.resources = new Resources();
    this.cellViewer = new CellViewer();
    this.grid = new CellGrid(this.sizeAndPosition, 
                             this, 
                             this.settings.cellWidth,
                             this.cellViewer
                             );
    this.grid.initCells();

    this.firePropagationMatrix = System.BASE_INFLUENCE_MATRIX;
    this.initialLightning();
  }

  restart(){
    this.init(this.settings);
  }

  randomize(){
    this.settings.seed = Math.round(random(1000000));
    this.settings.lightning_at = [];
    this.init(this.settings);
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string
  optionsMetadata(){
    return [
      { name: "cellWidth", type: "integer", default: 20}, 
      { name: "scale", type: "float", default: 0.02}, 
      { name: "lightning_at", type: "array:string", default: [], delimiter: "|"},
      { name: "seed", type: "integer", default: P5JsSettings.getSeed() }
      // { name: "varname3", type: "float", default: 0.6}
    ];
  }

  createCell(tmpRow, tmpCol, i){
    const tmpCell = new Cell(tmpRow, tmpCol, i, this);
    tmpCell.setType(this.terrainTypeForPos(tmpRow, tmpCol));
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
    this.terrainFireRisks[System.TERRAIN_ENGULFED]   = 2.0;
    this.terrainFireRisks[System.TERRAIN_SMOLDERING] = 0.3;
    this.terrainFireRisks[System.TERRAIN_BURNT]      = 0.05;
    this.terrainFireRisks[System.TERRAIN_PARTIAL_BURN] = 0;
  }

  togglePause(){
    this.paused = !this.paused;
    this.setSpeed(max(1, this.speedIdx));
  }

  slowDown(){ this.setSpeed(this.speedIdx - 1) }
  speedUp(){ this.setSpeed(this.speedIdx + 1) }

  setSpeed(newIndex){
    const speedLookup = [0,
      0.25,
      0.5,
      1,
      2,
      4
    ];

    this.speedIdx = constrain(newIndex, 0, speedLookup.length - 1);
    this.internalTicksPerFrame = speedLookup[this.speedIdx];
  }

  terrainTypeForPos(x, y){
    if (this.settings.baseImage){
      return this.getTerrainTypeFromImage(x, y);
    }
    return this.getTerrainTypeFromNoise(x, y);
  }

  getTerrainTypeFromNoise(x, y){
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

  getTerrainTypeFromImage(row, col){
    const colorAtXY = P5JsUtils.colorAtInPixels((col * this.cellWidth) % this.baseImage.width,
                                                (row * this.cellWidth) % this.baseImage.height,
                                                this.baseImage.width,
                                                this.baseImage.pixels);
    return this.cellViewer.terrainForColor(colorAtXY);
    return System.TERRAIN_FOLLIAGE;
  }

  setTerrainType(x, y, type){
    const cell = this.grid.cellForXY(x, y);
    if (!cell){
      return;
    }
    cell.setType(type);
  }

  initializeFromImage(image){
    let pausedState = this.paused;
    this.paused = true;
    this.settings.baseImage = image;
    this.init(this.settings);
    this.paused = pausedState;
  }

  initialLightning(){
    this.settings.lightning_at.forEach(coord => {
      let xyCoord = coord.split(",");
      this.lightningAt(xyCoord[0], xyCoord[1]);
    });
  }

  knockDownAt(x, y){
    const cell = this.grid.cellForXY(x, y);
    if (!cell.isBurning()){
      return;
    }
    cell.fireIntensity = 0;
    cell.setType(System.TERRAIN_SMOLDERING);
  }

  fireBreakAt(x, y){
    if (!this.resources.has(Resources.RES_FIRE_BREAK)){
      console.log("Out of: fire_break");
      return;
    }

    const cell = this.grid.cellForXY(x, y);

    if (!cell.isBurning() && cell.terrainType == System.TERRAIN_FOLLIAGE){
      cell.setType(System.TERRAIN_SOIL);
      cell.fuelAmount = 0;
      this.resources.use(Resources.RES_FIRE_BREAK);
    }
  }

  lightningAt(x, y){
    logMessage(LOG_LEVEL_INFO, `lightningAt: ${x},${y}`);
    const cell = this.grid.cellForXY(x, y);

    if (!cell.isBurning() && cell.fuelAmount > 0){
      cell.startBurning();
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
    if (this.paused){
      return;
    }

    if (this.internalTicksPerFrame < 1) {
      const onlyRunOnModulo = 1 / this.internalTicksPerFrame;
      if (frameCount % onlyRunOnModulo == 0){
        this.internalTick();
      }
    } else {
      for (var i = 0; i < this.internalTicksPerFrame; i++){
        this.internalTick();
      }
    }
  }

  internalTick(){
    this.tickCount += 1;

    if (this.tickCount % 5 == 0) {
      this.calcNextCellTypes();
      this.assignNextTypes();
    }
    this.grid.cells.forEach(cell => cell.tick());
    this.resources.tick();
  }

  assignNextTypes(){
    this.grid.cells.filter(c => c.nextFrameType != undefined)
                   .forEach((c) => {
                      c.setType(c.nextFrameType);
                      c.nextFrameType = undefined;
                    });
  }

  calcNextCellTypes(){
    UtilFunctions.startPerfTime();

    this.fireCells = this.grid.cells.filter(c => c.isBurning());

    const cellsAtRisk = [];
    const idsOfCellsAtRisk = new Map();
    this.fireCells.forEach(cell => {
      const neighbors = this.grid.cellNeighborsOfIdx(cell._idx);
      neighbors.filter(c => c != undefined && !c.isBurning() && c.fuelAmount > 0)
               .forEach(neighbor => {
                  if(!idsOfCellsAtRisk.has(neighbor._idx)){
                    idsOfCellsAtRisk.set(neighbor._idx, true);
                    cellsAtRisk.push(neighbor);
                  }
                });
    })
    cellsAtRisk.forEach(c => this.setNextTypeForCell(c));

    UtilFunctions.endPerfTime(10, 5);
  }

  setNextTypeForCell(cell){
    if(this.fireRiskFromNeighbors(cell) >= this.fireRiskThreshold){
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

  requestFullRedraw(){
    this.grid.cells.forEach(c => {c._needsRender = true; });
  }

  render(){
    noStroke();
    this.grid.renderViewsAsNeeded();
  }
}
