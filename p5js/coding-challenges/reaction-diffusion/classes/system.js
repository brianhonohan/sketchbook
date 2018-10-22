class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    this.reactionDiff = new ReactionDiffusion();
    this.cellViewer = new CellViewer();
    this.grid = new CellGrid(this.sizeAndPosition, 
                             this, 
                             this.settings.cellWidth,
                             this.cellViewer
                             );
    this.grid.initCells();
    noStroke();
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string
  optionsMetadata(){
    return [
      { name: "cellWidth", type: "integer", default: 50}, 
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
    ];
  }

  createCell(tmpRow, tmpCol, i){
    return new Cell(tmpRow, tmpCol, i, this);
  }

  tick(){
    console.log("tock");

    let defaultCell = {a: 0, b: 0};

    for(let i=0; i<this.grid.cells.length; i++){
      let tmpCell = this.grid.cells[i];

      let neighbors = this.grid.neighborsOfIdx(i);
      neighbors = neighbors.map(el => {
        if (el) { 
          return this.grid.cells[el];
        }else {
          return defaultCell;
        }
      });
      this.reactionDiff.calcReaction(tmpCell, neighbors);
    }

    // apply diffusion
    for(let i=0; i<this.grid.cells.length; i++){
      let tmpCell = this.grid.cells[i];
      tmpCell.a = tmpCell.nextA;
      tmpCell.b = tmpCell.nextB;
    }
  }



  render(){
    background(0);
    this.grid.renderViews();
  }
}
