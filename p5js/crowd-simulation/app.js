let publicSpace;
let gui;

const guiOptions = {
  fadeEffect: 0,
};

function setup(){
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createAutosizedCanvas();
  P5JsSettings.init();

  colorMode(HSB);

  let margin = Math.min(width, height) * 0.1;
  let rightMargin = 200;
  let rect = new Rect(margin, margin, width - 2 * margin - rightMargin, height - 2 * margin);
  publicSpace = new System(rect);

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(guiOptions, 'fadeEffect', 0, 1, 0.01);

  let flowGui = gui.addFolder('Flow');
  flowGui.add(publicSpace.defaultFlowBehavior.config, 'separationFactor', 0, 3, 0.1);
  flowGui.add(publicSpace.defaultFlowBehavior.config, 'alignFactor', 0, 3, 0.1);
  flowGui.add(publicSpace.defaultFlowBehavior.config, 'cohesionFactor', 0, 3, 0.1);
  flowGui.add(publicSpace.defaultFlowBehavior.config, 'desiredSeparation', 0, 100, 1);
  flowGui.add(publicSpace.defaultFlowBehavior.config, 'maxSpeed', 0.5, 9, 0.5);
  flowGui.add(publicSpace.defaultFlowBehavior.config, 'maxForce', 0.05, 1, 0.05);

  addGuiControlsForDoorwaySpawnMatrices();
}

function draw(){
  background(0, 0, 20, 1 - guiOptions.fadeEffect);
  publicSpace.tick();
  publicSpace.render();
}

function addGuiControlsForDoorwaySpawnMatrices(){
  let doorways = publicSpace.doorways;

  for (let i = 0; i < doorways.length; i++) {
    
    let doorway = doorways[i];
    let matrix = doorway.spawnMatrix;

    let folder = gui.addFolder(`Doorway ${i}`);
    folder.addColor(doorway, 'rgbColor', 255)
         .name('Color')
         .onFinishChange((evt) => {
           doorway.color.setRed(evt.r);
           doorway.color.setGreen(evt.g);
           doorway.color.setBlue(evt.b);
         });

    for (let j = 0; j < matrix.length; j++) {
      let spawnConfig = matrix[j];
      let doorwayIndex = doorways.indexOf(spawnConfig.doorway);

      folder.add(spawnConfig, 'frameDelay', 1,100, 1)
           .name(`Delay to Doorway ${doorwayIndex}`);
    }

    folder.open();
  }
}

function createAutosizedCanvas(){
  canvas = createCanvas();
  windowResized(undefined, true);
  return canvas;
}

function windowResized(event, noRedraw = false) {
  resizeCanvas(innerWidth, 
              innerHeight - drawingContext.canvas.getBoundingClientRect().top,
              noRedraw);
  
}
