var system;
var canvas;
var gui;

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createCanvas(windowWidth, windowHeight-vertMargin());
  P5JsSettings.init();

  let rect = new Rect(0, 0, width, height);
  system = new System(rect);

  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(system.settings, 'cellWidth', 5, 200, 5).onChange(regenerate);
}

function regenerate(){
  system.regenerate()
}

function draw(){
  background(50);
  system.tick();
  system.render();
}

function vertMargin(){
  let fullUrl = window.location.href;
  return (fullUrl.indexOf(".html") > 0) ? 0 : 62;
}

function mousePressed(event){
  if (event.target.nodeName != "CANVAS") {
    return;
  }
  // ...
}

function mouseDragged(event){
  if (event.target.nodeName != "CANVAS") {
    return;
  }
  // ...

}

function keyTyped(){
  switch (key) {
    case 'P':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
  }
}
