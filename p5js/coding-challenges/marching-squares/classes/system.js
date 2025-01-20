class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    this.cellViewer = new CellViewer();
    this.grid = new CellGrid(this.sizeAndPosition, 
                             this, 
                             this.settings.cellWidth,
                             this.cellViewer
                             );
    this.grid.initCells();
    this.regenerate();
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string, bool
  optionsMetadata(){
    return [
      { name: "cellWidth", type: "integer", default: 50}, 
      { name: "drawGrid", type: "bool", default: true}, 
      { name: "scale", type: "float", default: 0.01}, 
      { name: "xOffset", type: "integer", default: 0},
      { name: "yOffset", type: "integer", default: 0},
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
  }

  getValueAt(row,col){
    return Math.floor(2 * noise((this.settings.xOffset + row) * this.settings.scale, 
                                (this.settings.yOffset + col) * this.settings.scale));
  }

  tick(){

  }

  render(){
    this.grid.renderViews();
  }
}
