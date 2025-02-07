var system;
var paisley;


const settings = {
  fill_color: "#5b85d7",
  stroke_color: "#2251ac"
}

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  shapes = [];

  gui = P5JsSettings.addDatGui({autoPlace: false});
  gui.addColor(settings, "fill_color").onChange(updateColors);
  gui.addColor(settings, "stroke_color").onChange(updateColors);

  paisley = new Paisley(0.3 * width, 0.5 * height, HALF_PI + QUARTER_PI, 0.1 * width);
  paisley.dragEnabled = true;
  paisley.fillColor = settings.fill_color;
  paisley.strokeColor = settings.stroke_color;
  shapes.push(paisley);

  gui.add(paisley, "dragEnabled");
}

function updateColors(){
  paisley.fillColor = settings.fill_color;
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
