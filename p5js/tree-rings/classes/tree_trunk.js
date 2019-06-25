class TreeTrunk {
  constructor(p_xSizeAndPos, system, initialCellCount){
    this.sizeAndPosition = p_xSizeAndPos;
    this.system = system;
    this.initialCellCount = initialCellCount;

    this.cellViewer = new CellViewer();
    this.initCells();
    this.refreshVoronoi();
  }

  initCells(){
    this.cells = [];
    this.initPith();

    for (var i = 0; i < this.initialCellCount; i++){
      let tmpCell = new Cell(this.x + random(this.width),
                             this.y + random(this.height),
                             i, this);
      this.cells.push(tmpCell);
    }
  }

  initPith(){
    let pithCell = new Cell(this.centerX, this.centerY, 0, this);
    pithCell.type = Cell.TYPE_PITH;
    this.cells.push(pithCell);
  }

  get x() { return this.sizeAndPosition.x; }
  get y() { return this.sizeAndPosition.x; }
  get width() { return this.sizeAndPosition.width; }
  get height() { return this.sizeAndPosition.height; }
  get centerX() { return this.sizeAndPosition.centerX; }
  get centerY() { return this.sizeAndPosition.centerY; }

  refreshVoronoi(){
    voronoiClearSites();
    voronoiSites( this.cells.map((cell) => [cell.x, cell.y] ));
    voronoi(width, height, false);
    this.diagram = voronoiGetDiagram();
  }

  draw(){
    voronoiCellStroke( color(150, 200, 150) );
    voronoiDraw(0, 0, false, false);

    noStroke();
    fill(colorScheme.line);
    this.cells.forEach(c => this.cellViewer.renderCell(c));
  }
}
