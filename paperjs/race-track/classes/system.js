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

  startTrain(){
    var trainEngine = new TrainEngine(this.trackPen.activePath);
    this.components.push(trainEngine);
    paper.view.onFrame = tick;
  }

  stopTrain(){
    paper.view.onFrame = undefined;
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