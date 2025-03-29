const marginPx = 20;
let fieldLengthPx;
let fieldWidthPx;
let fieldMinX;
let fieldMinY;
let fieldMaxX;
let fieldMaxY;
let fieldMidX;
let fieldMidY;
let pxPerYard;
let fieldLengthInYards;
let fieldWidthInYards;

function setup() {
  createCanvas(600, 400);
  drawField();
}

function drawField() {
  background(220);

  fieldWidthPx = height - 2 * marginPx;
  fieldLengthPx = width - 2 * marginPx;
  
  fieldLengthInYards = 115.0;
  pxPerYard = fieldLengthPx / fieldLengthInYards;
  fieldWidthInYards = fieldWidthPx / pxPerYard;
  
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
  const circleDiameter = 2 * (10 * pxPerYard);
  ellipse(fieldMidX, fieldMidY, circleDiameter, circleDiameter);  
  
  // draw the kickoff marker, as a solid circle (so turn on the fill)
  fill(255, 255, 255);
  const centerDotDiameter = 0.5 * pxPerYard;
  ellipse(fieldMidX, fieldMidY, centerDotDiameter, centerDotDiameter);
  noFill();
  
  // draw the two penalty boxes
  const penBoxWidth = 44 * pxPerYard;
  const penBoxLength = 18 * pxPerYard;
  rect(fieldMinX, fieldMidY - penBoxWidth/2, 
       penBoxLength, penBoxWidth);
  rect(fieldMaxX - penBoxLength, fieldMidY - penBoxWidth/2, 
       penBoxLength, penBoxWidth);
  
  // draw the two inner goalie boxes
  const goalieBoxWidth = 20 * pxPerYard;
  const goalieBoxLength = 6 * pxPerYard;
  rect(fieldMinX, fieldMidY - goalieBoxWidth/2,
       goalieBoxLength, goalieBoxWidth);
  rect(fieldMaxX - goalieBoxLength, fieldMidY - goalieBoxWidth/2,
       goalieBoxLength, goalieBoxWidth);
  
  // draw penalty-hash
  const penaltyHash = 12 * pxPerYard;
  line(fieldMinX + penaltyHash, fieldMidY - 2,
       fieldMinX + penaltyHash, fieldMidY + 2);
  line(fieldMaxX - penaltyHash, fieldMidY - 2, 
       fieldMaxX - penaltyHash, fieldMidY + 2);
  
  // draw the two penalty arcs
  arc(fieldMinX + penaltyHash, fieldMidY, 
      circleDiameter, circleDiameter, -.88, .88);
  arc(fieldMaxX - penaltyHash, fieldMidY, 
      circleDiameter, circleDiameter, PI - 0.88, PI + 0.88);
  
  // draw the corner-kick arcs
  const arcDiameter = 3 * pxPerYard;
  arc(fieldMinX, fieldMinY, arcDiameter, arcDiameter, 0, PI / 2);
  arc(fieldMinX, fieldMaxY, arcDiameter, arcDiameter, 1.5 * PI, 0);
  arc(fieldMaxX, fieldMinY, arcDiameter, arcDiameter, PI / 2, PI);
  arc(fieldMaxX, fieldMaxY, arcDiameter, arcDiameter, PI, 1.5 * PI);
  
  // draw 10-yard markers
  const tenYards = 10 * pxPerYard;
  const markerWidth = 1 * pxPerYard;
  
  // first along the sidelines
  line(fieldMinX + tenYards, fieldMinY - markerWidth,
       fieldMinX + tenYards, fieldMinY);
  line(fieldMaxX - tenYards, fieldMinY - markerWidth,
       fieldMaxX - tenYards, fieldMinY);
  line(fieldMinX + tenYards, fieldMaxY,
       fieldMinX + tenYards, fieldMaxY + markerWidth);
  line(fieldMaxX - tenYards, fieldMaxY,
       fieldMaxX - tenYards, fieldMaxY + markerWidth);
  
  // along the goal-lines
  line(fieldMinX - markerWidth, fieldMinY + tenYards,
       fieldMinX, fieldMinY + tenYards);
  line(fieldMaxX, fieldMinY + tenYards,
       fieldMaxX + markerWidth, fieldMinY + tenYards);
  line(fieldMinX - markerWidth, fieldMaxY - tenYards,
       fieldMinX, fieldMaxY - tenYards);
  line(fieldMaxX, fieldMaxY - tenYards,
       fieldMaxX + markerWidth, fieldMaxY - tenYards);
}

function drawGoals(){
  stroke(255, 255, 255);
  noFill();
  
  const goalWidth = 8 * pxPerYard;
  const goalDepth = 3 * pxPerYard;
  rect(fieldMinX - goalDepth, fieldMidY - goalWidth/2, goalDepth, goalWidth);
  rect(fieldMaxX, fieldMidY - goalWidth/2, goalDepth, goalWidth);
}