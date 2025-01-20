class CameraController {
  constructor(cam) {
    this.cam = cam;
    this.keyW = 87;
    this.keyA = 65;
    this.keyS = 83;
    this.keyD = 68;
    this.keySpace = 32;

    
    this.centerX = width / 2;
    this.centerY = height / 2;

    this.mouseInactiveZone = 50;

    this.mouseIZminX = this.centerX - this.mouseInactiveZone;
    this.mouseIZmaxX = this.centerX + this.mouseInactiveZone;
    this.mouseIZminY = this.centerY - this.mouseInactiveZone;
    this.mouseIZmaxY = this.centerY + this.mouseInactiveZone;

    this.panRange = this.centerX - this.mouseInactiveZone;
    this.tiltRange = this.centerY - this.mouseInactiveZone;
  }

  tick(){
    let keyObserved = false;

    if (keyIsDown(this.keyW) || keyIsDown(UP_ARROW)){
      keyObserved = true;
      this.moveForward();
    }

    if (keyIsDown(this.keyS) || keyIsDown(DOWN_ARROW)){
      keyObserved = true;
      this.moveBack();
    }

    if (keyIsDown(this.keyD) || keyIsDown(RIGHT_ARROW)){
      keyObserved = true;
      this.moveRight();
    }

    if (keyIsDown(this.keyA) || keyIsDown(LEFT_ARROW)){
      keyObserved = true;
      this.moveLeft();
    }

    if (keyIsDown(this.keySpace)){
      keyObserved = true;
      if (keyIsDown(SHIFT)){
        this.moveUp();
      }else{
        this.moveDown();
      }
    }

    if (keyObserved){
      this.panForMouse();
      this.tiltForMouse();
    }
  }

  panForMouse(){
    let panTheta = 0;
    if (this.mouseIZminX <= mouseX && mouseX <= this.mouseIZmaxX){
      panTheta = (pmouseX - mouseX) / this.mouseInactiveZone * 0.05;
    } else if (mouseX < this.centerX){
      panTheta = (this.mouseIZminX - mouseX) / this.panRange * 0.05;
    }else {
      panTheta = (this.mouseIZmaxX - mouseX) / this.panRange * 0.05;
    }
    this.cam.pan(panTheta);
  }

  tiltForMouse(){
    let tiltTheta = 0;
    if (this.mouseIZminY <= mouseY && mouseY <= this.mouseIZmaxY){
      tiltTheta = (mouseY - pmouseY) / this.mouseInactiveZone * 0.05;
    }else if (mouseY < this.centerY){
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