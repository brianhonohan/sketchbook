function setup() {
  createCanvas(600, 400);
  drawField();
}

function drawField() {
  background(220);

  drawGrassField();
  // rollTheField();
  lineTheField();
  drawGoals();
}

function drawGrassField() {
  fill(150, 210, 150);
  noStroke();
  rect(20, 20, 560, 360);
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
  rect(20, 20, 560, 360);
  
  // draw midfield line
  line(300, 20, 300, 380);
  
  // draw a circle at midfield
  ellipse(300, 200, 100, 100);
  
  // draw the kickoff marker, as a solid circle (so turn on the fill)
  fill(255, 255, 255);
  ellipse(300, 200, 3, 3);
  noFill();
  
  // draw the two penalty boxes
  rect(20, (height /2) - 220/2, 94, 220);
  rect(width - 20 - 94, (height /2) - 220/2, 94, 220);
  
  // draw the two inner goalie boxes
  rect(20, (height / 2) - 105/2, 32, 105);
  rect(width - 20 - 32, (height / 2) - 105/2, 32, 105);
  
  // draw penalty-hash
  line(20 + 62, 198, 20 + 62, 202);
  line(width - 20 - 62, 198, width - 20 - 62, 202);
  
  // draw the two penalty arcs
  arc(20 + 62, 200, 100, 100, -.88, .88);
  arc(width - 20 - 62, 200, 100, 100, PI - 0.88, PI + 0.88);
  
  // draw the corner-kick arcs
  arc(20, 20, 15, 15, 0, PI / 2);
  arc(20, height - 20, 15, 15, 1.5 * PI, 0);
  arc(width - 20, 20, 15, 15, PI / 2, PI);
  arc(width - 20, height - 20, 15, 15, PI, 1.5 * PI);
  
  // draw 10-yard markers
  let tenYards = 57;
  
  // first along the sidelines
  line(20 + tenYards, 15, 20 + tenYards, 20);
  line(width - 20 - tenYards, 15, width - 20 - tenYards, 20);
  line(20 + tenYards, height - 20, 
       20 + tenYards, height - 20 + 5);
  line(width - 20 - tenYards, height - 20,
       width - 20 - tenYards, height - 20 + 5);
  
  // along the goal-lines
  line(15, 20 + tenYards, 20, 20 + tenYards);
  line(width - 20, 20 + tenYards,
       width - 20 + 5, 20 + tenYards);
  
  line(15, height - 20 - tenYards, 20,
       height - 20 - tenYards);
  line(width - 20, height - 20 - tenYards,
       width - 20 + 5, height - 20 - tenYards);
}

function drawGoals(){
  stroke(255, 255, 255);
  noFill();
  
  rect(5, (height/2 - 21), 15, 42);
  rect(width - 20, (height/2 - 21), 15, 42);
}