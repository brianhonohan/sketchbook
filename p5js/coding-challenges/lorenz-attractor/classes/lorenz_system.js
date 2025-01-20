class LorenzSystem {
  constructor(config){
    this.config = config;
  }

  dx_dt (loc){
    return this.config.sigma * (loc.y - loc.x);
  }

  dy_dt (loc){
    return loc.x * (this.config.rho - loc.z) - loc.y;
  }

  dz_dt (loc){
    return loc.x * loc.y - this.config.beta * loc.z;
  }

  nextLocation(loc, timeStep){
    let newPoint = loc.copy();
    newPoint.x += this.dx_dt(loc) * timeStep;
    newPoint.y += this.dy_dt(loc) * timeStep;
    newPoint.z += this.dz_dt(loc) * timeStep;
    return newPoint;
  }
}