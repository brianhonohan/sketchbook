class Line {
  float slope;
  float offset;

  Line(float slope){
    this.slope = slope;
    this.offset = Float.NaN;
  }

  Line(float slope, float offset){
    this.slope = slope;
    this.offset = offset;
  }

  float valueAt(float x){ 
    return this.slope * x + this.offset; 
  }

  PVector reflectPoint(PVector point){
    // following this simple explanation:
    // https://martin-thoma.com/reflecting-a-point-over-a-line/
    Line bisector = this.perpendicularBisector();

    // with:  y = slope * x + offset, solve for Offset at known 'point'
    bisector.offset = point.y - bisector.slope * point.x;

    // solve for interset of this line, and its bisector through the 'point'
    float xIntersect = (bisector.offset - this.offset) / (this.slope - bisector.slope);
    float yIntersect = this.valueAt(xIntersect);

    PVector reflectedPoint = new PVector();
    reflectedPoint.x = point.x + 2 * (xIntersect - point.x);
    reflectedPoint.y = point.y + 2 * (yIntersect - point.y);
    return reflectedPoint;
  }

  Line perpendicularBisector(){
    return new Line(-1 / this.slope, Float.NaN);
  }
}

// Special Cases below - to avoid divide-by-zero cases.

class VerticalLine extends Line{
  float xOffset;

  VerticalLine(float xOffset){
    super(Float.POSITIVE_INFINITY, Float.NaN);
    this.xOffset = xOffset;
  }

  float valueAt(float x){ 
    return Float.NaN;
  }

  PVector reflectPoint(PVector point){
    PVector reflectedPoint = new PVector(point.x, point.y);
    reflectedPoint.x = this.xOffset - (point.x - this.xOffset);
    return reflectedPoint;
  }

  Line perpendicularBisector(){
    return new HorizontalLine(Float.NaN);
  }
}


class HorizontalLine extends Line{
  HorizontalLine(float yOffset){
    super(0, yOffset);
  }

  float valueAt(float x){ return this.offset; }

  PVector reflectPoint(PVector point){
    PVector reflectedPoint = new PVector(point.x, point.y);
    reflectedPoint.y = this.offset - (point.y - this.offset);
    return reflectedPoint;
  }

  Line perpendicularBisector(){
    return new VerticalLine(Float.NaN);
  }
}
