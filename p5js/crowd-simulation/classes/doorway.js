class Doorway {
  constructor(x, y, publicSpace, colorValue) {
    this.position = createVector(x, y);
    this.radius = 10; // Radius for interaction
    this.publicSpace = publicSpace; // Reference to the public space
    this.color = colorValue;

    // slightly hacky; build object to support GUI color controls
    this.rgbColor = {r: colorValue.levels[0], g: colorValue.levels[1], b: colorValue.levels[2]};
    this.spawnMatrix = undefined;
  }

  get x(){ return this.position.x; }
  get y(){ return this.position.y; }

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
    let nearbyCrowdMembers = this.publicSpace.crowdWithin(this.x, this.y, 10);
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
    ellipse(this.x, this.y, this.radius * 2);
  }
}