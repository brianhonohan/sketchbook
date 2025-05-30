var canvas;

const mouseEvents = [
// 'mouseMoved',
'mouseDragged',
'mousePressed',
'mouseReleased',
'mouseClicked',
'doubleClicked',
'mouseWheel'
];
const mouseEventStatuses = [];

const touchEvents = [
'touchStarted',
'touchMoved',
'touchEnded'
]
const touchEventStatuses = [];

const eventCount = {};


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  P5JsSettings.init();

  initEvents(mouseEvents, mouseEventStatuses);
  initEvents(touchEvents, touchEventStatuses);
}

function draw(){
  background(50);
  renderEventStatuses(mouseEventStatuses, 0.1 * width, 0.1 * height);
  renderEventStatuses(touchEventStatuses, 0.5 * width, 0.1 * height);
}

function initEvents(events, eventStatuses){
  events.forEach(eventName => { 
    eventCount[eventName] = 0;
    window[eventName] = function(eventData) {
      eventStatuses[eventName].status = true;
      eventCount[eventName] += 1;
    };
    eventStatuses[eventName] = {name: eventName, status: false};
  });
}

function gridPosition(index, numCols, blockWidth, blockSpacing, blockHeight, blockSpacingY){
  blockHeight   = blockHeight || blockWidth;
  blockSpacingY = blockSpacingY || blockSpacing;
  return createVector(
    (index % numCols) * (blockWidth + blockSpacing),
    Math.floor(index / numCols) * (blockHeight + blockSpacingY)
  );
}

function renderEventStatuses(eventStatuses, x, y) {
  // Per event:
  // Create a Box
  // Label it 
  // Fill it if activated
  push();
  translate(x, y);

  let blockPos;
  const boxWidth = 50;
  const boxHeight = 50;
  let spacing = 0.1 * boxWidth;
  const numCols = 1;
  let evt;

  stroke(230);
  let index = 0;
  for(eventName in eventStatuses){
    evt = eventStatuses[ eventName ];
    (evt.status) ? fill(230) : noFill();

    blockPos = gridPosition(index, numCols, boxWidth, spacing);
    rect(blockPos.x, blockPos.y, boxWidth, boxHeight);

    text(evt.name, blockPos.x + boxWidth + spacing, blockPos.y + boxHeight / 3);
    text(eventCount[evt.name], blockPos.x + boxWidth + spacing, blockPos.y + boxHeight / 3 + 20);
    evt.status = false;
    index += 1;
  }
  pop();
}
