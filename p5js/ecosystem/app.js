let seed;
let ecosystem;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  ecosystem = new Ecosystem(rect);

  gui = P5JsSettings.addDatGui({autoPlace: false, 
    bindOptions: true, callback: regenerateSystem});

  logSettings();
  frameRate(1);
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
