var system;
var canvas;
var vertMargin = determineVerticalMargin();

let gui;
let scaleSettings = {
  scale_coarse: 0,
  scale_fine: 0.005,
}

function setup() {
  // canvas = createCanvas(500, 500); // for screenshots
  // canvas = createCanvas(900, 900); // consistent, medium sizae for perf optimziation
  canvas = createCanvas(windowWidth, windowHeight-vertMargin);
  P5JsSettings.init({'noise_falloff': 0.6});
  
  let rect = new Rect(0, 0, width, height);
  system = new System(rect);
  
  gui = P5JsSettings.addDatGui({autoPlace: false, bindOptions: true, callback: regenerateSystem});
  gui.folders[0].close();
  const terrainGui = gui.addFolder('Terrain Settings');
  terrainGui.add(system.settings, "cellWidth", 2, 40, 2).onChange(reinitSystem);
  terrainGui.add(scaleSettings, "scale_coarse", 0, 1, 0.01).onChange(updateScale);
  terrainGui.add(scaleSettings, "scale_fine", 0.000001, 0.01, 0.000001).onChange(updateScale);
  terrainGui.add(system.settings, "xSpeed", -5, 5, 0.25).onChange(regenerateSystem);
  terrainGui.add(system.settings, "ySpeed", -5, 5, 0.25).onChange(regenerateSystem);
  terrainGui.add(system.settings, "zSpeed", -0.005, 0.005, 0.0001).onChange(regenerateSystem);
  terrainGui.add(system.settings, "open_simplex_noise").onChange(regenerateSystem);
  const displayGui = gui.addFolder('Display Settings');
  displayGui.add(system.settings, "interpolate_lines").onChange(regenerateSystem);
  displayGui.add(system.settings, "drawLines");
  displayGui.add(system.settings, "fillRect");
  displayGui.add(system.settings, "rectPercent", 0.05, 1, 0.01).onChange(updateRendering);
  displayGui.add(system.settings, "drawGrid");
  displayGui.add(system.settings, "gridResolution", 1, 40, 1);
  displayGui.add(system.settings, "num_levels", 2, 20, 1).onChange(updateRendering);
  displayGui.add(system.settings, "bin_colors", 2, 20, 1).onChange(updateRendering); 
  gui.add(P5JsUtils, "toggleLoop").name('Pause'); // not great UI, for static sketches, it is unclear if paused or not.

  if (width < 400){
    gui.close();
  }
}

function updateScale(){
  system.settings.scale = scaleSettings.scale_coarse + scaleSettings.scale_fine;
  system.regenerate();
}

function regenerateSystem(){
  system.regenerate();
}

function reinitSystem(){
  system.init();
}

function updateRendering(){
  system.updateRendering();
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
