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
