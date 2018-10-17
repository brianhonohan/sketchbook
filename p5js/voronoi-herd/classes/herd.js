class Herd {
  constructor(params){
    this.params = params;
    this.herdCount = this.params.herd_count;
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