var circle1;
var circle2;

function setup(){
  createCanvas(500, 500);

  circle1 = new Circle(100, height/2,  75);
  circle2 = new Circle(325, height/2, 125);
}

function draw(){
  background(50);

  circle1.draw();
  circle2.draw();
}
