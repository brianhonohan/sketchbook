var canvas;
var particles;

function setup(){
  canvas = createCanvas(500, 500);
  particles = [];

  colorMode(HSB);
  background(20);
}

function draw(){
  // background(20);

  stroke(frameCount % 255, 200, 200, 100);
  particles.forEach(p => p.tick());
  particles.forEach(p => p.draw());
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}

function mouseReleased(){
  let particle = new Particle(mouseX, mouseY);
  particle.vel = createVector(random(-1, 1), random(-1, 1));
  particles.push(particle);
}