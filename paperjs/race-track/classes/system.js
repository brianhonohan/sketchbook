class System {
  constructor(){
    this.ui = new UserInterface(this);
    this.statsDisplay = new StatsDisplay();
    this.components = [];
    this.drivers = [];

    this.statsDisplay = new StatsDisplay();
    this.statsDisplay.setCarList(this.components);
  }

  tick(){
    this.components.forEach(c => c.tick());
    this.drivers.forEach(d => d.tick());
    this.statsDisplay.tick();
  }

  buildTrack(path){
    if (this.track  && this.track.path == path){
      return;
    }
    this.track = new Track(path);
  }

  startRaceCar(){
    if (this.track == undefined) {
      console.warn('No active track to start a race car on.');
      return;
    }
    var car = new RaceCar(this.track.path);
    this.components.push(car);

    var driver = new Driver(car, this.track);
    this.drivers.push(driver);

    // convenience variables for debugging in console
    lastCar = car;
    lastDriver = driver;

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
    this.track = undefined;
  }
}