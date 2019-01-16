class QuadraticEquation {
  float a;
  float b;
  float c;

  QuadraticEquation(float a, float b, float c){
    this.a = a;
    this.b = b;
    this.c = c;
  }

  static final float IMAGINARY = Float.NaN;

  float discriminant() {
    return (this.b * this.b) - 4 * this.a  * this.c;
  }

  // sign is either 1 or -1
  float root(int sign){
    float disc = this.discriminant();

    if (disc < 0){
      // TODO: Consider implementing a representation of Imaginary Numbers
      return Float.NaN;
    }

    return (float)((- this.b + sign * Math.pow(disc, 0.5)) / (2 * this.a));
  }
}
