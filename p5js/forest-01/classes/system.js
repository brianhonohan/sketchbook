class System {
  constructor(p_xSizeAndPos, params){
    this.area = p_xSizeAndPos;
    this.params = params;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    this.init();
  }

  init(){
    this.forest = new Forest(this.area, this);
    this.cellViewer = new CellViewer();
    this.grid = new CellGrid(this.area, 
                             this, 
                             this.settings.cellWidth,
                             this.cellViewer
                             );
    this.grid.initCells();
    this.seasonalTime = new SeasonalTime(System.YEARS_PER_TICK);
  }

  static get YEARS_PER_TICK(){ return 0.1; }

  optionsMetadata(){
    return [
      { name: "cellWidth", type: "integer", default: 50},
    ];
  }

  createCell(tmpRow, tmpCol, i){
    return new Cell(tmpRow, tmpCol, i, this);
  }

  tick(){
    this.seasonalTime.tick();
    this.forest.tick();
  }

  render(){
    background(0);
    this.grid.renderViews();
    this.forest.draw();
  }
}
