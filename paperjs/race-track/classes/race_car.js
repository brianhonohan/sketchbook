class RaceCar {
  constructor(path){
    this.path = path;
    this.distTraveled = 0;
    this.speed = 4;
    this.shape = new paper.Shape.Circle(this.location(), 10);
    this.shape.fillColor = new paper.Color(0, 0.7, 0);

    this.replaceTires();
    this.initWearMatrix();
    this.initTireView();
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

    this._setTireViewColors();
  }

  initTireView(){
    let screenWidth = paper.view.size.width;
    let tireSize = new paper.Size(15, 25);

    let margin = 20;

    let baseX = screenWidth - 2 * tireSize.width - 2 * margin;
    let x = baseX;
    let y = margin;

    this.tireViews = [];
    this.tireViews.push( new paper.Shape.Rectangle(new paper.Point(x, y), tireSize) );

    x += tireSize.width + margin;
    this.tireViews.push( new paper.Shape.Rectangle(new paper.Point(x, y), tireSize) );

    x = baseX;
    y += tireSize.height + margin;
    this.tireViews.push( new paper.Shape.Rectangle(new paper.Point(x, y), tireSize) );

    x += tireSize.width + margin;
    this.tireViews.push( new paper.Shape.Rectangle(new paper.Point(x, y), tireSize) );
  }

  _setTireViewColors(){
    this.tireViews.forEach((tireView, idx) => {
      tireView.fillColor = this.colorForTire(idx);
    });
  }

  colorForTire(idx){
    return this.colorForTireCondition(this.tires[idx]);
  }

  colorForTireCondition(condition){
    let red   = 1 - condition;
    let green = condition;
    return new paper.Color(red, green, 0);
  }
}
