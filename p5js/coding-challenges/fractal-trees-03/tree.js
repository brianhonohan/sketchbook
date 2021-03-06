class Tree {
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.segments = [];
    let firstShoot = new TreeSegment(-PI/2, this);
    let firstRoot = new TreeSegment(PI/2, this);

    this.apicalMeristems = [];
    this.apicalMeristems.push( new ShootApicalMeristem(firstShoot) );
    this.apicalMeristems.push( new RootApicalMeristem(firstRoot) );
  }

  addApicalMeristem(apicalMeristem){
    this.apicalMeristems.push(apicalMeristem);
  }

  addChildSegment(segment){
    this.segments.push(segment);
  }

  receiveAuxin(auxin){
    // do nothing
  }

  tick(){
    this.apicalMeristems.forEach(s => s.tick());
    this.segments.forEach(s => s.tick());
  }

  draw(){
    this.segments.forEach(s => s.draw());
  }
}
