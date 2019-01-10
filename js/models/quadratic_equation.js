class QuadraticEquation {
  constructor(a, b, c){
    this.a = a;
    this.b = b;
    this.c = c;
  }

  static get IMAGINARY() { return "Imaginary"; }

  discriminant() {
    return Math.pow(this.b, 2) - 4 * this.a  * this.c;
  }

  // sign is either 1 or -1
  root(sign){
    let disc = this.discriminant();

    if (disc < 0){
      // TODO: Consider implementing a representation of Imaginary Numbers
      return QuadraticEquation.IMAGINARY;
    }

    return (- this.b + sign * Math.pow(disc, 0.5)) / (2 * this.a);
  }
}