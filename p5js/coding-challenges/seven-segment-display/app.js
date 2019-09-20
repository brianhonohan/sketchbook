var system;
var touchKeyInput;
var fullRect;
var smallRect;

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  P5JsSettings.init();


  let minDimension = min(width, height);
  fullRect = new Rect((width - minDimension) / 2, 
                      (height - minDimension) / 2, 
                      minDimension, minDimension);
  smallRect = new Rect(0, 0, width, height * 0.5);
  system = new System(fullRect);
  system.render();
  initTouch();
}

function keyTyped(){
  system.setValue(key);
}

function initTouch(){
  touchKeyInput = createInput();
  touchKeyInput.position(-500,-500);
  touchKeyInput.elt.setAttribute('type', 'number');
  touchKeyInput.elt.addEventListener('blur', inputEnded);
}

function mouseReleased(){
  // do nothing
}

function touchEnded(event){
  touchKeyInput.elt.focus();
  system.setSizeAndPos(smallRect);
  system.render();
}

function inputEnded(){
  system.setSizeAndPos(fullRect);
  system.render();
}
