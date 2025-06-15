class Doorway {
  constructor(x, y, publicSpace, colorValue, rotation = 0) {
    this.position = createVector(x, y);
    this.openingSize = 50;
    this.publicSpace = publicSpace; // Reference to the public space
    this.color = colorValue;

    // slightly hacky; build object to support GUI color controls
    this.rgbColor = {r: colorValue.levels[0], g: colorValue.levels[1], b: colorValue.levels[2]};
    this.spawnMatrix = undefined;
    this.rotation = rotation;

    this.exitPosition = createVector(this.x + this.width, this.y + this.height);
  }

  static get DEPTH () { return 10; }

  get x(){ return this.position.x; }
  get y(){ return this.position.y; }

  set rotation(newVal){ 
    this._rotation = newVal;
    this.width = Math.cos(newVal) * this.openingSize + Math.sin(newVal) * Doorway.DEPTH;
    this.height = Math.sin(newVal) * this.openingSize + Math.cos(newVal) * Doorway.DEPTH;
  }
  get rotation(){ return this._rotation; }

  tick(){
    this.spawnNewCrowdMembers();
    this.exitCrowdMembers();
  }

  spawnNewCrowdMembers(){
    for (let i = 0; i < this.spawnMatrix.length; i++) {
      let spawnConfig = this.spawnMatrix[i];

      if (frameCount % spawnConfig.frameDelay !== 0){
        continue;
      }

      this.publicSpace.addCrowdMember(
        this.x,
        this.y,
        this,
        spawnConfig.doorway
      );
    }
  }

  exitCrowdMembers() {
    let nearbyCrowdMembers = this.publicSpace.crowdWithin(this.exitPosition.x,
                                                          this.exitPosition.y, 10);
    for (let i = 0; i < nearbyCrowdMembers.length; i++) {
      let crowdMember = nearbyCrowdMembers[i];
      if (crowdMember.startDoorway === this) {
        continue; 
      }
      this.publicSpace.removeCrowdMember(crowdMember);
    }
  }

  draw() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  }
}