var system;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();

  shapes = [];

  var halfCircleTD;
  halfCircleTD = new HalfCircleTeardrop(width/8, height/2, 11*width/16, height/2);
  halfCircleTD.fillColor = color(180, 50, 50);
  shapes.push(halfCircleTD);

  halfCircleTD = new HalfCircleTeardrop(width/8, height/2, 13*width/32, height/2);
  halfCircleTD.fillColor = color(200, 120, 50);
  shapes.push(halfCircleTD);

  halfCircleTD = new HalfCircleTeardrop(width/8, height/2, 17*width/64, height/2);
  halfCircleTD.fillColor = color(180, 180, 70);
  shapes.push(halfCircleTD);

  halfCircleTD = new HalfCircleTeardrop(13*width/16, height/2, 5*width/8, height/2);
  halfCircleTD.fillColor = color(210, 80, 80);
  shapes.push(halfCircleTD);

  halfCircleTD = new HalfCircleTeardrop(15*width/32, height/2, 12*width/32, height/2);
  halfCircleTD.fillColor = color(230, 150, 80);
  shapes.push(halfCircleTD);

  halfCircleTD = new HalfCircleTeardrop(37*width/128, height/2, 16*width/64, height/2);
  halfCircleTD.fillColor = color(210, 210, 120);
  shapes.push(halfCircleTD);
}

function draw(){
  background(50);

  noStroke();

  shapes.forEach(s => s.draw());
}

function mousePressed(){
  console.log(mouseX, mouseY);
  shapes.filter(s => s.dragEnabled == true)
        .find(s => s.handleMousePressed());
}

function mouseDragged(){
  shapes.filter(s => s.isDragged == true)
        .forEach(s => s.handleMouseDragged());
}

function mouseReleased(){
  shapes.filter(s => s.dragEnabled == true)
        .forEach(s => s.handleMouseReleased());
}

function keyTyped(){
  switch(key) {
    case 'p':
      saveCanvas(canvas, 'screenshot', 'png');
      break;
    case '0':
      P5JsUtils.toggleLoop();
      break;
  }
}
