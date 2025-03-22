var system;
var systemViewer;
var visualScale;
var log10 = Math.log(10);
var settings;
let gui;

const buttonFunc = {
  'step': stepFunc,
  'regenerate': regenerate
};

const predefinedSystems = {
  'Default': {
    axiom: 'F',
    rule: 'FF[+F][-F]F',
    angle: 45
  },
  'Koch Curve': {
    axiom: 'F',
    rule: 'F+F−F−F+F',
    angle: 90
  },
  // 'Sierpinski Triangle': {
  //   axiom: 'F-G-G',
  //   rule: 'F-G+F+G-F'
  // },
  // 'Dragon Curve': {
  //   axiom: 'FX',
  //   rule: 'X+YF+',
  //   angle: 90
  // }
}

function setup(){
  createCanvas(windowWidth, windowHeight-40);
  P5JsSettings.init();
  visualScale = 1;

  optionsSet = new OptionsSet(optionsMetadata());
  settings = optionsSet.settings;

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(settings, "use_predefined", Object.keys(predefinedSystems)).onChange(loadPredefinedSystem);
  gui.add(settings, "axiom").onChange(regenerate);
  gui.add(settings, "rule").onChange(regenerate);
  gui.add(settings, "angle", 0, 180, 1);
  gui.add(settings, "segment_length", 0, 50, 1);
  gui.add(settings, "auto_step", 0, 6, 1).onChange(regenerate);
  gui.add(buttonFunc, "step");
  gui.add(buttonFunc, "regenerate");

  regenerate();
  systemViewer = new LSystemViewer(settings);
  stroke(255);
}  

function draw(){
  background(50);

  push();
  translate(width/2, height * 0.8);
  scale(visualScale);
  systemViewer.draw(system);
  pop();
}

function loadPredefinedSystem(){
  const systemName = settings.use_predefined;
  settings.axiom = predefinedSystems[systemName].axiom;
  settings.rule = predefinedSystems[systemName].rule;
  settings.angle = predefinedSystems[systemName].angle || settings.angle;

  updateGui('axiom', settings.axiom);
  updateGui('rule', settings.rule);
  updateGui('angle', settings.angle);
  updateGui('segment_length', settings.segment_length);
  regenerate();
}

function updateGui(controlName, value){
  for (const controller of gui.controllers){
    if (controller.property === controlName){
      controller.setValue(value);
      controller.updateDisplay();
      return;
    }
  }
}

function regenerate(){
  system = new LSystem(settings);
  for (let i = 0; i < settings.auto_step; i++){
    system.step();
  }
}

function redraw(){
}

function stepFunc(){
  system.step();
}

function keyPressed(){
  if (keyCode === RIGHT_ARROW) {
    system.step();
  } else if (key === '-'){
    visualScale = Math.max(0.1, visualScale - 0.2);
  } else if (key === '='){
    visualScale += 0.2;
  }
}

function mouseWheel(event){
  let zoomDelta = 0.1 * Math.sign(event.delta + 0.001) 
                      * Math.log( abs(event.delta) )
                      / log10;
  visualScale = Math.max(0.1, visualScale + zoomDelta);
}

function optionsMetadata(){
  return [
    // { name: "axiom", type: "integer", default: 0.2 * width},
    { name: "use_predefined", type: "string", default: 'Default'},
    { name: "axiom", type: "string", default: 'F'},
    { name: "rule", type: "string", default: 'FF[+F][-F+F]F'},
    { name: "angle", type: "float", default: 45},
    { name: "segment_length", type: "float", default: 20},
    { name: "auto_step", type: "integer", default: 5},
    // { name: "horizReflect", type: "bool", default: true},
    // { name: "strokeWeight", type: "float", default: '2'},
  ];
}
