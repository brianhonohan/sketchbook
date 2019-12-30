class System {
  constructor(){
    this.trackPen = new TrackPen(this);
    this.statsDisplay = new StatsDisplay();
    paper.tool = this.trackPen.tool;
    this.components = [];

    this.statsDisplay = new StatsDisplay();
    this.statsDisplay.setCarList(this.components);
  }

  tick(){
    this.components.forEach(c => c.tick());
    this.statsDisplay.tick();
  }

  startRaceCar(){
    var car = new RaceCar(this.trackPen.activePath);
    this.components.push(car);
    this.statsDisplay.addDisplay();
    paper.view.onFrame = tick;
  }

  stopRaceCar(){
    paper.view.onFrame = undefined;
  }

  clearComponents(){
    this.components.forEach(c => c.remove());
    this.components = [];
    this.statsDisplay.setCarList(this.components);
    this.statsDisplay.clear();
  }
}