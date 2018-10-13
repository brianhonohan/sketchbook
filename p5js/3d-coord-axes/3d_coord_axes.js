var coord3d;
var cameraLoc;

// From: https://en.wikipedia.org/wiki/Aircraft_principal_axes
var cameraPitch = 0;    // titl "up/down"
var cameraRoll = 0;     // around focal point
var cameraYaw = 0;      // around vertical

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

  coord3d = new Coord3D();
  cameraLoc = createVector(0, 0, 0);
}

function draw(){
  background(45);

  // cameraPitch += (height/2 - mouseY) * 0.005;
  // cameraPitch = constrain(cameraPitch, - HALF_PI, HALF_PI);
  
  // cameraRoll += 0.05;
  // cameraPitch += 0.05;
  // cameraRoll += 0.05;
  cameraYaw += 0.05;
  
  rotateX(cameraPitch);
  rotateY(cameraYaw);
  rotateZ(cameraRoll);

  coord3d.drawZAxis();
  coord3d.drawXAxis();
  coord3d.drawYAxis();
}


class Coord3D {
  constructor(){
    this.red = color(200, 50, 50);
    this.green = color(50, 200, 50);
    this.blue = color(50, 50, 200);

    this.origin = createVector(0, 0, 0);
    this.axisLength = 100;
  }

  get x_axis_end() { return createVector(this.axisLength, 0, 0); }
  get y_axis_end() { return createVector(0, this.axisLength, 0); }
  get z_axis_end() { return createVector(0, 0, this.axisLength); }

  drawXAxis(){
    stroke(this.red);
    this.lineFromTo(this.origin, this.x_axis_end);

    fill(this.red);
    this.boxAt(this.x_axis_end);
  }

  drawYAxis(){
    stroke(this.green);
    this.lineFromTo(this.origin, this.y_axis_end);

    fill(this.green);
    this.boxAt(this.y_axis_end);
  }

  drawZAxis(){
    stroke(this.blue);
    this.lineFromTo(this.origin, this.z_axis_end);

    fill(this.blue);
    this.boxAt(this.z_axis_end);
  }

  lineFromTo(v1, v2){
    line(v1.x, v1.y, v1.y, v2.x, v2.y, v2.z);
  }

  boxAt(v1){
    push();
    translate(v1.x, v1.y, v1.z);
    box(10);
    pop();
  }
}
