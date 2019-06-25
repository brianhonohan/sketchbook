class System {
  constructor(p_xSizeAndPos){
    this.sizeAndPosition = p_xSizeAndPos;
    this.optionsSet = new OptionsSet(this.optionsMetadata());
    this.settings = this.optionsSet.settings;

    this.cellViewer = new CellViewer();
    this.initCells();
  }

  optionsMetadata(){
    return [
      { name: "initialCells", type: "integer", default: 50}
    ];
  }

  initCells(){
    this.cells = [];
    for (var i = 0; i < this.settings.initialCells; i++){
      let tmpCell = new Cell(random(width), random(height), i, this);
      this.cells.push(tmpCell);
    }
  }

  tick(){
  }

  render(){
    noStroke();
    fill(colorScheme.line);
    this.cells.forEach(c => this.cellViewer.renderCell(c));
  }
}
