var system;
var canvas;
var vertMargin = determineVerticalMargin();

let gui;

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  // canvas = createCanvas(900, 900); // consistent, medium sizae for perf optimziation
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init({'noise_falloff': 0.4});
  
  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
  
  gui = P5JsSettings.addDatGui({autoPlace: false, bindOptions: true, callback: regenerateSystem});
  gui.add(system.settings, "cellWidth", 2, 40, 2).onChange(reinitSystem);
  gui.add(system.settings, "scale", 0.01, 0.5, 0.001).onChange(regenerateSystem);
  gui.add(system.settings, "xOffset", -10000, 10000, 1).onChange(regenerateSystem);
  gui.add(system.settings, "yOffset", -10000, 10000, 1).onChange(regenerateSystem);
  gui.add(system.settings, "zSpeed", -0.005, 0.005, 0.0001).onChange(regenerateSystem);
  gui.add(system.settings, "open_simplex_noise").onChange(regenerateSystem);
  gui.add(system.settings, "interpolate_lines").onChange(regenerateSystem);
  gui.add(system.settings, "fillRect");
  gui.add(system.settings, "drawGrid");
  gui.add(system.settings, "num_levels", 2, 10, 1).onChange(updateRendering);
}

function regenerateSystem(){
  system.regenerate();
}

function reinitSystem(){
  system.init();
}

function updateRendering(){
  console.log('asdfas update REnd');
  system.updateRendering();
}

function draw(){
  background(50);
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
