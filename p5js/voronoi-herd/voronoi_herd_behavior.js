var grassland;

function setup(){
  createCanvas(windowWidth, windowHeight-35);
  grassland = new GrasslandSystem();
}

function draw(){
  background(70);
  grassland.tick();
  grassland.draw();
}
