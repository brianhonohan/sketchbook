class Ball {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  draw(){
    fill(255);
    stroke(0);
    ellipse(this.x, this.y, 5, 5);
  }
  
  resetForKickoff(){
        
  }
}