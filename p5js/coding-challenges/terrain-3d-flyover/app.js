var cameraLoc;

// From: https://en.wikipedia.org/wiki/Aircraft_principal_axes
var cameraPitch = 0;
var cameraRoll = 0;
var cameraYaw = 0;
var generatedTerrain;
var terrain;
var cellSize;

function setup(){
  createCanvas(500, 500, WEBGL);
  // createCanvas(windowWidth, windowHeight, WEBGL);

  terrain = new Terrain();
  cameraLoc = createVector(0, 0, 0);
  cameraPitch = PI / 3;

  cellSize = map(width, 300, 3000, 20, 100);
  stroke(50, 200, 50);
}

function draw(){
  background(50);

  let renderDepth = 95;
  let renderWidth = 3 * (width / cellSize);

  generatedTerrain = [];

  // Build Terrain
  for (var y = 0; y < renderDepth; y++){
    generatedTerrain.push([]);
    for (var x = 0; x < renderWidth; x++){
      let xScaled = ((x - renderWidth/2) * cellSize) + cameraLoc.x;
      let yScaled = (y * cellSize) + cameraLoc.y;
      let heightAtLoc = terrain.elevationAt(xScaled, yScaled);
      generatedTerrain[y][x] = heightAtLoc;
    }
  }

  // translate(width/2, height/2);
  // translate(cameraLoc.x, cameraLoc.y, cameraLoc.z);
  rotateX(cameraPitch);

  // x => left-right
  // y => forward-back
  // z => up-down
  translate(0, -1200, 0);
  
  // Render mesh for Terrain
  noFill();    
  for (var y = 0; y < renderDepth-1; y++){
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < renderWidth; x++){
      let xScaled = ((x - renderWidth/2)* cellSize) + cameraLoc.x;
      let yScaled = (y * cellSize) + 0;

      let nextScaledY = yScaled + cellSize;
      vertex(xScaled, yScaled, generatedTerrain[y][x]);
      vertex(xScaled, nextScaledY, generatedTerrain[y+1][x]);
    }
    endShape();
  }
  cameraLoc.y -= cellSize;
}


class Terrain {
  constructor(){
    this.noiseScale = 0.005;
  }

  elevationAt(x, z){
    return 100 * noise(x * this.noiseScale, z * this.noiseScale);
  }
}

