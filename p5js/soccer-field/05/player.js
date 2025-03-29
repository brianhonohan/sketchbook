class Player {
  constructor(team){
    this.team = team;
    this.x = random(0, width);
    this.y = random(0, height);
  }

  draw(){
    ellipse(this.x, this.y, 8, 8);
  }
}