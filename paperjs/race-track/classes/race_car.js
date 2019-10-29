class RaceCar {
  constructor(path){
    this.path = path;
    this.distTraveled = 0;
    this.speed = 4;
    this.shape = new paper.Shape.Circle(this.location(), 10);
    this.shape.fillColor = PaperJsUtils.getRandomColor();

    this.replaceTires();
    this.initWearMatrix();
  }

  replaceTires(){
    this.tireHardness = 100;
    this.tires = new Array(4).fill(1);
  }

  get tireFrontL() { return this.tires[0]; }
  get tireFrontR() { return this.tires[1]; }
  get tireRearL() {  return this.tires[2]; }
  get tireRearR() {  return this.tires[3]; }

  location(){
    return this.path.getPointAt(this.distTraveled % this.path.length);
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

  _wearFactor(tireIndex, curvature){
    let curveIdx = 1 + Math.sign(curvature);
    return this.wearMatrix[tireIndex][curveIdx] * Math.abs(curvature) / this.tireHardness;
  }

  _degradeTires(){
    let samplePoints = this._samplePoints();
    let curveSamples = samplePoints.map(sp => this.path.getCurvatureAt(sp));

    this.tires.forEach((t, idx) => {
      this.tires[idx] -= curveSamples.map(c => this._wearFactor(idx, c))
                                     .reduce((wear, totalWear) => wear + totalWear);
    });
  }

  _samplePoints(numSamples = 4){
    let samples = new Array(numSamples).fill(null);
    let stepSize = this.speed / numSamples;
    let distOffset = this.distTraveled % this.path.length;
    return samples.map((e, idx) => distOffset + idx * stepSize);
  }

  tick(event){
    this._degradeTires();
    this.distTraveled += this.speed;
    this.shape.position = this.location();
  }
}
