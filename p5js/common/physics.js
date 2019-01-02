class Physics {
  constructor(targetFrameRate = 45){
    this.spaceScaleMeterPerPx    = 0.1;   // 1 pixel = 0.01 meters
    this.timeScaleSecondsPerTick = 1 / targetFrameRate;

    this.accelDueToGravity = Physics.EARTH_GRAVITY.mult(this.accelMultiplier());
  }

  accelMultiplier(){
    // Convert from:  m / (s * s)
    // to:  px / (tick * tick)
    return this.timeScaleSecondsPerTick * this.timeScaleSecondsPerTick 
                                / this.spaceScaleMeterPerPx;
  }

  // FROM: https://simple.wikipedia.org/wiki/Acceleration_due_to_gravity
  static get EARTH_GRAVITY() { return createVector(0, 9.80665); }

  static applyForce(object, force){
    // from F = m * a  ... a = F / m
    object.accel.add( p5.Vector.div(force, object.mass) );
  }
}
