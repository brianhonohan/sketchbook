// Aka a polygon
class Polygon2D {
  constructor(){
    this.points = [];
  }

  // Uses a BYO pattern - Bring Your Own (Object))
  // if input is a single object with x and y, use that
  // Assumes points are in order, counter-clockwise
  addPoint(x, y){
    if (x.x && x.y){
      this.points.push(x);
    } else {
      this.points.push({x: x, y: y});
    }
  }

  // from: https://en.wikipedia.org/wiki/Centroid#Of_a_polygon
  getCentroid(){
    if (this.points.length < 3) {
      return 0; // Not a polygon
    }
    let cx = 0;
    let cy = 0;

    for (let i = 0; i < this.points.length; i++) {
      const wrappedIndex = (i + 1) % this.points.length;

      const p1 = this.points[i];
      const p2 = this.points[wrappedIndex];

      const f = (p1.x * p2.y - p2.x * p1.y);
      cx += (p1.x + p2.x) * f;
      cy += (p1.y + p2.y) * f;
    }

    const thisArea = this.getArea();
    return {
      x: cx / (6 * thisArea),
      y: cy / (6 * thisArea)
    };
  }

  getArea(){
    if (this.points.length < 3) {
      return 0; // Not a polygon
    }
    let area = 0;
    for (let i = 0; i < this.points.length; i++) {
      const wrappedIndex = (i + 1) % this.points.length;
      area += this.points[i].x * this.points[wrappedIndex].y;
      area -= this.points[wrappedIndex].x * this.points[i].y;
    }
    return Math.abs(area / 2);
  }

  containsXY(x, y){
    // Ray-casting algorithm for point-in-polygon test
    // FROM (DEFUNCT) https://github.com/substack/point-in-polygon
    // Via gorhill voronoi: https://github.com/gorhill/Javascript-Voronoi
    // 
    // Refactored to have clear prevIndexWrapped label/code
    let inside = false;
    
    for (let i = 0; i < this.points.length; i++) {
      const xi = this.points[i].x; 
      const yi = this.points[i].y;

      let prevIndexWrapped = (this.points.length + i - 1) % this.points.length;
      
      let j = prevIndexWrapped;
      const xj = this.points[j].x;
      const yj = this.points[j].y;

      const intersect = ((yi > y) !== (yj > y)) &&
                        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }

  intersectionPointsWithLineSeg(lineSeg, onLineSeg = true){
    // Check if any edge of the polygon intersects with the line segment
    // Returns an array of intersection points
    // If onLineSeg is false, don't enforce constraint that intersection must be on the provided line segment

    let edgeSeg = lineSeg.copy();

    const intersections = [];
    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i];
      const p2 = this.points[(i + 1) % this.points.length];

      edgeSeg.startX = p1.x;
      edgeSeg.startY = p1.y;
      edgeSeg.endX = p2.x;
      edgeSeg.endY = p2.y;

      // Check intersection with the provided line segment
      const intersection = lineSeg.intersectionPoint(edgeSeg, onLineSeg);

      if (intersection){
        intersections.push(intersection);
      }
    }
    return intersections;
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