class P5JsUtils {
  static colorAt(x, y, width){
    let baseIdx = (round(x) + round(y) * width) * 4;
    return color(
              pixels[baseIdx + 0], 
              pixels[baseIdx + 1],
              pixels[baseIdx + 2],
              pixels[baseIdx + 3]);
  }

  static colorsMatch(c1, c2){
    return      c1.levels[0] == c2.levels[0]
             && c1.levels[1] == c2.levels[1]
             && c1.levels[2] == c2.levels[2]
             && alpha(c1) == alpha(c2);
  }
}