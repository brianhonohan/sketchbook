let seed;
let ecosystem;
let genericGuiListeners = [];

function setup() {
  // createCanvas(500, 500);
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  ecosystem = new Ecosystem(rect);

  var guiProxy = {
    "Apply Display Settings": () => {ecosystem.fullRedrawRequested = true; }
  };

  gui = P5JsSettings.addDatGui({autoPlace: false, width: 345, bindOptions: true, callback: regenerateSystem});
  genericGuiListeners.push(gui.add(ecosystem.settings, "cellWidth", 1, 100, 1));
  genericGuiListeners.push(gui.add(ecosystem.settings, "scale", 0.0001, 0.2, 0.0001));
  genericGuiListeners.push(gui.add(ecosystem.settings, "percentWater", 0, 1, 0.01));
  genericGuiListeners.push(gui.add(ecosystem.settings, "erosionRate", 0, 1, 0.0001));
  gui.add(ecosystem, "useOpenSimplexNoise").onChange(regenerateSystem);
  addGuiListeners();

  const viewerGui = gui.addFolder('Display Settings');
  viewerGui.open();
  viewerGui.add(ecosystem.viewer, 'showResources');
  viewerGui.add(ecosystem.viewer, 'useColorRamp');
  viewerGui.add(guiProxy,'Apply Display Settings');
  
  logSettings();
}

function addGuiListeners(){
  genericGuiListeners.forEach(l => l.onFinishChange( () => regenerateSystem() ));
}

function regenerateSystem(){
  ecosystem.generate();
}

function draw() {
  ecosystem.tick();
  ecosystem.draw();
}

function logSettings(){
  console.log("App options: ");
  console.log(ecosystem.settings);
}
