var terrain;
var cameraLoc;

function setup(){
  createCanvas(windowWidth, windowHeight);

  terrain = new Terrain();
  cameraLoc = createVector(0, 0, 0);
}

function draw(){
  background(45);

  let baseColor = color(30, 90, 30);
  let maxColor = color(230, 240, 230);

  let cellSize = 10;
  noStroke();
  for (var x = 0; x < width; x += cellSize){
    for (var z = 0; z < height; z += cellSize){
      let heightAtLoc = terrain.elevationAt(cameraLoc.x + x, cameraLoc.z + z);
      fill( lerpColor(baseColor, maxColor, heightAtLoc) );
      rect(x, z, cellSize, cellSize);
    }
  }
  cameraLoc.z -= 10;
}


class Terrain {
  constructor(){
    this.noiseScale = 0.005;
  }

  elevationAt(x, z){
    return noise(x * this.noiseScale, z * this.noiseScale);
  }
}
