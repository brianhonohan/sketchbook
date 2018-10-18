class HerdMember {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.state = HerdMember.STATE_GRAZING;
  }

  get color(){ return HerdMember.colorForState(this.state); }

  static get STATE_GRAZING() { return 0; }
  static get STATE_AVOIDING_PREDATOR() { return 1; }

  avoidPredator(){
    this.state = HerdMember.STATE_AVOIDING_PREDATOR;
  }

  static colorForState(state) { 
    return ({
      0: color(50, 200, 50),
      1: color(200, 50, 50),
    })[state];
  }

  draw(){
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
  }
}