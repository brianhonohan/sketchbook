var system;

function setup(){
  createCanvas(windowWidth, windowHeight);

  system = new SolarSystem();
}

function draw(){
  background(25);
  system.draw();
}


class SolarSystem {
  constructor() {
    this.objects = [];
    this.init();
  }

  static get scale_space(){ return 4.5e9 / width; }

  init(){
    let numObjects = 10;
    for(var i=0; i<numObjects; i++){

      if(i == 0){
        this.objects.push(this.generateStar());
      }else{
        this.objects.push(this.generatePlanet());
      }
    }
  }

  generateStar(idx){
    return new MassiveObject(0, 0, 1.9885e30);
  }

  generatePlanet(idx){
    // our solar system is 4.5e9 km along major axis;
    // mecury, perihelion: 46,001,200 km
    let randX = random(40, 2500) * 1e6; // km
    let randY = random(40, 2500) * 1e6;

    // jupiter: 1.8982×1027 or 18,982x1023
    // mecury   3.3011×1023
    let mass = random(3, 20000) * 1e23;
    return new MassiveObject(randX, randY, mass);
  }

  draw(){
    push();
    translate(width/2, height/2);
    for(var i=0; i < this.objects.length; i++){
      this.objects[i].draw();
    }
    pop();
  }
}

class MassiveObject {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.accel = createVector(0, 0);
    this.speed = createVector(0, 0);
    this.mass = mass; // kg
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  tick(){
    this.pos.add(this.speed);
    this.speed.add(this.accel);
  }

  draw(){
    ellipse(this.x / SolarSystem.scale_space, this.y / SolarSystem.scale_space, 
                10, 10);
  }
}