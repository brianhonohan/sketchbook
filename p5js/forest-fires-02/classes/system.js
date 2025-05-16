class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.initFireIntensitylLookup();
    this.initTerrainLabelLookup();
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
    this.terrainVersion = this.settings.terrainVersion;

    this.internalTicksPerFrame = 1;
    this.speedIdx = 1;
    this.paused = false;
    this.ticksToStepThru = 0;
    this.tickCount = 0;
    this.initFireRisks();
    this.initFireThresholds();
    this.initFuelLookup();
    this.initMoistureLookup();
    this.initWind();
    this.fireRiskThreshold = 0.1;
    this.resources = new Resources();
    this.cellViewer = new CellViewer();
    this.grid = new CellGrid(this.sizeAndPosition, 
                             this, 
                             this.settings.cellWidth,
                             this.cellViewer
                             );
    this.grid.initCells();
    this.calcInitialStats();

    this.firePropagationMatrix = System.BASE_INFLUENCE_MATRIX;

    this.hadLightning = false;
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
      { name: "cellWidth", type: "integer", default: 2}, 
      { name: "scale", type: "float", default: 0.02}, 
      { name: "lightning_at", type: "array:string", default: [], delimiter: "|"},
      { name: "seed", type: "integer", default: P5JsSettings.getSeed() },
      { name: "terrainVersion", type: "integer", default: 2 },
      // { name: "varname3", type: "float", default: 0.6}
    ];
  }

  createCell(tmpRow, tmpCol, i){
    const tmpCell = new Cell(tmpRow, tmpCol, i, this);
    tmpCell.setType(this.terrainTypeForPos(tmpRow, tmpCol));
    tmpCell.fuelAmount = this.fuelLookup[tmpCell.terrainType];
    tmpCell.fireIntensity = this.initialFire[tmpCell.terrainType];
    tmpCell.moistureLevel = this.moistureLookup[tmpCell.terrainType];
    return tmpCell;
  }

  calcInitialStats(){
    this.stats = {};
    this.stats.initial = this.getCurrentCellTypeCounts();
  }

  getCurrentCellTypeCounts(){
    const currentStats = this.getEmptyCellTypeCount();
    for(var i=0; i < this.grid.cells.length; i++){
      currentStats[this.grid.cells[i].terrainType] += 1;
    }
    return currentStats;
  }

  getEmptyCellTypeCount(){
    const emptyTypeArray = Array(System.TERRAIN_PARTIAL_BURN + 1);
    emptyTypeArray.fill(0);
    return emptyTypeArray;
  }

  get x(){ return this.sizeAndPosition.x; }
  get y(){ return this.sizeAndPosition.y; }
  get width(){ return this.sizeAndPosition.width; }
  get height(){ return this.sizeAndPosition.height; }
  containsXY(x, y){ return this.sizeAndPosition.containsXY(x, y); }

  static get TERRAIN_SOIL(){ return 0; }
  static get TERRAIN_WATER(){ return 1; }
  static get TERRAIN_FOLIAGE(){ return 2; } // TREATING as MOSTLY DECIDUOUS 
  static get TERRAIN_BURNING(){ return 3; }
  static get TERRAIN_ENGULFED(){ return 4; }
  static get TERRAIN_SMOLDERING(){ return 5; }
  static get TERRAIN_BURNT(){ return 6; }
  static get TERRAIN_PARTIAL_BURN(){ return 7; }
  static get TERRAIN_GRASS_DRY(){ return 8; }
  static get TERRAIN_GRASS_WET(){ return 9; }
  static get TERRAIN_SHRUB(){ return 10; }
  static get TERRAIN_CONIFER(){ return 11; }
  static get TERRAIN_DECID_CONIF(){ return 12; }

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

  static get SIN_45() { return 0.70710678119; }
  static get NEG_SIN_45() { return 0 - 0.70710678119; }

  static get UNIT_VECTOR_FROM_NEIGHBORS(){ 
    return [
        createVector(0.70710678119, 0.70710678119),
        createVector(0, 1),
        createVector(-0.70710678119, -0.70710678119),

        createVector(1, 0),
        // cell
        createVector(-1, 0),

        createVector(0.70710678119, -0.70710678119),
        createVector(0, -1),
        createVector(-0.70710678119, -0.70710678119)
      ];
  }

  initFireRisks(){
    this.terrainFireRisks = [];
    this.terrainFireRisks[System.TERRAIN_SOIL]          = 0;
    this.terrainFireRisks[System.TERRAIN_WATER]         = -0.1;
    this.terrainFireRisks[System.TERRAIN_FOLIAGE]       = 0;
    this.terrainFireRisks[System.TERRAIN_BURNING]       = 1.0;
    this.terrainFireRisks[System.TERRAIN_ENGULFED]      = 2.0;
    this.terrainFireRisks[System.TERRAIN_SMOLDERING]    = 0.3;
    this.terrainFireRisks[System.TERRAIN_BURNT]         = 0.05;
    this.terrainFireRisks[System.TERRAIN_PARTIAL_BURN]  = 0;
    this.terrainFireRisks[System.TERRAIN_GRASS_DRY]     = 0;
    this.terrainFireRisks[System.TERRAIN_GRASS_WET]     = 0;
    this.terrainFireRisks[System.TERRAIN_SHRUB]         = 0;
    this.terrainFireRisks[System.TERRAIN_CONIFER]       = 0;
    this.terrainFireRisks[System.TERRAIN_DECID_CONIF]   = 0;
  }

  // This is the threshold level at which this cell will catch fire
  initFireThresholds(){
    this.terrainFireThreshold = [];
    this.terrainFireThreshold[System.TERRAIN_SOIL]          = Number.POSITIVE_INFINITY;
    this.terrainFireThreshold[System.TERRAIN_WATER]         = Number.POSITIVE_INFINITY;
    this.terrainFireThreshold[System.TERRAIN_FOLIAGE]       = 1.0;
    this.terrainFireThreshold[System.TERRAIN_BURNING]       = 0;
    this.terrainFireThreshold[System.TERRAIN_ENGULFED]      = 0;
    this.terrainFireThreshold[System.TERRAIN_SMOLDERING]    = 0.001;
    this.terrainFireThreshold[System.TERRAIN_BURNT]         = 0;
    this.terrainFireThreshold[System.TERRAIN_PARTIAL_BURN]  = 0.0001;
    this.terrainFireThreshold[System.TERRAIN_GRASS_DRY]     = 0.0010;
    this.terrainFireThreshold[System.TERRAIN_GRASS_WET]     = 0.1;
    this.terrainFireThreshold[System.TERRAIN_SHRUB]         = 0.5;
    this.terrainFireThreshold[System.TERRAIN_CONIFER]       = 2.3;
    this.terrainFireThreshold[System.TERRAIN_DECID_CONIF]   = 1.0;
  }

  initFuelLookup(){
    this.fuelLookup = [];
    this.fuelLookup[System.TERRAIN_SOIL]          = 0;
    this.fuelLookup[System.TERRAIN_WATER]         = 0;
    this.fuelLookup[System.TERRAIN_FOLIAGE]       = 100;
    this.fuelLookup[System.TERRAIN_BURNING]       = 50;
    this.fuelLookup[System.TERRAIN_ENGULFED]      = 30;
    this.fuelLookup[System.TERRAIN_SMOLDERING]    = 0;
    this.fuelLookup[System.TERRAIN_BURNT]         = 0;
    this.fuelLookup[System.TERRAIN_PARTIAL_BURN]  = 20;
    this.fuelLookup[System.TERRAIN_GRASS_DRY]     = 2;
    this.fuelLookup[System.TERRAIN_GRASS_WET]     = 0.5;
    this.fuelLookup[System.TERRAIN_SHRUB]         = 5;
    this.fuelLookup[System.TERRAIN_CONIFER]       = 200;
    this.fuelLookup[System.TERRAIN_DECID_CONIF]   = 150;
  }

  initFireIntensitylLookup(){
    this.initialFire = [];
    this.initialFire[System.TERRAIN_SOIL]          = 0;
    this.initialFire[System.TERRAIN_WATER]         = 0;
    this.initialFire[System.TERRAIN_FOLIAGE]       = 0;
    this.initialFire[System.TERRAIN_BURNING]       = 5;
    this.initialFire[System.TERRAIN_ENGULFED]      = 20;
    this.initialFire[System.TERRAIN_SMOLDERING]    = 15;
    this.initialFire[System.TERRAIN_BURNT]         = 0;
    this.initialFire[System.TERRAIN_PARTIAL_BURN]  = 0;
    this.initialFire[System.TERRAIN_GRASS_DRY]     = 0;
    this.initialFire[System.TERRAIN_GRASS_WET]     = 0;
    this.initialFire[System.TERRAIN_SHRUB]         = 0;
    this.initialFire[System.TERRAIN_CONIFER]       = 0;
    this.initialFire[System.TERRAIN_DECID_CONIF]   = 0;
  }
  
  initTerrainLabelLookup(){
    this.terrainName = [];
    this.terrainName[System.TERRAIN_SOIL]          = 'Soil';
    this.terrainName[System.TERRAIN_WATER]         = 'Water';
    this.terrainName[System.TERRAIN_FOLIAGE]       = 'Foliage';
    this.terrainName[System.TERRAIN_BURNING]       = 'Burning';
    this.terrainName[System.TERRAIN_ENGULFED]      = 'Engulfed';
    this.terrainName[System.TERRAIN_SMOLDERING]    = 'Smoldering';
    this.terrainName[System.TERRAIN_BURNT]         = 'Burnt';
    this.terrainName[System.TERRAIN_PARTIAL_BURN]  = 'Partial Burn';
    this.terrainName[System.TERRAIN_GRASS_DRY]     = 'Grass Dry';
    this.terrainName[System.TERRAIN_GRASS_WET]     = 'Grass Wet';
    this.terrainName[System.TERRAIN_SHRUB]         = 'Shrub';
    this.terrainName[System.TERRAIN_CONIFER]       = 'Conifer';
    this.terrainName[System.TERRAIN_DECID_CONIF]   = 'Decidious / Conifer Mix';
  }

  initMoistureLookup(){
    // values ranging from 0.3 to 3 (30% to 300%)
    this.moistureLookup = [];
    this.moistureLookup[System.TERRAIN_SOIL]          = 0;
    this.moistureLookup[System.TERRAIN_WATER]         = 0;
    this.moistureLookup[System.TERRAIN_FOLIAGE]       = 1.4;
    this.moistureLookup[System.TERRAIN_BURNING]       = 0;
    this.moistureLookup[System.TERRAIN_ENGULFED]      = 0;
    this.moistureLookup[System.TERRAIN_SMOLDERING]    = 0;
    this.moistureLookup[System.TERRAIN_BURNT]         = 0;
    this.moistureLookup[System.TERRAIN_PARTIAL_BURN]  = 0;
    this.moistureLookup[System.TERRAIN_GRASS_DRY]     = 0.4;
    this.moistureLookup[System.TERRAIN_GRASS_WET]     = 1.2;
    this.moistureLookup[System.TERRAIN_SHRUB]         = 0.7;
    this.moistureLookup[System.TERRAIN_CONIFER]       = 1;
    this.moistureLookup[System.TERRAIN_DECID_CONIF]   = 1.2;
  }

  initWind(){
    this.wind = new WindField(this.sizeAndPosition);
    this.wind.setCellWidth(this.cellWidth * 4);
  }

  togglePause(){
    this.paused = !this.paused;
    this.setSpeed(max(1, this.speedIdx));
  }

  slowDown(){ this.setSpeed(this.speedIdx - 1) }
  speedUp(){ this.setSpeed(this.speedIdx + 1) }

  requestTick() { this.ticksToStepThru += 1;}

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
    if (this.terrainVersion == undefined || this.terrainVersion == 1){
      return this._v1_getTerrainTypeFromNoise(x, y);
    }
    return this._v2_getTerrainTypeFromNoise(x, y);
  }

  _v1_getTerrainTypeFromNoise(x, y){
    const waterOrLand = noise(this.scale * x, this.scale * y);

    if (waterOrLand < 0.5){
      return System.TERRAIN_WATER;

    } else {
      const largeOffset = 100000;
      const landOrFoliage = noise(this.scale * (x + largeOffset),
                                   this.scale * (y + largeOffset));
      if (landOrFoliage < 0.6) {
        return System.TERRAIN_SOIL;
      } else {
        return System.TERRAIN_FOLIAGE;
      }
    }
  }

  _v2_getTerrainTypeFromNoise(x, y){
    const waterOrLand = noise(this.scale * x, this.scale * y);
    let landWaterThreshold = 0.38;

    if (waterOrLand < landWaterThreshold){
      return System.TERRAIN_WATER;

    } else {
      // TODO: In separate sketch, explore biome generation
      const biomeNoiseOffset = 100000;
      const biomeNoise = noise(this.scale * (x + biomeNoiseOffset),
                                   this.scale * (y + biomeNoiseOffset));
      let landNoiseNormalized = (waterOrLand - landWaterThreshold) / landWaterThreshold;

      // TODO: Add in climate noise, (larger scale areas) to control 
      // distribution of dry/wet grass

      // TODO: Terrain generation should be scenario controlled via parameters
      if (landNoiseNormalized < 0.15) {
        // LOWER VALLEYS
        if (biomeNoise < 0.05){
          return System.TERRAIN_CONIFER;
        } else if (biomeNoise < 0.2){
          return System.TERRAIN_DECID_CONIF;
 
        } else if (biomeNoise < 0.4){
          return System.TERRAIN_FOLIAGE;
 
        } else if (biomeNoise < 0.6){
          return System.TERRAIN_GRASS_WET;
 
        } else if (biomeNoise < 0.7){
          return System.TERRAIN_SHRUB;
 
        } else {
          return System.TERRAIN_GRASS_DRY;
          
        }

      } else if (landNoiseNormalized < 0.55) {
        // MID ELEVATION - HILLS, lower foothills
        if (biomeNoise < 0.3){
          return System.TERRAIN_CONIFER;
        } else if (biomeNoise < 0.4){
          return System.TERRAIN_DECID_CONIF;
 
        } else if (biomeNoise < 0.5){
          return System.TERRAIN_FOLIAGE;
 
        } else if (biomeNoise < 0.75){
          return System.TERRAIN_GRASS_DRY;
 
        } else if (biomeNoise < 0.8){
          return System.TERRAIN_GRASS_WET;
 
        } else {
          return System.TERRAIN_SHRUB;

        }

      }  else {
        // Higher elevation, Mountains
        if (biomeNoise < 0.45){
          return System.TERRAIN_CONIFER;
        } else if (biomeNoise < 0.6){
          return System.TERRAIN_DECID_CONIF;
 
        } else if (biomeNoise < 0.73){
          return System.TERRAIN_FOLIAGE;
 
        } else if (biomeNoise < 0.8){
          return System.TERRAIN_GRASS_WET;
 
        } else if (biomeNoise < 0.9){
          return System.TERRAIN_SHRUB;
 
        } else {
          return System.TERRAIN_GRASS_DRY;
          
        }
      }
    }
  }

  getTerrainTypeFromImage(row, col){
    const colorAtXY = P5JsUtils.colorAtInPixels((col * this.cellWidth) % this.baseImage.width,
                                                (row * this.cellWidth) % this.baseImage.height,
                                                this.baseImage.width,
                                                this.baseImage.pixels);
    return this.cellViewer.terrainForColor(colorAtXY);
    return System.TERRAIN_FOLIAGE;
  }

  setTerrainType(x, y, type){
    const cell = this.grid.cellForXY(x, y);
    if (!cell){
      return;
    }
    cell.setType(type);
    cell.fuelAmount = this.fuelLookup[type];
    cell.fireIntensity = this.initialFire[type];
    cell.moistureLevel = this.moistureLookup[type];
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
    if (!this.resources.has(Resources.RES_KNOCK_DOWN)){
      console.log("Out of: knock_down");
      return;
    }

    const cell = this.grid.cellForXY(x, y);
    if (!cell.isBurning()){
      return;
    }
    cell.fireIntensity = 0;
    cell.setType(System.TERRAIN_SMOLDERING);
    this.resources.use(Resources.RES_KNOCK_DOWN);
  }

  waterDropAt(x, y){
    // if (!this.resources.has(Resources.RES_WATER_DROP)){
      // console.log("Out of: water_drop");
    // }
    const cell = this.grid.cellForXY(x, y);
    cell.receiveWaterDrop();
    // this.resources.use(Resources.RES_WATER_DROP);
  }

  infoAt(x, y){
    return { 
      cell: this.grid.cellForXY(x, y)
    };
  }

  fireBreakAt(x, y){
    if (!this.resources.has(Resources.RES_FIRE_BREAK)){
      console.log("Out of: fire_break");
      return;
    }

    const cell = this.grid.cellForXY(x, y);

    if (!cell.isBurning() && cell.terrainType != System.TERRAIN_WATER){
      // TODO: Need to think of cost to creating firebreak per terrain type
      // .. logic: a lot easier to cut into grass, shrub vs. foliage/confier
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
    this.hadLightning = true;
  }

  igniteAt(x, y){
    const cell = this.grid.cellForXY(x, y);

    if (!cell.isBurning() && cell.fuelAmount > 0){
      cell.startBurning();
    }
  }

  lightningStrike(){
    let numberOfTries = 100;
    for (let i = 0; i < numberOfTries; i++){
      let randX = Math.floor(random(0, this.width));
      let randY = Math.floor(random(0, this.height));

      let cell = this.grid.cellForXY(randX, randY);
      if (!cell.isBurning() && cell.fuelAmount > 0){
        cell.startBurning();
        return;
      }
    }
  }

  tick(){
    // console.log("tock");
    if (this.ticksToStepThru > 0){
      while (this.ticksToStepThru > 0){
        this.internalTick();
        this.ticksToStepThru -= 1;
      }
    }

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
      this.triggerSpotFires();
      this.assignNextTypes();

      this.detectFireSuppressed();
    }
    this.grid.cells.forEach(cell => cell.tick());
    this.resources.tick();

    this.wind.tick();
  }

  assignNextTypes(){
    this.grid.cells.filter(c => c.nextFrameType != undefined)
                   .forEach((c) => {
                      c.setType(c.nextFrameType);
                      c.nextFrameType = undefined;
                    });
  }

  calcNextCellTypes(){
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
    });
    cellsAtRisk.forEach(c => this.v3_setNextTypeForCell(c));
  }

  triggerSpotFires(){
    // Find engulfed cells, which have an intensity over X
    // and has a wind value over Y
    this.windyEngulfedCells = this.grid.cells.filter(c => {
        return c.terrainType === System.TERRAIN_ENGULFED
              && this.wind.fetchWindAtXY(c.x, c.y).magSq() > 0.35
      });

    this.windyEngulfedCells.forEach(cell => {
        if (random() > 0.999){
          // Spot a fire down wind
          let windVec = this.wind.fetchWindAtXY(cell.x, cell.y);
          let spotFireLoc = windVec.copy().mult(15 * this.cellWidth);
          spotFireLoc.x += cell.x;
          spotFireLoc.y += cell.y;

          let cellAtLoc = this.grid.cellForXY(spotFireLoc.x, spotFireLoc.y);
          if (cellAtLoc == undefined){
            return;
          }

          if (cellAtLoc.isIgnitable()){
            cellAtLoc.nextFrameType = System.TERRAIN_BURNING;
          }
        }
      });
  }

  v1_setNextTypeForCell(cell){
    if(this.fireRiskFromNeighbors(cell) >= this.fireRiskThreshold){
      cell.nextFrameType = System.TERRAIN_BURNING;
    }
  }

  v1_fireRiskFromNeighbors(cell){
    const neighbors = this.grid.cellNeighborsOfIdx(cell._idx);

    return  neighbors.map(this.v1_fireRisk, this)
                     .reduce((total, riskFactor) => total + riskFactor, 0);
  }

  v1_fireRisk(cell, neighborIdx){
    if (cell == undefined) {
      // This is to be expected if the original cell is along a screen border
      return 0;
    }
    
    return this.terrainFireRisks[cell.terrainType]
              * this.firePropagationMatrix[neighborIdx];
  }

  v2_setNextTypeForCell(cell){
    if(this.v2_fireRiskFromNeighbors(cell) >= this.terrainFireThreshold[cell.terrainType]){
      cell.nextFrameType = System.TERRAIN_BURNING;
    }
  }

  v2_fireRiskFromNeighbors(cell){
    const neighbors = this.grid.cellNeighborsOfIdx(cell._idx);

    return  neighbors.map(this.v2_fireRisk, this)
                     .reduce((total, riskFactor) => total + riskFactor, 0);
  }

  v2_fireRisk(cell, neighborIdx){
    if (cell == undefined) {
      // This is to be expected if the original cell is along a screen border
      return 0;
    }
    
    return cell.fireIntensity
              * this.firePropagationMatrix[neighborIdx];
  }

  v3_setNextTypeForCell(cell){
    let heatFromNeighors = this.v3_fireRiskFromNeighbors(cell);
    if(heatFromNeighors >= this.terrainFireThreshold[cell.terrainType] * cell.moistureLevel * cell.moistureLevel){
      cell.nextFrameType = System.TERRAIN_BURNING;
    } else {
      cell.moistureLevel -= heatFromNeighors / 10;
    }
  }

  v3_fireRiskFromNeighbors(cell){
    const neighbors = this.grid.cellNeighborsOfIdx(cell._idx);

    return  neighbors.map(this.v3_fireRisk, this)
                     .reduce((total, riskFactor) => total + riskFactor, 0);
  }

  v3_fireRisk(cell, neighborIdx){
    if (cell == undefined) {
      // This is to be expected if the original cell is along a screen border
      return 0;
    }

    return cell.fireIntensity
              * this.firePropagationMatrix[neighborIdx]
              * this.windFactor(cell, neighborIdx);
  }

  windFactor(atCell, neighborIdx){
    let windVec= this.wind.fetchWindAtXY(atCell.x, atCell.y);
    let windMagSq = windVec.magSq(); // think this will be between [0,2], given normalized noise
    let unitVec = System.UNIT_VECTOR_FROM_NEIGHBORS[neighborIdx];

    // Boost fire influence in direction of wind
    let alignment = windVec.dot(unitVec); // returns values in range [-1, 1]
    let relativeWind = alignment * windMagSq / 2.0; // should be [-1, 1] with magSq factored in

    if (relativeWind < 0){
      // wind is blowing away from the current cell, towards the 'atCell'
      // thus effect of 'atCell' should be greatly reduced' but maybe non-zero
      // console.log('blowing away from cell');
      return 0;
    }
    return map(relativeWind, 0, 1, 1, 4.5);
  }

  detectFireSuppressed(){
    if (this.hadLightning && this.fireCells.length == 0){
      this.paused = true;
      this.stats.final = this.getCurrentCellTypeCounts();
      console.log('Fire has been fully suppressed');
      this.ui.showDialog(UserInterface.DIALOG_END_SCENARIO);
    }
  }

  requestFullRedraw(){
    this.grid.cells.forEach(c => {c._needsRender = true; });
  }

  render(){
    noStroke();
    this.grid.renderViewsAsNeeded();
  }
}
