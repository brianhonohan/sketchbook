class System {
  constructor(p_xSizeAndPos){
    this.rect = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    this.reactionDiff = new ReactionDiffusion();
    this.cellViewer = new CellViewer();
    this.grid = new CellGrid(this.rect, 
                             this, 
                             this.settings.cellWidth,
                             this.cellViewer
                             );
    this.grid.initCells();
    noStroke();

    this.addBAt(this.rect.x + this.rect._width/2,
                this.rect.y + this.rect._height/2);
  }

  addBAt(x, y){
    let cell = this.grid.cellForXY(x, y);
    cell.b = 1;
  }

  // Return a list of Options, specific to this sketch,
  // that can be tweaked via the URL parameters
  // separate from the default P5JsSettings that are supported
  //
  // supported types: integer, float, string
  optionsMetadata(){
    return [
      { name: "cellWidth", type: "integer", default: 5}, 
      // { name: "varname2", type: "string", default: 'Lorem Ipsum'}, 
      // { name: "varname3", type: "float", default: 0.6}
    ];
  }

  createCell(tmpRow, tmpCol, i){
    return new Cell(tmpRow, tmpCol, i, this);
  }

  tick(){
    let defaultCell = {a: 1, b: 0};

    for(let i=0; i<this.grid.cells.length; i++){
      if (this.grid.isEdgeIdx(i)){
        continue;
      }
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
      if (this.grid.isEdgeIdx(i)){
        continue;
      }

      let tmpCell = this.grid.cells[i];

      tmpCell.needsRender = ( Math.abs(tmpCell.nextA - tmpCell.a) > 0.0001 ||
                              Math.abs(tmpCell.nextB - tmpCell.b) > 0.0001 );
      tmpCell.a = tmpCell.nextA;
      tmpCell.b = tmpCell.nextB;
    }
  }



  render(){
    this.grid.renderViews();
  }
}
