class HerdMember {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  draw(){
    fill(50, 200, 50);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
  }
}