var cells;

function setup(){
  createCanvas(windowWidth, windowHeight-45);

  cells = []
  cells.push(new Cell(width/2, height/2));
}

function draw(){
  background(50);

  for(var i = 0; i < cells.length; i++){
    cells[i].draw();

    if (cells.length < 32) {
      cells[i].tick();
    }
  }

  displayPhase(cells[0]);
}

function displayPhase(cell){
  fill(250);
  noStroke();
  textSize(40);
  textFont('Helvetica');
  let cellState = CellCycle.STATES[cell.state];
  text(cellState.name, 30, 50);
}

class CellCycle {
  static get INTERPHASE()  { return 0; }
  // static get PREPROPHASE() { return 1; } // Only in Plant Cells
  static get PROPHASE()  { return 1; }
  static get PROMETAPHASE()  { return 2; }
  static get METAPHASE()  { return 3; }
  static get ANAPHASE()  { return 4; }
  static get TELOPHASE()  { return 5; }
  static get CYTOKINESIS()  { return 6; } 

  static get STATES(){
    return [
      {id: CellCycle.INTERPHASE, name: 'Interphase', next: CellCycle.PROPHASE},
      {id: CellCycle.PROPHASE, name: 'Prophase', next: CellCycle.PROMETAPHASE},
      {id: CellCycle.PROMETAPHASE, name: 'Prometaphase', next: CellCycle.METAPHASE},
      {id: CellCycle.METAPHASE, name: 'Metaphase', next: CellCycle.ANAPHASE},
      {id: CellCycle.ANAPHASE, name: 'Anaphase', next: CellCycle.TELOPHASE},
      {id: CellCycle.TELOPHASE, name: 'Telophase', next: CellCycle.CYTOKINESIS},
      {id: CellCycle.CYTOKINESIS, name: 'Cytokinesis', next: CellCycle.INTERPHASE}
    ];
  }
}

class Cell {
  constructor(x, y, membrane, nucleus, speed) {
    this.pos = createVector(x, y);
    this.size = 150;

    if (nucleus == undefined) {
      this.nucleus = new Nucleus(this.x, this.y, 50, 1);
    }else{
      this.nucleus = nucleus;
    }
    this.state = CellCycle.INTERPHASE;

    if (membrane == undefined) {
      this.initMembrane();
    }else {
      this.membrane = membrane;
    }

    if (speed == undefined){
      this.speed = null;
    }else {
      this.speed = speed;
    }

    this.lifeCount = 0;
    this.phaseStartedAt = 0;
    this.durationPerCycle = 200;
    this.offsetInCycle = 0;

    this.furrowPointA = null;
    this.furrowPointB = null;

    this.centrosomeA = new Centrosome(this.pos.x + random(1.5 * this.nucleusSize),
                                     this.pos.y + random(1.5 * this.nucleusSize));
    this.centrosomeB = null;
    this.daughterNucleus = null;
    this.axisOfSpindles = null;
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  initMembrane(){
    this.membrane = [];
    const numSegments = 30;
    let thetaStep = TWO_PI / numSegments;
    let tmpSegment;
    let tmpPoint = createVector(0, 0);

    for (var i = 0; i < numSegments; i++){
      tmpPoint.x = this.x + cos(thetaStep*i) * this.size/2;
      tmpPoint.y = this.y + sin(thetaStep*i) * this.size/2; 
      tmpSegment = new CellMembraneSegment(tmpPoint.x, tmpPoint.y);
      this.membrane.push(tmpSegment);
    }
  }

  setMembraneTargets(){
    if (this.speed == undefined){
      return;
    }

    let thetaStep = TWO_PI / this.membrane.length;
    let tmpSegment;
    let firstSegment = this.membrane[0];
    let thetaOffset = p5.Vector.sub(firstSegment.pos, this.pos).heading();

    // anticipated location
    // this will be where the Cell ends up after 1-cycle of movement
    // so add the speed * cycleCount to the current pos
    let restingLoc = p5.Vector.add(this.pos, 
                                p5.Vector.mult(this.speed, this.durationPerCycle));

    for (var i = 0; i < this.membrane.length; i++){
      let tmpPoint = createVector(0, 0);
      tmpPoint.x = restingLoc.x + cos(thetaOffset + thetaStep*i) * this.size/2;
      tmpPoint.y = restingLoc.y + sin(thetaOffset + thetaStep*i) * this.size/2; 
      this.membrane[i].setTarget(tmpPoint);
    }
  }

  tick(){
    this.lifeCount++;
    if (this.lifeCount % this.durationPerCycle == 0){
      this.triggerLifecyle();
    }
    this.offsetInCycle = this.lifeCount - this.phaseStartedAt;

    for (var i = 0; i < this.membrane.length; i++){
      this.membrane[i].tick();
    }

    if (this.speed != null){
      this.pos.add(this.speed);
      for (var i = 0; i < this.membrane.length; i++){
        this.membrane[i].pos.add(this.speed);
      }
      this.nucleus.pos.add(this.speed);
    }

    // This could probably be called based on Cycle Name
    switch (this.state) {
      case CellCycle.INTERPHASE: 
        this.tickInterphase();
        break;
      case CellCycle.PROPHASE:
        this.tickProphase();
        break;
      case CellCycle.PROMETAPHASE:
        this.tickPrometaphase();
        break;
      case CellCycle.METAPHASE:
        this.tickMetaphase();
        break;
      case CellCycle.ANAPHASE:
        this.tickAnaphase();
        break;
      case CellCycle.TELOPHASE:
        this.tickTelophase();
        break;
      case CellCycle.CYTOKINESIS:
        this.tickCytokinesis();
        break;
    }
  }

  draw(){
    fill(160, 180, 250);
    stroke(40,100,120);
    strokeWeight(5);
    beginShape();
    for (var i = 0; i < this.membrane.length; i++){
      vertex(this.membrane[i].x, this.membrane[i].y);
    }
    endShape(CLOSE);

    this.drawNuclei();
  }

  drawNuclei(){
    this.nucleus.draw();
    if (this.daughterNucleus){
      this.daughterNucleus.draw();
    }
  }

  tickInterphase(){ 
    // Do Interphase stuff here

    if (this.offsetInCycle == 2){
      // 2 above is a hack, 
      // hiding a bug that some cells appear to skip the 
      // case when this.offsetInCycle == 0
      this.growMembrane();
      this.setMembraneTargets();
    }

    if ((this.offsetInCycle % this.durationPerCycle) == 50) {
      // Copy the Centrosome during an approximation of the S-Cycle
      // https://en.wikipedia.org/wiki/Centrosome#Functions
      this.centrosomeB = new Centrosome();
    }

    if (this.offsetInCycle == (this.durationPerCycle - 1)){
      this.speed = null;
    }
  }

  growMembrane(){
    if (this.membrane.length >= 30) {
      return;
    }

    // naive approach,
    // ... determine N to add
    // ... then insert a new segment between first existing N segments
    let numSegmentsToAdd = 30 - this.membrane.length;
    for (var i = 0; i < numSegmentsToAdd; i++){
      let idxA = (2*i) % this.membrane.length;
      let idxB = (2*i + 1) % this.membrane.length;
      let tmpSegmentA = this.membrane[idxA];
      let tmpSegmentB = this.membrane[idxB];
      let abMidPoint = p5.Vector.lerp(tmpSegmentA.pos, tmpSegmentB.pos, 0.5);
      
      let tmpSegment = new CellMembraneSegment(abMidPoint.x, abMidPoint.y);
      this.membrane.splice(idxB, 0, tmpSegment);
    }
  }

  tickProphase(){ 
    // Do Prophase stuff here
  }

  tickPrometaphase(){
    // Do Prometaphase stuff here
    this.nucleus.membraneDef = 1 - this.offsetInCycle / this.durationPerCycle;
  }

  tickMetaphase(){
    // Do Metaphase stuff here

    if (this.offsetInCycle == (this.durationPerCycle - 1)){
      // By this point the poles of the cellular divsion should be established
      // and the centrosomes would have moved to these poles
      // ... for now, jump them to these locations

      this.axisOfSpindles = createVector(0.5 * this.size / 2, 0);
      this.axisOfSpindles.rotate(random(0, TWO_PI));
      this.centrosomeA.pos.x = this.x + this.axisOfSpindles.x;
      this.centrosomeA.pos.y = this.y + this.axisOfSpindles.y;
      this.centrosomeB.pos.x = this.x - this.axisOfSpindles.x;
      this.centrosomeB.pos.y = this.y - this.axisOfSpindles.y;
    }

  }

  tickAnaphase(){
    // Do Anaphase stuff here
    this.debugDrawDivisionAxis();
  }

  debugDrawDivisionAxis(){
    // disable for now.
    return;

    stroke(50, 200, 50);
    line(this.x, this.y, this.x + this.axisOfSpindles.x, this.y + this.axisOfSpindles.y);

    stroke(180, 70, 70);
    line(this.x, this.y, this.x - this.axisOfSpindles.x, this.y - this.axisOfSpindles.y);

    let ortho = this.axisOfSpindles.copy();
    ortho.rotate(PI / 2);

    stroke(50, 50, 200);
    line(this.x, this.y, this.x + ortho.x, this.y + ortho.y);
  }

  tickTelophase(){
    // Do Prophase stuff here
    this.debugDrawDivisionAxis();

    if (this.offsetInCycle == 0){
      this.nucleus.size /= 2;
      this.nucleus.pos.x = this.centrosomeA.x;
      this.nucleus.pos.y = this.centrosomeA.y;

      this.daughterNucleus = new Nucleus(this.centrosomeB.x, this.centrosomeB.y, 
                                          this.nucleus.size, 0);
    }
    this.nucleus.membraneDef = this.offsetInCycle / this.durationPerCycle;
    this.daughterNucleus.membraneDef = this.nucleus.membraneDef;
  }

  tickCytokinesis(){
    // Do Prophase stuff here
    this.debugDrawDivisionAxis();

    if (this.offsetInCycle == 0){
      this.firstFurrowIdx = this.findMembraneSegmentOrthogonalToDivsion();
      this.secondFurrowIdx = (this.firstFurrowIdx + floor(this.membrane.length/2)) % this.membrane.length;
      this.furrowPointA = this.membrane[this.firstFurrowIdx];
      this.furrowPointB = this.membrane[this.secondFurrowIdx];
      this.furrowPointA.startCleaving();
      this.furrowPointB.startCleaving();
    }
    let cleavageVectorBtoA = createVector(this.furrowPointA.x - this.furrowPointB.x,
                                      this.furrowPointA.y - this.furrowPointB.y);
    cleavageVectorBtoA.setMag( 0.5 * cleavageVectorBtoA.mag() / this.durationPerCycle );
    this.furrowPointB.pos.x += cleavageVectorBtoA.x;
    this.furrowPointB.pos.y += cleavageVectorBtoA.y;

    this.furrowPointA.pos.x -= cleavageVectorBtoA.x;
    this.furrowPointA.pos.y -= cleavageVectorBtoA.y;

    if (this.offsetInCycle == (this.durationPerCycle - 1)){
      this.furrowPointA.stopCleaving();
      this.furrowPointB.stopCleaving();
      this.furrowPointA = null;
      this.furrowPointB = null;

      let splicedMembrane;
      if (this.firstFurrowIdx < floor(this.membrane.length / 2)){
        splicedMembrane = this.membrane.splice(this.firstFurrowIdx, floor(this.membrane.length/2));
      }else{
        let segmentsToEnd = this.membrane.splice(this.firstFurrowIdx, this.membrane.length - this.firstFurrowIdx);
        let segsFromStartTo2nd = this.membrane.splice(0, this.secondFurrowIdx + 1);
        splicedMembrane = segmentsToEnd.concat(segsFromStartTo2nd);
      }

      this.speed = createVector(this.axisOfSpindles.x, this.axisOfSpindles.y);
      this.speed.normalize();
      this.speed.setMag( 70 / this.durationPerCycle );

      let separationSpeed = p5.Vector.mult(this.speed, -1);
      let newCell = new Cell(this.centrosomeB.x, this.centrosomeB.y, 
                              splicedMembrane, this.daughterNucleus,
                              separationSpeed
                              );
      cells.push(newCell);
      this.daughterNucleus = null;
      this.pos.x = this.nucleus.x;
      this.pos.y = this.nucleus.y;
      console.log("THIS membrane: " + this.membrane.length);
    }
  }

  findMembraneSegmentOrthogonalToDivsion(){
    let orthoToAxis = this.axisOfSpindles.copy();
    orthoToAxis.rotate(PI / 2); 
    let curMinAngleDiff = TWO_PI; // bigger than possible
    let idxOfMinDiff = -1;  // essentially not found.

    let tmpVector;
    let tmpSegment;

    for (var i = 0; i < this.membrane.length; i++){
      tmpSegment = this.membrane[i];
      tmpVector = createVector(tmpSegment.x - this.x, tmpSegment.y - this.y);

      let diff = tmpVector.angleBetween(orthoToAxis);
      if (diff < curMinAngleDiff){
        curMinAngleDiff = diff;
        idxOfMinDiff = i;
      }
    }
    return idxOfMinDiff;
  }

  triggerLifecyle(){
    this.state = CellCycle.STATES[this.state].next;
    console.log("Starting: " + CellCycle.STATES[this.state].name);
    this.phaseStartedAt = this.lifeCount;
  }
}

class Nucleus {
  constructor(x, y, size, membraneDef) {
    this.pos = createVector(x, y);
    this.size = size;
    this.membraneDef = membraneDef;
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  draw(){
    let alpha = 255 * this.membraneDef;
    fill(220, 190, 160, alpha);
    stroke(120,90,50, alpha);
    strokeWeight(5);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class Centrosome {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }
}

class CellMembraneSegment {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.accel = createVector(0, 0);
    this.speed = createVector(0, 0);

    this.cellFluidity = 0.05;
    this.isFurrowPoint = false;

    this.targetPos = undefined;
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  setTarget(target){
    this.targetPos = target;
  }

  clearTarget(){
    this.targetPos = undefined;
  }

  tick(){
    if (this.isFurrowPoint) {
      return;
    }
    if (this.targetPos) {
      let curDistToTarget = this.pos.dist(this.targetPos);

      if (curDistToTarget < 5){
        this.pos.x = this.targetPos.x;
        this.pos.y = this.targetPos.y;
        this.clearTarget();
      }else{
        this.pos = p5.Vector.lerp(this.pos, this.targetPos, 1 / (1.2 * 200));
      }

    }else {
      this.accel.x = this.cellFluidity * (randomGaussian(0, 1)) + (0 - this.speed.x) / 2;
      this.accel.y = this.cellFluidity * (randomGaussian(0, 1)) + (0 - this.speed.y) / 2;
      
      this.speed.x += this.accel.x;
      this.speed.y += this.accel.y;

      this.pos.x += this.speed.x;
      this.pos.y += this.speed.y;
    }
  }

  startCleaving(){
    this.isFurrowPoint = true;
    this.accel.setMag(0);
    this.speed.setMag(0);
  }

  stopCleaving(){
    this.isFurrowPoint = false;
  }
}
