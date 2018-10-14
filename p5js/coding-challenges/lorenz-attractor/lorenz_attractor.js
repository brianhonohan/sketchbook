var lorenzSystem;

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

  lorenzSystem = new LorenzSystem(28, 10, 8/3.0);
}

function draw(){
  background(45);
}
  constructor(rho, sigma, beta){
    this.rho = rho;
    this.sigma = sigma;
    this.beta = beta;
  }

  dx_dt (loc){
    return this.sigma * (loc.y - loc.x);
  }

  dy_dt (loc){
    return loc.x * (this.rho - loc.z) - loc.y;
  }

  dz_dt (loc){
    return loc.x * loc.y - this.beta * loc.z;
  }
}
