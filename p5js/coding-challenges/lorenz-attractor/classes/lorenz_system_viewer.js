class LorenzSystemViewer {
  constructor(){
    this.timeStep = 0.01;
    this.computedPoints = [];
  }

  computePoints(system, loc, numIterations){
    let nextPoint;
    for (var i = 0; i < numIterations; i++){
      nextPoint = system.nextLocation(loc, this.timeStep);
      this.computedPoints.push(nextPoint);
      
      // console.log(`x: ${loc.x}, y: ${loc.y}, z: ${loc.z}`)
      loc = nextPoint;
    }

    return loc;
  }

  clearPoints(){
    this.computedPoints = [];
  }

  render(){
    this.renderAsShape();
  }

  renderAsLines(){
    let loc = this.computedPoints[0];

    for (var i = 0; i < (this.computedPoints.length-1); i++){
      stroke(85+ i%255, 170+ i%255, 255 + i%255);
      let nextPoint = this.computedPoints[i+1];
      line(loc.x, loc.y, loc.z, nextPoint.x, nextPoint.y, nextPoint.z);
      loc = nextPoint;
    }
  }

  renderAsShape(){
    let loc;
    stroke(50, 200, 50);

    noFill();
    beginShape()
    for (var i = 0; i < this.computedPoints.length; i++){
      loc = this.computedPoints[i];


      if (i % 10 === 0){
        vertex(loc.x, loc.y, loc.z);
        endShape();
        stroke(150+ i%80, 100 +i%80, 50 + i%150);
        beginShape();
      }

      vertex(loc.x, loc.y, loc.z);
    }
    endShape();
  }
}