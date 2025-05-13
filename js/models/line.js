class Line {
  constructor(slope, offset){
    this.slope = slope;
    this.offset = offset;
  }

  valueAt(x){ return this.slope * x + this.offset; }
  xValueAt(y) { return (y - this.offset) / this.slope; }

  reflectPoint(point){
    // following this simple explanation:
    // https://martin-thoma.com/reflecting-a-point-over-a-line/
    let bisector = this.perpendicularBisector();

    // with:  y = slope * x + offset, solve for Offset at known 'point'
    bisector.offset = point.y - bisector.slope * point.x;

    // solve for interset of this line, and its bisector through the 'point'
    let xIntersect = (bisector.offset - this.offset) / (this.slope - bisector.slope);
    let yIntersect = this.valueAt(xIntersect);

    let reflectedPoint = {x: undefined, y: undefined};
    reflectedPoint.x = point.x + 2 * (xIntersect - point.x);
    reflectedPoint.y = point.y + 2 * (yIntersect - point.y);
    return reflectedPoint;
  }

  perpendicularBisector(){
    return new Line(-1 / this.slope, undefined);
  }

  intersectionPoint(otherLine){
    return Line.intersectionPoint(this, otherLine);
  }

  isVertical() {
    return this.slope == Infinity && this.offset == undefined;
  }

  isHorizontal() {
    return this.slope == 0;
  }

  static intersectionPoint(line1, line2){
    // from: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_line_equations
    // and related: https://www.omnicalculator.com/math/intersection-of-two-lines
    // Given two lines
    // y = a * x + b       aka:  y = slope * x + offset
    //
    // Intersection:
    // x0 = (b2 - b1) / (a1 - a2)
    // y0 = a1 * (b2 - b1) / (a1 - a2) + b1

    const a1a2Diff = line1.slope - line2.slope;
    if (a1a2Diff == 0 || isNaN(a1a2Diff)) {
      // lines do not intersect; both vertical, both horizontal, or slopes match
      return undefined;
    }

    // Handle case where one is vertical
    if (line1.isVertical()){
      // solve for line2 at line1.xOffset
      return {x: line1.xOffset, y: line2.valueAt(line1.xOffset)};
    } else if (line2.isVertical()) {
      // solve for line1 at line2.xOffset
      return {x: line2.xOffset, y: line1.valueAt(line2.xOffset)};
    }

    const b2b1Diff = line2.offset - line1.offset;
    
    const x0 = b2b1Diff / a1a2Diff;
    const y0 = line1.valueAt(x0);
    return {x: x0, y: y0};
  }
}

// Special Cases below - to avoid divide-by-zero cases.
// TODO: Roll this into Line; so lines can become vertical, and still behave correctly
// Add Line.verticalLineAt(xOffset)
class VerticalLine {
  constructor(xOffset){
    this.slope = Infinity;
    this.offset = undefined;
    this.xOffset = xOffset;
  }

  valueAt(x){ return undefined; }
  xValueAt(y) { return this.xOffset; }

  reflectPoint(point){
    let reflectedPoint = {x: point.x, y: point.y};
    reflectedPoint.x = this.xOffset - (point.x - this.xOffset);
    return reflectedPoint;
  }

  perpendicularBisector(){
    return new HorizontalLine(0, undefined);
  }

  isVertical() {
    return this.slope == Infinity && this.offset == undefined;
  }

  isHorizontal() {
    return this.slope == 0;
  }
}


class HorizontalLine {
  constructor(yOffset){
    this.slope = 0;
    this.offset = yOffset;
  }

  valueAt(x){ return this.offset; }
  xValueAt(y) { return undefined; }

  reflectPoint(point){
    let reflectedPoint = {x: point.x, y: point.y};
    reflectedPoint.y = this.offset - (point.y - this.offset);
    return reflectedPoint;
  }

  perpendicularBisector(){
    return new VerticalLine(undefined);
  }

  isVertical() {
    return this.slope == Infinity && this.offset == undefined;
  }

  isHorizontal() {
    return this.slope == 0;
  }
}

