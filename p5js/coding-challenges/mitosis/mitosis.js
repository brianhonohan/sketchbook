var cell;

function setup(){
  createCanvas(windowWidth, windowHeight-45);

  cell = new Cell(width/2, height/2);
}

function draw(){
  background(50);

  cell.draw();
  cell.tick();
}

class CellCycle {
  static get INTERPHASE()  { return 0; }
  // static get PREPROPHASE() { return 1; } // Only in Plant Cells
  static get PROPHASE()  { return 1; }
  static get PROMETAPHASE()  { return 2; }
  static get ANAPHASE()  { return 3; }
  static get TELOPHASE()  { return 4; }
  static get CYTOKINESIS()  { return 5; } 

  static get STATES(){
    return [
      {id: CellCycle.INTERPHASE, name: 'Interphase', next: CellCycle.PROPHASE},
      {id: CellCycle.PROPHASE, name: 'Prophase', next: CellCycle.PROMETAPHASE},
      {id: CellCycle.PROMETAPHASE, name: 'Prometaphase', next: CellCycle.ANAPHASE},
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
    this.fluidity = 0.05;
    this.lifeCount = 0;
    this.durationPerCycle = 200;
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

    for (var i = 0; i < this.membrane.length; i++){
      this.membrane[i].tick();
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
    let alpha = 255 * this.nucleusDefinition();
    fill(220, 190, 160, alpha);
    stroke(120,90,50, alpha);
    strokeWeight(5);
    ellipse(this.x, this.y, 50, 50);
  }

  nucleusDefinition(){
    let offsetInCycle = this.lifeCount - this.phaseStartedAt;
    switch (this.state) {
      case CellCycle.INTERPHASE: return 1.0;
      case CellCycle.PROPHASE: return 1.0;
      case CellCycle.PROMETAPHASE: return 1 - offsetInCycle / this.durationPerCycle;
      case CellCycle.ANAPHASE: return 0;
      case CellCycle.TELOPHASE: return offsetInCycle / this.durationPerCycle;
      case CellCycle.CYTOKINESIS: return 1;
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
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  tick(){
    this.accel.x = cell.fluidity * (randomGaussian(0, 1)) + (0 - this.speed.x) / 2;
    this.accel.y = cell.fluidity * (randomGaussian(0, 1)) + (0 - this.speed.y) / 2;

    this.speed.x += this.accel.x;
    this.speed.y += this.accel.y;

    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }
}
