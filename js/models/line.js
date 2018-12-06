class Line {
  constructor(slope, offset){
    this.slope = slope;
    this.offset = offset;
  }

  valueAt(x){ return this.slope * x + this.offset; }

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
}
