var canvas;
var particles;
var shapeMode;

function setup(){
  // canvas = createCanvas(500, 500);
  canvas = createCanvas(windowWidth, windowHeight);
  particles = [];

  shapeMode = 'vertex';
  colorMode(HSB);
  drawBackground();
}

function drawBackground(){
  background(20);
}

function draw(){
  particles.forEach(p => p.tick());

  stroke(frameCount % 360, 80, 30, 1);
  fill(frameCount % 360, 80, 90, 0.2);

  if (frameCount % 5 == 0){
    switch(shapeMode){
      case 'vertex':
        drawLines();
        break;
      case 'curveVertex':
        drawCurves();
        break;
      case 'bezierVertex':
        drawBeziers();
        break;
    }
  }
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
}

function drawLines(){
  beginShape();
  particles.forEach(p => vertex(p.x, p.y));
  endShape(CLOSE);
}

function drawCurves(){
  beginShape();
  particles.forEach(p => curveVertex(p.x, p.y));
  endShape(CLOSE);
}

function drawBeziers(){
  beginShape();
  for(var i = 0; i < particles.length; i += 4){
    let particle = particles[i];

    vertex(particle.x, particle.y);

    let part1 = particles[(i + 1) % particles.length];
    let part2 = particles[(i + 2) % particles.length];
    let part3 = particles[(i + 3) % particles.length];
    bezierVertex(part1.x, part1.y, part2.x, part2.y, part3.x, part3.y);
  }
  endShape(CLOSE);
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    case 'c':
      drawBackground();
      break;
    case 'l':
      shapeMode = 'vertex';
      break;
    case 'v':
      shapeMode = 'curveVertex';
      break;
    case 'b':
      shapeMode = 'bezierVertex';
      break;
  }
}

function mouseReleased(){
  let particle = new Particle(mouseX, mouseY);
  particle.boundaryMode = Particle.BOUNDARY_MODE_BOUNCE;
  particle.vel = createVector(random(-2, 2), random(-2, 2));
  particles.push(particle);
}