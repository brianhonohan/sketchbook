class Isolines {
  constructor(field, settings){
    this.field = field;
    this.settings = settings;
  }

  refreshTiers(){
    this.tierStep = (this.field.range / this.settings.num_levels);
    this.tierBreakpoints = [];
    for (let i = 0; i < this.settings.num_levels; i++){
      this.tierBreakpoints[i] = this.tierStep * i; 
    }
    this.tiers = [];
    this.msquares = [];
  }

  compute(){
    for(let i = 0; i < this.field.grid.numCells; i++){
      this.tiers[i] = this.tierValue(this.field.values[i]);
    }
    for(let i = 0; i < this.field.grid.numCells; i++){
      this.computeMarchingSquareTile(i);
    }
  }
  
  tierValue(value){
    return Math.trunc((value - this.field.minValue) / this.field.maxValue * this.settings.num_levels);
  }

  computeMarchingSquareTile(i){
    if (Math.trunc(i / this.field.grid.numCols) == (this.field.grid.numRows - 1)) { return; }
    if ((i % this.field.grid.numCols) == (this.field.grid.numCols - 1)) { return; }

    const neighborsIdx = this.field.grid.neighborsOfIdx(i);

    // Neighborhood is:
    //   0 1 2
    //   3 - 4
    //   5 6 7
    // where '-' is the current cell

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
}