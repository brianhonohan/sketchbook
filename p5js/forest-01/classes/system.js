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
    noLoop();
  }

  optionsMetadata(){
    return [
      { name: "cellWidth", type: "integer", default: 50},
    ];
  }

  createCell(tmpRow, tmpCol, i){
    return new Cell(tmpRow, tmpCol, i, this);
  }

  tick(){
    console.log("tock");
  }

  render(){
    background(0);
    this.grid.renderViews();
  }
}
