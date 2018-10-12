var cameraLoc;

// From: https://en.wikipedia.org/wiki/Aircraft_principal_axes
var cameraPitch = 0;
var cameraRoll = 0;
var cameraYaw = 0;
var generatedTerrain;

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

  terrain = new Terrain();
  cameraLoc = createVector(0, 100, 0);
  cameraPitch = - PI / 6;

  stroke(255);
  // draw();
  // noLoop();
  // frameRate(0.005);
  frameRate(5);
}

function draw(){
  background(45);

  let baseColor = color(30, 90, 30);
  let maxColor = color(230, 240, 230);

  let cellSize = 80;
  let renderDepth = 30;
  let renderWidth = 4 * (width / cellSize);
  console.log("Render Width: "+ renderWidth);

  generatedTerrain = [];

  // Build Terrain
  for (var z = 0; z < renderDepth; z++){
    generatedTerrain.push([]);
    for (var x = 0; x < renderWidth; x++){
      let xScaled = ((x - renderWidth/2) * cellSize) + cameraLoc.x;
      let zScaled = (z * cellSize) + cameraLoc.z;
      let heightAtLoc = terrain.elevationAt(xScaled, zScaled);
      generatedTerrain[z][x] = heightAtLoc;
    }
  }
  
  // translate(width/2, height/2);
  translate(cameraLoc.x, cameraLoc.y, cameraLoc.z);
  rotateX(cameraPitch);

  // Render mesh for Terrain
  noFill();    
  for (var z = 0; z < renderDepth-1; z++){
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < renderWidth; x++){
      let xScaled = ((x - renderWidth/2)* cellSize) + cameraLoc.x;
      let zScaled = (z * cellSize) + cameraLoc.z;

      let nextScaledZ = zScaled + cellSize;
      vertex(xScaled, generatedTerrain[z][x], zScaled);
      vertex(xScaled, generatedTerrain[z+1][x], nextScaledZ);
    }
    endShape();
  }
  cameraLoc.z -= cellSize;
}


class Terrain {
  constructor(){
    this.noiseScale = 0.005;
  }

  elevationAt(x, z){
    return 100 * noise(x * this.noiseScale, z * this.noiseScale);
  }
}
