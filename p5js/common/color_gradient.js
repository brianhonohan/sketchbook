class ColorGradient {
  constructor(gradient){
    this.gradient = gradient || ColorGradient.getDefault();
  }

  setGradient(gradient){
    this.gradient = gradient;
  }

  static getDefault() {
    return [
        { max: -1.000, clr: color(0, 20, 80) }
      , { max: -0.050, clr: color(20, 130, 190) }
      , { max:  0.000, clr: color(20, 100, 40) }
      , { max:  0.600, clr: color(180, 190,120) }
      , { max:  0.650, clr: color(50, 50, 50 ) }
      , { max:  1.000, clr: color(255, 255, 255) }
      ];
  }

  getColorAt(value){
    for (var i = 0; i < this.gradient.length; i++){
      let gradientPt = this.gradient[i];
      if (value > gradientPt.max) {
        continue;
      }
      
      if (i == 0) {
        return gradientPt.clr;
      } else {
        let prevGradPt = this.gradient[i-1];
        let diff = (value - prevGradPt.max) / (gradientPt.max - prevGradPt.max);
        return lerpColor(gradientPt.clr, prevGradPt.clr, diff);
      }
    }
    return this.gradient[ this.gradient.length - 1].clr;
  }
}
