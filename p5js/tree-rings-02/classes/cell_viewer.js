class CellViewer {
  constructor(){
    this.initStyleLookup();
  }

  initStyleLookup(){
    this.styles = [];

    this.styles[Cell.TYPE_PITH] = { width: 20, bgColor: color(111,82,46)};
    this.styles[Cell.TYPE_EARLY_GROWTH] = { width: 5, bgColor: color(167,121,63)};
    this.styles[Cell.TYPE_LATE_GROWTH] = { width: 5, bgColor: color(111,82,46)};
    this.styles[Cell.TYPE_SECONDARY_XYLEM] = { width: 5, bgColor: color(50,100,200)};
    this.styles[Cell.TYPE_VASCULAR_CAMBIUM] = { width: 5, bgColor: color(100,200,50)};
    this.styles[Cell.TYPE_SECONDARY_PHLOEM] = { width: 5, bgColor: color(200,100,50)};
    this.styles[Cell.TYPE_OTHER] = { width: 5, bgColor: color(0, 230, 0)};
    this.styles[Cell.TYPE_AIR] = { width: 5, bgColor: colorScheme.background };
  }

  colorForCell(cell){
    return this.styles[cell.type].bgColor;
  }

  renderCell(cell){
    const cellWidth = this.styles[cell.type].width;
    ellipse(cell.x, cell.y, cellWidth, cellWidth);
  }
}
