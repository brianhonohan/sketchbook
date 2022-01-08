var tool;

function setupPaper(canvasId){
  paper.setup('myCanvas');

  clearAndRedraw();

  tool = new paper.Tool();
  tool.onMouseDown = handleMouseDown;
  tool.onKeyDown = handleKeyPressed;
}

function clearAndRedraw(){
  paper.project.activeLayer.removeChildren();
  PaperJsUtils.background(new paper.Color(0.19));
  draw10PRINT();
}

function  draw10PRINT(){
  const cellSize = 20;
  const cursor  = new paper.Point(0,0);
  const startPt = new paper.Point(0,0);
  const endPt   = new paper.Point(0,0);

  let cols = Math.ceil(PaperJsUtils.width() / cellSize);
  let rows = Math.ceil(PaperJsUtils.height() / cellSize);

  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      cursor.x = cellSize * i;
      cursor.y = cellSize * j;

      startPt.x = cursor.x;
      endPt.x   = cursor.x + cellSize;

      if (fwdSlash()) {
        startPt.y = cursor.y;
        endPt.y   = cursor.y + cellSize;
      } else {
        startPt.y = cursor.y + cellSize;
        endPt.y = cursor.y;
      }

      let tmpLine = paper.Path.Line(startPt, endPt);
      tmpLine.strokeColor = 'white';
    }
  }
}

function fwdSlash(){
  return (Math.random() < 0.5);
}

function handleMouseDown(event){
  clearAndRedraw()
}

function handleKeyPressed(event){
  clearAndRedraw()
}

