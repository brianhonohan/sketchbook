class RaceCar {
  constructor(path){
    this.path = path;
    this.distTraveled = 0;
    this.speed = 0;
    this.shape = new paper.Shape.Circle(this.location(), 10);
    this.color = PaperJsUtils.getColorFromHSB( 360 * Math.random(), 1, 0.8);
    this.shape.fillColor = this.color;

    this.replaceTires();
    this.initWearMatrix();
  }

  remove(){
    this.shape.remove();
  }

  replaceTires(){
    this.tireHardness = 4000;
    this.tires = new Array(4).fill(1);
  }

  get tireFrontL() { return this.tires[0]; }
  get tireFrontR() { return this.tires[1]; }
  get tireRearL() {  return this.tires[2]; }
  get tireRearR() {  return this.tires[3]; }

  location(){
    return this.path.getPointAt(this.distTraveled % this.path.length);
  }

  accelerate(){
    // based on 0-60 mph in 1.6 sec
    // converted to pixels per frame per frame
    this.speed += 0.00233;
  }

  initWearMatrix(){
     // Negative Curvature, turning left, wears right tires more
    // Positive Curvature, turning right, wears left tires more
    this.wearMatrix = [
      // [negativeCurve, neutralTurn,   positiveCurve]
      // [leftTurn,      neutralTurn,   rightTurn]
      [0.4,              0,             0.6],
      [0.6,              0,             0.4],
      [0.4,              0,             0.6],
      [0.6,              0,             0.4],
    ];
  }

  _maxSpeedForCurvature(curvature, limit_num_gs = 4){
    // Equating Centripetal force (m * v^2 / r) and F = m * g
    // v = (4 * g * r) ^ 0.5
    // r = (curvature == 0) ? INFINITY
    if (curvature == 0) {
      return NUMBER.POSITIVE_INFINITY;
    }

    var radius = 1 / Math.abs(curvature);
    return Math.pow(limit_num_gs * GRAV_ACCEL * radius, 0.5);
  }

  spinRisk(percentOfMax){
    if (percentOfMax < 0.9){
      return 0;
    }

    return Math.pow((percentOfMax - 0.9) / 0.15, 2);
  }

  _wearFactor(tireIndex, curvature){
    let curveIdx = 1 + Math.sign(curvature);
    return this.wearMatrix[tireIndex][curveIdx] * Math.abs(curvature) / this.tireHardness;
  }

  _degradeTires(){
    this.tires.forEach((t, idx) => {
      this.tires[idx] -= this.curveSamples.map(c => this._wearFactor(idx, c))
                                          .reduce((wear, totalWear) => wear + totalWear);
    });
  }

  updateCurveSamples(){
    let samplePoints = this._samplePoints();
    this.curveSamples = samplePoints.map(sp => this.path.getCurvatureAt(sp));
  }

  _samplePoints(numSamples = 4){
    let samples = new Array(numSamples).fill(null);
    let stepSize = this.speed / numSamples;
    let distOffset = this.distTraveled % this.path.length;
    return samples.map((e, idx) => distOffset + idx * stepSize);
  }


  spinoutCheck(){
    this.maxSpeedAtSamples  = this.curveSamples.map(curvature => this._maxSpeedForCurvature(curvature));
    this.percMaxAtSamples   = this.maxSpeedAtSamples.map(maxCurveSpeed => this.speed / maxCurveSpeed);
    this.spinRisksAtSamples = this.percMaxAtSamples.map(percentOfMax => this.spinRisk(percentOfMax));

    const maxRisk = Math.max(...this.spinRisksAtSamples);
    const hasSpun = Math.random() < maxRisk;
    if (hasSpun == false){
      return;
    }
    console.log('car spun out');
    this.speed = 0.5 * this.speed;
  }

  tick(event){
    this.updateCurveSamples();
    this.spinoutCheck()
    this._degradeTires();
    this.distTraveled += this.speed;
    this.shape.position = this.location();
  }
}
