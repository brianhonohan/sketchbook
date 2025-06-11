class Doorway {
  constructor(x, y, publicSpace, colorValue) {
    this.x = x;
    this.y = y;
    this.radius = 10; // Radius for interaction
    this.publicSpace = publicSpace; // Reference to the public space
    this.color = colorValue;
  }

  tick(){

  }

  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }
}