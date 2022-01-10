var system;
var paisley;

function setup() {
  createCanvas(500, 500);
  P5JsSettings.init();

  shapes = [];

  paisley = new Paisley(0.3 * width, 0.5 * height, HALF_PI + QUARTER_PI, 0.1 * width);
  paisley.dragEnabled = true;
  shapes.push(paisley);
}

function draw(){
  background(50);
  noStroke();
  shapes.forEach(s => s.draw());
}

function mousePressed(){
  shapes.filter(s => s.dragEnabled == true)
        .find(s => s.handleMousePressed());
}

function mouseDragged(){
  shapes.filter(s => s.isDragged == true)
        .forEach(s => s.handleMouseDragged());
}

function mouseReleased(){
  shapes.filter(s => s.isDragged == true)
        .forEach(s => s.handleMouseReleased());
}

function keyPressed(){
  switch(key){
    case 'c':
      shapes.filter(s => s.isDragged == true)
            .forEach(s => console.log(s._constructorCall()));
      break;
  }
}
