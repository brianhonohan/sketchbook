class Ecosystem {
  constructor(p_xSizeAndPos, p_xOptions){
    this.sizeAndPosition = p_xSizeAndPos;
    this.settings = {}
    Object.assign(this.settings, this.getDefaultOptions(), p_xOptions);

    this.grid = new CellGrid(this.sizeAndPosition, this, this.settings.cellWidth);
  }

  getScale(){
    return this.settings.scale;
  }

  getPercentWater(){
    return this.settings.percentWater;
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