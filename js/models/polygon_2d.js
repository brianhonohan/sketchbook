// Aka a polygon
class Polygon2D {
  constructor(){
    this.points = [];
  }

  // Uses a BYO pattern - Bring Your Own (Object))
  // if input is a single object with x and y, use that
  addPoint(x, y){
    if (x.x && x.y){
      this.points.push(x);
    } else {
      this.points.push({x: x, y: y});
    }
  }

  static generateIrregularPolygon(x, y, numSides, minRadius, maxRadius){
    let currentAng = Math.random() * Math.PI * 2;

    const newPoly = new Polygon2D();
    let rotationBudget = Math.PI * 2;
    const approxRotationPerSide = rotationBudget / numSides;

    for (let i = 0; i < numSides; i++) {
      let radius = minRadius + (maxRadius - minRadius) * Math.random();
      let ptX = x + radius * Math.cos(currentAng);
      let ptY = y + radius * Math.sin(currentAng);
      
      newPoly.addPoint(ptX, ptY);

      // Add some random rotation offset, but keep the total rotation to 2*PI
      let percentRange = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
      let rotation = approxRotationPerSide * percentRange;
      rotation = Math.min(rotation, rotationBudget);
      rotationBudget -= rotation;
      currentAng += rotation;
    }

    return newPoly;
  }
}