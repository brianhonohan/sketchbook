class TreeTrunk {
  constructor(p_xSizeAndPos, system, initialCellCount){
    this.sizeAndPosition = p_xSizeAndPos;
    this.system = system;
    this.initialCellCount = initialCellCount;

    this.cellViewer = new CellViewer();
    this.initCells();
  }

  initCells(){
    this.cells = [];
    for (var i = 0; i < this.initialCellCount; i++){
      let tmpCell = new Cell(this.x + random(this.width),
                             this.y + random(this.height),
                             i, this);
      this.cells.push(tmpCell);
    }
  }

  get x() { return this.sizeAndPosition.x; }
  get y() { return this.sizeAndPosition.x; }
  get width() { return this.sizeAndPosition.width; }
  get height() { return this.sizeAndPosition.height; }

  draw(){
    noStroke();
    fill(colorScheme.line);
    this.cells.forEach(c => this.cellViewer.renderCell(c));
  }
}
