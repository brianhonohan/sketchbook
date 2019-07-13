class TerrainGenerator {
  generate(bounds){
    let results = [];

    let prevRidge = this.createFirstRidgePoint(bounds);
    results.push(prevRidge);

    let stepSize = 30;
    let step = createVector(stepSize, 0);
    let stepDirection = random() * TAU;
    step.rotate(stepDirection);

    for (var i = 0; i < 20; i++){
      let turnAngle = (random() - 0.5) * 1.0;
      step.rotate(turnAngle);

      let nextPt = p5.Vector.add(prevRidge.pos, step);
      let nextRidge = new Ridge(nextPt);
      nextRidge.attachTo(prevRidge);
      results.push(nextRidge);
      prevRidge = nextRidge;
    }
    return results;
  }

  createFirstRidgePoint(bounds){
    const x = bounds.minX + random() * bounds.width;
    const y = bounds.minY + random() * bounds.height;

    return new Ridge( createVector(x, y) );
  }
}
