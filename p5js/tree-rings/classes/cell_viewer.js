class CellViewer {
  constructor(){
    this.initStyleLookup();
  }

  initStyleLookup(){
    this.styles = [];

    this.styles[Cell.TYPE_PITH] = { width: 20, bgColor: color(251,181,37)};
    this.styles[Cell.TYPE_OTHER] = { width: 5, bgColor: color(0, 230, 0)};
  }

  colorForCell(cell){
    return this.styles[cell.type].bgColor;
  }

  renderCell(cell){
    const cellWidth = this.styles[cell.type].width;
    ellipse(cell.x, cell.y, cellWidth, cellWidth);
  }
}
