var gui;
var system;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  gui = P5JsSettings.addGui({autoPlace: false});

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);

  gui.add(system, 'clear').name('Clear');

  let reactDiffGui = gui.addFolder('Reaction Diffusion');
  let reactDiff = system.reactionDiff;
  reactDiffGui.add(reactDiff.settings, 'diffRateA', 0.0, 1.0, 0.01).name('Diffusion Rate A');
  reactDiffGui.add(reactDiff.settings, 'diffRateB', 0.0, 1.0, 0.01).name('Diffusion Rate B');
  reactDiffGui.add(reactDiff.settings, 'killRate', 0.0, 1.0, 0.001).name('Kill Rate');
  reactDiffGui.add(reactDiff.settings, 'feedRate', 0.0, 1.0, 0.001).name('Feed Rate');
  reactDiffGui.add(reactDiff.settings, 'dt', 0.0, 0.99, 0.01).name('Delta Time');

  background(255);
}

function draw(){
  system.tick();
  system.render();
}

function mouseDragged(event){
  if (event.target.nodeName != "CANVAS") {
    return;
  }
  system.addBAt(mouseX, mouseY);
}
