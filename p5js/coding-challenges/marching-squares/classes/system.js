class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    this.cellViewer = new CellViewer(this.settings.cellWidth, this.settings.cellWidth);
    this.grid = new CellGrid(this.sizeAndPosition, 
                             this, 
                             this.settings.cellWidth,
                             this.cellViewer
                             );
    this.grid.initCells();
    this.regenerate();

    fill(50);
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string, bool
  optionsMetadata(){
    return [
      { name: "cellWidth", type: "integer", default: 20}, 
      { name: "fillRect", type: "bool", default: true}, 
      { name: "drawGrid", type: "bool", default: false}, 
      { name: "scale", type: "float", default: 0.1}, 
      { name: "xOffset", type: "integer", default: 0},
      { name: "yOffset", type: "integer", default: 0},
      { name: "zOffset", type: "float", default: 0},
      { name: "zSpeed", type: "float", default: 0.001},
    ];
  }

  createCell(tmpRow, tmpCol, i){
    return new Cell(tmpRow, tmpCol, i, this);
  }

  regenerate(){
    let cell;
    for(let i = 0; i < this.grid.numCells; i++){
      cell = this.grid.cells[i];
      cell.value = this.getValueAt(cell._row, cell._col);
    }
    for(let i = 0; i < this.grid.numCells; i++){
      cell = this.grid.cells[i];
      cell.computeMarchingSquareTile();
    }
  }

  getValueAt(row,col){
    return Math.floor(2 * noise((this.settings.yOffset + row) * this.settings.scale, 
                                (this.settings.xOffset + col) * this.settings.scale,
                               this.settings.zOffset));
  }

  tick(){
    if (this.settings.zSpeed != 0) { 
      this.settings.zOffset += this.settings.zSpeed;
      this.regenerate();
    }
  }

  render(){
    background(50);
    this.grid.renderViews();
  }
}
