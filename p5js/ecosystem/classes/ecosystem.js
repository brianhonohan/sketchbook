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
    return { cellWidth: 5, scale: 0.02, percentWater: 0.5};
  }

  tick(){
    this.grid.renderViews();
  }

  createCell(row, col){
    let newCell = new Cell(row, col, this);
    if (newCell.elevation > 0 && newCell.elevation < 15) {
      newCell.addResource(new Resource());
    }
    return newCell;
  }
}