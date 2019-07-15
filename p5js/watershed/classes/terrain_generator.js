class TerrainGenerator {
  constructor(){
    this.noiseScale = 0.1;
  }
  generate(bounds){
    let results = [];

    let prevRidge = this.createFirstRidgePoint(bounds);
    results.push(prevRidge);

    let stepSize = 30;
    let step = createVector(stepSize, 0);
    let stepDirection = random() * TAU;
    step.rotate(stepDirection);

    for (var i = 0; i < 10; i++){
      let turnAngle = (random() - 0.5) * 1.0;
      step.rotate(turnAngle);

      let nextPt = p5.Vector.add(prevRidge.pos, step);
      let elev = noise(this.noiseScale * nextPt.x, this.noiseScale * nextPt.y);
      let nextRidge = new Ridge(nextPt, elev);
      nextRidge.attachTo(prevRidge);
      results.push(nextRidge);
      prevRidge = nextRidge;
    }
    return results;
  }

  createFirstRidgePoint(bounds){
    const x = bounds.minX + random() * bounds.width;
    const y = bounds.minY + random() * bounds.height;
    let elev = noise(this.noiseScale * x, this.noiseScale * y);

    return new Ridge( createVector(x, y), elev );
  }
}
