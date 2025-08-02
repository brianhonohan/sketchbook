var system;
var canvas;
var vertMargin = determineVerticalMargin();

var gui;
var modeOptions;

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init();

  let rect = new Rect(0.1 * width, 0.1 * height, 0.8 * width, 0.8 * height);
  system = new System(rect);

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(system.settings, "mode", LayoutUtilFunctions.getPointModes()).onFinishChange(handleModeChange);
  gui.add(system.settings, "num_points", 1, 3000, 1).onFinishChange(regenerate);
  gui.add(system.settings, "homing_points").onFinishChange(regenerate);
  handleModeChange();
}

// TODO: Move this dynamic UI mgmt into common GuiUtils
function handleModeChange(){
  removeControlersFromFolder('Mode Options');

  let optionsForMode = LayoutUtilFunctions.getOptionsForMode(system.settings.mode);
  if (optionsForMode.length == 0){
    modeOptions = {}
    regenerate();
    return;
  }

  const folder = findOrCreateFolder('Mode Options');

  modeOptions = {}
  for(let i = 0; i < optionsForMode.length; i++){
    let option = optionsForMode[i];
    modeOptions[option.name] = option.default;

    if (option.name == 'separationAngle' && option.maxValue == 360){
      // Fixes breaking issue with voronoi generation
      option.maxValue = 359.9999;
    }
    switch (option.type) {
      case 'list':
        folder.add(modeOptions, option.name, option.options).onFinishChange(regenerate);
        break;  
      case 'integer':
        folder.add(modeOptions, option.name, option.minValue, option.maxValue).onChange(regenerate);
        break;
      case 'float':
        folder.add(modeOptions, option.name, option.minValue, option.maxValue).onChange(regenerate);
        break;
    }
  }
  regenerate();
}


// TODO: Move this dynamic UI mgmt into common GuiUtils
function findOrCreateFolder(folderName){
  return findFolder(folderName) || gui.addFolder(folderName);
}
// TODO: Move this dynamic UI mgmt into common GuiUtils
function findFolder(folderName){
  for (let i = 0; i < gui.folders.length; i++){
    if (gui.folders[i]._title === folderName){
      return gui.folders[i];
    }
  }
  return undefined;
}
// TODO: Move this dynamic UI mgmt into common GuiUtils
function removeControlersFromFolder(folderName){
  const folder = findFolder(folderName);
  if (undefined == folder){
    return;
  }

  const childControllers = folder.controllersRecursive();
  for (let i = childControllers.length - 1; i >= 0; i--) {
    childControllers[i].destroy();
  }
}

function regenerate(){
  system.regenerate(modeOptions)
}

function draw(){
  system.tick();
  system.render();
}

function determineVerticalMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 37;
}

function keyTyped(){
  switch (key) {
    case 'P':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}
