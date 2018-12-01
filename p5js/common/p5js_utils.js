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

  static drawSolidBoundary(fromX, fromY, toX, toY){
    line(fromX, fromY, toX, toY);

    push();
    translate(fromX, fromY);
    if (fromY != toY){
      // rotate ... but currently assumes a horizontal line
    }

    const dashWidth = 20;
    const numDashes = Math.floor((toX - fromX) / dashWidth);
    let curX = 0;
    let curY = 0 + dashWidth;
    for (var i = 0; i<numDashes; i++){
      line (curX, curY, curX + dashWidth, 0);
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
}
