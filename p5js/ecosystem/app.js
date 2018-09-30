let seed;
let ecosystem;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  options = {
    cellWidth: UtilFunctions.getParameterByName("cellWidth", parseInt)
    , scale: UtilFunctions.getParameterByName("scale", Number)
    , percentWater: UtilFunctions.getParameterByName("percentWater",Number)
    , erosionRate: UtilFunctions.getParameterByName("erosionRate", Number)
  };
  UtilFunctions.unsetUndefineds(options);

  logSettings();
  let rect = new Rect(0, 0, width, height);
  ecosystem = new Ecosystem(rect, options);
  frameRate(1);
  ecosystem.tick();
}

function draw() {
  if (options.erosionRate && options.erosionRate > 0) {
    ecosystem.tick();
  }
}

function logSettings(){
  console.log("App options: ");
  console.log(options);
}
