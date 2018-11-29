var headings;

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
      let xMid = startX + (1 + i) * colWidth;
      let yMid = startY + (1 + j) * rowHeight;
      translate(xMid, yMid);
      drawTwoVectors(firstHeading, secondHeading, 7);
      pop();
    }
  }
}

function drawTwoVectors(h1, h2, len){
  let v1 = createVector(len, 0);
  v1.rotate(h1 * PI);
  stroke(100, 100, 240);
  line(0, 0, v1.x, v1.y);

  let v2 =  createVector(len, 0);
  v2.rotate(h2 * PI);
  stroke(240, 100, 100);
  line(v1.x, v1.y, v1.x + v2.x, v1.y + v2.y);
}