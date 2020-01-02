class System {
  constructor(){
    this.ui = new UserInterface(this);
    this.statsDisplay = new StatsDisplay();
    this.components = [];

    this.statsDisplay = new StatsDisplay();
    this.statsDisplay.setCarList(this.components);
  }

  tick(){
    this.components.forEach(c => c.tick());
    this.statsDisplay.tick();
  }

  startRaceCar(trackPath){
    if (trackPath == undefined) {
      console.warn('No active path to start a race car on');
      return;
    }
    var car = new RaceCar(trackPath);
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