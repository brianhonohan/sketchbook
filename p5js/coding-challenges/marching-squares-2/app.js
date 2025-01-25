var system;
var canvas;
var vertMargin = determineVerticalMargin();

let gui;

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init({'noise_falloff': 0.4});
  
  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
  
  gui = P5JsSettings.addDatGui({autoPlace: false, bindOptions: true, callback: regenerateSystem});
  
  // WANT an easier way to add params, with callbacks
  // // OPTION 1: Use default callback, and have util class handle binding
  // P5JsSettings.addGuiOptions(gui, regenerateSystem, [
  //   // [use_generic_callback T/F or custom, obj, param, min, max, step]
  //   {params: [system.settings, "scale", 0.01, 0.2, 0.001]},
  //   {params: [system.settings, "xOffset", -10000, 10000, 1]},
  //   {params: [system.settings, "yOffset", -10000, 10000, 1]},
  //   {params: [system.settings, "zSpeed", -0.005, 0.005, 0.0001]},
  //   {params: [system.settings, "fillRect"], callback: false},
  //   {params: [system.settings, "drawGrid"], callback: false},
  // ]);

  // // OPTION 2: 
  // // Update system.optionsMetadata() to have min/max/step
  // P5JsSettings.addObject(gui, system, regenerateSystem);

  // Option 3: method chaining
  gui.add(system.settings, "cellWidth", 1, 100, 1).onChange(reinitSystem);
  gui.add(system.settings, "scale", 0.01, 0.2, 0.001).onChange(regenerateSystem);
  gui.add(system.settings, "xOffset", -10000, 10000, 1).onChange(regenerateSystem);
  gui.add(system.settings, "yOffset", -10000, 10000, 1).onChange(regenerateSystem);
  gui.add(system.settings, "zSpeed", -0.005, 0.005, 0.0001).onChange(regenerateSystem);
  gui.add(system.settings, "fillRect");
  gui.add(system.settings, "drawGrid");
}

function regenerateSystem(){
  system.regenerate();
}

function reinitSystem(){
  system.init();
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
