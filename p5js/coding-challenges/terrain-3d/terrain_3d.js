var cameraLoc;

// From: https://en.wikipedia.org/wiki/Aircraft_principal_axes
var cameraPitch = 0;
var cameraRoll = 0;
var cameraYaw = 0;
var generatedTerrain;
var terrain;

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

  terrain = new Terrain();
  cameraLoc = createVector(0, 0, 0);
  cameraPitch = PI / 3;

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

  let cellSize = 20;
  let renderDepth = 120;
  let renderWidth = 2 * (width / cellSize);
  console.log("Render Width: "+ renderWidth);

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
  translate(0, -2000, 0);
  
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

