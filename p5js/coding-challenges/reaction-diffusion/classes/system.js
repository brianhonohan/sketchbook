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

    let numRand = 20;
    for(let i=0; i<numRand; i++){
      let x = this.rect.centerX + randomGaussian() * this.rect.width / 8;
      let y = this.rect.centerY + randomGaussian() * this.rect.height / 8;
      this.addBAt(x, y);

      let nearbyPoints = 16;
      for(let j=0; j<nearbyPoints; j++){
        let angle = map(j, 0, nearbyPoints, 0, TWO_PI);
        let xOffset = cos(angle) * random(0, this.settings.cellWidth);
        let yOffset = sin(angle) * random(0, this.settings.cellWidth);
        this.addBAt(x + xOffset, y + yOffset);
      }
    }
  }

  clear(){
    for(let i=0; i<this.grid.cells.length; i++){
      let tmpCell = this.grid.cells[i];
      tmpCell.a = 1;
      tmpCell.b = 0;
      tmpCell.nextA = 0;
      tmpCell.nextB = 0;
      tmpCell.needsRender = true;
    }
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

      tmpCell.needsRender |= (i % 180 == frameCount % 180)
                            || Math.abs(tmpCell.nextA - tmpCell.a) > 0.0001
                            || Math.abs(tmpCell.nextB - tmpCell.b) > 0.0001 ;
      tmpCell.a = tmpCell.nextA;
      tmpCell.b = tmpCell.nextB;
    }
  }



  render(){
    this.grid.renderViews();
  }
}
