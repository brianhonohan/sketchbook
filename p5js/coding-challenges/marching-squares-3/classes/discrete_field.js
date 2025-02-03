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
    this.mgCase = [];
  }

  regenerate(){
    let cell;
    for(let i = 0; i < this.grid.numCells; i++){
      this.values[i] = this.getValueAt(Math.trunc(i / this.grid.numCols), i % this.grid.numCols);
    }
    for(let i = 0; i < this.grid.numCells; i++){
      this.computeMarchingSquareTile(i);
    }
  }

  computeMarchingSquareTile(i){
    if (Math.trunc(i / this.grid.numCols) == (this.grid.numRows - 1)) { return; }
    if ((i % this.grid.numCols) == (this.grid.numCols - 1)) { return; }

    const neighborsIdx = this.grid.neighborsOfIdx(i);

    const idxToRight = neighborsIdx[4];
    const idxBelow = neighborsIdx[6];
    const idxDownToRight = neighborsIdx[7];

    this.mgCase[i] = 0;

    // We are able to multiply by true/false because JS will implicitly convert to 1/0
    // and want to have a value from 0-15
    // corresponding to the tile, 
    // see basic algorithm: https://en.wikipedia.org/wiki/Marching_squares#Basic_algorithm
    this.mgCase[i] += 1 * (this.values[i] >= 1);
    this.mgCase[i] += 2 * (this.values[idxToRight] >= 1);
    this.mgCase[i] += 4 * (this.values[idxDownToRight] >= 1);
    this.mgCase[i] += 8 * (this.values[idxBelow] >= 1);
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