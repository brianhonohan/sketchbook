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
    return P5JsUtils.colorAtInPixels(x, y, width, pixels);
  }

  static colorAtInPixels(x, y, width, pixels){
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
    if (redFactor == undefined) { redFactor = random(); }
    if (greenFactor == undefined) { greenFactor = random(); }
    if (blueFactor == undefined) { blueFactor = random(); }

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

  // Intent is to return a p5.Image from the 'file' input of
  // the canvas.drop(...) callback.
  static p5ImageFromFile(file){
    // async call, should have callback
    const img = createImg(file.data).hide();
    const gBuffer = createGraphics(img.width, img.height);

    gBuffer.image(img, 0, 0, img.width, img.height);
    gBuffer.loadPixels();

    const resultImage = createImage(img.width, img.height);
    resultImage.loadPixels();
    gBuffer.pixels.forEach((val, idx) => {
      resultImage.pixels[idx] = gBuffer.pixels[idx];
    });
    resultImage.updatePixels();
    return resultImage;
  }

  // Primary approach of temp canvas and copying over from:
  //   https://stackoverflow.com/a/32257161
  static saveCanvasArea(p5Canvas, rectArea){
    let fromCanvas = document.getElementById(p5Canvas.id());
    let tmpCanvas = document.createElement("canvas");

    tmpCanvas.style.display = 'none';
    document.body.appendChild(tmpCanvas);
    tmpCanvas.width = rectArea.width;
    tmpCanvas.height = rectArea.height;

    var tmpCtx = tmpCanvas.getContext('2d');
    tmpCtx.drawImage(
        fromCanvas, 
        rectArea.x, rectArea.y, rectArea.width, rectArea.height,
        0,0, tmpCanvas.width, tmpCanvas.height
    );

    let filename  = "screenshot-partial";
    let extension = 'png';
    let mimeType  = 'image/png';

    // following block from: p5js.saveCanvas
    // https://github.com/processing/p5.js/blob/da8abf57c79a99736e3c6ccb8146abc115f3d84a/src/image/image.js#L190-L192
    tmpCanvas.toBlob(function(blob) {
      p5.prototype.downloadFile(blob, filename, extension);
    }, mimeType);

    tmpCanvas.parentNode.removeChild(tmpCanvas);
  }

  static applyStyleSet(styleSet, buffer = undefined){
    if (buffer) {
      if (styleSet.fillColor) { buffer.fill(styleSet.fillColor); }
      if (styleSet.noFill) { buffer.noFill(); }
      if (styleSet.strokeColor) { buffer.stroke(styleSet.strokeColor); }
      if (styleSet.noStroke) { buffer.noStroke(); }
      if (styleSet.strokeWeight) { buffer.strokeWeight(styleSet.strokeWeight); }

    } else {
      if (styleSet.fillColor) { fill(styleSet.fillColor); }
      if (styleSet.noFill) { noFill(); }
      if (styleSet.strokeColor) { stroke(styleSet.strokeColor); }
      if (styleSet.noStroke) { noStroke(); }
      if (styleSet.strokeWeight) { strokeWeight(styleSet.strokeWeight); }
    }
  }
}
