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
  canvas = createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();
  urlParams = getURLParams();

  let uiPanelWidth = 200;

  let rect = new Rect(0, 0, width - uiPanelWidth, height);
  system = new System(rect);

  if (urlParams.scenario){
    scenarioMgr.loadScenario(urlParams.scenario);
  } else {
    system.init();
  }

  let uiRect = new Rect(width - uiPanelWidth, 0, uiPanelWidth, height);
  ui = new UserInterface(uiRect, system, scenarioMgr);

  background(50);
}

function draw(){
  system.tick();
  system.render();
  ui.render();
  displayFrameRate();
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
