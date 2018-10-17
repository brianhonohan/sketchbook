class Herd {
  constructor(){
    this.herdCount = 30;
    this.initHerd();
  }

  initHerd(){
    this.members = Array(this.herdCount).fill()
                    .map((_, i) => new HerdMember(random(width), random(height)) );
  }

  draw(){
    this.members.forEach((m) => m.draw());
  }
}