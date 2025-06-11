class Doorway {
  constructor(x, y, publicSpace, colorValue) {
    this.x = x;
    this.y = y;
    this.radius = 10; // Radius for interaction
    this.publicSpace = publicSpace; // Reference to the public space
    this.color = colorValue;
    this.spawnMatrix = undefined;
  }

  tick(){
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

  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }
}