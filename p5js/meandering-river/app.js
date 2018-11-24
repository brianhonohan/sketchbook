var system;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  var rect = new Rect(0.1 * width, 0.1 * height, 
                            0.8 * width, 0.8 * height);
  system = new System(rect);
}

function draw(){
  background(50);
  system.tick();
  system.draw();
}
 