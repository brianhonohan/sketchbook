var system;

function setup(){
  createCanvas(windowWidth, windowHeight);

  system = new SolarSystem();
}

function draw(){
  background(25);
  system.draw();
  system.tick();
}

class Physics {

  // G: 6.67408 × 10-11 m3 kg-1 s-2
  static get G_CONSTANT(){ return 6.67408e-11; }
  static get G_ADJUSTED(){ return SolarSystem.scale_time * Physics.G_CONSTANT; }

  // points from Obj1 => Obj2
  static forceDueToG(obj1, obj2){
    // Gravitational Force: F = G * m1 * m2 / (r * r)
    let r = p5.Vector.sub(obj2.pos, obj1.pos);
    let rSquared = r.magSq();
    let forceMag = Physics.G_ADJUSTED * obj1.mass * obj2.mass / rSquared;
    let force = r.setMag(forceMag);
    return force;
  }

  static orbitalV(ofObject, aroundObj){
    // From balancing:
    // Gravitational Force: F = G * m1 * m2 / (r * r)
    // Centripetial Force: F = m * v * v / r
    // solving for speed of obj1: v = sqrt( G * m2 / r)
    let r = p5.Vector.sub(aroundObj.pos, ofObject.pos);
    let speed = pow(Physics.G_ADJUSTED * aroundObj.mass / r.mag() , 0.5);
    let v = r.copy();
    v.rotate(HALF_PI);
    v.setMag(speed);
    return v;
  }

  static applyForce(object, force){
    // from F = m * a  ... a = F / m
    object.accel.add( p5.Vector.div(force, object.mass) );
  }
}

class SolarSystem {
  constructor() {
    this.objects = [];
    this.init();
  }

  static get scale_space(){ return 4.5e9 / width; }
  static get scale_time(){ return 50.0; }

  init(){
    let numObjects = 10;
    for(var i=0; i<numObjects; i++){

      if(i == 0){
        this.objects.push(this.generateStar());
      }else{
        this.objects.push(this.generatePlanet());
      }
    }
    this.setInitialOrbitalVelocities();
  }

  generateStar(idx){
    return new MassiveObject(0, 0, 1.9885e30, color(200,190,40));
  }

  generatePlanet(idx){
    // our solar system is 4.5e9 km along major axis;
    // mecury, perihelion: 46,001,200 km
    let randLoc = createVector(random(40, 2500) * 1e6, random(40, 2500) * 1e6);
    let randTheta = random(0, TWO_PI);
    randLoc.rotate(randTheta);

    // jupiter: 1.8982×1027 or 18,982x1023
    // mercury   3.3011×1023
    let mass = random(3, 10000) * 1e23;

    let surfaceColor = color(random(50, 200),random(50, 200),random(50, 200));
    return new MassiveObject(randLoc.x, randLoc.y, mass, surfaceColor);
  }

  setInitialOrbitalVelocities(){
    let star = this.objects[0];
    for(var i=1; i < this.objects.length; i++){
      let obj = this.objects[i];
      obj.velocity = Physics.orbitalV(obj, star);
    }
  }

  tick(){
    // reset all accelerations to zero
    // this will allow for inter-object gravity (not just to the Star)
    for(var i=1; i < this.objects.length; i++){
      this.objects[i].accel.mult(0);
    }

    // for now, for simplicity
    //  ... keep the star fixed (don't apply any forces to it)
    let star = this.objects[0];
    for(var i=1; i < this.objects.length; i++){
      let obj = this.objects[i];
      let force = Physics.forceDueToG(obj, star);
      Physics.applyForce(obj, force);
    }

    for(var i=1; i < this.objects.length; i++){
      this.objects[i].tick();
    }
  }

  draw(){
    push();
    translate(width/2, height/2);
    noStroke();
    for(var i=0; i < this.objects.length; i++){
      this.objects[i].draw();
    }
    pop();
  }
}

class MassiveObject {
  constructor(x, y, mass, color) {
    this.pos = createVector(x, y);
    this.accel = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.mass = mass; // kg
    this.c = color;

    this.scaledRadius = Math.log10(this.mass);
  }

  get x(){ return this.pos.x; }
  get y(){ return this.pos.y; }

  tick(){
    this.pos.add(this.velocity);
    this.velocity.add(this.accel);
  }

  draw(){
    fill(this.c);
    ellipse(this.x / SolarSystem.scale_space, this.y / SolarSystem.scale_space, 
                this.scaledRadius, this.scaledRadius);
  }
}