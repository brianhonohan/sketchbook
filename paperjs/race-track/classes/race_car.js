class RaceCar {
  constructor(path){
    this.path = path;
    this.distTraveled = 0;
    this.speed = 4;
    this.shape = new paper.Shape.Circle(this.location(), 10);
    this.shape.fillColor = new paper.Color(0, 0.7, 0);
  }

  location(){
    return this.path.getPointAt(this.distTraveled % this.path.length);
  }

  tick(event){
    this.distTraveled += this.speed;
    this.shape.position = this.location();
  }
}
