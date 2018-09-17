class System {
  constructor(){
    let rect = new Rect(0, 0, width/2, height/2);
    this.terrain = new Terrain2D(rect);
    this.cellWidth = 2;

    let weatherPos = new Rect(width/2, 0, width/2, height/2);
    this.weatherGrid = new CellGrid(weatherPos, WeatherCell, this.cellWidth);
  }

  tick(){
    console.log("tock");
  }

  draw(){
    this.terrain.draw();
  }

