var cells;

function setup(){
  createCanvas(windowWidth, windowHeight-45);

  cells = []
  cells.push(new Cell(width/2, height/2));
}

function draw(){
  background(50);

  for(var i = 0; i < cells.length; i++){
    cells[0].draw();
    cells[0].tick();
  }
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
      {id: CellCycle.METAPHASE, name: 'Prometaphase', next: CellCycle.ANAPHASE},
      {id: CellCycle.ANAPHASE, name: 'Anaphase', next: CellCycle.TELOPHASE},
      {id: CellCycle.TELOPHASE, name: 'Telophase', next: CellCycle.CYTOKINESIS},
      {id: CellCycle.CYTOKINESIS, name: 'Cytokinesis', next: CellCycle.INTERPHASE}
    ];
  }
}

class Cell {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 150;
    this.state = CellCycle.INTERPHASE;
    this.initMembrane();

    this.lifeCount = 0;
    this.phaseStartedAt = 0;
    this.durationPerCycle = 200;
    this.offsetInCycle = 0;

    this.nucleusDefinition = 1;
    this.furrowPointA = null;
    this.furrowPointB = null;
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

  tick(){
    this.lifeCount++;
    if (this.lifeCount % this.durationPerCycle == 0){
      this.triggerLifecyle();
    }
    this.offsetInCycle = this.lifeCount - this.phaseStartedAt;

    for (var i = 0; i < this.membrane.length; i++){
      this.membrane[i].tick();
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

    this.drawNucleus();
  }

  drawNucleus(){
    let alpha = 255 * this.nucleusDefinition;
    fill(220, 190, 160, alpha);
    stroke(120,90,50, alpha);
    strokeWeight(5);
    ellipse(this.x, this.y, 50, 50);
  }

  tickInterphase(){ 
    // Do Interphase stuff here
  }

  tickProphase(){ 
    // Do Prophase stuff here
  }

  tickPrometaphase(){
    // Do Prometaphase stuff here
    this.nucleusDefinition = 1 - this.offsetInCycle / this.durationPerCycle;
  }

  tickMetaphase(){
    // Do Metaphase stuff here
  }

  tickAnaphase(){
    // Do Anaphase stuff here
  }

  tickTelophase(){
    // Do Prophase stuff here
    this.nucleusDefinition = this.offsetInCycle / this.durationPerCycle;
  }

  tickCytokinesis(){
    // Do Prophase stuff here

    if (this.offsetInCycle == 0){
      let firstPoint = floor(random(this.membrane.length));
      let secondPoint = (firstPoint + floor(this.membrane.length/2)) % this.membrane.length;
      this.furrowPointA = this.membrane[firstPoint];
      this.furrowPointB = this.membrane[secondPoint];
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
    }
  }

  triggerLifecyle(){
    this.state = CellCycle.STATES[this.state].next;
    console.log("Starting: " + CellCycle.STATES[this.state].name);
    this.phaseStartedAt = this.lifeCount;
  }
}

class CellMembraneSegment {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.accel = createVector(0, 0);
    this.speed = createVector(0, 0);

    this.cellFluidity = 0.05;
    this.isFurrowPoint = false
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  tick(){
    if (this.isFurrowPoint) {
      return;
    }

    this.accel.x = this.cellFluidity * (randomGaussian(0, 1)) + (0 - this.speed.x) / 2;
    this.accel.y = this.cellFluidity * (randomGaussian(0, 1)) + (0 - this.speed.y) / 2;

    this.speed.x += this.accel.x;
    this.speed.y += this.accel.y;

    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
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
