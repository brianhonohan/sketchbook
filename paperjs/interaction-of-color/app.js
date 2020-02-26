var tool;
var path;

function setupPaper(canvasId){
  paper.setup('myCanvas');
  tool = new paper.Tool();
  tool.onMouseDown = handleMouseDown;
  tool.onMouseDrag = handleMouseDrag;
  tool.onKeyDown = handleKeyPressed;
}

function handleMouseDown(event){
  path = new paper.Path();
  path.strokeColor = 'black';
  path.add(event.point);
}

function handleMouseDrag(event){
  path.add(event.point);
}

function handleKeyPressed(event){
  console.log('The ' + event.key + ' key was pressed!');
}