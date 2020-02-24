class Driver {
  constructor(car, track){
    this.car   = car;
    this.track = track;
  }

  tick(){
    this.car.accelerate();
    // this.car.turnWheel(2 * Math.sin(frameCount / 3));
  }
}
