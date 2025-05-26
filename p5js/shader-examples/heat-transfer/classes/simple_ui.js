class SimpleUI {
  constructor(heatCanvas){
    this.mode = SimpleUI.MODE_ADD_HEAT;

    this.graphics = heatCanvas;
  }

  static get MODE_ADD_WALL() { return 1; }
  static get MODE_REMOVE_WALL() { return 2; }
  static get MODE_ADD_HEAT_SOURCE() { return 3; }
  static get MODE_ADD_HEAT_SINK() { return 4; }
  static get MODE_REMOVE_HEAT() { return 5; }
  static get MODE_ADD_HEAT() { return 6 }

  handleMouseDrag(){
    switch (this.mode) {
      case SimpleUI.MODE_ADD_WALL: 
        // this.grid.addWallAt(mouseX, mouseY); 
        break;
      case SimpleUI.MODE_REMOVE_WALL: 
        // this.grid.removeWallAt(mouseX, mouseY); 
        break;
      case SimpleUI.MODE_ADD_HEAT_SOURCE: 
        // this.grid.addSourceAt(mouseX, mouseY); 
        break;
      case SimpleUI.MODE_ADD_HEAT_SINK: 
        // this.grid.addSinkAt(mouseX, mouseY); 
        break;
      case SimpleUI.MODE_REMOVE_HEAT: 
        this.graphics.strokeWeight(20);
        this.graphics.stroke(0, 0, 230);
        this.graphics.line(pmouseX, pmouseY, mouseX, mouseY);
        break;
      case SimpleUI.MODE_ADD_HEAT: 
        this.graphics.strokeWeight(20);
        this.graphics.stroke(230, 0, 0);
        this.graphics.line(pmouseX, pmouseY, mouseX, mouseY);
        break;
    }
  }

  setModeAddWall () { this.mode = SimpleUI.MODE_ADD_WALL; }
  setModeRemoveWall () { this.mode = SimpleUI.MODE_REMOVE_WALL; }
  setModeAddHeatSource () { this.mode = SimpleUI.MODE_ADD_HEAT_SOURCE; }
  setModeAddHeatSink () { this.mode = SimpleUI.MODE_ADD_HEAT_SINK; }
  setModeRemoveHeat () { this.mode = SimpleUI.MODE_REMOVE_HEAT; }
  setModeAddHeat () { this.mode = SimpleUI.MODE_ADD_HEAT; }
}