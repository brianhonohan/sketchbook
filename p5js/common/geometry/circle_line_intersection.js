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

  static get INCIDENCE_NONE()         { return "No Intersection"; }
  static get INCIDENCE_TANGENT()      { return "Tangent"; }
  static get INCIDENCE_INTERSECTION() { return "Intersection"; }

  constructor(circle, line){
    this.circle = circle;
    this.line = line;
  }

  intersectionPoints(){
    let slope = this.line.slope;

    if (slope == Infinity || slope == -Infinity){
      return this.calcForVerticalLine();
    }

    return this.calcForNonInfiniteSlope();
  }

  calcForVerticalLine(){
    return this.circle.pointsAtX(this.line.xOffset);
  }

  calcForNonInfiniteSlope(){
    this.quadratic = new QuadraticEquation(this.helperA, this.helperB, this.helperC);

    const smallRoot = this.quadratic.root(-1);

    if (smallRoot == QuadraticEquation.IMAGINARY){
      return [];
    }

    const largeRoot = this.quadratic.root(1);

    const yOfSmallRoot = this.line.valueAt(smallRoot);
    const yOfLargeRoot = this.line.valueAt(largeRoot);

    return [{x: smallRoot, y: yOfSmallRoot}, {x: largeRoot, y: yOfLargeRoot}];
  }

  get helperA() {
    return 1 + Math.pow(this.line.slope, 2);
  }

  get helperB() {
    return 2 * (this.line.slope * this.line.offset
                  - this.circle.x
                  - this.line.slope * this.circle.y);
  }

  get helperC() {
    return Math.pow(this.circle.x, 2)
           + Math.pow(this.line.offset, 2)
           + Math.pow(this.circle.y, 2)
           - 2 * this.line.offset * this.circle.y
           - Math.pow(this.circle.radius, 2);
  }
}
