var system;
var bezierCurve;
let pointsAlongCurve;
let tangentLine;
let perpendicularLine;

let perpendicularOptions = ['inward', 'outward'];
let perpendLengthOptions = ['scale to curvature', 'use slider'];

const settings = {
  enable_drag: true,
  num_points: 4,
  tangent: {
    draw: true,
    percent: 0.25,
    perpendicular: true,
    perpend_length_option: perpendLengthOptions[0],
    perpendicular_length: 50,
    perpendicular_direction: perpendicularOptions[0]
  },
  reset: resetShapes,
  makeCircleArc: makeCircleArc
}

function setup() {
  createCanvas(windowWidth, windowHeight-35);
  // createCanvas(500, 500);
  P5JsSettings.init();
  resetShapes();

  pointsAlongCurve = [];
  
  gui = P5JsSettings.addGui({autoPlace: false});
  gui.add(settings, "enable_drag").onChange(updateDragEnabled);
  gui.add(settings, "reset");
  gui.add(settings, "makeCircleArc");
  let pointsGui = gui.addFolder("Points Along Curve Debug");
  pointsGui.open();
  pointsGui.add(settings, "num_points", 0, 20, 1).onChange(drawIntermediatePoints);
  
  let tangentGui = gui.addFolder("Tangent Debug");
  tangentGui.open();
  tangentGui.add(settings.tangent, "draw");
  tangentGui.add(settings.tangent, "percent", 0, 1, 0.02);
  tangentGui.add(settings.tangent, "perpendicular");
  tangentGui.add(settings.tangent, "perpend_length_option", perpendLengthOptions).name("Scale Perpend. To:");
  tangentGui.add(settings.tangent, "perpendicular_length", 5, 200, 5);
  tangentGui.add(settings.tangent, "perpendicular_direction", perpendicularOptions).name("perpendicular dir");

  drawIntermediatePoints();
  P5JsSettings.collapseGuiIfNarrow(gui);
}

function draw(){
  background(50);

  noStroke();
  strokeWeight(1);
  shapes.forEach(s => s.draw());

  if (settings.num_points > 0){
    drawIntermediatePoints();
    stroke(200, 200, 50);
    fill(200, 200, 50);
    strokeWeight(12);
    pointsAlongCurve.forEach(p => p.draw());
  }

  if (settings.tangent.draw){
    tangentLine = bezierCurve.tangentAt(settings.tangent.percent);
    stroke(50, 200, 200);
    strokeWeight(3);
    tangentLine.setLength(50);
    tangentLine.draw();

    if (settings.tangent.perpendicular){
      switch(settings.tangent.perpendicular_direction){
        case 'inward':
          perpendicularLine = bezierCurve.inwardPerpendiculAt(settings.tangent.percent);
          break;
        case 'outward':
          perpendicularLine = bezierCurve.outwardPerpendiculAt(settings.tangent.percent); 
          break;
      }
      
      stroke(200, 50, 50);
      strokeWeight(3);
      let length;
      if (settings.tangent.perpend_length_option == perpendLengthOptions[0]){
        // length = -1 / Math.log(bezierCurve.curvatureAt(settings.tangent.percent)) * 300;
        length = bezierCurve.curvatureAt(settings.tangent.percent) * 10000;
      } else {
        length = settings.tangent.perpendicular_length;
      }

      perpendicularLine.setLength(length);
      perpendicularLine.draw();
    }
  }
}

function makeCircleArc(){
  const radius = 0.3 * width;
  shapes[0].makeCircleQuarterArc(width/2 - radius/2, height/2 + radius / 2, radius,- HALF_PI);
}

function updateDragEnabled(){
  shapes.forEach(s => s.dragEnabled = settings.enable_drag);
}

function drawIntermediatePoints(){
  pointsAlongCurve = [];
  if (settings.num_points == 0){ return; }

  const fraction = 1.0 / (settings.num_points + 1);

  for (let i = 1; i <= settings.num_points; i++){
    pointsAlongCurve.push(bezierCurve.pointAt(fraction * i));
  }
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
  shapes.filter(s => s.dragEnabled == true)
        .forEach(s => s.handleMouseReleased());
}

function touchEnded(){
  mouseReleased();
}

function keyPressed(){
  switch(key){
    case 'd':
      shapes.forEach(s => s.toggleDragEnabled());
      break;
    case 'r':
      resetShapes();
      break;
  }
}

function resetShapes(){
  shapes = [];

  bezierCurve = new BezierCurve(0.2 * width, 0.8 * height,
                                0.4 * width, 0.8 * height,
                                0.6 * width, 0.2 * height,
                                0.8 * width, 0.2 * height);
  bezierCurve.dragEnabled = true;
  // bezierCurve.makeLinear();
  // bezierCurve.move(150, 180);
  bezierCurve.strokeColor = color(255);
  shapes.push(bezierCurve);
}