var system;
var systemViewer;
var visualScale;
var log10 = Math.log(10);
var settings;

const buttonFunc = {
  'step': stepFunc,
  'regenerate': regenerate
};

function setup(){
  createCanvas(windowWidth, windowHeight-40);
  P5JsSettings.init();
  visualScale = 1;

  optionsSet = new OptionsSet(optionsMetadata());
  settings = optionsSet.settings;

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.add(settings, "axiom").onChange(regenerate);
  gui.add(settings, "rule").onChange(regenerate);
  gui.add(buttonFunc, "step");
  gui.add(buttonFunc, "regenerate");

  system = new LSystem(settings);
  systemViewer = new LSystemViewer();
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

function regenerate(){
  system = new LSystem(settings);
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
    { name: "axiom", type: "string", default: 'F'},
    { name: "rule", type: "string", default: 'FF[+F][-F+F]F'},
    // { name: "horizReflect", type: "bool", default: true},
    // { name: "strokeWeight", type: "float", default: '2'},
  ];
}
