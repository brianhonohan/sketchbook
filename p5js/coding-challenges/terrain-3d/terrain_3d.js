var cameraLoc;

// From: https://en.wikipedia.org/wiki/Aircraft_principal_axes
var cameraPitch = 0;
var cameraRoll = 0;
var cameraYaw = 0;

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

  terrain = new Terrain();
  cameraLoc = createVector(0, 100, 0);
  cameraPitch = - PI / 6;

  stroke(255);
}

function draw(){
  background(45);

  let baseColor = color(30, 90, 30);
  let maxColor = color(230, 240, 230);

  let cellSize = 10;
  let renderDepth = 20;
  let renderWidth = 2 * (width / cellSize);

  let generatedTerrain = [];

  // Build Terrain
  for (var x = 0; x < renderWidth; x++){
    generatedTerrain[x] = [];
    for (var z = 0; z < renderDepth; z++){
      let xScaled = (x * cellSize) + cameraLoc.x;
      let zScaled = (z * cellSize) + cameraLoc.z;
      let heightAtLoc = terrain.elevationAt(xScaled, zScaled);
      generatedTerrain[x][z] = heightAtLoc;
    }
  }
  
  // translate(width/2, height/2);
  translate(cameraLoc.x, cameraLoc.y, cameraLoc.z);
  rotateX(cameraPitch);

  // Render mesh for Terrain
  noFill();    
  beginShape(TRIANGLE_STRIP);
  for (var x = 0; x < renderWidth; x++){
    generatedTerrain[x] = [];
    for (var z = 0; z < renderDepth-1; z++){
      let xScaled = (x * cellSize) + cameraLoc.x;
      let zScaled = (z * cellSize) + cameraLoc.z;

      let nextScaledZ = zScaled + cellSize;
      vertex(xScaled, generatedTerrain[x][z], zScaled);
      vertex(xScaled, generatedTerrain[x][z+1], nextScaledZ);
    }
  }
  endShape();
  cameraLoc.z += 10;
}


class Terrain {
  constructor(){
    this.noiseScale = 0.005;
  }

  elevationAt(x, z){
    return 100 * noise(x * this.noiseScale, z * this.noiseScale);
  }
}
