var system;
var paisley;
var extAccent;


const settings = {
}

function setup() {
  createCanvas(500, 500);
  // createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();
  rectMode(CENTER);

  shapes = [];

  gui = P5JsSettings.addDatGui({autoPlace: false});

  paisley = new Paisley(0.3 * width, 0.5 * height, HALF_PI + QUARTER_PI, 0.1 * width);
  paisley.dragEnabled = true;
  paisley.noFill = false
  paisley.fillColor = "#5b85d7";
  paisley.noStroke = false;
  paisley.strokeColor = "#2251ac";
  paisley.strokeWeight = 15;
  paisley.accentViaScaledPaisley = true;

  let mainPaisleyGui = gui.addFolder("Base Paisley");
  mainPaisleyGui.open();
  gui.add(paisley, "noFill");
  gui.addColor(paisley, "fillColor");
  gui.add(paisley, "noStroke");
  gui.addColor(paisley, "strokeColor");
  gui.add(paisley, "strokeWeight", 0.5, 30, 0.5);
  gui.add(paisley, "dragEnabled");
  gui.add(paisley, "accentViaScaledPaisley");
  
  extAccent = new Rectangle(0,0, 10, 10);
  extAccent.noFill = false;
  extAccent.fillColor = "#8585d7";
  extAccent.noStroke = true;
  extAccent.margin = 10;
  extAccent.step = 0.1;
  paisley.exteriorAccent = extAccent;
  
  let extAccentGui = gui.addFolder("Exterior Accent");
  extAccentGui.open();
  extAccentGui.add(extAccent, "noFill");
  extAccentGui.addColor(extAccent, "fillColor");
  extAccentGui.add(extAccent, "margin", 0, 200, 1);
  extAccentGui.add(extAccent, "step", 0.05, 1, 0.01);

  let paisleyClone = paisley.getScaledClone(1.5);
  paisleyClone.noFill = false
  paisleyClone.fillColor = "#f5d597";
  paisleyClone.noStroke = false;
  paisleyClone.strokeColor = "#fdb555";
  paisleyClone.strokeWeight = 15;

  // Add the clone first, to draw it first in the simple shapes[]
  // TODO: enable basic layer stack of drawable objects
  // ... with send to back, bring to front, send to bottom, bring to top functions
  // shapes.push(paisleyClone);
  shapes.push(paisley);
}

function draw(){
  background(50);
  shapes.forEach(s => s.draw());
}

function mousePressed(){
  shapes.filter(s => s.dragEnabled == true)
        .find(s => s.handleMousePressed());
}

function touchStarted(){
  mousePressed();
}

function mouseDragged(){
  shapes.filter(s => s.isDragged == true)
        .forEach(s => s.handleMouseDragged());
}

function mouseReleased(){
  shapes.filter(s => s.isDragged == true)
        .forEach(s => s.handleMouseReleased());
}

function touchEnded(){
  mouseReleased();
}

function keyPressed(){
  switch(key){
    case 'c':
      shapes.filter(s => s.isDragged == true)
            .forEach(s => console.log(s._constructorCall()));
      break;
  }
}
