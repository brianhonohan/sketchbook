class TrainEngine {
  constructor(path){
    this.path = path;
    this.distTraveled = 0;
    this.speed = 1.5;
    this.shape = new paper.Shape.Circle(this.location(), 10);
    this.shape.fillColor = new paper.Color(1, 0, 0);
  }

  location(){
    return this.path.getPointAt(this.distTraveled % this.path.length);
  }

  tick(event){
    this.distTraveled += this.speed;
    this.shape.position = this.location();
  }
}
