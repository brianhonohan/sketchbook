const p5js_utils =
{
  isPaused: false
};

class P5JsUtils {
  static get UP(){    return 0; }
  static get RIGHT(){ return 1; }
  static get DOWN(){  return 2; }
  static get LEFT(){  return 3; }

  static colorAt(x, y, width){
    let baseIdx = (round(x) + round(y) * width) * 4;
    return color(
              pixels[baseIdx + 0],
              pixels[baseIdx + 1],
              pixels[baseIdx + 2],
              pixels[baseIdx + 3]);
  }

  static get mousePoint(){
    return {x: mouseX, y: mouseY};
  }

  static colorsMatch(c1, c2){
    return      c1.levels[0] == c2.levels[0]
             && c1.levels[1] == c2.levels[1]
             && c1.levels[2] == c2.levels[2]
             && alpha(c1) == alpha(c2);
  }


  static get COLOR_ID_RED(){ return 0; }
  static get COLOR_ID_GREEN(){ return 1; }
  static get COLOR_ID_BLUE(){ return 2; }
  static get COLOR_ID_ORANGE(){ return 3; }
  static get COLOR_ID_YELLOW(){ return 4; }
  static get COLOR_ID_VIOLET(){ return 5; }

  static getRandomColorByID(colorId){
    switch(colorId) {
      case P5JsUtils.COLOR_ID_RED:    return P5JsUtils.getRandomRed();
      case P5JsUtils.COLOR_ID_GREEN:  return P5JsUtils.getRandomGreen();
      case P5JsUtils.COLOR_ID_BLUE:   return P5JsUtils.getRandomBlue();
      case P5JsUtils.COLOR_ID_ORANGE: return P5JsUtils.getRandomOrange();
      case P5JsUtils.COLOR_ID_YELLOW: return P5JsUtils.getRandomYellow();
      case P5JsUtils.COLOR_ID_VIOLET: return P5JsUtils.getRandomViolet();
      default: return P5JsUtils.getRandomColor();
    }
  }

  static getRandomRed(){
    return P5JsUtils.getRandomColor(155, 255, 1, 0, 0);
  }
  static getRandomGreen(){
    return P5JsUtils.getRandomColor(155, 255, 0, 1, 0);
  }
  static getRandomBlue(){
    return P5JsUtils.getRandomColor(155, 255, 0, 0, 1);
  }
  static getRandomOrange(){
    return P5JsUtils.getRandomColor(155, 255, 1, 0.5, 0);
  }
  static getRandomYellow(){
    return P5JsUtils.getRandomColor(155, 255, 1, 1, 0);
  }
  static getRandomViolet(){
    return P5JsUtils.getRandomColor(155, 255, 1, 0, 1);
  }

  static getRandomColor(minVal, maxVal, redFactor, greenFactor, blueFactor){
    minVal = minVal || 150;
    maxVal = maxVal || 255;
    redFactor = redFactor || random();
    greenFactor = greenFactor || random();
    blueFactor = blueFactor || random();

    let baseVal = random(minVal, maxVal);
    let secondaryVal = baseVal * (0.1 + random(0, 0.5));

    let redLvl   = baseVal * redFactor + secondaryVal * (1 - redFactor);
    let greenLvl = baseVal * greenFactor + secondaryVal * (1 - greenFactor);
    let blueLvl  = baseVal * blueFactor + secondaryVal * (1 - blueFactor);
    return color(redLvl, greenLvl, blueLvl);
  }

  static toggleLoop(){
    if (p5js_utils.isPaused){
      loop();
      p5js_utils.isPaused = false;
    }else{
      noLoop();
      p5js_utils.isPaused = true;
    }
  }

  static drawSolidBoundary(fromX, fromY, toX, toY, options = {}){
    line(fromX, fromY, toX, toY);
    const dashesAbove = options['dashes_above'] === true;

    push();
    translate(fromX, fromY);
    if (fromY != toY){
      // rotate ... but currently assumes a horizontal line
    }

    const dashWidth = 20;
    const numDashes = Math.floor((toX - fromX) / dashWidth);
    let curX = 0;
    let startY  = dashesAbove ? 0 : dashWidth;
    let endY    = dashesAbove ? - dashWidth : 0;

    for (var i = 0; i<numDashes; i++){
      line (curX, startY, curX + dashWidth, endY);
      curX += dashWidth;
    }
    pop();
  }

  static drawRect(rectObj){
    rect(rectObj.x, rectObj.y, rectObj.width, rectObj.height);
  }

  static rotationBetweenVectors(v1, v2){
    let h1 = v1.heading();
    let h2 = v2.copy().rotate(-h1);
    return h2.heading();
  }

  static drawArrow(from, to){
    line(from.x, from.y, to.x, to.y);

    let segmentVector = createVector(to.x - from.x, to.y - from.y);
    let arrowVector = segmentVector.copy().setMag(8).rotate(0.1 * PI);

    line(to.x, to.y, to.x - arrowVector.x, to.y - arrowVector.y);
  }
}
