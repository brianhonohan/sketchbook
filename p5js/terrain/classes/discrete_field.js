class DiscreteField {
  constructor(sizeAndPos, system){
    this.sizeAndPosition = sizeAndPos;
    this.system = system;
    this.settings = system.settings;

    this.init();
    this.regenerate();
  }

  init(){
    this.osNoise = new OpenSimplexNoise(P5JsSettings.getSeed());
    this.grid = new CellGrid(this.sizeAndPosition, 
      this, 
      this.settings.cellWidth,
      null
      );
    this.values = [];
    this.tiers = [];
    this.minValue = 0;
    this.maxValue = 2;
    this.msquares = [];
    this.refreshTiers();
  }

  refreshTiers(){
    this.tierStep = (this.range / this.settings.num_levels);
    this.tierBreakpoints = [];
    for (let i = 0; i < this.settings.num_levels; i++){
      this.tierBreakpoints[i] = this.tierStep * i; 
    }
  }

  regenerate(){
    let cell;
    for(let i = 0; i < this.grid.numCells; i++){
      this.values[i] = this.getValueAt(Math.trunc(i / this.grid.numCols), i % this.grid.numCols);
      this.tiers[i] = this.tierValue(this.values[i]);
    }
    for(let i = 0; i < this.grid.numCells; i++){
      this.computeMarchingSquareTile(i);
    }
  }

  get range(){ 
    return this.maxValue - this.minValue;
  }

  tierValue(value){
    return Math.trunc((value - this.minValue) / this.maxValue * this.settings.num_levels);
  }

  computeMarchingSquareTile(i){
    if (Math.trunc(i / this.grid.numCols) == (this.grid.numRows - 1)) { return; }
    if ((i % this.grid.numCols) == (this.grid.numCols - 1)) { return; }

    const neighborsIdx = this.grid.neighborsOfIdx(i);

    const idxToRight = neighborsIdx[4];
    const idxBelow = neighborsIdx[6];
    const idxDownToRight = neighborsIdx[7];

    const neighborhoodVals = [
      this.tiers[i],
      this.tiers[idxToRight],
      this.tiers[idxDownToRight],
      this.tiers[idxBelow]
    ];
    // let minTier = Math.min( ...neighborhoodVals);
    // let maxTier = Math.min( ...neighborhoodVals);

    this.msquares[i] = [];
    for (let j = 0; j < this.settings.num_levels; j++){
      // if (j < minTier) { continue; } // could set it to 15, but (premature) memory optimzation
      // if (j > maxTier) { continue; } // could set it to 0, but (premature) memory optimzation

      this.msquares[i][j] = 0;
      this.msquares[i][j] += 1 * (this.tiers[i] >= j);
      this.msquares[i][j] += 2 * (this.tiers[idxToRight] >= j);
      this.msquares[i][j] += 4 * (this.tiers[idxDownToRight] >= j);
      this.msquares[i][j] += 8 * (this.tiers[idxBelow] >= j);
    }
  }

  // returns value from [0, 2)
  getValueAt(row,col){
    if (this.settings.open_simplex_noise){ 
      return 1 + this.osNoise.noise3D(
            (this.settings.yOffset + row) * this.settings.scale, 
            (this.settings.xOffset + col) * this.settings.scale,
            this.settings.zOffset);
    }
    return 2 * noise((this.settings.yOffset + row) * this.settings.scale, 
                                (this.settings.xOffset + col) * this.settings.scale,
                               this.settings.zOffset);
  }
}