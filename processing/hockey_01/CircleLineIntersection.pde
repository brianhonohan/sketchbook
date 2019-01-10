// Implementation of: 
// https://math.stackexchange.com/a/228855
// 
// Given: 
//  Line:    y = mx + c 
//  Circle:  (x − p)^2 + (y − q)^2 = r^2
// 
// Substitute y of Line, into Circle equation:
//   (x − p)^2 + (mx + c − q)^2 = r^2
// 
// Expand ^2 for () terms:
//   x^2 - 2xp + p^2
//             + (m^2)(x^2) + c^2 + q^2 
//             + 2 ( mxc - mxq - cq).  = r^2
// 
// Group like terms:
// (1 + m^2)(x^2) + (2mc - 2p - 2mq)x + p^2 + c^2 + q^2 - 2cq - r^2 = 0
// 
// Which is:  A x^2 + Bx + C = 0
//
// Thus Quadratic Equation is formed:
// Where:
//   A = (1 + m^2)
//   B = (2mc - 2p - 2mq)
//   C = p^2 + c^2 + q^2 - 2cq - r^2
// 
class CircleLineIntersection {
  Circle circle;
  Line line;
  QuadraticEquation quadratic;

  CircleLineIntersection(Circle circle, Line line){
    this.circle = circle;
    this.line = line;
  }

  PVector[] intersectionPoints(){
    float slope = this.line.slope;

    if (slope == Float.POSITIVE_INFINITY || slope == Float.NEGATIVE_INFINITY){
      return this.calcForVerticalLine();
    } else if (slope == 0){
      return this.calcForHorizontalLine();
    }

    return this.calcForNonInfiniteSlope();
  }

  PVector[] calcForVerticalLine(){
    VerticalLine vLine = (VerticalLine)this.line;
    return this.circle.pointsAtX(vLine.xOffset);
  }

  PVector[] calcForHorizontalLine(){
    return this.circle.pointsAtY(this.line.offset);
  }

  PVector[] calcForNonInfiniteSlope(){
    this.quadratic = new QuadraticEquation(this.helperA(), this.helperB(), this.helperC());

    float smallRoot = this.quadratic.root(-1);

    if (smallRoot == QuadraticEquation.IMAGINARY){
      return new PVector[0];
    }

    float largeRoot = this.quadratic.root(1);

    float yOfSmallRoot = this.line.valueAt(smallRoot);
    float yOfLargeRoot = this.line.valueAt(largeRoot);

    PVector[] results = new PVector[2];
    results[0] = new PVector(smallRoot, yOfSmallRoot);
    results[1] = new PVector(largeRoot, yOfLargeRoot);
    return results;
  }

  float helperA() {
    return (float)(1 + Math.pow(this.line.slope, 2));
  }

  float helperB() {
    return 2 * (this.line.slope * this.line.offset
                  - this.circle.x()
                  - this.line.slope * this.circle.y());
  }

  float helperC() {
    return (float)(Math.pow(this.circle.x(), 2)
           + Math.pow(this.line.offset, 2)
           + Math.pow(this.circle.y(), 2)
           - 2 * this.line.offset * this.circle.y()
           - Math.pow(this.circle.radius, 2));
  }
}
