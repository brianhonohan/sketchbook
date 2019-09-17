class System {
  constructor(){
    let rect = new Rect(0, 0, width/2, height/2);
    this.terrain = new Terrain2D(rect);
    this.cellWidth = 10;

    let weatherPos = new Rect(width/2, 0, width/2, height/2);
    this.weatherGrid = new CellGrid(weatherPos, WeatherCell, this.cellWidth);
    this.weatherGrid.initCells();
    this.initCellsViaTerrain();
  }

  tick(){
    console.log("tock");
  }

  draw(){
    this.terrain.draw();
    this.weatherGrid.renderViews();
  }

  initCellsViaTerrain(){
    // General idea here is to trace downward from above,
    // determine which type of cell exists at each point

    let tmpCell;
    let colorTop;
    let colorBottom;
    let tmpX; 
    let tmpY;

    for(let i=0; i<this.weatherGrid.cells.length; i++){
      tmpCell = this.weatherGrid.cells[i];

      tmpX = tmpCell._col * this.cellWidth + 0.5 * this.cellWidth;
      tmpY = tmpCell._row * this.cellWidth + 0.5 * this.cellWidth;

      colorTop = P5JsUtils.colorAt(tmpX, tmpY, this.terrain._width);

      tmpCell.air = P5JsUtils.colorsMatch(colorTop, this.terrain._colors.sky);
      tmpCell.water = P5JsUtils.colorsMatch(colorTop, this.terrain._colors.water);
      tmpCell.soil = P5JsUtils.colorsMatch(colorTop, this.terrain._colors.soil);

      if (!tmpCell.air && !tmpCell.water && !tmpCell.soil){
        var neighborIdx = this.weatherGrid.cellIndexAbove(i);
        if (neighborIdx == undefined){
          neighborIdx = this.weatherGrid.cellIndexToLeft(i);
        }

        var cellAbove = this.weatherGrid.cells[neighborIdx];
        if (cellAbove) {
          tmpCell.air = cellAbove.air;
          tmpCell.water = cellAbove.water;
          tmpCell.soil = cellAbove.soil;
        }
      }
    }
  }


}
