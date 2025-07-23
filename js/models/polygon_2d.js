// Aka a polygon
class Polygon2D {
  constructor(){
    this.points = [];
    this._sideLineSegs = undefined;
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
    this._sideLineSegs = undefined;
  }

  getSides(rebuild = false){
    if (!rebuild && this._sideLineSegs){
      return this._sideLineSegs;
    }

    this._sideLineSegs = [];
    for (let i = 0; i < this.points.length; i++){
      const startPt = this.points[i];
      const endPt = this.points[(i + 1) % this.points.length];
      const newSideObj = new LineSeg(startPt.x, startPt.y, endPt.x, endPt.y);
      newSideObj.idx = i;
      this._sideLineSegs.push(newSideObj);
    }
    return this._sideLineSegs;
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

  getBoundingRect(){
    if (this.points.length === 0) {
      return new Rect(0, 0, 0, 0);
    }

    let minX = this.points[0].x;
    let maxX = this.points[0].x;
    let minY = this.points[0].y;
    let maxY = this.points[0].y;

    for (let i = 1; i < this.points.length; i++) {
      const p = this.points[i];
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }

    return new Rect(minX, minY, maxX - minX, maxY - minY);
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

  containsLineSeg(lineSeg){
    // Returns true if both endpoints of the line segment are inside the polygon
    return this.containsXY(lineSeg.start.x, lineSeg.start.y) && this.containsXY(lineSeg.end.x, lineSeg.end.y);
  }

  // Returns an array of LineSeg objects that represent the portions
  // of the input lineSeg that lie inside (or outside) the polygon
  clipLineSegment(lineSeg, keepInside = true, threshold = 0.5){
    const intersections = this.intersectionPointsWithLineSeg(lineSeg, true);

    let verboseLog = false;
      if ( (10 > Math.abs(365 - lineSeg.startX) || 10 > Math.abs(365 - lineSeg.endX))
        && (10 > Math.abs(331 - lineSeg.startY) || 10 > Math.abs(331 - lineSeg.endY))
        && (10 > Math.abs(444 - lineSeg.startX) || 10 > Math.abs(444 - lineSeg.endX))
        && (10 > Math.abs(472 - lineSeg.startY) || 10 > Math.abs(472 - lineSeg.endY))
      
      ){
        console.log(`HELLLLOOO ... intersections.length: ${intersections.length}`);
        verboseLog = true;
      } 

    if (intersections.length === 0) {
      const containsLine = this.containsLineSeg(lineSeg);
      if ((keepInside && containsLine) || (!keepInside && !containsLine)){
        // The entire line segment is inside the polygon
        // OR the entire line segment is outside the polygon
        return [lineSeg];
      }
      return [];
    }

    // Sort intersection points along the line segment
    intersections.sort((a, b) => {  
      const da = Math.hypot(a.x - lineSeg.start.x, a.y - lineSeg.start.y);
      const db = Math.hypot(b.x - lineSeg.start.x, b.y - lineSeg.start.y);
      return da - db;
    });

    // add the end point as an end cap
    // this ensures that we have N+1 segments for N intersections
    intersections.push({x: lineSeg.end.x, y: lineSeg.end.y}); 
    verboseLog && console.log(`now intersections.length: ${intersections.length}`);

    const clippedSegments = [];
    let currentStart = {x: lineSeg.start.x, y: lineSeg.start.y};
    let inside = this.containsXY(currentStart.x, currentStart.y);
    verboseLog && console.log(`now currentStart: ${currentStart.x}, ${currentStart.y}`);
    verboseLog && console.log(`... intersections[0]: ${intersections[0].x}, ${intersections[0].y}`);

    // GIST: walk through the intersections, toggling inside/outside state
    // depending on whether we want to keepInside or not, add segments
    // avoid adding segments that are too short (threshold)
    for (const intersection of intersections) {
      if ((inside && keepInside) || (!inside && !keepInside)) {
        
        verboseLog && console.log(` ... xDiff: ${Math.abs(currentStart.x - intersection.x)}`);
        verboseLog && console.log(` ... yDiff: ${Math.abs(currentStart.y - intersection.y)}`);
        if ( threshold < Math.hypot(currentStart.x - intersection.x, currentStart.y - intersection.y)) {
          clippedSegments.push(new lineSeg.constructor(currentStart.x, currentStart.y, intersection.x, intersection.y));
        }
      }
      currentStart = intersection;
      inside = !inside;
    }

    verboseLog && console.log(`now clippedSegments.length: ${clippedSegments.length}`);
    return clippedSegments;
  }

  // Given a point, find the side of the polygon 
  sideViaPoint(pointObj, threshold = 0.1){
    const sides = this.getSides();

    for(let i = 0; i < sides.length; i++){
      const side = sides[i];
      if (side.containsXY(pointObj.x, pointObj.y, threshold)){
        return side;
      }
    }
    return undefined;
  }

  // Build an array of line segments along the perimeter of this polygon
  // starting at the 'start' point, continuing to the 'end' 
  // and proceed in either clockwise (default) or counterclockwise direction
  lineSegmentsFromTo(start, end, clockwise = true, threshold = 0.5){
    let firstSide = this.sideViaPoint(start, threshold);
    let endSide = this.sideViaPoint(end, threshold);
    if (firstSide == undefined){
      // console.warn("Unexpected: requested lineSegmentsFromTo, but start point was not on the polygon");
      return [];
    }
    if (endSide == undefined){
      // console.warn("Unexpected: requested lineSegmentsFromTo, but end point was not on the polygon");
      return [];
    }

    const lineSegsAlongPerim = [];
    if (firstSide === endSide){
      // TODO: handle the 'clockwise' direction setting
      lineSegsAlongPerim.push(new LineSeg(start.x, start.y, end.x, end.y));
      // console.log('same side');
      return lineSegsAlongPerim;
    }

    const sides = this.getSides();
    let currentSide = firstSide.idx;
    let sideIncrement = clockwise ? 1 : -1;  // ASSUMPTION: sides are in clockwise order
    let currentPoint = new Point(start.x, start.y);

    while (currentSide !== endSide.idx) {
      const side = sides[currentSide];

      if (clockwise) {
        lineSegsAlongPerim.push(new LineSeg(currentPoint.x, currentPoint.y, side.endX, side.endY));
        currentPoint = new Point(side.endX, side.endY);
      } else {
        lineSegsAlongPerim.push(new LineSeg(currentPoint.x, currentPoint.y, side.startX, side.startY));
        currentPoint = new Point(side.startX, side.startY);
      }
      currentSide = (currentSide + sideIncrement + sides.length) % sides.length;
    }
    // console.log('got here, so should be at least 2 sides of segs');
    lineSegsAlongPerim.push(new LineSeg(currentPoint.x, currentPoint.y, end.x, end.y));
    return lineSegsAlongPerim;
  }

  static generateIrregularPolygon(x, y, numSides, minRadius, maxRadius){
    let currentAng = UtilFunctions.random() * Math.PI * 2;

    const newPoly = new Polygon2D();
    let rotationBudget = Math.PI * 2;
    const approxRotationPerSide = rotationBudget / numSides;

    for (let i = 0; i < numSides; i++) {
      let radius = minRadius + (maxRadius - minRadius) * UtilFunctions.random();
      let ptX = x + radius * Math.cos(currentAng);
      let ptY = y + radius * Math.sin(currentAng);
      
      newPoly.addPoint(ptX, ptY);

      // Add some random rotation offset, but keep the total rotation to 2*PI
      let percentRange = 0.9 + UtilFunctions.random() * 0.2; // 0.9 to 1.1
      let rotation = approxRotationPerSide * percentRange;
      rotation = Math.min(rotation, rotationBudget);
      rotationBudget -= rotation;
      currentAng += rotation;
    }

    return newPoly;
  }
}