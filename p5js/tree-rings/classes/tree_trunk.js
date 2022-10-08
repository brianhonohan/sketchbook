class TreeTrunk {
  constructor(p_xSizeAndPos, system){
    this.sizeAndPosition = p_xSizeAndPos;
    this.system = system;

    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    this.cellViewer = new CellViewer();
    voronoiSiteFlag(false);  // disables display of point per cell by Voronoi Lib
  }

  get initialCellCount() { return this.settings.initialCells; }
  get initialRings() { return this.settings.initialRings; }

  optionsMetadata(){
    return [
      { name: "initialCells", type: "integer", default: 20},
      { name: "initialRings", type: "integer", default: 16},
      { name: "draw_cell_centers", type: "bool", default: false}
    ];
  }

  init(){
    this.ringCount = 0;
    this.initCells();
    this.refreshVoronoi();
  }

  initCells(){
    this.cells = [];
    this.initPith();
    this.radius = 5;

    for (var i = 0; i < this.initialRings; i++){
      let cellType = this.getCurrentCellType();
      let thickness = this.getGrowthRate();
      this.addRing(thickness, cellType);
    }

    this.initAir();
  }

  addRing(ringThickness, cellType){
    this.radius += ringThickness;

    let tmpTheta = 0;
    let thetaStep = TAU / this.initialCellCount;
    let tmpX, tmpY;

    for (var i = 0; i < this.initialCellCount; i++){
      tmpX = this.centerX + this.radius * Math.cos(tmpTheta);
      tmpY = this.centerY + this.radius * Math.sin(tmpTheta);

      let tmpCell = new Cell(tmpX, tmpY, i, this);
      tmpCell.type = cellType;
      this.cells.push(tmpCell);
      tmpTheta += thetaStep;
    }
    this.ringCount += 1;
  }

  getCurrentCellType(){
    if (this.ringCount % 2 == 0){
      return Cell.TYPE_EARLY_GROWTH;
    } else {
      return Cell.TYPE_LATE_GROWTH;
    }
  }

  getGrowthRate(){
    if (this.ringCount % 2 == 0){
      return random(8, 20);
    } else {
      return random(4, 8);
    }
  }

  initAir(){
    this.airCells = [];

    let tmpTheta = 0;
    let thetaStep = TAU / this.initialCellCount;
    let tmpX, tmpY;
    let airBoundary = this.radius + 5;

    for (var i = 0; i < this.initialCellCount; i++){
      tmpX = this.centerX + airBoundary * Math.cos(tmpTheta);
      tmpY = this.centerY + airBoundary * Math.sin(tmpTheta);

      let tmpCell = new Cell(tmpX, tmpY, i, this);
      tmpCell.type = Cell.TYPE_AIR;
      this.airCells.push(tmpCell);
      tmpTheta += thetaStep;
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
    voronoiSites( this.cells.map(cell => this.voronoiData(cell)) );
    voronoiSites( this.airCells.map(cell => this.voronoiData(cell)) );
    voronoi(width, height, false);
    this.diagram = voronoiGetDiagram();
  }

  voronoiData(cell){
    return [cell.x, cell.y, this.cellViewer.colorForCell(cell)];
  }

  draw(){
    voronoiCellStrokeWeight(0);
    // voronoiCellStroke( color(150, 200, 150) );
    voronoiDraw(0, 0, true, false);

    if (this.settings.draw_cell_centers) {
      noStroke();
      fill(colorScheme.line);
      this.cells.forEach(c => this.cellViewer.renderCell(c));
      this.airCells.forEach(c => this.cellViewer.renderCell(c));
    }
  }
}
