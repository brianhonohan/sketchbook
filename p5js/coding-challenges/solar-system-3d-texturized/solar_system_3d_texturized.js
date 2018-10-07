var system;
var mode;
var starTexture;
var planetTextures = [];
var textureMgr; 

function preload(){
  // from: https://www.solarsystemscope.com/textures/
  starTexture = loadImage('textures/2k_sun.jpg');

  planetTextures[0] = loadImage('textures/2k_mercury.jpg');
  planetTextures[1] = loadImage('textures/2k_venus_atmosphere.jpg');
  planetTextures[2] = loadImage('textures/2k_earth_daymap.jpg');
  planetTextures[3] = loadImage('textures/2k_mars.jpg');
  planetTextures[4] = loadImage('textures/2k_jupiter.jpg');
  planetTextures[5] = loadImage('textures/2k_saturn.jpg');
  planetTextures[6] = loadImage('textures/2k_neptune.jpg');
  planetTextures[7] = loadImage('textures/2k_uranus.jpg');
}

function setup(){
  mode = SolarSystem.MODE_3D;
  textureMgr = new TextureManager();

  if (mode == SolarSystem.MODE_3D) {
    createCanvas(windowWidth, windowHeight, WEBGL);
    textureMgr.starTexture = starTexture;
    textureMgr.planetTextures = planetTextures;
  } else {
    createCanvas(windowWidth, windowHeight);
  }

  system = new SolarSystem();
  system.setMode(mode);
  system.init();
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

class VectorGenerator2D {
  static createVector(x, y){ return createVector(x, y); }
  static randomvector(){ return p5.Vector.random2D(); }
  
  static randomWithRange(low, high){ 
    return createVector(random(low, high), random(low, high));
  }

  static rotateRandom(vector, minRotation, maxRotation){
    let randTheta = random(minRotation, maxRotation);
    vector.rotate(randTheta);
  }
}

class VectorGenerator3D {
  static createVector(x, y, z){ return createVector(x, y, z); }
  static randomvector(){ return p5.Vector.random3D(); }
  
  static randomWithRange(low, high){ 
    return createVector(random(low, high), 
                        random(low, high), 
                        random(low, high));
  }

  static rotateRandom(vector, minRotation, maxRotation){
    // First: rotate around z-axis
    // x' = x cos θ − y sin θ
    // y' = x sin θ + y cos θ
    let randTheta = random(minRotation, maxRotation);
    vector.x = vector.x * cos(randTheta) - vector.y * sin(randTheta);
    vector.y = vector.x * sin(randTheta) + vector.y * cos(randTheta);

    // Second: rotate around y-axis
    // Adapted from 2D
    let randPhi = random(minRotation, maxRotation);
    vector.x = vector.x * cos(randPhi) - vector.z * sin(randPhi);
    vector.z = vector.x * sin(randPhi) + vector.z * cos(randPhi);

    // Second: rotate around x-axis
    // Adapted from 2D
    let randPsi = random(minRotation, maxRotation);
    vector.y = vector.y * cos(randPsi) - vector.z * sin(randPsi);
    vector.z = vector.y * sin(randPsi) + vector.z * cos(randPsi);
  }
}


class Drawing2D {
  static round(position, radius){
    ellipse(position.x, position.y, radius, radius);
  }
}

class Drawing3D {
  static round(position, radius){
    push();
    translate(position);
    sphere(radius);
    pop();
  }
}

class TextureManager {
  getStarTexture(){
    return this.starTexture;
  }

  getPlanetTexture(idx){
    return this.planetTextures[idx % this.planetTextures.length];
  }
}

class SolarSystem {
  constructor() {
    this.objects = [];
  }

  static get scale_space(){ return 4.5e9 / width; }
  static get scale_time(){ return 50.0; }

  static get MODE_2D(){ return 0; }
  static get MODE_3D(){ return 1; }

  setMode(mode){
    switch(mode) {
      case SolarSystem.MODE_2D:
            this.vectorGen = VectorGenerator2D;
            this.drawMode = Drawing2D;
            break;
      case SolarSystem.MODE_3D:
            this.vectorGen = VectorGenerator3D;
            this.drawMode = Drawing3D;
            break;
      default:
            console.log("Invalid mode. Please pass in: SolarSystem.MODE_2D or SolarSystem.MODE_3D");
            return;
    }
    this.mode = mode;
  }

  init(){
    let numObjects = 10;
    for(var i=0; i<numObjects; i++){

      if(i == 0){
        this.objects.push(this.generateStar(i));
      }else{
        this.objects.push(this.generatePlanet(i));
      }
    }
    this.setInitialOrbitalVelocities();
  }

  generateStar(idx){
    let star = new MassiveObject(this.vectorGen.createVector(0), 
                              1.9885e30, color(200,190,40));
    if (this.mode == SolarSystem.MODE_3D){
      star.texture = textureMgr.getStarTexture();
    }
    return star;
  }

  generatePlanet(idx){
    // our solar system is 4.5e9 km along major axis;
    // mecury, perihelion: 46,001,200 km
    let randLoc = this.vectorGen.randomWithRange(40e6, 2500e6);
    this.vectorGen.rotateRandom(randLoc, 0, TWO_PI);

    // jupiter: 1.8982×1027 or 18,982x1023
    // mercury   3.3011×1023
    let mass = random(3, 10000) * 1e23;

    let surfaceColor = color(random(50, 200),random(50, 200),random(50, 200));

    let newObj = new MassiveObject(randLoc, mass, surfaceColor);
    if (this.mode == SolarSystem.MODE_3D){
      newObj.texture = textureMgr.getPlanetTexture(idx);
    }
    return newObj;
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
    if (this.mode == SolarSystem.MODE_2D){
      translate(width/2, height/2);
    }
    noStroke();
    for(var i=0; i < this.objects.length; i++){
      this.objects[i].draw();
    }
    pop();
  }
}

class MassiveObject {
  constructor(pos, mass, color) {
    this.pos = pos;
    this.accel = system.vectorGen.createVector(0);
    this.velocity = system.vectorGen.createVector(0);
    this.mass = mass; // kg
    this.c = color;
    this.texture = null;

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
    if (this.texture){
      texture(this.texture );
    }
    system.drawMode.round(p5.Vector.div(this.pos, SolarSystem.scale_space),
                      this.scaledRadius);
  }
}