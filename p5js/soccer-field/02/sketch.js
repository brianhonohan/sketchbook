const marginPx = 20;
let fieldLengthPx;
let fieldWidthPx;
let fieldMinX;
let fieldMinY;
let fieldMaxX;
let fieldMaxY;
let fieldMidX;
let fieldMidY;

function setup() {
  createCanvas(600, 400);
  drawField();
}

function drawField() {
  background(220);

  fieldWidthPx = height - 2 * marginPx;
  fieldLengthPx = width - 2 * marginPx;
  fieldMinX = marginPx;
  fieldMinY = marginPx;
  fieldMaxX = fieldMinX + fieldLengthPx;
  fieldMaxY = fieldMinY + fieldWidthPx;
  fieldMidX = fieldMinX + 0.5 * fieldLengthPx;
  fieldMidY = fieldMinY + 0.5 * fieldWidthPx;
  drawGrassField();
  // rollTheField();
  lineTheField();
  drawGoals();
}

function drawGrassField() {
  fill(150, 210, 150);
  noStroke();
  rect(fieldMinX, fieldMinY, fieldLengthPx, fieldWidthPx);
}

function rollTheField(){
  fill(120, 180, 120);
  noStroke();
  
  rect(55, 20, 30, 360);
  rect(116, 20, 30, 360);
  rect(177, 20, 30, 360);
  rect(237, 20, 30, 360);
  rect(300, 20, 30, 360);
  rect(363, 20, 30, 360);
  rect(424, 20, 30, 360);
  rect(486, 20, 30, 360);
  rect(550, 20, 30, 360);
}

function lineTheField(){
  stroke(255, 255, 255);  // white
  noFill();    // don't fill the shapes we are about to draw
  
  // draw the out-of-bounds line.
  rect(fieldMinX, fieldMinY, fieldLengthPx, fieldWidthPx);
  
  // draw midfield line
  line(fieldMidX, fieldMinY, fieldMidX, fieldMaxY);
  
  // draw a circle at midfield
  ellipse(fieldMidX, fieldMidY, 100, 100);
  
  // draw the kickoff marker, as a solid circle (so turn on the fill)
  fill(255, 255, 255);
  ellipse(fieldMidX, fieldMidY, 3, 3);
  noFill();
  
  // draw the two penalty boxes
  rect(fieldMinX, fieldMidY - 220/2, 94, 220);
  rect(fieldMaxX - 94, fieldMidY - 220/2, 94, 220);
  
  // draw the two inner goalie boxes
  rect(fieldMinX, fieldMidY - 105/2, 32, 105);
  rect(fieldMaxX - 32, fieldMidY - 105/2, 32, 105);
  
  // draw penalty-hash
  line(fieldMinX + 62, fieldMidY - 2, fieldMinX + 62, fieldMidY + 2);
  line(fieldMaxX - 62, fieldMidY - 2, fieldMaxX - 62, fieldMidY + 2);
  
  // draw the two penalty arcs
  arc(fieldMinX + 62, fieldMidY, 100, 100, -.88, .88);
  arc(fieldMaxX - 62, fieldMidY, 100, 100, PI - 0.88, PI + 0.88);
  
  // draw the corner-kick arcs
  arc(fieldMinX, fieldMinY, 15, 15, 0, PI / 2);
  arc(fieldMinX, fieldMaxY, 15, 15, 1.5 * PI, 0);
  arc(fieldMaxX, fieldMinY, 15, 15, PI / 2, PI);
  arc(fieldMaxX, fieldMaxY, 15, 15, PI, 1.5 * PI);
  
  // draw 10-yard markers
  let tenYards = 57;
  
  // first along the sidelines
  line(fieldMinX + tenYards, fieldMinY - 5, fieldMinX + tenYards, fieldMinY);
  line(fieldMaxX - tenYards, fieldMinY - 5, fieldMaxX - tenYards, fieldMinY);
  line(fieldMinX + tenYards, fieldMaxY, fieldMinX + tenYards, fieldMaxY + 5);
  line(fieldMaxX - tenYards, fieldMaxY, fieldMaxX - tenYards, fieldMaxY + 5);
  
  // along the goal-lines
  line(fieldMinX - 5, fieldMinY + tenYards, fieldMinX, fieldMinY + tenYards);
  line(fieldMaxX, fieldMinY + tenYards, fieldMaxX + 5, fieldMinY + tenYards);
  line(fieldMinX - 5, fieldMaxY - tenYards, fieldMinX, fieldMaxY - tenYards);
  line(fieldMaxX, fieldMaxY - tenYards, fieldMaxX + 5, fieldMaxY - tenYards);
}

function drawGoals(){
  stroke(255, 255, 255);
  noFill();
  
  rect(fieldMinX - 15, (fieldMidY - 21), 15, 42);
  rect(fieldMaxX, (fieldMidY - 21), 15, 42);
}