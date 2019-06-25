class CellViewer {
  constructor(){
    this.initStyleLookup();
  }

  initStyleLookup(){
    this.styles = [];

    this.styles[Cell.TYPE_PITH] = { width: 20 };
    this.styles[Cell.TYPE_OTHER] = { width: 5 };
  }

  renderCell(cell){
    const cellWidth = this.styles[cell.type].width;
    ellipse(cell.x, cell.y, cellWidth, cellWidth);
  }
}
