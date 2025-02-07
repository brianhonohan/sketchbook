var system;
var paisley;


const settings = {
}

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  shapes = [];

  gui = P5JsSettings.addDatGui({autoPlace: false});

  paisley = new Paisley(0.3 * width, 0.5 * height, HALF_PI + QUARTER_PI, 0.1 * width);
  paisley.dragEnabled = true;
  paisley.noFill = false
  paisley.fillColor = "#5b85d7";
  paisley.noStroke = false;
  paisley.strokeColor = "#2251ac";
  paisley.strokeWeight = 15;
  shapes.push(paisley);

  let mainPaisleyGui = gui.addFolder("Base Paisley");
  mainPaisleyGui.open();
  gui.add(paisley, "noFill");
  gui.addColor(paisley, "fillColor");
  gui.add(paisley, "noStroke");
  gui.addColor(paisley, "strokeColor");
  gui.add(paisley, "strokeWeight", 0.5, 30, 0.5);
  gui.add(paisley, "dragEnabled");
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
