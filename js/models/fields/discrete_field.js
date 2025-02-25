class DiscreteField {
  constructor(sizeAndPos, settings){
    this.sizeAndPosition = sizeAndPos;
    this.settings = settings;

    this.isolines = new Isolines(this, this.settings);
    this.init();
    this.regenerate();
  }

  init(){
    this.resetToDefaultNoise();
    this.grid = new CellGrid(this.sizeAndPosition, 
      this, 
      this.settings.cellWidth,
      null
      );
    this.values = [];
    this.minValue = 0;
    this.maxValue = 2;
  }

  resetToDefaultNoise(){
    this.osNoise = new OpenSimplexNoise(P5JsSettings.getSeed());
    this.noiseFunction = (x,y,z) => { return 1 + this.osNoise.noise3D(x,y,z);} ;
  }

  // Expectation: function takes 3 values, x,y,z, 
  // and returns values between [0,2)
  setNoiseFunction(noiseFunction){
    this.noiseFunction = noiseFunction;
  }

  regenerate(){
    for(let i = 0; i < this.grid.numCells; i++){
      this.values[i] = this.getValueAt(Math.trunc(i / this.grid.numCols), i % this.grid.numCols);
    }
    this.refreshTiers();
  }

  refreshTiers(){
    this.isolines.refreshTiers();
    this.isolines.compute();
    this.tierBreakpoints = this.isolines.tierBreakpoints;
    this.tierStep = this.isolines.tierStep;
    this.tiers = this.isolines.tiers;
    this.msquares = this.isolines.msquares;
  }

  get range(){ 
    return this.maxValue - this.minValue;
  }

  // returns value from [0, 2)
  getValueAt(row,col){
    return this.noiseFunction((this.settings.yOffset + row) * this.settings.scale, 
                              (this.settings.xOffset + col) * this.settings.scale,
                               this.settings.zOffset);
  }
}