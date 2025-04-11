var canvas;
var particles;
let shapeModes = ['vertex', 'curveVertex', 'bezierVertex'];

let gui;
let guiOptions = {
  'screenshot': screenshot,
  'clear': clearPoints,
  'clear_and_redraw': clearAndRedraw,
  'redraw_bg': drawBackground,
  'shape_mode': 'vertex'
}

function setup(){
  // canvas = createCanvas(500, 500);
  canvas = createCanvas(windowWidth, windowHeight - determineVerticalMargin());
  particles = [];

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(guiOptions, "screenshot").name("Screenshot (P)");
  gui.add(guiOptions, "clear").name("Clear Points (C)");
  gui.add(guiOptions, "clear_and_redraw").name("Clear & Redraw (X)");
  gui.add(guiOptions, "redraw_bg").name("Redraw BG (R)");
  gui.add(guiOptions, "shape_mode", shapeModes);

  colorMode(HSB);
  drawBackground();

  addPointAt(random(width), random(height));
  addPointAt(random(width), random(height));
  addPointAt(random(width), random(height));
}

function drawBackground(){
  background(20);
}

function draw(){
  particles.forEach(p => p.tick());

  stroke(frameCount % 360, 80, 30, 1);
  fill(frameCount % 360, 80, 90, 0.2);

  if (frameCount % 5 == 0){
    switch(guiOptions.shape_mode){
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
    case 'P':
      screenshot();
      break;
    case 'R':
    case 'r':
      drawBackground();
      break;
    case 'C':
    case 'c':
      clearPoints();
      break;
    case 'X':
    case 'x':
      clearAndRedraw();
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

function screenshot(){
  saveCanvas(canvas, 'screenshot', 'png');
}

function clearPoints(){
  particles = [];
}

function clearAndRedraw(){
  clearPoints();
  drawBackground();
}

function addPointAt(x, y){
  let particle = new Particle(x, y);
  particle.boundaryMode = Particle.BOUNDARY_MODE_BOUNCE;
  particle.vel = createVector(random(-2, 2), random(-2, 2));
  particles.push(particle);
}

function mouseReleased(){
  addPointAt(mouseX, mouseY);
}