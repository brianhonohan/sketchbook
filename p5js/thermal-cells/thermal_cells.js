let grid;
var canvas;
let gui;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight-35);
  grid = new GridViewController(0, 0, width, height);
  frameRate(30);

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(grid, 'cellWidth', 5, 100, 1).onChange(reinit);
  gui.add(grid, 'cellHeight', 5, 100, 1).onChange(reinit);
}

function draw() {
  grid.step();
  grid.renderViews();
}

function reinit(){
  grid.initCells();
}

function mouseDragged(){
  if(keyIsDown(87)){  // 'W'.charCodeAt(0)
    grid.addWallAt(mouseX, mouseY);
  }else if(keyIsDown(81)){  // 'Q'.charCodeAt(0)
    grid.removeWallAt(mouseX, mouseY);
  }else if(keyIsDown(65)){  // 'A'.charCodeAt(0)
    grid.addSourceAt(mouseX, mouseY);
  }else if(keyIsDown(83)){  // 'S'.charCodeAt(0)
    grid.addSinkAt(mouseX, mouseY);
  }else if(keyIsPressed == true){
    grid.removeHeatAt(mouseX, mouseY);
  }else{
    grid.addHeatAt(mouseX, mouseY);
  }
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}
