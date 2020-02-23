class System {
  constructor(){
    this.ui = new UserInterface(this);
    this.statsDisplay = new StatsDisplay();
    this.components = [];
    this.drivers = [];

    this.statsDisplay = new StatsDisplay();
    this.statsDisplay.setCarList(this.components);
    this.paused = false;
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
    this.unpause();
  }

  pause(){
    paper.view.onFrame = undefined;
    this.paused = true;
  }

  unpause(){
    paper.view.onFrame = tick;
    this.paused = false;
  }

  togglePause(){
    if (this.paused) {
      this.unpause();
    } else {
      this.pause();
    }
  }

  clearComponents(){
    this.components.forEach(c => c.remove());
    this.components = [];
    this.statsDisplay.setCarList(this.components);
    this.statsDisplay.clear();
    this.track = undefined;
  }
}