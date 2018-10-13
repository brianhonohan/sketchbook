var coord3d;

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

  coord3d = new Coord3D();
}

function draw(){
  background(45);

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
