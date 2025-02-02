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
    this.grid.initCells();
  }
  
  createCell(tmpRow, tmpCol, i){
    return new Cell(tmpRow, tmpCol, i, this);
  }
  
  regenerate(){
    let cell;
    for(let i = 0; i < this.grid.numCells; i++){
      cell = this.grid.cells[i];
      cell.rawValue = this.getValueAt(cell._row, cell._col);
      cell.value = Math.floor(cell.rawValue);
    }
    for(let i = 0; i < this.grid.numCells; i++){
      cell = this.grid.cells[i];
      cell.computeMarchingSquareTile();
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