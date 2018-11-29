var headings;
var drawMode;

function setup(){
  createCanvas(windowWidth, windowHeight);

  headings = [
      0
    , 0.01
    , 0.25
    , 0.49
    , 0.5
    , 0.51
    , 0.75
    , 0.99
    , 1
    , 1.01
    , 1.25
    , 1.49
    , 1.5
    , 1.51
    , 1.75
    , 1.99
  ];

  drawMode = 'DRAW_VECTORS';
  drawTableOfVectors();
}

function drawTableOfVectors(){
  background(50);

  let margin = 0.05;
  let startX = floor(margin * width);
  let startY = floor(margin * height);
  let usableX = (1 - 2 * margin) * width;
  let usableY = (1 - 2 * margin) * height;

  let colWidth  = usableX / (headings.length + 1);
  let rowHeight = usableY / (headings.length + 1);
  let vectorLength = floor( min(colWidth, rowHeight) / 2.5 );

  fill(240);
  // textAlign(CENTER);
  for (var i = 0; i < headings.length; i++) {
    if (i == 0) {
      // draw left-labels
      for (var k = 0; k < headings.length; k++) {
        let rowLabel = headings[k];
        text(rowLabel, startX, startY + (1 + k) * rowHeight);
      }
    }

    const firstHeading = headings[i];

    for (var j = 0; j < headings.length; j++) {
      if (i == 0 && j == 0) {
        // draw header row
        for (var k = 0; k < headings.length; k++) {
          let rowLabel = headings[k];
          let x = floor( startX + (1 + k) * colWidth );
          text(rowLabel, x, startY);
        }
      }

      const secondHeading = headings[j];

      push();
      let xMid = startX + (1.25 + i) * colWidth;
      let yMid = startY + (1 + j) * rowHeight;
      translate(xMid, yMid);
      drawHeadings(firstHeading, secondHeading, 7, colWidth, rowHeight);
      pop();
    }
  }
}

function drawHeadings(h1, h2, len, cellWidth, cellHeight){
  let v1 = createVector(len, 0);
  v1.rotate(h1 * PI);

  let v2 =  createVector(len, 0);
  v2.rotate(h2 * PI);

  if (drawMode == 'DENOTE_ROTATION') {
    drawRotation(v1, v2, cellWidth, cellHeight);
  } else {
    drawTwoVectors(v1, v2, len);
  }
}

function drawTwoVectors(v1, v2, len){
  stroke(100, 100, 240);
  line(0, 0, v1.x, v1.y);

  stroke(240, 100, 100);
  line(v1.x, v1.y, v1.x + v2.x, v1.y + v2.y);
}

function drawRotation(v1, v2, cellWidth, cellHeight){
  let rotation = rotationBetweenVectors(v1, v2);

  let color1 = color(240, 100, 100);
  let neutral = color(240);
  let color2 = color(100, 100, 240);

  if (rotation < 0){
    signedColor = color1;
  }else{
    signedColor = color2;
  }

  let mappedRotation = map(abs(rotation), 0, PI, 0, 1);
  let rotColor = lerpColor(neutral, signedColor, mappedRotation);

  noStroke();
  fill(rotColor);
  rectMode(CENTER);
  rect(0, 0, cellWidth, cellHeight);
}

function rotationBetweenVectors(v1, v2){
  let h1 = v1.heading();
  let h2 = v2.heading();

  let h1Mapped = mapHeadingToZeroToTwoPI(h1);
  let h2Mapped = mapHeadingToZeroToTwoPI(h2);

  if (h1Mapped > (3 * HALF_PI) && h2Mapped < HALF_PI){
    h2Mapped += TWO_PI;
  } else if (h2Mapped > (3 * HALF_PI) && h1Mapped < HALF_PI){
    h1Mapped += TWO_PI;
  }
  return h2Mapped - h1Mapped;;
}

function mapHeadingToZeroToTwoPI(heading){
  return (heading >= 0) ? heading : (TWO_PI + heading);
}

function keyTyped(){
  if (key == 'r') {
    drawMode = 'DENOTE_ROTATION';
    drawTableOfVectors();
  } else if (key == 'v') {
    drawMode = 'DRAW_VECTORS';
    drawTableOfVectors();
  }
}
