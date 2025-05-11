var canvas;
var system;
var ui;
var scenarioMgr;
var urlParams;

var LOG_LEVEL_INFO = 0;
var LOG_LEVEL_DEBUG = 1;
var LOG_LEVEL_WARNING = 2;
var LOG_LEVEL_ERROR = 3;
var logginglevel = LOG_LEVEL_DEBUG;

function preload(){
  let scenarioJson = "./data/scenarios.json";
  scenarioMgr = new ScenarioManager();
  scenarioMgr.load(scenarioJson);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight- vertMargin());
  P5JsSettings.init();
  urlParams = getURLParams();
  background(50);

  // Dynamically switch between panel on right side bar
  // and bottom of screen based on overall window dimensions

  let uiSize = { x: width - 200, y: 0, width: 200, height: height };
  let uiConfig = {};
  uiConfig.panelPos = UserInterface.PANEL_POS_RIGHT;
  uiConfig.mode = UserInterface.UI_MODE_NORMAL;

  let ratioWidthToHeight = width / height;

  let sysWidthAdj = uiSize.width;
  let sysHeightAdj = 0;

  if (ratioWidthToHeight < 1 && width < (4 * uiSize.width) ){
    uiSize.width = width;
    uiSize.height = 70;
    uiSize.x = 0;
    uiSize.y = height - uiSize.height;
    uiConfig.panelPos = UserInterface.PANEL_POS_BOTTOM;
    uiConfig.mode = UserInterface.UI_MODE_COMPACT;

    sysWidthAdj = 0;
    sysHeightAdj = uiSize.height;
  } else if (width < (4 * uiSize.width)) {
    uiSize.width = 100;
    uiSize.x = width - uiSize.width
    sysWidthAdj = uiSize.width;
    uiConfig.mode = UserInterface.UI_MODE_COMPACT;
  }

  let rect = new Rect(0, 0, width - sysWidthAdj, height - sysHeightAdj);
  system = new System(rect);

  if (urlParams.scenario){
    scenarioMgr.loadScenario(urlParams.scenario);
  } else {
    system.init();
  }

  console.log(uiSize);
  ui = new UserInterface(uiSize, system, scenarioMgr, uiConfig);

  system.ui = ui;
  canvas.drop(handleFile);
}

function draw(){
  system.tick();
  system.render();
  ui.render();
  // displayFrameRate();
}

function vertMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 62;
}

function keyPressed(){
  ui.keyPressed();
}

function keyTyped(){
  switch (key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    case 'P':
      saveSystemCanvas();
      break;
  }
  ui.keyTyped(key);
}

function saveSystemCanvas(){
  P5JsUtils.saveCanvasArea(canvas, system.sizeAndPosition);
}

function mousePressed(){
  ui.mousePressed(mouseX, mouseY);
}

function mouseReleased(){
  ui.mouseReleased(mouseX, mouseY);
}

function mouseDragged(){
  ui.mouseDragged();
}

function handleFile(file){
  ui.handleFile(file);
}

function displayFrameRate(){
  if (frameCount % 30 != 0){ return; }

  fill(0);
  rect (0, height - 20, 50, 20);
  fill(50, 220, 50);
  textSize(12);
  text((frameRate()).toFixed(2), 5, height - 6);
}

function logError(message){
  console.error(message);
}

function logMessage(level, message){
  if (level >= logginglevel){
    console.log(message);
  }
}
