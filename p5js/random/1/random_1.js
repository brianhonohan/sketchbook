var canvas;

function setup(){
  canvas = createCanvas(500, 500);
}

function draw(){

}

function keyTyped(){
  if (key == 'p'){
    saveCanvas(canvas, 'screenshot', 'png');
  }
}
