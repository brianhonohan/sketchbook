var coord3d;
var cam;
var cameraController;

function setup(){
  createCanvas(windowWidth, windowHeight-50, WEBGL);

  coord3d = new Coord3D();
  cam = createCamera();
  cameraController = new CameraController(cam);
  debugMode();
}

function draw(){
  background(45);
  cameraController.tick();

  coord3d.drawZAxis();
  coord3d.drawXAxis();
  coord3d.drawYAxis();
}

class CameraController {
  constructor(cam) {
    this.cam = cam;
    this.keyW = 87;
    this.keyA = 65;
    this.keyS = 83;
    this.keyD = 68;
    this.keySpace = 32;

    
    this.centerX = width / 2;
    this.centerY = width / 2;

    this.mouseInactiveZone = 50;

    this.mouseIZminX = this.centerX - this.mouseInactiveZone;
    this.mouseIZmaxX = this.centerX + this.mouseInactiveZone;
    this.mouseIZminY = this.centerY - this.mouseInactiveZone;
    this.mouseIZmaxY = this.centerY + this.mouseInactiveZone;

    this.panRange = this.centerX - this.mouseInactiveZone;
    this.tiltRange = this.centerY - this.mouseInactiveZone;
  }

  tick(){
    this.panForMouse();
    this.tiltForMouse();

    if (keyIsDown(this.keyW) || keyIsDown(UP_ARROW)){
      this.moveForward();
    }

    if (keyIsDown(this.keyS) || keyIsDown(DOWN_ARROW)){
      this.moveBack();
    }

    if (keyIsDown(this.keyD) || keyIsDown(RIGHT_ARROW)){
      this.moveRight();
    }

    if (keyIsDown(this.keyA) || keyIsDown(LEFT_ARROW)){
      this.moveLeft();
    }

    if (keyIsDown(this.keySpace)){
      if (keyIsDown(SHIFT)){
        this.moveUp();
      }else{
        this.moveDown();
      }
    }
  }

  panForMouse(){
    if (this.mouseIZminX <= mouseX && mouseX <= this.mouseIZmaxX){
      this.cam.pan( (pmouseX - mouseX) / this.mouseInactiveZone * 0.05 );
      return;
    }

    let panTheta = 0;
    if (mouseX < this.centerX){
      panTheta = (this.mouseIZminX - mouseX) / this.panRange * 0.05;
    }else {
      panTheta = (this.mouseIZmaxX - mouseX) / this.panRange * 0.05;
    }
    this.cam.pan(panTheta);
  }

  tiltForMouse(){
    if (this.mouseIZminY <= mouseY && mouseY <= this.mouseIZmaxY){
      this.cam.tilt( (mouseY - pmouseY) / this.mouseInactiveZone * 0.05 );
      return;
    }

    let tiltTheta = 0;
    if (mouseY < this.centerY){
      tiltTheta = (mouseY - this.mouseIZminY) / this.tiltRange * 0.05;
    }else {
      tiltTheta = (mouseY - this.mouseIZmaxY) / this.tiltRange * 0.05;
    }
    this.cam.tilt(tiltTheta);
  }

  moveForward(){
    this.cam.move(0, 0, -10);
  }

  moveBack(){
    this.cam.move(0, 0, 10);
  }

  moveLeft(){
    this.cam.move(-10, 0, 0);
  }

  moveRight(){
    this.cam.move(10, 0, 0);
  }

  moveUp(){
    this.cam.move(0, 10, 0);
  }

  moveDown(){
    this.cam.move(0, -10, 0);
  }
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
