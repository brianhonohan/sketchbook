class HockeyRinkViewer {
  color _red;
  color _blue;
  color _ice;
  color _crease;
  float _x;
  float _y;
  float _scale;
  boolean _useRoundedCorners;

  // support local coordinate system
  PVector mousePos;

  HockeyRinkViewer() {
    _x = 0;
    _y = 0;
    mousePos = new PVector();
    _scale = 0;
    _useRoundedCorners = false;
    initColors();
  }

  void update() {
    this.mousePos.x = mouseX - this._x;
    this.mousePos.y = mouseY - this._y;
  }

  PVector mousePosInRink() {
    return new PVector(this.mousePos.x / this._scale, this.mousePos.y / this._scale);
  }

  void initColors() {
    _red = color(210, 50, 50);
    _blue = color(50, 50, 180);
    _ice = color(255);
    _crease = color(158, 210, 243);
  }

  void drawRink(HockeyRink rink) {
    strokeCap(SQUARE);
    drawIce();
    drawGoalCreases();
    drawGoaLines();
    drawBlueLines();
    drawRefereeCrease();
    drawCenterCircle();
    drawCenterLine();
    drawCenterDot();
    drawNeutralZoneDots();
    drawEndZoneDots();
    drawGoalieTrapZones();

    //debugOpenAreas();
  }

  void drawIce() {
    fill(_ice);
    noStroke();
    // Can't use rounded rect, because it doesn't draw true-circular corners
    if (_useRoundedCorners) {
      rect(0.0, 0.0, 
        scaleValue(rink._length), scaleValue(rink._width), 
        scaleValue(rink._cornerRadius));
    } else {
      pushMatrix();
      scale(_scale);
      rect(rink._cornerRadius, 0, rink._length - 2 * rink._cornerRadius, rink._width);
      rect(0, rink._cornerRadius, rink._length, rink._width - 2 * rink._cornerRadius);
      ellipse(rink._cornerRadius, rink._cornerRadius, rink._cornerRadius*2, rink._cornerRadius*2);
      ellipse(rink._cornerRadius, rink._width - rink._cornerRadius, rink._cornerRadius*2, rink._cornerRadius*2);
      ellipse(rink._length - rink._cornerRadius, rink._cornerRadius, rink._cornerRadius*2, rink._cornerRadius*2);
      ellipse(rink._length - rink._cornerRadius, rink._width - rink._cornerRadius, rink._cornerRadius*2, rink._cornerRadius*2);
      popMatrix();
    }
  }

  void drawGoaLines() {
    stroke(_red);
    strokeWeight(max(0.5, scaleValue(rink._minorLineWidth)));

    float calculatedlengthOutsideArc = lengthOutsideArc(rink._cornerRadius, rink._goalLineAt);
    drawScaledLine(rink._goalLineAt, calculatedlengthOutsideArc, rink._goalLineAt, rink._width - calculatedlengthOutsideArc);
    drawScaledLine(rink._length - rink._goalLineAt, calculatedlengthOutsideArc, rink._length - rink._goalLineAt, rink._width - calculatedlengthOutsideArc);
    // calculatedlengthOutsideArc
    //    drawLineAt(rink._goalLineAt);
    //    drawLineAt(rink._length - rink._goalLineAt);
  }

  void drawBlueLines() {
    stroke(_blue);
    strokeWeight(max(1, scaleValue(rink._majorLineWidth)));
    drawLineAt(rink._blueLineAt);
    drawLineAt(rink._length - rink._blueLineAt);
  }

  void drawCenterCircle() {
    noFill();
    stroke(_blue);
    strokeWeight(max(0.5, scaleValue(rink._minorLineWidth)));
    ellipse(scaleValue( (rink._length - rink._majorLineWidth)/ 2.0 ), scaleValue(rink._width/2), 
      scaleValue(rink._faceoffCircleRadius*2), scaleValue(rink._faceoffCircleRadius*2) );
  }

  void drawRefereeCrease() {
    noFill();
    stroke(_red);
    strokeWeight(max(0.5, scaleValue(rink._minorLineWidth)));

    arc(scaleValue(rink._length/2-rink._majorLineWidth/2), scaleValue(rink._width), 
      scaleValue(rink._refCreaseRadius*2), scaleValue(rink._refCreaseRadius * 2), 
      PI, TWO_PI);
  }

  void drawCenterLine() {
    stroke(_red);
    float centerEdgeAt = (rink._length - rink._majorLineWidth)/ 2.0;
    strokeWeight(max(1, scaleValue(rink._majorLineWidth)));
    drawLineAt(rink._length/2 - rink._majorLineWidth/2);

    // Start at center ice and go to the boards
    stroke(_ice);

    scaleDashedLine( centerEdgeAt, rink._width / 2, 
      centerEdgeAt, 0, 
      rink._dashLength);
    scaleDashedLine( centerEdgeAt, rink._width / 2, 
      centerEdgeAt, rink._width, 
      rink._dashLength);


    strokeWeight(0.5);
    stroke(_red);
    drawLineAt(centerEdgeAt - rink._majorLineWidth / 2.0);
    drawLineAt(centerEdgeAt + rink._majorLineWidth / 2.0);
  }

  void drawCenterDot() {
    fill(_blue);
    stroke(_blue);
    strokeWeight(1);
    ellipseMode(CENTER);
    ellipse( scaleValue(rink._length/2 - rink._majorLineWidth/2), 
      scaleValue(rink._width/2), 
      scaleValue(rink._majorLineWidth), 
      scaleValue(rink._majorLineWidth));
  }

  void drawNeutralZoneDots() {
    float dotX;
    float dotY;

    // Left Dots... 
    dotX = rink._blueLineAt + rink._neutralZoneDotsToBlueLine;

    dotY = (rink._width / 2) - rink._faceoffDotFromLongAxis;
    drawFaceoffDotAt(dotX, dotY);

    dotY = (rink._width / 2) + rink._faceoffDotFromLongAxis;
    drawFaceoffDotAt(dotX, dotY);

    // Right Dots
    dotX = rink._length - rink._blueLineAt - rink._neutralZoneDotsToBlueLine;

    dotY = (rink._width / 2) - rink._faceoffDotFromLongAxis;
    drawFaceoffDotAt(dotX, dotY);

    dotY = (rink._width / 2) + rink._faceoffDotFromLongAxis;
    drawFaceoffDotAt(dotX, dotY);
  }

  void drawEndZoneDots() {
    float dotX;
    float dotY;

    // Left Dots... 
    dotX = rink._goalLineAt + rink._endZoneDotsToGoalLine;

    dotY = (rink._width / 2) - rink._faceoffDotFromLongAxis;
    drawEndZoneFaceoff(dotX, dotY);

    dotY = (rink._width / 2) + rink._faceoffDotFromLongAxis;
    drawEndZoneFaceoff(dotX, dotY);

    // Right Dots
    dotX = rink._length - rink._goalLineAt - rink._endZoneDotsToGoalLine;

    dotY = (rink._width / 2) - rink._faceoffDotFromLongAxis;
    drawEndZoneFaceoff(dotX, dotY);

    dotY = (rink._width / 2) + rink._faceoffDotFromLongAxis;
    drawEndZoneFaceoff(dotX, dotY);
  }

  void drawEndZoneFaceoff(float unscaledX, float unscaledY) {
    drawFaceoffDotAt(unscaledX, unscaledY);
    drawEndZoneCircleAt(unscaledX, unscaledY);
    drawFaceoffConfig(unscaledX, unscaledY);
  }

  // Basically a tic-tac-toe board around the face-off dot
  // http://cdn.nhl.com/nhlhq/cba/images/faceoff600.gif
  void drawFaceoffConfig(float unscaledX, float unscaledY) {
    noFill();
    stroke(_red);

    float _longitudinalDash = 4;
    float _latitudinalDash = 3;
    float _longitudinalGap = 4;
    float _latitudinalGap = 1 + 10.0 /12;

    pushMatrix();
    scale(_scale);
    strokeJoin(MITER);
    strokeWeight(max(0.5, scaleValue(rink._minorLineWidth))/_scale);

    float x1 = unscaledX - _longitudinalGap/2 - _longitudinalDash;
    float x2 = unscaledX - _longitudinalGap/2;
    float x3 = unscaledX + _longitudinalGap/2;
    float x4 = unscaledX + _longitudinalGap/2 + _longitudinalDash;

    float y1 = unscaledY - _latitudinalGap/2 - _latitudinalDash;
    float y2 = unscaledY - _latitudinalGap/2;
    float y3 = unscaledY + _latitudinalGap/2;
    float y4 = unscaledY + _latitudinalGap/2 + _latitudinalDash;

    // draw the longitudinal lines
    line(x1, y2, x2, y2);
    line(x3, y2, x4, y2);
    line(x1, y3, x2, y3);
    line(x3, y3, x4, y3);

    // draw the latitudinal lines
    line(x2, y1, x2, y2);
    line(x3, y1, x3, y2);
    line(x2, y3, x2, y4);
    line(x3, y3, x3, y4);

    popMatrix();
  }

  void drawEndZoneCircleAt(float unscaledX, float unscaledY) {
    noFill();
    stroke(_red);
    strokeWeight(max(0.5, scaleValue(rink._minorLineWidth)));
    ellipse(scaleValue(unscaledX), scaleValue(unscaledY), 
      scaleValue(rink._faceoffCircleRadius*2), scaleValue(rink._faceoffCircleRadius*2) );
  }

  void drawGoalieTrapZones() {
    stroke(_red);
    strokeWeight(max(0.5, scaleValue(rink._minorLineWidth)));
    float xStart = rink._goalLineAt;
    float yStart = rink._width / 2 - rink._goalTrapShortEnd / 2;
    float xEnd = 0;
    float yEnd = rink._width / 2 - rink._goalTrapLongEnd / 2;

    drawScaledLine(xStart, yStart, xEnd, yEnd);

    yStart = rink._width / 2 + rink._goalTrapShortEnd / 2;
    yEnd = rink._width / 2 + rink._goalTrapLongEnd / 2;

    drawScaledLine(xStart, yStart, xEnd, yEnd);

    xStart = rink._length - rink._goalLineAt;
    xEnd = rink._length;
    drawScaledLine(xStart, yStart, xEnd, yEnd);


    yStart = rink._width / 2 - rink._goalTrapShortEnd / 2;
    yEnd = rink._width / 2 - rink._goalTrapLongEnd / 2;
    drawScaledLine(xStart, yStart, xEnd, yEnd);
  }

  void drawGoalCreases() {
    drawGoalCrease();

    pushMatrix();
    // Spin around and draw the other one.
    translate( scaleValue(rink._length), scaleValue(rink._width));
    rotate(PI);
    drawGoalCrease();
    popMatrix();
  }

  void drawGoalCrease() {
    stroke(_red);
    strokeWeight(max(0.5, scaleValue(rink._minorLineWidth)));

    fill(_crease);
    float creaseArcX = rink._goalLineAt + rink._creaseLength;
    float creaseArcY = rink._width / 2;

    // _creaseSemiArcDepth
    arc( scaleValue(creaseArcX), scaleValue(creaseArcY), 
      scaleValue(rink._creaseSemiArcDepth * 2), scaleValue(rink._creaseWidth), 
      1.5 * PI, TWO_PI);
    arc( scaleValue(creaseArcX), scaleValue(creaseArcY), 
      scaleValue(rink._creaseSemiArcDepth * 2), scaleValue(rink._creaseWidth), 
      0, HALF_PI);

    float topLeftX = rink._goalLineAt;
    float topLeftY = rink._width / 2 - rink._creaseWidth/2;

    noStroke();
    rect( scaleValue(topLeftX), scaleValue(topLeftY), 
      scaleValue(rink._creaseLength), scaleValue(rink._creaseWidth));

    stroke(_red);
    line(scaleValue(topLeftX), scaleValue(topLeftY), 
      scaleValue(topLeftX+rink._creaseLength), scaleValue(topLeftY));
    line(scaleValue(topLeftX), scaleValue(topLeftY + rink._creaseWidth), 
      scaleValue(topLeftX+rink._creaseLength), scaleValue(topLeftY + rink._creaseWidth));
  }

  void drawFaceoffDotAt(float unscaledX, float unscaledY) {
    fill(_red);
    noStroke();
    ellipseMode(CENTER);
    ellipse(scaleValue(unscaledX), scaleValue(unscaledY), 
      scaleValue(rink._faceoffDotDiameter), scaleValue(rink._faceoffDotDiameter));
  }

  void scaleDashedLine(float startX, float startY, float stopX, float stopY, float dashLength) {
    drawDashedLine( scaleValue(startX), scaleValue(startY), 
      scaleValue(stopX), scaleValue(stopY), 
      scaleValue(dashLength) );
  }

  // Draws a dashed line ... but may not get all the way to stopping point.
  void drawDashedLine(float startX, float startY, float stopX, float stopY, float dashLength) {
    float lineLength = dist(startX, startY, stopX, stopY);
    float numDashes = lineLength / dashLength;

    float dashStepX = (stopX - startX) / lineLength * dashLength;
    float dashStepY = (stopY - startY) / lineLength * dashLength;
    float currentX = startX;
    float currentY = startY;

    for (int i = 0; i < floor(numDashes); i++) {
      if (i % 2 == 0) {
        line(currentX, currentY, currentX + dashStepX, currentY + dashStepY);
      }
      currentX += dashStepX;
      currentY += dashStepY;
    }
  }

  void drawLineAt(float unscaledDist) {
    drawLineAt(unscaledDist, 0, rink._width);
  }

  void drawLineAt(float unscaledDist, float start, float stop) {
    drawScaledLine(unscaledDist, start, unscaledDist, stop);
  }

  void drawScaledLine(float x1, float y1, float x2, float y2) {
    line(scaleValue(x1), scaleValue(y1), 
      scaleValue(x2), scaleValue(y2));
  }

  float scaleValue(float val) {
    return val * _scale;
  }

  // Unfortunately the math is imprecise for rounded rect
  float lengthOutsideArc(float radius, float chord) {
    if (chord > radius) {
      return 0;
    }
    float adjacentSide = radius - chord;
    float theta = acos(adjacentSide / radius);    
    float oppositeSide = radius * sin(theta);

    if (_useRoundedCorners) {
      // THis fudge factor of 0.6607 works for corner radius of 0.6607
      // ROUNDED RECTS don't use true circular corners
      //    rect(100,100, 200,200, 100);
      //    noFill();
      //    ellipse(200, 200, 200, 200);
      // So we can't calcuate the discrepancy exactly
      return (radius - oppositeSide) * 0.6607;
    } else {
      return radius - oppositeSide;
    }
  }

  void debugOpenAreas() {
    pushMatrix();
    scale(_scale);
    noStroke();
    fill(100, 250, 100, 50);
    rink.mainOpenSpace.draw();

    fill(220, 220, 100, 50);
    rink.westEndOpenSpace.draw();

    fill(220, 220, 100, 50);
    rink.eastEndOpenSpace.draw();
    popMatrix();
  }
}
