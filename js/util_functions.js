class UtilFunctions {
    // via: https://stackoverflow.com/a/901144
  static getParameterByName(name, formatter, url = null) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;

    let value = decodeURIComponent(results[2].replace(/\+/g, " "));
    if (formatter) return formatter(value);
    return value;
  }

  // via: https://stackoverflow.com/a/38340730
  static unsetUndefineds(obj) {
    Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key]);
    return obj;
  }

  static dist(x1, y1, x2, y2){
    return Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) );
  }

  static shallowCopy(obj){
    return Object.assign({}, obj);
  }

  static averageOfArray(arr){
    return arr.reduce( (el, tally) => el + tally, 0) / arr.length;
  }

  // via: https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
  static hsbToRGB(hsb){
    let C = hsb.b * hsb.s;
    let X = C * (1 - Math.abs( (hsb.h / 60) % 2 - 1));
    let m = hsb.b - C;

    let rgbPrime;

    if (hsb.h >= 0 && hsb.h < 60) {
      rgbPrime = [C, X, 0];
    } else if (hsb.h >= 60 && hsb.h < 120) {
      rgbPrime = [X, C, 0];
    } else if (hsb.h >= 120 && hsb.h < 180) {
      rgbPrime = [0, C, X];
    } else if (hsb.h >= 180 && hsb.h < 240) {
      rgbPrime = [0, X, C];
    } else if (hsb.h >= 240 && hsb.h < 300) {
      rgbPrime = [X, 0, C];
    } else if (hsb.h >= 300 && hsb.h < 360) {
      rgbPrime = [C, 0, X];
    }

    let rgb = {};
    rgb.r = (rgbPrime[0] + m) * 255;
    rgb.g = (rgbPrime[1] + m) * 255;
    rgb.b = (rgbPrime[2] + m) * 255;
    return rgb;
  }

  // via: https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
  static hsbToRgb2(hsb){
    return {r: UtilFunctions._hsbToRgbHelper(5, hsb),
            g: UtilFunctions._hsbToRgbHelper(3, hsb),
            b: UtilFunctions._hsbToRgbHelper(1, hsb)};
  }

  static _hsbToRgbHelper(n, hsb){
    let k = (n + hsb.h / 60) % 6;
    return hsb.b - hsb.b * hsb.s * Math.max(0, Math.min(k, 4 - k, 1));
  }

  static startPerfTime(){
    this.perfTimings = this.perfTimings || [];
    this.perfStartAt = performance.now();
  }

  static endPerfTime(rollingCount = 10, logEveryNTimes = 5){
    var t1 = performance.now();
    this.perfTimings.push((t1 - this.perfStartAt));

    if (this.perfTimings.length >= rollingCount){
      console.log(`Average run: ${UtilFunctions.averageOfArray(this.perfTimings)}`);
      this.perfTimings.splice(0, logEveryNTimes);
    }
  }

  static ceil(value, increment = 1){
    return Math.ceil(value / increment) * increment;
  }

  static floor(value, increment = 1){
    return Math.floor(value / increment) * increment;
  }

  static round(value, increment = 1){
    return Math.round(value / increment) * increment;
  }

  static clamp(value, min, max){
    return Math.max(min, Math.min(max, value));
  }

  // match p5.js random() parameter options
  // see: https://p5js.org/reference/p5/random/
  // 
  // This class can be monkey-patched in context of p5.js sketch
  // UtilFunctions.random = random;
  // to use the randomSeed() behavior in p5.js for reproducible random results
  // 
  //
  // pass a single number to get a random number between 0 and that number
  // pass two numbers to get a random number between those two numbers
  // pass an array to get a random number from that array
  static random(arg1, arg2){
    if (Array.isArray(arg1)){
      return arg1[Math.floor(Math.random() * arg1.length)];
    }else if (arg2 === undefined){
      return Math.random() * arg1;
    }else{
      return Math.random() * (arg2 - arg1) + arg1;
    }
  }

  // Returns normal distribution centered on mean, with specified standard deviation
  // 
  // match p5.js random() parameter options
  // see: https://p5js.org/reference/p5/randomGaussian/
  // 
  // Standard Normal variate using Box-Muller transform.
  // via: https://stackoverflow.com/a/36481059
  // 
  // This class can be monkey-patched in context of p5.js sketch
  // UtilFunctions.gaussianRandom = randomGaussian;
  // to use the randomSeed() behavior in p5.js for reproducible random results
  static randomGaussian(mean=0, stdev=1) {
      const u = 1 - Math.random(); // Converting [0,1) to (0,1]
      const v = Math.random();
      const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
      // Transform to the desired mean and standard deviation:
      return z * stdev + mean;
  }

  // returns normal distribution with mean of 0.5
  // and guaranteed range of 0 to 1
  // via: https://stackoverflow.com/a/49434653
  static randomGaussianConstrained() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return UtilFunctions.randomGaussianConstrained() // resample between 0 and 1
    return num;
  }
}