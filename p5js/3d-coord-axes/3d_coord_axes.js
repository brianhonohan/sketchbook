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
  }

  drawXAxis(){
    stroke(this.red);
    line(0, 0, 0, 100, 0, 0);

    fill(this.red);
    push();
    translate(100, 0, 0);
    box(10);
    pop();
  }

  drawYAxis(){
    stroke(this.green);
    line(0, 0, 0, 0, 100, 0);

    fill(this.green);
    push();
    translate(0, 100, 0);
    box(10);
    pop();
  }

  drawZAxis(){
    stroke(this.blue);
    line(0, 0, 0, 0, 0, 100);

    fill(this.blue);
    push();
    translate(0, 0, 100);
    box(10);
    pop();
  }
}
