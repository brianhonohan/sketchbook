// Credits: 
// Craig Reynolds: http://www.red3d.com/cwr/ 
// Dan Shiffman, Nature of Code: https://github.com/shiffman/The-Nature-of-Code-Examples/blob/master/chp06_agents/NOC_6_09_Flocking/Boid.pde
//
// Below is a refactor of that approach to a utility clas
// such that it can be abstracted from the individual Boid
// and allow that Boid to have other behaviors in addition
// to flocking.
// 
// Maintains the use of the term Boid
// https://en.wikipedia.org/wiki/Boids

class Flocking {
  constructor(config){
    this.config = this.ensureSettingsPresent(config);
    this.zeroVector = createVector();
  }

  static get zeroVector() { }

  defaultSettings(){
    return {
      separationFactor: 1.5,
      alignFactor: 1.0,
      cohesionFactor: 1.0,
      desiredSeparation: 25,
      maxSpeed: 3,
      maxForce: 0.05
    };
  }

  ensureSettingsPresent(config){
    config = config || {};
    const defaultsWithSpecified = {};
    Object.assign(defaultsWithSpecified, this.defaultSettings(), config);
    Object.assign(config, defaultsWithSpecified);
    return config;
  }

  // Params:
  // boid - the object that we're getting the Flocking acceleration for
  // neighboringBoids - array of other Boids nearby that will influence the boid
  //
  // Assumes that the neighbors are close-enough; does not filter
  calcAccel(boid, neighboringBoids){
    const accel = createVector(0, 0);
    if (neighboringBoids.length === 0){
      return accel;
    }

    const distanceLookup = this.calcDistances(boid, neighboringBoids);

    let accelToSeperate = this.separate(boid, neighboringBoids, distanceLookup);
    let accelToAlign    = this.align(boid, neighboringBoids);
    let accelToCohesive = this.cohesion(boid, neighboringBoids);

    accelToSeperate.mult(this.config.separationFactor);
    accelToAlign.mult(this.config.alignFactor);
    accelToCohesive.mult(this.config.cohesionFactor);

    accel.add(accelToSeperate);
    accel.add(accelToAlign);
    accel.add(accelToCohesive);
    return accel;
  }

  calcDistances(boid, neighboringBoids){
    let distances = [];
    for (var i = 0; i < neighboringBoids.length; i++){
      let other = neighboringBoids[i];
      distances.push( p5.Vector.dist(boid.loc, other.loc) );
    }
    return distances;
  }

  separate(boid, neighboringBoids, distances){
    const steer = createVector(0, 0);
    let countTooClose = 0;

    for (var i = 0; i < neighboringBoids.length; i++){
      let other = neighboringBoids[i];

      let dist = distances[i];
      if (dist > this.config.desiredSeparation){
        continue;
      }

      let diff = p5.Vector.sub(boid.loc, other.loc);
      diff.normalize();
      diff.div(dist);
      steer.add(diff);
      countTooClose++;
    }

    if (countTooClose === 0){
      // this boid is far enough from all neighbors
      return steer;
    }

    steer.div(countTooClose); // effectively get the average

    if(steer.x === 0 && steer.y === 0) {
      // this boid is equi-distance from all neighbors
      return steer;
    }

    steer.normalize();
    steer.mult(this.config.maxSpeed);
    steer.sub(boid.velocity);
    steer.limit(this.config.maxForce);

    return steer;
  }

  align(boid, neighboringBoids){
    let avgVelocity = createVector(0, 0);

    for (var i = 0; i < neighboringBoids.length; i++){
      let other = neighboringBoids[i];
      avgVelocity.add(other.velocity);
    }
    avgVelocity.div(neighboringBoids.length);
    avgVelocity.normalize();
    avgVelocity.mult(this.config.maxSpeed);

    const steer = p5.Vector.sub(avgVelocity, boid.velocity);
    steer.limit(this.config.maxForce);
    return steer;
  }

  cohesion(boid, neighboringBoids){
    let avgLocation = createVector(0, 0);

    for (var i = 0; i < neighboringBoids.length; i++){
      let other = neighboringBoids[i];
      avgLocation.add(other.loc);
    }

    avgLocation.div(neighboringBoids.length);
    return this.seek(boid, avgLocation);
  }

  seek(boid, target){
    let desired = p5.Vector.sub(target, boid.loc);

    desired.normalize();
    desired.mult(this.config.maxSpeed);

    let steer = p5.Vector.sub(desired, boid.velocity);
    steer.limit(this.config.maxForce);
    return steer;
  }
}