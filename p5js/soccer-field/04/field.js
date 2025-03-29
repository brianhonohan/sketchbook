class Field {
  constructor(x, y, lengthPx, widthPx){
    this.x = x;
    this.y = y;
    this.widthPx = widthPx;
    this.lengthPx = lengthPx;
    this.computeSizes();
  }
  
  setSize(newLength, newWidth){
    this.lengthPx = newLength;
    this.widthPx = newWidth;
  }
  
  computeSizes(){
    this.lengthInYards = 115.0;
    this.pxPerYard = this.lengthPx / this.lengthInYards;
    this.widthInYards = this.widthPx / this.pxPerYard;

    this.minX = this.x;
    this.minY = this.y;
    this.maxX = this.minX + this.lengthPx;
    this.maxY = this.minY + this.widthPx;
    this.midX = this.minX + 0.5 * this.lengthPx;
    this.midY = this.minY + 0.5 * this.widthPx;
  }
  
  draw() {
    this.drawGrassField();
    // rollTheField();
    this.lineTheField();
    this.drawGoals();
  }

  drawGrassField() {
    fill(150, 210, 150);
    noStroke();
    rect(this.minX, this.minY, this.lengthPx, this.widthPx);
  }

  rollTheField(){
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

  lineTheField(){
    stroke(255, 255, 255);  // white
    noFill();    // don't fill the shapes we are about to draw

    // draw the out-of-bounds line.
    rect(this.minX, this.minY, this.lengthPx, this.widthPx);     

    // draw midfield line
    line(this.midX, this.minY, this.midX, this.maxY);    

    // draw a circle at midfield
    const circleDiameter = 2 * (10 * this.pxPerYard);
    ellipse(this.midX, this.midY, circleDiameter, circleDiameter);  

    // draw the kickoff marker, as a solid circle (so turn on the fill)
    fill(255, 255, 255);
    const centerDotDiameter = 0.5 * this.pxPerYard;
    ellipse(this.midX, this.midY, centerDotDiameter, centerDotDiameter);
    noFill();

    // draw the two penalty boxes
    const penBoxWidth = 44 * this.pxPerYard;
    const penBoxLength = 18 * this.pxPerYard;
    rect(this.minX, this.midY - penBoxWidth/2, 
         penBoxLength, penBoxWidth);
    rect(this.maxX - penBoxLength, this.midY - penBoxWidth/2, 
         penBoxLength, penBoxWidth);

    // draw the two inner goalie boxes
    const goalieBoxWidth = 20 * this.pxPerYard;
    const goalieBoxLength = 6 * this.pxPerYard;
    rect(this.minX, this.midY - goalieBoxWidth/2,
         goalieBoxLength, goalieBoxWidth);
    rect(this.maxX - goalieBoxLength, this.midY - goalieBoxWidth/2,
         goalieBoxLength, goalieBoxWidth);

    // draw penalty-hash
    const penaltyHash = 12 * this.pxPerYard;
    line(this.minX + penaltyHash, this.midY - 2,
         this.minX + penaltyHash, this.midY + 2);
    line(this.maxX - penaltyHash, this.midY - 2, 
         this.maxX - penaltyHash, this.midY + 2);

    // draw the two penalty arcs
    arc(this.minX + penaltyHash, this.midY, 
        circleDiameter, circleDiameter, -0.88, 0.88);
    arc(this.maxX - penaltyHash, this.midY, 
        circleDiameter, circleDiameter, PI - 0.88, PI + 0.88);

    // draw the corner-kick arcs
    const arcDiameter = 3 * this.pxPerYard;
    arc(this.minX, this.minY, arcDiameter, arcDiameter, 0, PI / 2);
    arc(this.minX, this.maxY, arcDiameter, arcDiameter, 1.5 * PI, 0);
    arc(this.maxX, this.minY, arcDiameter, arcDiameter, PI / 2, PI);
    arc(this.maxX, this.maxY, arcDiameter, arcDiameter, PI, 1.5 * PI);

    // draw 10-yard markers
    const tenYards = 10 * this.pxPerYard;
    const markerWidth = 1 * this.pxPerYard;

    // first along the sidelines
    line(this.minX + tenYards, this.minY - markerWidth,
         this.minX + tenYards, this.minY);
    line(this.maxX - tenYards, this.minY - markerWidth,
         this.maxX - tenYards, this.minY);
    line(this.minX + tenYards, this.maxY,
         this.minX + tenYards, this.maxY + markerWidth);
    line(this.maxX - tenYards, this.maxY,
         this.maxX - tenYards, this.maxY + markerWidth);

    // along the goal-lines
    line(this.minX - markerWidth, this.minY + tenYards,
         this.minX, this.minY + tenYards);
    line(this.maxX, this.minY + tenYards,
         this.maxX + markerWidth, this.minY + tenYards);
    line(this.minX - markerWidth, this.maxY - tenYards,
         this.minX, this.maxY - tenYards);
    line(this.maxX, this.maxY - tenYards,
         this.maxX + markerWidth, this.maxY - tenYards);
  }

  drawGoals(){
    stroke(255, 255, 255);
    noFill();

    const goalWidth = 8 * this.pxPerYard;
    const goalDepth = 3 * this.pxPerYard;
    rect(this.minX - goalDepth, this.midY - goalWidth/2, goalDepth, goalWidth);
    rect(this.maxX, this.midY - goalWidth/2, goalDepth, goalWidth);
  }
}
