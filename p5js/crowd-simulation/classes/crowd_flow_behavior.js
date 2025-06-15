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

class CrowdFlowBehavior {
  constructor(config){
    this.config = this.ensureSettingsPresent(config);
  }

  ensureSettingsPresent(config){
    config = config || {};
    const defaultsWithSpecified = {};
    Object.assign(defaultsWithSpecified, this.defaultSettings(), config);
    Object.assign(config, defaultsWithSpecified);
    return config;
  }

  defaultSettings(){
    return {
      separationFactor: 2.5,
      alignFactor: 0.9,
      cohesionFactor: 0.6,
      desiredSeparation: 20,
      maxSpeed: 2,
      maxForce: 0.05
    };
  }

  // Params:
  // boid - the object that we're getting the Flocking acceleration for
  // neighboringBoids - array of other Boids nearby that will influence the boid
  //
  // Assumes that the neighbors are close-enough; does not filter
  calcAccel(boid, neighboringBoids, weights){
    let configWeights = weights || this.config;
    boid.accel.x = 0;
    boid.accel.y = 0;

    let seekAccel = this.seek(boid, boid.target);
    boid.accel.add(seekAccel);

    if (neighboringBoids.length === 0){
      return;
    }

    const fovData = this.calcFovData(boid, neighboringBoids);

    let accelToSeperate = this.separate(boid, fovData);
    let accelToAlign    = this.align(boid, fovData);
    let accelToCohesive = this.cohesion(boid, fovData);

    accelToSeperate.mult(configWeights.separationFactor);
    accelToAlign.mult(configWeights.alignFactor);
    accelToCohesive.mult(configWeights.cohesionFactor);

    boid.accel.add(accelToSeperate);
    boid.accel.add(accelToAlign); 
    boid.accel.add(accelToCohesive);
    return;
  }
  
  // halfFovInRadians = 1.75  // (~100 degrees) 
  calcFovData(boid, neighboringBoids, halfFovInRadians = 1.75, distanceThreshold = 100){
    const neighborsInSight = {};
    neighborsInSight.neighbors = [];
    neighborsInSight.distances = [];
    // neighborsInSight.angleToN = [];
    neighborsInSight.headingDiffs = [];

    for (let i = 0; i < neighboringBoids.length; i++){
      const neighbor = neighboringBoids[i];
      const locationDiff = p5.Vector.sub(neighbor.loc, boid.loc);
      const directionToNeighbor = boid.velocity.angleBetween(locationDiff);
      if(Math.abs(directionToNeighbor) > halfFovInRadians){
        continue;
      }

      const distance = p5.Vector.dist(boid.loc, neighbor.loc);
      if (distance > distanceThreshold){
        continue;
      }

      const headingDiff = boid.velocity.angleBetween(neighbor.velocity);

      neighborsInSight.neighbors.push(neighbor);
      neighborsInSight.distances.push(distance);
      // neighborsInSight.angleToN.push(directionToNeighbor);
      neighborsInSight.headingDiffs.push(headingDiff);
    }
    return neighborsInSight;
  }

  separate(boid, fovData){
    const steer = createVector(0, 0);
    let countTooClose = 0;

    let desiredSeparation = this.config.desiredSeparation;
    if (boid.loc.dist(boid.target) < desiredSeparation){
      // 
      desiredSeparation = boid.size;
    }

    for (var i = 0; i < fovData.neighbors.length; i++){
      let other = fovData.neighbors[i];

      let dist = fovData.distances[i];
      if (dist > desiredSeparation){
        continue;
      }

      let diff = p5.Vector.sub(boid.loc, other.loc);
      diff.normalize();
      diff.div(dist + 0.0001); // avoid division by zero
      steer.add(diff);
      countTooClose++;
    }

    if (countTooClose === 0){
      // this boid is far enough from all neighbors
      return steer;
    }

    steer.div(countTooClose); // effectively get the average

    if(steer.x < 1 && steer.y < 1) {
      // this boid is effectively equi-distance from all neighbors
      return steer;
    }

    steer.normalize();
    steer.mult(this.config.maxSpeed);
    steer.sub(boid.velocity);
    steer.limit(this.config.maxForce);

    return steer;
  }

  align(boid, fovData){
    let avgVelocity = createVector(0, 0);
    let similarHeadingCount = 0;

    for (var i = 0; i < fovData.neighbors.length; i++){
      if (Math.abs(fovData.headingDiffs[i]) > HALF_PI){
        // this neighbor is facing away from the boid
        continue;
      }
      similarHeadingCount++;
      let other = fovData.neighbors[i];
      avgVelocity.add(other.velocity);
    }

    if (similarHeadingCount === 0){
      // no neighbors are facing the same direction
      return avgVelocity;
    }

    avgVelocity.div(similarHeadingCount);
    avgVelocity.normalize();
    avgVelocity.mult(this.config.maxSpeed);

    const steer = p5.Vector.sub(avgVelocity, boid.velocity);
    steer.limit(this.config.maxForce);
    return steer;
  }

  cohesion(boid, fovData){
    let avgLocation = createVector(0, 0);
    let similarHeadingCount = 0;

    for (var i = 0; i < fovData.neighbors.length; i++){
      if (Math.abs(fovData.headingDiffs[i]) > HALF_PI){
        // this neighbor is facing away from the boid
        continue;
      }
      similarHeadingCount++;

      let other = fovData.neighbors[i];
      avgLocation.add(other.loc);
    }

    if (similarHeadingCount === 0){
      // no neighbors are facing the same direction
      return avgLocation;
    }

    avgLocation.div(similarHeadingCount);
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