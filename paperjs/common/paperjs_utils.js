class PaperJsUtils {
  static get COLOR_ID_RED(){ return 0; }
  static get COLOR_ID_GREEN(){ return 1; }
  static get COLOR_ID_BLUE(){ return 2; }
  static get COLOR_ID_ORANGE(){ return 3; }
  static get COLOR_ID_YELLOW(){ return 4; }
  static get COLOR_ID_VIOLET(){ return 5; }

  static getRandomColorByID(colorId){
    switch(colorId) {
      case PaperJsUtils.COLOR_ID_RED:    return PaperJsUtils.getRandomRed();
      case PaperJsUtils.COLOR_ID_GREEN:  return PaperJsUtils.getRandomGreen();
      case PaperJsUtils.COLOR_ID_BLUE:   return PaperJsUtils.getRandomBlue();
      case PaperJsUtils.COLOR_ID_ORANGE: return PaperJsUtils.getRandomOrange();
      case PaperJsUtils.COLOR_ID_YELLOW: return PaperJsUtils.getRandomYellow();
      case PaperJsUtils.COLOR_ID_VIOLET: return PaperJsUtils.getRandomViolet();
      default: return PaperJsUtils.getRandomColor();
    }
  }

  static getRandomRed(){
    return PaperJsUtils.getRandomColor(0.5, 1, 1, 0, 0);
  }
  static getRandomGreen(){
    return PaperJsUtils.getRandomColor(0.5, 1, 0, 1, 0);
  }
  static getRandomBlue(){
    return PaperJsUtils.getRandomColor(0.5, 1, 0, 0, 1);
  }
  static getRandomOrange(){
    return PaperJsUtils.getRandomColor(0.5, 1, 1, 0.5, 0);
  }
  static getRandomYellow(){
    return PaperJsUtils.getRandomColor(0.5, 1, 1, 1, 0);
  }
  static getRandomViolet(){
    return PaperJsUtils.getRandomColor(0.5, 1, 1, 0, 1);
  }

  static getRandomColor(minVal, maxVal, redFactor, greenFactor, blueFactor){
    minVal = minVal || 150;
    maxVal = maxVal || 1;
    if (redFactor == undefined) { redFactor = Math.random(); }
    if (greenFactor == undefined) { greenFactor = Math.random(); }
    if (blueFactor == undefined) { blueFactor = Math.random(); }

    let baseVal = Math.random(minVal, maxVal);
    let secondaryVal = baseVal * (0.1 + Math.random(0, 0.5));

    let redLvl   = baseVal * redFactor + secondaryVal * (1 - redFactor);
    let greenLvl = baseVal * greenFactor + secondaryVal * (1 - greenFactor);
    let blueLvl  = baseVal * blueFactor + secondaryVal * (1 - blueFactor);
    return new paper.Color(redLvl, greenLvl, blueLvl);
  }

  static getColorFromHSB(hue, s = 1, b = 1){
    let rgb = UtilFunctions.hsbToRgb2({h: hue, s: s, b: b});
    return new paper.Color(rgb.r, rgb.g, rgb.b);
  }

  static addDragging(shape){
    shape.onMouseDrag = function(event) {
      shape.position.x += event.delta.x;
      shape.position.y += event.delta.y;
    };
  }

  static addOrderControls(shape){
    shape.onClick = function(event){
        if (paper.Key.isDown('f')) {
          if (paper.Key.isDown('shift')){
            shape.bringToFront();
          }else{
            let nextSibling = shape.nextSibling;
            if (shape.nextSibling){
              shape.remove();
              shape.insertAbove(nextSibling);
            }
          }

        } else if (paper.Key.isDown('b')) {
          if (paper.Key.isDown('shift')){
            shape.sendToBack();
          }else{
            let previousSibling = shape.previousSibling;

            if (previousSibling){
              shape.remove();
              shape.insertBelow(previousSibling);
            }
          }
        }
      };
  }
}