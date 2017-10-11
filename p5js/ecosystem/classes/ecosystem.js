class Ecosystem {
  constructor(p_xSizeAndPos, p_xOptions){
    this.sizeAndPosition = p_xSizeAndPos;
    this.settings = {}
    Object.assign(this.settings, this.getDefaultOptions(), p_xOptions);
    this.determineMagicWaterPercentageFactor();

    this.grid = new CellGrid(this.sizeAndPosition, this, this.settings.cellWidth);
  }

  getScale(){
    return this.settings.scale;
  }

  determineMagicWaterPercentageFactor(){
    var mapRequestToFactor = [
          [0.0 , 0]
        , [0.05, 0.1 ]
        , [0.10, 0.2 ]
        , [0.25, 0.3 ]
        , [0.30, 0.33]
        , [0.45, 0.35]
        , [0.60, 0.4 ]
        , [0.70, 0.5 ]
        , [0.80, 0.52]
        , [0.90, 0.55]
        , [0.95, 0.6 ]
        , [1.0,  0.8 ]
      ];

    if (this.settings.percentWater >= 1) {
      this.adjustedWaterPercent = 1;
      return;
    } else if(this.settings.percentWater <= 0) {
      this.adjustedWaterPercent = 0;
      return;
    }

    for (var i = 0; i < mapRequestToFactor.length; i++){
      let mapping = mapRequestToFactor[i];
      let nextMapping = mapRequestToFactor[i+1];
      if (nextMapping[0] > this.settings.percentWater){
        this.adjustedWaterPercent = mapping[1];
        break;
      }
    }
  }

  getPercentWater(){
    return this.adjustedWaterPercent;
  }

  getDefaultOptions(){
    return { cellWidth: 5, scale: 0.02, percentWater: 0.5, erosionRate: 0};
  }

  erode(){
    if (this.settings.erosionRate == 0) {
      return;
    }
    let numCells = this.grid.cells.length;

    for(var i = 0; i < numCells; i++){
      let tmpCell = this.grid.cells[i];
      tmpCell.clearInflux();
    }

    for(var i = 0; i < numCells; i++){
      let tmpCell = this.grid.cells[i];
      let neighbors = this.grid.neighborsOfIdx(i);

      if (tmpCell.elevation <= 0){
        continue;
      }
      let lowestNeighbor = undefined;

      // TODO: Address the fact that this seems to favor finding
      // the lowest in the bottom-right (which doesn't make sense)
      // for(var j = 8; j >= 0; j--){
      for(var j = 0; j < 8; j++){
        if (!neighbors[j]) { continue; }
        let tmpNeighbor = this.grid.cells[neighbors[j]];

        if (lowestNeighbor && tmpNeighbor.elevation < lowestNeighbor.elevation){
          lowestNeighbor = tmpNeighbor;
        }
        else if (tmpNeighbor.elevation < tmpCell.elevation)
        {
          lowestNeighbor = tmpNeighbor;
        }
      }

      if (lowestNeighbor) {
        tmpCell.setLowestNeighbor(lowestNeighbor);
        lowestNeighbor.addInfluxFrom(tmpCell);
      } else {
        // add low-point to list
      }
    }

    this.grid.cells.sort(function(a, b) {
      // descending
      return b.elevation - a.elevation;
    });
    for(var i = 0; i < numCells; i++){
      let tmpCell = this.grid.cells[i];
      if (tmpCell.elevation <= 0){
        continue;
      }
      if (!tmpCell.lowestNeighbor) {
        continue;
      }
      let elevDiff = tmpCell.elevation - tmpCell.lowestNeighbor.elevation;
      let erosionAmount = this.settings.erosionRate * elevDiff;
      tmpCell.lowestNeighbor.elevation += erosionAmount;
      tmpCell.elevation -= erosionAmount;

      tmpCell.lowestNeighbor.addToCumulativeInflux(tmpCell.cumulativeInfux + 1);
    }

    // Erosion due to influx (ie. "rivers")
    // works somewhat ... but "20" is dependent on cellWidth (how many inflows is a lot)
    // should probably be shut off after 2-4 cycles.
    // otherwise leads to noise.
    for(var i = 0; i < numCells; i++){
      let tmpCell = this.grid.cells[i];
      if (tmpCell.elevation <= 0){
        continue;
      }
      let flowErosion = lerp(0, 0.05, Math.min(1, tmpCell.cumulativeInfux / 20));
      tmpCell.elevation *= (1.0 - flowErosion);
    }

    // Currently, don't need to resort them by Index, because
    // the CellViewers are initialized with their x, y coord.
    // this.grid.cells.sort(function(a, b) {
    //   return a._index - b._index;
    // });
  }

  tick(){
    this.erode();
    this.grid.renderViews();
  }

  createCell(row, col, index){
    let newCell = new Cell(row, col, this, index);
    if (newCell.elevation > 0 && newCell.elevation < 15) {
      // Disable for now, until we sort out timing of erosion and resource generation
      // newCell.addResource(new Resource());
    }
    return newCell;
  }
}